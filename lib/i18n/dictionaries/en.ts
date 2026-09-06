// English dictionary.
// Plural slots are [one, other, other] — English only distinguishes two forms.
import type { Dict } from "./ru";

const en: Dict = {
  nav: {
    professions: "Professions",
    specialties: "Programs",
    universities: "Universities",
    clusters: "Clusters",
    careerTest: "Career test",
    takeTest: "Take the test",
    home: "Home",
    switchLanguage: "Choose language",
  },

  units: {
    university: ["university", "universities", "universities"],
    universityFull: ["university", "universities", "universities"],
    specialty: ["program", "programs", "programs"],
    seat: ["seat", "seats", "seats"],
    program: ["intake program", "intake programs", "intake programs"],
    cluster: ["cluster", "clusters", "clusters"],
  },

  labels: {
    universities: "universities",
    specialties: "programs",
    programs: "intake programs",
    programsAtUnis: "programs at universities",
    seatsTotal: "seats in total",
    seatsIntake: "intake seats",
    seatsFor: "seats for 2026–2027",
    freeSeats: "state-funded seats",
    tuitionPerYear: "tuition / year",
    languagesOfStudy: "languages of study",
    none: "none",
    budget: "state-funded",
    paid: "paid",
    state: "public",
    private: "private",
    branch: "branch campus",
    statePlural: "Public",
    privatePlural: "Private",
    seatsShort: "seats",
    perYearSomoni: "TJS",
  },

  forms: {
    дневная: "Full-time",
    заочная: "Part-time",
    дистанционная: "Distance",
    вечерняя: "Evening",
  },

  languages: {
    таджикский: "Tajik",
    русский: "Russian",
    английский: "English",
    узбекский: "Uzbek",
  },

  regions: {
    "Город Душанбе": "Dushanbe city",
    "Согдийская область": "Sughd region",
    "Хатлонская область": "Khatlon region",
    "Горно-Бадахшанская автономная область": "Gorno-Badakhshan Autonomous Region",
    "Район Рашт": "Rasht district",
  },

  cities: {
    Душанбе: "Dushanbe",
    Худжанд: "Khujand",
    Хорог: "Khorog",
    Бустон: "Buston",
    Пенджикент: "Panjakent",
    Исфара: "Isfara",
    Куляб: "Kulob",
    Бохтар: "Bokhtar",
    Дангара: "Danghara",
    Кушониён: "Kushoniyon",
    Левакант: "Levakant",
    Рашт: "Rasht",
  },

  home: {
    eyebrow: "🎓 A guide for university applicants in Tajikistan",
    titleLead: "From “",
    titleAccent: "I don’t know what to become",
    titleTail: "” to “this is where I’m applying.”",
    lead1: "Rohnamo brings together",
    leadBold: "official data on every university and program",
    lead2:
      "in Tajikistan in one place. Find out what profession sits behind each program, where it is taught, what it costs and how many seats there are — and choose your future deliberately.",
    ctaTest: "Not sure what to become — take the test",
    ctaCatalog: "Browse programs",
    step1Title: "Find a program",
    step1Text: "Through an interest-based test or a catalog of {count} programs grouped into 5 clusters.",
    step2Title: "Understand the profession",
    step2Text: "What you study, where you can work, entrance subjects, seats and tuition — all on one page.",
    step3Title: "Pick a university",
    step3Text: "Compare universities that offer the program: city, language, study format, funded seats and price.",
    clustersTitle: "5 program clusters",
    clustersLead: "Every NTC program is grouped into one of 5 clusters by profile. Where will you start?",
    clusterBadge: "Cluster {n}",
    allSpecialtiesTitle: "All programs",
    allSpecialtiesText: "Search and filters across {count} programs",
    popularTitle: "Popular programs",
    popularLead: "The programs offered by the largest number of universities.",
    seeAll: "All →",
    unisCtaTitle: "{count} universities across the country — in one catalog",
    unisCtaText:
      "Public and private universities in every region: programs, seats, tuition, language of study and contacts.",
    unisCtaButton: "Open universities",
    professionsTitle: "Which profession should you start with?",
    professionsLead: "What a specialist does, and which university programs lead to it.",
    professionsCta: "All professions",
  },

  professionsPage: {
    title: "Professions",
    lead:
      "What a specialist does, what skills it takes, and which programs at universities in Tajikistan lead to it.",
    metaDescription:
      "A catalog of professions: what a specialist does, what skills it takes, and which university programs in Tajikistan teach it.",
    searchPlaceholder: "Search professions — e.g. “doctor”, “lawyer”, “developer”",
    allFields: "All fields",
    found: "Professions found:",
    empty: "Nothing found. Try a different query or clear the field filter.",
    editorialNote:
      "Profession descriptions are editorial — a guideline for choosing. Data on programs, universities, seats and tuition comes from the official NTC intake plan.",
  },

  professionPage: {
    fallbackTitle: "Profession",
    metaDescription:
      "{name}: what a specialist does, what skills it takes, and which university programs in Tajikistan teach it.",
    whatTheyDo: "What they do",
    skills: "Skills you need",
    schoolSubjects: "Focus on these subjects at school",
    pros: "Pros",
    cons: "Challenges",
    studyThisTitle: "Programs that lead to this profession",
    studyThisHint: "Open a program to see every university that teaches it, seats and tuition.",
    related: "Other professions in “{field}”",
  },

  specialtiesPage: {
    title: "Programs of study",
    lead:
      "All {count} programs offered by universities in Tajikistan. Pick a program to see which universities teach it, how many seats there are, what it costs and in which language.",
    metaDescription:
      "A catalog of every university program in Tajikistan: where it is taught, seats, tuition and language of study. Official NTC data.",
    searchPlaceholder: "Search programs — e.g. “programming”, “economics”, “medicine”",
    sortPopular: "By popularity",
    sortSeats: "By number of seats",
    sortName: "Alphabetically",
    allClusters: "All clusters",
    found: "Programs found:",
    empty: "Nothing found. Try a different query or clear the cluster filter.",
  },

  specialtyPage: {
    fallbackTitle: "Program",
    code: "Program code: {code}",
    metaDescription: "{name}: which universities in Tajikistan teach it, how many seats, tuition and language of study.",
    whatYouStudy: "What you study",
    careers: "Where you can work",
    examSubjects: "Entrance exam subjects",
    examSubjectsHint: "A guideline for the “{cluster}” cluster. Confirm the exact subjects in the NTC handbook.",
    whereTaught: "Where it is taught — {count} {unit}",
    whereTaughtHint: "Sorted by number of seats. Tuition is per year, in somoni.",
    thForm: "Format",
    thLanguage: "Language",
    thPayment: "Payment",
    thSeats: "Seats",
    related: "Similar programs in this cluster",
  },

  universitiesPage: {
    title: "Universities of Tajikistan",
    lead:
      "All {count} higher education institutions from the NTC intake plan. Open a university profile to see all of its programs, seats and tuition.",
    metaDescription:
      "Every higher education institution in Tajikistan: programs, intake seats, city and contacts. Official NTC data.",
    searchPlaceholder: "Search universities — name, abbreviation or city",
    allRegions: "All regions",
    allTypes: "All types",
    found: "Universities found:",
    empty: "Nothing found.",
  },

  universityPage: {
    fallbackTitle: "University",
    metaDescription:
      "{name} ({city}): {specialties} programs, {programs} intake programs. Seats, tuition and language of study — NTC data.",
    callAria: "Call {phone}",
    programsTitle: "Programs offered",
    programsHint: "Grouped by cluster. Tuition is per year.",
    thSpecialty: "Program",
    thForms: "Formats",
    thLanguage: "Language",
    thTuition: "Tuition / year",
    thSeats: "Seats",
  },

  clusterPage: {
    fallbackTitle: "Cluster",
    badge: "Cluster {n}",
    metaTitle: "{name} — cluster",
    examSubjects: "Entrance subjects:",
    specialtiesTitle: "Programs in this cluster",
  },

  test: {
    metaTitle: "Career orientation test",
    metaDescription:
      "A short interest test: it suggests which program clusters are worth considering, and explains why.",
    question: "Question {n} of {total}",
    back: "← Back",
    disclaimer: "The test is not a diagnosis. It points to programs worth a closer look.",
    options: [
      "Not me at all",
      "Rather not",
      "Neutral",
      "Rather yes",
      "That’s exactly me",
    ],
  },

  result: {
    metaTitle: "Test result",
    badge: "Your result",
    title: "These clusters are worth a closer look",
    lead: "This isn’t a final choice — it’s a starting point. Explore the programs below and see where they are taught.",
    bestMatch: "Best match",
    matchLabel: "match",
    whyLabel: "Why:",
    whyText: "you lean towards {reasons}.",
    reasonsJoin: " and ",
    clusterLink: "All programs in this cluster →",
    profileTitle: "Your profile",
    seeAllSpecialties: "Browse all programs →",
    retake: "Retake the test",
    disclaimer:
      "The test is not a diagnosis and does not replace counselling. It only suggests where to start your search.",
    emptyState: "No results yet — take the test first.",
    emptyCta: "Take the test",
  },

  source: {
    badge: "✓ official data",
    prefix: "Source:",
    label: "Intake plan of the National Testing Centre under the President of Tajikistan, 2026–2027",
    note: "Tuition and seat counts can change — confirm with the university admissions office.",
  },

  footer: {
    tagline:
      "From “I don’t know” to “I’m applying.” We help school students in Central Asia choose a profession, a program and a university.",
    product: "Product",
    region: "Region",
    tajikistan: "🇹🇯 Tajikistan",
    important: "Important",
    importantText:
      "University data is provided for reference. Always verify current information on the official university websites.",
    copyright: "© 2026 Rohnamo — a product prototype.",
  },

  site: {
    titleDefault: "Rohnamo — choose your profession, program and university",
    description:
      "Rohnamo helps school students and applicants in Tajikistan and Central Asia deliberately choose a profession, a program of study and a university.",
    ogTitle: "Rohnamo — Career & Education Discovery Platform",
    ogDescription: "From “I don’t know” to “I’m applying.”",
  },

  notFound: {
    title: "Page not found",
    text: "The link may be out of date, or the program may have been renamed.",
    cta: "Go to homepage",
  },

  dimensions: {
    analytical: "Analytical thinking",
    technical: "Technical thinking",
    creative: "Creativity",
    communication: "Communication",
    people: "Working with people",
    entrepreneurial: "Entrepreneurship",
    science: "Science",
    business: "Business",
  },

  questions: {
    q1: "I enjoy solving logic problems and puzzles.",
    q2: "I like figuring out how numbers and data work.",
    q3: "I’m curious about how computers and machines work.",
    q4: "I enjoy picking up new software and devices.",
    q5: "I like creating things: drawings, texts, music, ideas.",
    q6: "It matters to me that my work looks good and feels original.",
    q7: "I find it easy to speak in public and explain things to others.",
    q8: "I like negotiating and working in a team.",
    q9: "I enjoy helping people and taking care of them.",
    q10: "I pick up on other people’s moods and needs easily.",
    q11: "One day I’d like to start my own business or project.",
    q12: "I’m willing to take a risk for an interesting opportunity.",
    q13: "I’m curious about how the world works: biology, physics, chemistry.",
    q14: "I like running experiments and testing hypotheses.",
    q15: "I’m curious about how companies and markets make money.",
    q16: "I like working with laws, rules and fairness.",
  },
};

export default en;
