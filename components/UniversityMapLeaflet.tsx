"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { REGION_ORDER, type University } from "@/lib/ntc";
import { fmtNum, getDict, href, type Locale } from "@/lib/i18n";
import { cityName, regionName, uniTypeLabel, universityName, universityShortName } from "@/lib/i18n/data";
import universityCoords from "@/data/i18n/university_coords.json";

/**
 * Real coordinates (see scripts/geocode_universities.mjs) — each university's
 * own street, geocoded via Nominatim/OpenStreetMap (the same provider as the
 * map tiles). House numbers aren't reliably mapped for Tajikistan in OSM, so
 * this is street-level precision, with a city-centre fallback for the
 * addresses Nominatim couldn't resolve at all.
 */
const REAL_COORDS = universityCoords as Record<string, { lat: number; lon: number; source: string }>;

/** City centroids — fallback only, for a university missing from the geocoded file above. */
const CITY_COORDS: Record<string, [lat: number, lon: number]> = {
  "Душанбе": [38.5598, 68.787],
  "Худжанд": [40.2833, 69.6333],
  "Бустон": [40.2167, 69.75],
  "Пенджикент": [39.4938, 67.6086],
  "Исфара": [40.1247, 70.6333],
  "Куляб": [37.9142, 69.7822],
  "Бохтар": [37.8322, 68.7803],
  "Дангара": [38.0333, 69.3333],
  "Кушониён": [37.6833, 68.6333],
  "Левакант": [37.7667, 68.9333],
  "Хорог": [37.4938, 71.5417],
  "Рашт": [39.0206, 70.6528],
};

// Fixed categorical order, one hue per region — never reassigned by filtering.
const REGION_COLOR: Record<string, string> = {
  "Город Душанбе": "#0ea5e9",
  "Согдийская область": "#10b981",
  "Хатлонская область": "#f59e0b",
  "Горно-Бадахшанская автономная область": "#f43f5e",
  "Район Рашт": "#8b5cf6",
};

// Golden-angle spiral: spreads N points around a centre with no two ever on
// the same ray, so same-city pins land next to each other instead of stacked.
const GOLDEN_ANGLE = 137.50776405003785 * (Math.PI / 180);
function jitter(index: number, lat: number, lon: number): [number, number] {
  if (index === 0) return [lat, lon];
  const angle = index * GOLDEN_ANGLE;
  const radiusDeg = 0.0011 * Math.sqrt(index);
  const dLat = radiusDeg * Math.sin(angle);
  const dLon = (radiusDeg * Math.cos(angle)) / Math.cos((lat * Math.PI) / 180);
  return [lat + dLat, lon + dLon];
}

// Below this, same-city pins sit only a few px apart and full-name labels
// would just overlap into an unreadable smear — so labels only switch on
// once the user has zoomed in far enough to actually read them.
const LABEL_MIN_ZOOM = 12;

function ZoomWatcher({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  return null;
}

function pinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.45)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export default function UniversityMapLeaflet({ locale, universities }: { locale: Locale; universities: University[] }) {
  const d = getDict(locale);
  const usedRegions = REGION_ORDER.filter((r) => universities.some((u) => u.region === r));
  const [zoom, setZoom] = useState(7);
  const showLabels = zoom >= LABEL_MIN_ZOOM;

  const points = useMemo(() => {
    // Group by the resolved point (rounded) rather than by city: most
    // universities now sit at their own real street, so only genuine ties —
    // several institutions on the same street/city-fallback point — need the
    // spiral offset to stay individually clickable.
    const groups = new Map<string, { lat: number; lon: number; unis: University[] }>();
    for (const u of universities) {
      const real = REAL_COORDS[u.id];
      const base = real ?? (CITY_COORDS[u.city] ? { lat: CITY_COORDS[u.city][0], lon: CITY_COORDS[u.city][1] } : null);
      if (!base) continue;
      const key = `${base.lat.toFixed(4)},${base.lon.toFixed(4)}`;
      const g = groups.get(key) ?? { lat: base.lat, lon: base.lon, unis: [] };
      g.unis.push(u);
      groups.set(key, g);
    }
    const out: { u: University; position: [number, number] }[] = [];
    for (const g of groups.values()) {
      g.unis.forEach((u, i) => out.push({ u, position: jitter(i, g.lat, g.lon) }));
    }
    return out;
  }, [universities]);

  return (
    <div className="w-full">
      <div className="h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 sm:h-[380px] lg:h-[440px]">
        <MapContainer center={[38.55, 70.3]} zoom={7} minZoom={6} maxZoom={18} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomWatcher onZoom={setZoom} />
          {points.map(({ u, position }) => (
            <Marker key={u.id} position={position} icon={pinIcon(REGION_COLOR[u.region] ?? "#64748b")}>
              {showLabels && (
                <Tooltip permanent direction="bottom" offset={[0, 5]} className="uni-label" opacity={1}>
                  {universityName(locale, u.id, u.name)}
                </Tooltip>
              )}
              <Popup minWidth={240} maxWidth={290} className="uni-popup">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">
                    {universityShortName(locale, u.id, u.shortName)}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${u.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
                    {uniTypeLabel(d, u.type)}
                  </span>
                </div>
                <div className="mt-2 text-[13px] font-bold leading-snug text-ink">
                  {universityName(locale, u.id, u.name)}
                </div>
                <div className="mt-1 text-xs text-ink-muted">📍 {cityName(d, u.city)}</div>
                {/*<div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">*/}
                {/*  <span>{u.specialtyCount} {d.labels.specialties}</span>*/}
                {/*  <span>🎟 {fmtNum(locale, u.totalSeats)} {d.labels.seatsShort}</span>*/}
                {/*</div>*/}
                <Link
                  href={href(locale, `/universities/${u.slug}`)}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                >
                  {d.home.mapProfileLink}
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-ink-soft">
        {usedRegions.map((r) => (
          <span key={r} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full ring-1 ring-white" style={{ backgroundColor: REGION_COLOR[r] }} />
            {regionName(d, r)}
          </span>
        ))}
      </div>

      <p className="mt-2 text-center text-[11px] text-ink-muted">{d.home.mapHint}</p>
    </div>
  );
}
