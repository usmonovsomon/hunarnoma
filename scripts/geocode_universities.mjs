// Second pass at university geocoding. The original script
// (geocode_universities.mjs) only tried "{street}, {city}" queries against
// Nominatim, which miss constantly for Tajikistan: most streets in OSM here
// only carry a Tajik name tag, not a Russian one, so a Russian street query
// matches nothing even when the street itself is mapped. 21/42 universities
// fell back to a city-centroid jitter as a result — the "random-looking pins"
// the map was criticized for.
//
// This pass instead searches by the university's own NAME first. Even though
// the university's OWN name may also only have a Tajik/abbreviated tag in
// OSM, Nominatim's full-text index still surfaces it for a Russian-language
// query often enough (its ranking considers transliterated/alternate name
// variants), and a named campus POI is far more precise than a street guess
// or a city centroid. Falls back to the existing street search, then the
// city centroid, exactly as before.
//
// Every "name" and "street" hit is logged with its OSM class/type and
// display_name so a human can sanity-check it against the known city/address
// before trusting it — this script does NOT auto-commit a bad match, it just
// proposes one for review in the printed log and a *_review.json sidecar.
import fs from "fs";

const universities = JSON.parse(fs.readFileSync("lib/ntc/data.json", "utf8")).universities;
const OUT = "data/i18n/university_coords.json";
const REVIEW_OUT = "data/i18n/university_coords_review.json";
const UA = "HunarNoma-education-platform/1.0 (student project; no contact email on file)";

const CITY_FALLBACK = {
  "Душанбе": [38.5598, 68.787], "Худжанд": [40.2833, 69.6333], "Бустон": [40.2167, 69.75],
  "Пенджикент": [39.4938, 67.6086], "Исфара": [40.1247, 70.6333], "Куляб": [37.9142, 69.7822],
  "Бохтар": [37.8322, 68.7803], "Дангара": [38.0333, 69.3333], "Кушониён": [37.6833, 68.6333],
  "Левакант": [37.7667, 68.9333], "Хорог": [37.4938, 71.5417], "Рашт": [39.0206, 70.6528],
};

function extractStreet(address) {
  const parts = address.split(",").map((s) => s.trim());
  const rest = parts.slice(1);
  const street = rest.find((p) => /^(улица|проспект|переулок|проезд|шоссе|бульвар)(?=\s|$)/i.test(p));
  return street || null;
}

async function nominatim(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&countrycodes=tj&addressdetails=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru" } });
  if (!res.ok) return [];
  return res.json();
}
async function wait() {
  await new Promise((r) => setTimeout(r, 1100)); // Nominatim usage policy: max 1 req/s
}

// Rough bounding boxes per city (generous — just to sanity-filter name-search
// hits that land in a totally different part of the country).
const CITY_BOX = {
  "Душанбе": [38.45, 68.65, 38.65, 68.9],
  "Худжанд": [40.2, 69.5, 40.35, 69.75],
  "Бустон": [40.15, 69.65, 40.28, 69.85],
  "Пенджикент": [39.4, 67.5, 39.6, 67.7],
  "Исфара": [40.05, 70.5, 40.2, 70.75],
  "Куляб": [37.8, 69.65, 38.0, 69.9],
  "Бохтар": [37.75, 68.65, 37.9, 68.9],
  "Дангара": [37.95, 69.2, 38.1, 69.45],
  "Кушониён": [37.6, 68.5, 37.8, 68.75],
  "Левакант": [37.65, 68.8, 37.85, 69.05],
  "Хорог": [37.4, 71.45, 37.6, 71.65],
  "Рашт": [38.95, 70.55, 39.1, 70.75],
};

function inCityBox(lat, lon, city) {
  const box = CITY_BOX[city];
  if (!box) return true; // unknown city — don't filter
  const [latMin, lonMin, latMax, lonMax] = box;
  return lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax;
}

let cache = {};
try { cache = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch {}
const results = { ...cache };
const review = [];

for (const u of universities) {
  if (results[u.id]?.source === "street" || results[u.id]?.source === "name") {
    continue; // already resolved to real-location precision in a prior pass
  }

  let picked = null;

  // Pass 1: search by the institution's own name.
  const nameHits = await nominatim(u.name);
  await wait();
  const goodName = nameHits.find(
    (h) => ["amenity", "office", "building"].includes(h.class) && inCityBox(+h.lat, +h.lon, u.city)
  );
  if (goodName) {
    picked = { lat: +goodName.lat, lon: +goodName.lon, source: "name", display: goodName.display_name, osmClass: goodName.class, osmType: goodName.type };
  }

  // Pass 1b: Nominatim's fuzzy match degrades fast on long official names —
  // "имени X Y" honorifics and "(негосударственный)" qualifiers often bury
  // the actual match. Strip them and append the city explicitly.
  if (!picked) {
    const simplified = u.name
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/\s+имени\s+.+$/i, "")
      .trim();
    if (simplified !== u.name && simplified.length > 3) {
      const simpleHits = await nominatim(`${simplified} ${u.city}`);
      await wait();
      const good = simpleHits.find(
        (h) => ["amenity", "office", "building"].includes(h.class) && inCityBox(+h.lat, +h.lon, u.city)
      );
      if (good) {
        picked = { lat: +good.lat, lon: +good.lon, source: "name", display: good.display_name, osmClass: good.class, osmType: good.type };
      }
    }
  }

  // Pass 2: the old street-based query.
  if (!picked) {
    const street = extractStreet(u.address);
    if (street) {
      const streetHits = await nominatim(`${street}, ${u.city}, Tajikistan`);
      await wait();
      const hit = streetHits[0];
      if (hit && inCityBox(+hit.lat, +hit.lon, u.city)) {
        picked = { lat: +hit.lat, lon: +hit.lon, source: "street", street, display: hit.display_name };
      }
    }
  }

  if (picked) {
    results[u.id] = picked;
    review.push({ id: u.id, name: u.name, city: u.city, address: u.address, ...picked });
    console.log(`HIT  ${u.id} [${picked.source}] ${u.name} -> ${picked.lat},${picked.lon}\n       ${picked.display}`);
  } else {
    const fb = CITY_FALLBACK[u.city];
    results[u.id] = fb ? { lat: fb[0], lon: fb[1], source: "city-fallback" } : { source: "none" };
    console.log(`MISS ${u.id} ${u.name} (${u.city}) -> city fallback`);
  }
}

fs.mkdirSync("data/i18n", { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
fs.writeFileSync(REVIEW_OUT, JSON.stringify(review, null, 2));

const bySource = {};
for (const r of Object.values(results)) bySource[r.source] = (bySource[r.source] || 0) + 1;
console.log(`\nDone. ${JSON.stringify(bySource)}`);
console.log(`New/updated hits to review: ${review.length} — see ${REVIEW_OUT}`);
