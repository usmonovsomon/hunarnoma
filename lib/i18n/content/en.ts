import type { ContentBundle } from "@/lib/ntc/content";

const en: ContentBundle = {
  clusters: {
    1: {
      name: "Sciences and Engineering",
      tagline: "Engineering, IT, exact and natural sciences",
      description:
        "For those who enjoy mathematics, technology and the exact sciences: programming and artificial intelligence, energy, construction, mechanical engineering, chemistry and physics. This is where engineers, programmers, architects and researchers come from.",
      examSubjects: ["Mathematics", "Physics", "Computer Science / Chemistry"],
      exampleSpecialties: [
        { code: "1400101", name: "Software Engineering" },
        { code: "1400301", name: "Artificial Intelligence" },
        { code: "1310304", name: "Computer Science" },
        { code: "131030408", name: "Web Design and Computer Graphics" },
      ],
    },
    2: {
      name: "Economics and Geography",
      tagline: "Economics, finance, management and geography",
      description:
        "The world of business, money and management: economics and finance, management and marketing, banking and customs, tourism, and geography. A fit for anyone who wants to work with numbers, people and organisations.",
      examSubjects: ["Mathematics", "Geography", "Foreign language"],
      exampleSpecialties: [
        { code: "1250103", name: "World Economy" },
        { code: "1250104", name: "Finance and Credit" },
        { code: "1260202", name: "Management" },
        { code: "1890101", name: "Tourism and Hospitality" },
      ],
    },
    3: {
      name: "Languages, Education and Arts",
      tagline: "Languages, teaching, journalism and the arts",
      description:
        "Humanities and creative fields: languages and literature, teaching and working with children, journalism and media, music, design and fine art. For those whose strengths are words, communication and creativity.",
      examSubjects: ["Native language and literature", "Foreign language", "History"],
      exampleSpecialties: [
        { code: "1020306", name: "English Language" },
        { code: "1230108", name: "Journalism" },
        { code: "1010201", name: "Primary Education" },
        { code: "1020301", name: "Tajik Language and Literature" },
      ],
    },
    4: {
      name: "Social Sciences and Law",
      tagline: "Law, history, international relations",
      description:
        "Society, the state and the law: legal studies, public administration, international relations and diplomacy, history and religious studies. It trains lawyers, civil servants, diplomats and social specialists.",
      examSubjects: ["History", "Social studies (law)", "Tajik language"],
      exampleSpecialties: [
        { code: "1240102", name: "Law" },
        { code: "1230101", name: "International Relations" },
        { code: "1260101", name: "Public Administration" },
        { code: "1020101", name: "History" },
      ],
    },
    5: {
      name: "Medicine, Biology and Sport",
      tagline: "Medicine, biology, agriculture and sport",
      description:
        "Health and the living world: medicine and pharmacy, biology and chemistry, agronomy and veterinary science, physical education and sport. For those who want to heal, study living things, or work with nature and people.",
      examSubjects: ["Biology", "Chemistry"],
      exampleSpecialties: [
        { code: "1790101", name: "General Medicine" },
        { code: "1790108", name: "Pharmacy" },
        { code: "1790107", name: "Dentistry" },
        { code: "102040401", name: "Biology. Chemistry" },
      ],
    },
  },

  specialties: {
    "1400101": {
      summary: "Software engineering — how programs, websites and applications are designed, written and maintained.",
      whatYouStudy: ["Programming", "Algorithms and data structures", "Databases", "Web and mobile development", "Software testing"],
      careers: ["Programmer / developer", "Web developer", "Mobile developer", "QA engineer"],
    },
    "1310304": {
      summary: "Computer science — the foundations of computing: how computers, networks and information systems work.",
      whatYouStudy: ["Programming fundamentals", "Computer networks", "Operating systems", "Databases", "Information security"],
      careers: ["IT specialist", "System administrator", "Developer", "Data specialist"],
    },
    "1400301": {
      summary: "Artificial intelligence — teaching machines: data analysis, machine learning and neural networks.",
      whatYouStudy: ["Mathematics and statistics", "Machine learning", "Neural networks", "Data analysis", "Python and ML libraries"],
      careers: ["ML engineer", "Data scientist", "Data analyst", "AI engineer"],
    },
    "140010202": {
      summary: "Information systems — building and maintaining the systems that manage an organisation's data and processes.",
      whatYouStudy: ["Information systems design", "Databases", "Programming", "Business analysis"],
      careers: ["Systems analyst", "Information systems developer", "Database administrator"],
    },
    "131030408": {
      summary: "Web design and computer graphics — creating the visual look of websites, interfaces and digital graphics.",
      whatYouStudy: ["Graphic design", "Web technologies (HTML/CSS)", "Graphics editors", "UX/UI fundamentals", "Typography and colour"],
      careers: ["Web designer", "UI designer", "Graphic designer", "Motion designer"],
    },
    "1250103": {
      summary: "World economy — how international markets, trade and cross-border finance work.",
      whatYouStudy: ["Micro- and macroeconomics", "International trade", "Finance", "Statistics", "Foreign languages"],
      careers: ["Economist", "Foreign trade analyst", "International trade specialist"],
    },
    "1250104": {
      summary: "Finance and credit — managing money: banks, investment, budgets and financial analysis.",
      whatYouStudy: ["Finance and credit", "Banking", "Financial analysis", "Taxation", "Accounting"],
      careers: ["Finance professional", "Banking specialist", "Financial analyst", "Credit officer"],
    },
    "1250108": {
      summary: "Accounting and analysis — recording an organisation's money and assets, reporting and auditing.",
      whatYouStudy: ["Accounting", "Financial analysis", "Taxation", "Auditing", "Accounting software"],
      careers: ["Accountant", "Auditor", "Financial analyst", "Chief accountant"],
    },
    "1260202": {
      summary: "Management — running organisations, teams and projects to reach their goals.",
      whatYouStudy: ["Management fundamentals", "Project management", "Marketing", "Business economics", "Human resources"],
      careers: ["Manager", "Project manager", "Executive", "Entrepreneur"],
    },
    "1260101": {
      summary: "Public administration — how government bodies work and how to manage effectively in the public sector.",
      whatYouStudy: ["Management theory", "Public policy", "Law", "Public sector economics", "Project management"],
      careers: ["Civil servant", "Government agency specialist", "Policy analyst"],
    },
    "1960101": {
      summary: "Customs administration — controlling goods across the border, customs rules and foreign trade.",
      whatYouStudy: ["Customs law", "Foreign economic activity", "Logistics", "Merchandising", "Economics"],
      careers: ["Customs inspector", "Foreign trade specialist", "Logistician", "Customs broker"],
    },
    "1890101": {
      summary: "Tourism and hospitality — organising travel, running hotels and delivering tourism services.",
      whatYouStudy: ["Tourism fundamentals", "Hotel management", "Geography of tourism", "Foreign languages", "Service management"],
      careers: ["Tourism manager", "Hotel manager", "Tour guide", "Event organiser"],
    },
    "1230101": {
      summary: "International relations — how countries interact: diplomacy, politics and international law.",
      whatYouStudy: ["World politics", "International law", "History of diplomacy", "Foreign languages", "Economics"],
      careers: ["Diplomat", "International affairs specialist", "Analyst", "Foreign ministry / NGO staff"],
    },
    "1240102": {
      summary: "Law — statutes and how they are applied: courts, contracts, protecting rights.",
      whatYouStudy: ["Theory of state and law", "Civil law", "Criminal law", "Constitutional law", "Procedural law"],
      careers: ["Lawyer", "Advocate", "Investigator", "In-house counsel", "Notary"],
    },
    "1260102": {
      summary: "Public administration and law — the intersection of legal practice and working inside government.",
      whatYouStudy: ["Law", "Public administration", "Administrative law", "Public sector economics"],
      careers: ["Civil servant", "Public sector lawyer", "Management specialist"],
    },
    "1230108": {
      summary: "Journalism — gathering, verifying and presenting information in the media and digital outlets.",
      whatYouStudy: ["Journalism fundamentals", "Media ethics", "Editing", "Photography and video", "New media"],
      careers: ["Journalist", "Editor", "Social media specialist", "Correspondent", "Presenter"],
    },
    "1020306": {
      summary: "English language — deep command of the language and the methodology of teaching it.",
      whatYouStudy: ["English language practice", "Grammar and vocabulary", "Teaching methodology", "Translation", "Literature"],
      careers: ["English teacher", "Translator", "Tutor", "Communications specialist"],
    },
    "1020301": {
      summary: "Tajik language and literature — the native language, its history, literature and teaching.",
      whatYouStudy: ["Tajik language", "Literature", "Linguistics", "Teaching methodology", "Stylistics"],
      careers: ["Native language teacher", "Editor", "Philologist", "Proofreader"],
    },
    "1010201": {
      summary: "Primary education — training teachers for primary school classrooms.",
      whatYouStudy: ["Pedagogy", "Child psychology", "Teaching methods", "Primary school subject fundamentals"],
      careers: ["Primary school teacher", "Educator", "Early years teacher"],
    },
    "1790101": {
      summary: "General medicine — training doctors to diagnose and treat illness.",
      whatYouStudy: ["Anatomy and physiology", "Biochemistry", "Pharmacology", "Clinical disciplines", "Hospital placements"],
      careers: ["Physician", "Surgeon (after specialisation)", "Paediatrician", "General practitioner"],
    },
    "1790107": {
      summary: "Dentistry — treating teeth and the oral cavity.",
      whatYouStudy: ["Anatomy", "Restorative dentistry", "Oral surgery", "Prosthodontics", "Clinical practice"],
      careers: ["Dentist", "Orthodontist", "Oral surgeon"],
    },
    "1790108": {
      summary: "Pharmacy — medicines: their composition, production and safe use.",
      whatYouStudy: ["Pharmaceutical chemistry", "Pharmacology", "Drug formulation", "Botany", "Pharmacy management"],
      careers: ["Pharmacist", "Pharmacy specialist", "Formulation technologist"],
    },
    "1690101": {
      summary: "Architecture — designing buildings and spaces where beauty, function and durability meet.",
      whatYouStudy: ["Architectural design", "Descriptive geometry", "History of architecture", "Structural systems", "Computer modelling"],
      careers: ["Architect", "Urban planner", "Environmental designer", "Design engineer"],
    },
  },
};

export default en;
