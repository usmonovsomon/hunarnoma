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
    professions: "professions",
    international: "International",
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
    lead1: "HunarNoma helps you understand",
    leadBold: "who you could become",
    lead2:
      "— what skills it takes and which programs lead there. Once you get to choosing a university, we show the official NTC intake data: seats, tuition and languages of study.",
    ctaTest: "Not sure what to become — take the test",
    ctaCatalog: "Browse professions",
    step1Title: "Find a profession",
    step1Text: "Through an interest-based test or a catalog of {count} professions — from IT to medicine and law.",
    step2Title: "See which programs lead to it",
    step2Text: "What you'd study, what skills it takes, and which university programs lead to that profession.",
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
    graphTitle: "How it works",
    graphLead: "Every profession connects to study programs, and every program connects to the universities that teach it.",
    graphCaption: "This is just one example — the same connection exists for all {count} professions.",
    officialDataTitle: "Next — the verified data",
    officialDataLead: "5 program clusters and every university in Tajikistan, from the official NTC 2026–2027 intake plan.",
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
    workplaces: "Where they work",
    pros: "Pros",
    cons: "Challenges",
    studyThisTitle: "Programs that lead to this profession",
    studyThisHint: "Open a program to see every university that teaches it, seats and tuition.",
    internationalNote:
      "This is an international profession: the NTC intake plan has no dedicated program for it — it's in demand worldwide, often remotely. Browse the program catalog for related fields if you'd like to start by studying in Tajikistan.",
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
      "A short interest test: it suggests which profession fields are worth considering, and explains why.",
    question: "Question {n} of {total}",
    back: "← Back",
    disclaimer: "The test is not a diagnosis. It points to professions worth a closer look.",
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
    title: "These fields are worth a closer look",
    lead: "This isn’t a final choice — it’s a starting point. Explore the professions below and see which programs lead to them.",
    bestMatch: "Best match",
    matchLabel: "match",
    whyLabel: "Why:",
    whyText: "you lean towards {reasons}.",
    reasonsJoin: " and ",
    fieldLink: "All professions in this field →",
    profileTitle: "Your profile",
    seeAllProfessions: "Browse all professions →",
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
    copyright: "© 2026 HunarNoma — a product prototype.",
  },

  site: {
    titleDefault: "HunarNoma — choose your profession, program and university",
    description:
      "HunarNoma helps school students and applicants in Tajikistan and Central Asia deliberately choose a profession, a program of study and a university.",
    ogTitle: "HunarNoma — Career & Education Discovery Platform",
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
    q1: "I enjoy solving puzzles and problems.",
    q2: "I'm curious how machines and devices work.",
    q3: "I like coming up with new things.",
    q4: "I find it easy to explain what I know to others.",
    q5: "I enjoy helping people.",
    q6: "I'd like to start my own business one day.",
    q7: "I'm curious how nature works.",
    q8: "I'm curious how people make money.",
    q9: "I make new friends easily.",
    q10: "I like checking things myself, not just taking them on faith.",
  },
};

export default en;
