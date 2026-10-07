// Professions pilot — English content.
import type { ProfessionContentBundle } from "@/lib/professions/base";

const en: ProfessionContentBundle = {
  fields: {
    it: { name: "IT & Technology", tagline: "Development, design and data analysis" },
    engineering: { name: "Engineering & Architecture", tagline: "Designing buildings, machines and spaces" },
    science: { name: "Science", tagline: "Studying living and non-living nature" },
    medicine: { name: "Medicine & Health", tagline: "Treating and caring for people" },
    agriculture: { name: "Agriculture", tagline: "Crop farming, animal husbandry and irrigation" },
    business: { name: "Business & Finance", tagline: "Money, management and organizations" },
    law: { name: "Law & Government", tagline: "Laws, public service and international affairs" },
    education: { name: "Education & Languages", tagline: "Teaching, languages and working with text" },
    media: { name: "Media & Tourism", tagline: "News media, travel and hospitality" },
    arts: { name: "Arts", tagline: "Visual art and design" },
  },

  professions: {
    "software-developer": {
      name: "Software Developer",
      tagline: "Builds programs, websites and apps",
      summary: "Designs, writes and maintains software — from websites and mobile apps to a company's internal systems.",
      whatTheyDo: [
        "Writes and debugs code in languages like JavaScript, Python or Java for a specific task",
        "Turns a client's requirements into a technical spec and program architecture",
        "Writes automated tests and goes through code review with senior colleagues",
        "Fixes bugs reported by users or testers"
      ],
      skills: ["Algorithmic and logical thinking", "At least one programming language, plus Git", "English for reading documentation and team communication", "Ability to read and understand other people's code", "Learning new tools independently"],
      schoolSubjects: ["Mathematics", "Computer science", "English"],
      pros: ["Can work remotely for companies anywhere in the world", "One of the highest starting salaries among professions in Tajikistan", "The job market keeps growing every year"],
      cons: ["Technology changes fast — constant learning is required", "Long hours of sedentary screen work"],
      workplaces: [
        "IT companies and outsourcing studios in Dushanbe building software for foreign clients",
        "IT departments of banks and telecom operators (Alif, Eskhata, Tcell, Megafon)",
        "Your own startup or side project",
        "Foreign companies remotely — via freelance platforms or direct hire"
      ],
    },
    "web-ui-designer": {
      name: "Web & UI Designer",
      tagline: "Shapes how websites and apps look",
      summary: "Figures out how a website or app should look and feel — from the color of a button to the whole interface structure.",
      whatTheyDo: [
        "Maps out the site's structure (user flow) and sketches rough wireframes",
        "Builds design mockups and a reusable design system in Figma",
        "Picks fonts, colors and illustrations that match the brand",
        "Hands finished designs to developers and checks the build matches the design"
      ],
      skills: ["Artistic taste and a sense of composition", "Working in Figma and other graphic tools", "Basic HTML/CSS to know what's actually possible to build", "Empathy for users and the ability to run simple surveys", "Taking feedback and revisions calmly"],
      schoolSubjects: ["Computer science", "Art", "English"],
      pros: ["Creative work with a visible result", "In demand both at IT companies and ordinary businesses that need a website", "Freelance work is possible from anywhere in the country"],
      cons: ["Clients often ask for endless rounds of revisions", "Requires constantly following interface design trends"],
      workplaces: [
        "Web studios and digital agencies",
        "IT companies, working alongside developers",
        "Marketing departments of banks, retailers and telecom operators",
        "Freelance and remote projects for foreign clients"
      ],
    },
    "ai-data-specialist": {
      name: "Data & AI Specialist",
      tagline: "Analyzes data and trains algorithms",
      summary: "Works with large datasets: finds patterns in them and trains models that predict outcomes or automate decisions.",
      whatTheyDo: [
        "Collects and cleans raw data from databases and files before analysis",
        "Builds and trains machine learning models, mostly in Python",
        "Measures model accuracy and tunes parameters to improve it",
        "Prepares charts and reports that explain results to non-technical colleagues"
      ],
      skills: ["Statistics and linear algebra", "Python and data libraries (pandas, scikit-learn)", "Analytical thinking and hypothesis testing", "Attention to data quality and cleanliness", "Explaining complex results in simple terms"],
      schoolSubjects: ["Mathematics", "Computer science", "Physics"],
      pros: ["One of the highest-paid specializations in IT", "A constantly evolving field with new problems to solve", "Many remote positions at international companies"],
      cons: ["Requires a solid math background that not everyone enjoys", "Models sometimes don't work as expected and need long debugging"],
      workplaces: [
        "Fintech and banking, analyzing customer behavior",
        "IT companies and outsourcing studios building ML projects for clients",
        "Telecom operators analyzing subscriber data",
        "Foreign product companies — remotely"
      ],
    },
    "cybersecurity-specialist": {
      name: "Cybersecurity Specialist",
      tagline: "Protects data and systems from being breached",
      summary: "Finds vulnerabilities in systems and builds defenses against hacking attacks and data leaks.",
      whatTheyDo: [
        "Scans a company's networks and software for vulnerabilities",
        "Sets up firewalls, encryption and intrusion-detection systems",
        "Investigates security incidents and data leaks after they happen",
        "Trains staff on digital security basics"
      ],
      skills: ["Understanding of networks and operating systems", "Programming and basic cryptography", "Thinking like a potential attacker", "Attention to detail and log analysis", "Staying calm under pressure during an incident"],
      schoolSubjects: ["Computer science", "Mathematics", "English"],
      pros: ["Very high and growing demand as banks and government digitize", "One of the highest salaries in the IT field", "Tasks vary constantly — little routine work"],
      cons: ["Personal responsibility if a breach happens on your watch", "Constant need to study new types of attacks and vulnerabilities"],
      workplaces: [
        "Security departments of banks and fintech companies",
        "Government institutions running digital systems",
        "Telecom operators and data centers",
        "Specialized cybersecurity firms (audits, penetration testing)"
      ],
    },
    "telecom-engineer": {
      name: "Telecommunications Engineer",
      tagline: "Builds networks that carry calls and data",
      summary: "Designs and maintains the networks that carry calls, internet traffic and data.",
      whatTheyDo: [
        "Designs the wired or wireless network layout for a given site",
        "Installs and configures base stations, switches and routers",
        "Diagnoses connection outages and fixes faults on the line",
        "Tests and rolls out new communication technology (e.g. 4G/5G)"
      ],
      skills: ["Physics and electronics fundamentals", "Reading schematics and using measuring instruments", "Precision when configuring equipment", "Willingness to do hands-on fieldwork", "English for reading equipment documentation"],
      schoolSubjects: ["Physics", "Mathematics", "Computer science"],
      pros: ["Steady demand from telecom operators and internet providers", "A clear career ladder from technician to chief network engineer"],
      cons: ["Frequent site visits, sometimes in bad weather", "Responsibility for keeping the coverage area connected"],
      workplaces: [
        "Telecom operators (Tcell, Megafon, Babilon-M, Tojiktelecom)",
        "Internet service providers",
        "Government communications and IT infrastructure agencies",
        "Companies installing corporate networks and phone systems"
      ],
    },
    "robotics-engineer": {
      name: "Robotics Engineer",
      tagline: "Designs robots and automated production lines",
      summary: "Designs and programs robots and automated systems for manufacturing.",
      whatTheyDo: [
        "Designs a robot's mechanical parts and electronic circuits",
        "Writes the software that controls the robot's movement and sensors",
        "Builds a prototype and tests it under real conditions",
        "Rolls the finished solution out onto a production line"
      ],
      skills: ["Engineering drafting and 3D modeling", "Microcontroller programming", "Physics, mechanics and electronics", "Hands-on work with tools and a soldering iron", "Patience through repeated prototype testing"],
      schoolSubjects: ["Physics", "Mathematics", "Computer science"],
      pros: ["A fast-growing niche with little competition in Tajikistan yet", "Combines mechanical design, electronics and programming"],
      cons: ["Requires broad technical knowledge across several fields at once", "Few factories in the country currently use robotic lines"],
      workplaces: [
        "Manufacturers introducing automation",
        "University research and teaching labs",
        "Startups building their own devices",
        "Foreign companies — as a remote prototyping consultant"
      ],
    },
    "automation-engineer": {
      name: "Automation Engineer",
      tagline: "Automates industrial processes",
      summary: "Builds systems that run production without constant human involvement — from sensors to industrial controllers.",
      whatTheyDo: [
        "Designs the automation scheme for a specific part of production",
        "Configures industrial controllers (PLCs) and sensors",
        "Tests an automated line before it goes live",
        "Fixes faults and refines how the automation logic behaves"
      ],
      skills: ["Electrical engineering and industrial electronics", "Controller programming (e.g. ladder logic)", "Reading technical schematics", "Attention to detail and process sequencing", "Hands-on work with equipment on-site"],
      schoolSubjects: ["Physics", "Computer science", "Mathematics"],
      pros: ["Growing demand as factories modernize", "Combines engineering knowledge with programming"],
      cons: ["Mostly plant-floor work rather than an office job", "Line downtime from a fault falls directly on the engineer"],
      workplaces: [
        "Industrial plants (food, textile, metallurgical)",
        "Systems integration and automation companies",
        "Power-sector enterprises",
        "Industrial equipment service centers"
      ],
    },
    "radio-engineer": {
      name: "Radio Engineer",
      tagline: "Designs radio equipment and communication systems",
      summary: "Develops and maintains devices and systems that transmit signal over radio waves.",
      whatTheyDo: [
        "Designs transmitting and receiving radio equipment",
        "Configures and calibrates gear using measuring instruments",
        "Tests signal quality and range",
        "Fixes technical faults in radio systems"
      ],
      skills: ["Physics and electronics", "Precise signal parameter calculations", "Working with oscilloscopes and other instruments", "Technical, methodical thinking", "Patience for long equipment debugging sessions"],
      schoolSubjects: ["Physics", "Mathematics"],
      pros: ["In demand across communications, broadcasting and defense", "Hands-on work with real hardware, not just code"],
      cons: ["A narrow specialty limits the number of employers in the country", "Requires constantly updating knowledge of new equipment"],
      workplaces: [
        "TV and radio broadcasting companies",
        "Communications operators and internet providers",
        "Defense and government agencies",
        "Companies servicing satellite and radio equipment"
      ],
    },
    "architect": {
      name: "Architect",
      tagline: "Designs buildings and urban spaces",
      summary: "Designs buildings and spaces so that they are beautiful, functional and safe.",
      whatTheyDo: [
        "Discusses the building's concept, budget and timeline with the client",
        "Develops sketches, 3D visualizations and working drawings",
        "Chooses materials and engineering solutions together with structural engineers",
        "Checks the project against building codes and supervises construction on site"
      ],
      skills: ["Spatial and compositional thinking", "Drafting and CAD/Revit software", "Visual taste and a sense of proportion", "Knowledge of building codes", "Ability to defend an idea to a client"],
      schoolSubjects: ["Mathematics", "Drafting / art", "Physics"],
      pros: ["A finished building stays in the city for decades", "Combines creativity with precise calculation", "Can specialize in housing, interiors or urban planning"],
      cons: ["Years pass between a sketch and a finished building", "The architect carries responsibility for the building's safety"],
      workplaces: [
        "Architecture and design studios",
        "City or district chief architect's offices",
        "Construction companies (in-house project architect)",
        "Private practice or freelance work for individual clients",
        "Institutes drafting city master plans"
      ],
    },
    "civil-engineer": {
      name: "Civil Engineer",
      tagline: "Builds buildings, roads and structures",
      summary: "Designs and oversees the construction of residential, industrial and public buildings.",
      whatTheyDo: [
        "Calculates foundations, frames and load-bearing structures",
        "Draws up schedules and cost estimates for construction work",
        "Oversees the quality of masonry, concrete and assembly work on site",
        "Signs off on finished structures and prepares as-built documentation"
      ],
      skills: ["Engineering calculations of strength and loads", "Reading design and working drawings", "Knowledge of building codes and site safety", "Managing a crew on site", "Working with construction equipment and materials"],
      schoolSubjects: ["Mathematics", "Physics", "Drafting"],
      pros: ["Construction never stops — there's work in any city", "Fast track to site foreman or section manager"],
      cons: ["Constant time on site in heat, cold and dust", "Delayed material deliveries and missed deadlines are routine"],
      workplaces: [
        "Construction and contracting companies",
        "Capital construction departments under local government",
        "Design-and-build institutes",
        "Residential developers",
        "Donor-funded road and bridge infrastructure projects"
      ],
    },
    "power-engineer": {
      name: "Power Engineer",
      tagline: "Keeps electricity generated and delivered",
      summary: "Designs and maintains power plants, grids and equipment that supply electricity to cities and factories.",
      whatTheyDo: [
        "Monitors the operation of generators, transformers and substations",
        "Carries out scheduled inspections and repairs of power equipment",
        "Responds on site to fix emergency power outages",
        "Keeps records of load and energy consumption"
      ],
      skills: ["Electrical engineering and knowledge of grid schematics", "Working with high-voltage equipment", "Fast response in emergencies", "Strict adherence to safety procedures", "Shift-based duty rotations"],
      schoolSubjects: ["Physics", "Mathematics"],
      pros: ["Power is always needed — the work doesn't depend on economic cycles", "In demand at hydropower plants, thermal plants and grids nationwide"],
      cons: ["Working with high voltage carries real physical risk", "Night shifts and emergency call-outs"],
      workplaces: [
        "Barqi Tojik and its regional divisions",
        "Hydro and thermal power plants (e.g. Nurek, Rogun, Sangtuda)",
        "City and district power distribution networks",
        "Energy departments of industrial plants",
        "Power engineering design institutes"
      ],
    },
    "mechanical-engineer": {
      name: "Mechanical Engineer",
      tagline: "Designs machines, equipment and mechanisms",
      summary: "Develops and improves machines, equipment and production lines.",
      whatTheyDo: [
        "Designs machine parts and assemblies in CAD (SolidWorks, Compass)",
        "Calculates strength and selects materials for parts",
        "Sets up and commissions machines and production lines",
        "Prepares technical documentation for a product"
      ],
      skills: ["Drafting and 3D modeling (CAD/CAM)", "Strength of materials and physics", "Working with CNC machines", "Diagnosing and repairing equipment", "Attention to tolerances and fits"],
      schoolSubjects: ["Mathematics", "Physics", "Drafting"],
      pros: ["In demand at any factory or production plant", "Can move between drafting and the shop floor"],
      cons: ["Often requires being on the shop floor, not just in an office", "A calculation error can halt production"],
      workplaces: [
        "Machine-building and machine-tool plants",
        "Textile and food-processing plant maintenance shops",
        "Industrial repair and maintenance services",
        "Design bureaus",
        "Importers and service centers for industrial equipment"
      ],
    },
    "oil-gas-engineer": {
      name: "Oil & Gas Engineer",
      tagline: "Extracts and transports oil and gas",
      summary: "Works on the exploration, extraction and transport of oil and gas.",
      whatTheyDo: [
        "Takes part in geological exploration and reservoir assessment",
        "Manages the drilling and oil/gas extraction process",
        "Designs and maintains pipelines and storage facilities",
        "Oversees safety compliance on the field site"
      ],
      skills: ["Engineering thinking and reservoir physics", "Working with drilling and field equipment", "Willingness to work rotational shifts", "Stress tolerance in field conditions", "English for international equipment and standards"],
      schoolSubjects: ["Physics", "Chemistry", "Mathematics"],
      pros: ["One of the highest-paid engineering specialties", "In demand at international oil and gas companies"],
      cons: ["Rotational shift work away from family", "Physically demanding and sometimes hazardous conditions"],
      workplaces: [
        "State oil and gas enterprises of Tajikistan",
        "International oilfield service companies when working abroad",
        "Drilling and geological exploration crews",
        "Fuel depots and storage terminals",
        "Oil and gas industry design institutes"
      ],
    },
    "textile-engineer": {
      name: "Textile & Garment Production Engineer",
      tagline: "Runs clothing and fabric manufacturing",
      summary: "Develops garment production technology and organizes the work of a textile manufacturing operation.",
      whatTheyDo: [
        "Develops technological process cards for garment production",
        "Selects fabrics and trim, calculates material usage",
        "Sets up cutting and sewing equipment on the shop floor",
        "Checks the quality of finished goods before shipment"
      ],
      skills: ["Knowledge of fabrics and material properties", "Pattern construction and grading", "Working with industrial sewing equipment", "Organizing the production flow", "Precision and attention to detail"],
      schoolSubjects: ["Mathematics", "Drafting / technology"],
      pros: ["Light industry is one of Tajikistan's key export sectors", "Can combine engineering work with fashion design"],
      cons: ["Repetitive work at the mass-production stage", "Responsibility for missing a large order's deadline"],
      workplaces: [
        "Cotton and garment combines, including free economic zones",
        "Export-oriented sewing workshops",
        "Textile mills producing fabric and yarn",
        "An own sewing workshop or atelier",
        "Quality control roles for client brands"
      ],
    },
    "mining-engineer": {
      name: "Mining Engineer",
      tagline: "Extracts mineral resources from the ground",
      summary: "Organizes the safe and efficient extraction of mineral resources — through open-pit or underground mining.",
      whatTheyDo: [
        "Draws up mine planning and extraction schedules",
        "Oversees shoring and ventilation of underground workings",
        "Directs the operation of drilling and extraction machinery",
        "Assesses ore reserves and mining efficiency"
      ],
      skills: ["Knowledge of mining engineering and geomechanics", "Working with mining machinery and equipment", "Strict safety oversight", "Physical stamina", "Decision-making in emergency situations"],
      schoolSubjects: ["Physics", "Mathematics", "Chemistry"],
      pros: ["Solid pay in the mining industry", "In demand at Tajikistan's gold and coal enterprises"],
      cons: ["Underground or open-pit work — harsh and hazardous conditions", "Mines are often far from major cities"],
      workplaces: [
        "Gold, coal and antimony mining enterprises",
        "Zarafshon, TALCO and affiliated mines",
        "Mining design institutes",
        "Open-pit quarries and coal mines",
        "State mining safety oversight bodies"
      ],
    },
    "geodesist-cartographer": {
      name: "Geodesist / Cartographer",
      tagline: "Surveys land and produces maps",
      summary: "Takes precise measurements of the Earth's surface and produces maps and plans for construction and land management.",
      whatTheyDo: [
        "Carries out topographic and geodetic surveys of the land",
        "Processes data from GPS/GLONASS receivers and total stations",
        "Compiles maps, site plans and digital terrain models",
        "Marks land parcel and object boundaries on the ground"
      ],
      skills: ["Working with surveying equipment and GPS", "GIS software (AutoCAD Civil 3D, QGIS)", "Precision in measurement and calculation", "Physical stamina for fieldwork", "Knowledge of land law"],
      schoolSubjects: ["Mathematics", "Geography", "Drafting"],
      pros: ["In demand in construction, land cadastre and land management", "Combines field trips with desk-based data processing"],
      cons: ["Fieldwork in any weather and in hard-to-reach terrain", "A measurement error can trigger a boundary dispute"],
      workplaces: [
        "State land and cadastre agency",
        "Design-and-survey organizations",
        "Construction companies running survey support",
        "Private surveying and cadastre firms",
        "Mapping and topographic enterprises"
      ],
    },
    "quality-control-engineer": {
      name: "Metrology & Standardization Engineer",
      tagline: "Ensures measurement accuracy and product quality",
      summary: "Checks that a company's measuring instruments and products meet quality standards.",
      whatTheyDo: [
        "Calibrates and verifies the plant's measuring instruments",
        "Develops internal quality-control standards and procedures",
        "Runs tests and takes product samples",
        "Prepares test reports and certification documents"
      ],
      skills: ["Metrology and knowledge of GOST and ISO standards", "Working with measuring and testing equipment", "Analytical thinking", "Meticulous record-keeping", "Ability to hold the line on quality requirements with production staff"],
      schoolSubjects: ["Mathematics", "Physics"],
      pros: ["In demand at any manufacturing enterprise", "Stable, systematic work with clear procedures"],
      cons: ["A lot of regulatory paperwork and bureaucracy", "Friction with the shop floor when products fail inspection"],
      workplaces: [
        "State agency for standardization, metrology and certification",
        "Quality control departments at factories",
        "Testing laboratories",
        "Export-oriented enterprises certifying products for foreign markets",
        "Product certification bodies"
      ],
    },
    "printing-technologist": {
      name: "Printing Technologist",
      tagline: "Runs the printing of books, packaging and advertising materials",
      summary: "Organizes the printing process, from preparing the layout to the finished, quality-checked print product.",
      whatTheyDo: [
        "Prepares layouts and color separations for printing (prepress)",
        "Sets up offset or digital printing presses",
        "Checks color registration and print quality",
        "Selects paper, board and post-print finishing methods"
      ],
      skills: ["Understanding of color models (CMYK) and prepress", "Working with printing equipment", "Attention to detail and color perception", "Basic design and layout skills", "Keeping a print run on schedule"],
      schoolSubjects: ["Computer science", "Chemistry", "Art"],
      pros: ["Steady demand for printing books, textbooks, packaging and advertising", "Tangible result — a finished print run"],
      cons: ["Missing a print-run deadline is highly stressful", "Work is tied to expensive equipment"],
      workplaces: [
        "Printing houses and textbook publishers",
        "Advertising and printing combines",
        "Packaging plants",
        "State publishing houses",
        "An own print shop or digital printing business"
      ],
    },
    "food-technologist": {
      name: "Food Technologist",
      tagline: "Develops and oversees food production",
      summary: "Develops recipes and production technology for food products and ensures their quality and safety.",
      whatTheyDo: [
        "Develops recipes and technological process cards for a product",
        "Checks incoming raw materials at quality control",
        "Monitors sanitary compliance at every stage of production",
        "Runs taste tests and adjusts recipes"
      ],
      skills: ["Food chemistry and microbiology", "Knowledge of sanitary standards and HACCP", "Sensory evaluation of taste, smell and texture", "Attention to detail", "Responsibility for product safety"],
      schoolSubjects: ["Chemistry", "Biology"],
      pros: ["Food production always exists — from canneries to dairies", "Can develop original recipes for new products"],
      cons: ["High responsibility — a mistake can make people sick", "Strict, frequently inspected sanitary requirements"],
      workplaces: [
        "Canning and fruit/vegetable processing plants",
        "Dairy and meat processing plants",
        "Bakeries and confectionery factories",
        "Sanitary-epidemiological service",
        "Food startups and private workshops"
      ],
    },
    "chemical-engineer": {
      name: "Chemical Process Engineer",
      tagline: "Runs industrial chemical production",
      summary: "Organizes and oversees the production processes for chemical substances and materials at a plant.",
      whatTheyDo: [
        "Runs the technological process for producing a chemical substance",
        "Sets up reactors and other industrial equipment",
        "Monitors concentration, temperature and pressure during the process",
        "Checks raw materials and finished product against specifications"
      ],
      skills: ["Chemical technology and physical chemistry", "Working with industrial reactors and process control instruments", "Strict safety discipline when handling reagents", "Analytical thinking", "Knowledge of occupational safety in chemical production"],
      schoolSubjects: ["Chemistry", "Mathematics", "Physics"],
      pros: ["In demand at chemical plants and fertilizer production", "Practical application of chemistry with a real end product"],
      cons: ["Working with hazardous and toxic substances", "A plant accident can have serious consequences"],
      workplaces: [
        "Chemical plants, including mineral fertilizer production",
        "Chemical shops of the aluminum industry",
        "Pharmaceutical manufacturing",
        "Petrochemical enterprises",
        "Chemical product quality-control laboratories"
      ],
    },
    "utilities-engineer": {
      name: "Heating & Water Systems Engineer",
      tagline: "Keeps buildings heated, watered and ventilated",
      summary: "Designs and maintains heating, ventilation, water supply and drainage systems for buildings and cities.",
      whatTheyDo: [
        "Designs heating, ventilation and water-supply systems for buildings",
        "Maintains heating substations, pump stations and boiler houses",
        "Responds to burst pipes and network emergencies",
        "Prepares a city's utility networks for the heating season"
      ],
      skills: ["Heat engineering and hydraulics", "Reading engineering schematics and design documentation", "Hands-on work with pump and boiler equipment", "Fast response to emergencies", "Working in confined and underground spaces"],
      schoolSubjects: ["Physics", "Mathematics"],
      pros: ["A critical sector — a city can't function without heat and water", "Stable work in any city or town"],
      cons: ["Emergencies must be fixed urgently, often at night or in freezing cold", "Physical work in trenches and basements"],
      workplaces: [
        "Municipal water utilities and district heating networks",
        "Housing and utility management companies",
        "Boiler houses and thermal power plants",
        "Construction companies installing building utility systems",
        "Heating and water-supply design organizations"
      ],
    },
    "pharmaceutical-technologist": {
      name: "Pharmaceutical Production Technologist",
      tagline: "Manufactures medicine at a plant, not a pharmacy counter",
      summary: "Runs the industrial production of medicines, vitamins and enzymes — from precise formulation to quality control of every batch.",
      whatTheyDo: [
        "Sets up and monitors the technological process of drug manufacturing",
        "Oversees dosage accuracy and compliance with the formulation",
        "Checks the quality of raw materials and finished products in the lab",
        "Implements safety and cleanliness standards (GMP) on the production line"
      ],
      skills: ["A strong grounding in chemistry and pharmaceutical technology", "Precision and discipline — a dosage error is dangerous for patients", "Understanding of industrial equipment and automation", "Analytical thinking for quality control", "Responsibility and attention to standards"],
      schoolSubjects: ["Chemistry", "Biology"],
      pros: ["A growing sector as Tajikistan builds up its own drug manufacturing", "Stable industrial work with a clear public benefit"],
      cons: ["Strict cleanliness and discipline requirements on the production floor", "Still fewer jobs than pharmacy-counter work"],
      workplaces: [
        "Pharmaceutical plants and production lines",
        "Drug quality-control laboratories",
        "Pharmaceutical research-and-production enterprises",
        "Pharmaceutical technology colleges and teaching production lines"
      ],
    },
    "metallurgical-engineer": {
      name: "Metallurgical Engineer",
      tagline: "Runs metal production and processing",
      summary: "Works on producing and processing metals — from smelting ore to finished metal products.",
      whatTheyDo: [
        "Oversees the metal smelting and processing process on the shop floor",
        "Sets up and maintains metallurgical equipment such as furnaces and rolling mills",
        "Checks the chemical composition and properties of alloys",
        "Introduces new processing technologies to reduce defects"
      ],
      skills: ["Metallurgy and physics of metals", "Working with smelting and rolling equipment", "Knowledge of hot-shop safety procedures", "Analytical thinking for alloy composition control", "Physical stamina"],
      schoolSubjects: ["Chemistry", "Physics", "Mathematics"],
      pros: ["A key role at the country's largest industrial enterprise", "Solid pay in heavy industry"],
      cons: ["Working in hot shops with high temperatures and noise", "Physically demanding and potentially hazardous conditions"],
      workplaces: [
        "TALCO and affiliated plants",
        "Metal-processing and rolling mills",
        "Foundries at machine-building enterprises",
        "Metal product quality-control laboratories",
        "Scrap metal processing enterprises"
      ],
    },
    "biologist": {
      name: "Biologist",
      tagline: "Studies living organisms and nature",
      summary: "Studies living organisms, from cells and plants to animals and ecosystems.",
      whatTheyDo: [
        "Collects and analyzes samples of plants, animals or cells",
        "Conducts field observations and laboratory experiments",
        "Studies the structure and behavior of living organisms under a microscope",
        "Writes scientific reports and papers on research findings"
      ],
      skills: ["Curiosity and observation", "Microscopy and lab skills", "Statistical data analysis", "Patience for long-term observation", "English for scientific literature"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Interesting research work at the intersection of nature and science", "Can move into ecology, medicine or teaching"],
      cons: ["Low pay in state science", "A lot of painstaking, repetitive lab work"],
      workplaces: [
        "Academy of Sciences institutes (botany, zoology)",
        "Nature reserves and national parks",
        "Sanitary-epidemiological laboratories",
        "Schools and universities (teaching biology)",
        "International conservation and environmental projects"
      ],
    },
    "entomologist": {
      name: "Entomologist / Plant Protection Specialist",
      tagline: "Studies insects and protects crops from pests",
      summary: "Studies insects and other pests, forecasts their outbreaks, and develops ways to protect crops without needlessly harming the ecosystem.",
      whatTheyDo: [
        "Identifies pest insect species and assesses their numbers in the field",
        "Forecasts pest outbreaks based on the season and weather conditions",
        "Selects biological and chemical methods of plant protection",
        "Runs quarantine controls to keep new pests out of the country"
      ],
      skills: ["Knowledge of entomology and insect biology", "Observation and microscope skills", "Analytical thinking for outbreak forecasting", "Willingness for fieldwork across different seasons", "Care when handling chemical protection agents"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["A narrow but consistently needed specialization — without it, farms lose their harvest", "Combines lab science with a real benefit for agriculture"],
      cons: ["Work is seasonal and weather-dependent", "A small number of research and expert positions"],
      workplaces: [
        "Plant protection and quarantine stations",
        "Agricultural research institutes",
        "Farms and agroholdings (consulting)",
        "The Ministry of Agriculture's quarantine service"
      ],
    },
    "chemist": {
      name: "Chemist",
      tagline: "Studies substances and their reactions",
      summary: "Studies the composition and properties of substances, develops new materials, or controls product quality.",
      whatTheyDo: [
        "Synthesizes and analyzes chemical substances in the lab",
        "Checks the composition and purity of raw materials and finished products",
        "Develops new material or substance formulations",
        "Keeps experiment records and follows safety procedures"
      ],
      skills: ["Precision and care in the lab", "Working with lab equipment and reagents", "Logical and analytical thinking", "Knowledge of chemical safety procedures", "Patience for repeated experiments"],
      schoolSubjects: ["Chemistry", "Mathematics"],
      pros: ["In demand in industry, medicine and quality control", "Interesting hands-on experimental work"],
      cons: ["Working with hazardous and toxic substances", "A lot of theory and precise calculation to master"],
      workplaces: [
        "Chemical and pharmaceutical laboratories",
        "Fertilizer and building-material plants",
        "Sanitary-epidemiological service (sample analysis)",
        "Academy of Sciences research institutes",
        "Quality control at food and textile enterprises"
      ],
    },
    "physicist": {
      name: "Physicist",
      tagline: "Studies the laws of nature and the technology built on them",
      summary: "Studies physical phenomena — from elementary particles to energy — and applies that knowledge to technology.",
      whatTheyDo: [
        "Performs calculations and physical experiments",
        "Develops and tests mathematical models of phenomena",
        "Works with measuring and laboratory equipment",
        "Publishes research findings in scientific journals"
      ],
      skills: ["Mathematical and abstract thinking", "Logic and analysis", "Working with measuring equipment", "Patience for complex, long-term problems", "English for scientific literature"],
      schoolSubjects: ["Physics", "Mathematics"],
      pros: ["A deep understanding of how the world works", "Knowledge applies to energy, IT and engineering"],
      cons: ["Requires serious mathematical training", "An academic career is long and not always well-paid"],
      workplaces: [
        "Academy of Sciences institutes of physics and technology",
        "Universities (teaching and research)",
        "Metrology and testing laboratories",
        "Energy and telecom companies (engineering calculations)",
        "International scientific projects and grants"
      ],
    },
    "geologist": {
      name: "Geologist",
      tagline: "Studies the Earth's structure and finds natural resources",
      summary: "Studies rock formations and the Earth's crust, and looks for deposits of minerals, water and oil.",
      whatTheyDo: [
        "Conducts field studies of rocks and terrain",
        "Collects and analyzes rock and mineral samples",
        "Compiles geological maps of an area",
        "Assesses reserves and the potential of deposits"
      ],
      skills: ["Observation and reading terrain", "Physical stamina for expeditions", "Analytical thinking", "Working with geological instruments and maps", "Willingness to take long field trips"],
      schoolSubjects: ["Geography", "Physics", "Chemistry"],
      pros: ["Work involves travel and expeditions across the country", "In demand in the mining and oil-and-gas industries"],
      cons: ["Long trips away from home", "Physically demanding field conditions"],
      workplaces: [
        "Geological survey expeditions and crews",
        "Mining and oil-and-gas companies",
        "Academy of Sciences Institute of Geology",
        "State subsoil-use agencies",
        "Design institutes searching for water and mineral deposits"
      ],
    },
    "ecologist": {
      name: "Environmental Scientist",
      tagline: "Studies and protects the environment",
      summary: "Assesses the state of the environment and develops measures to protect nature from pollution and damage.",
      whatTheyDo: [
        "Assesses the state of water, air and soil at sites",
        "Prepares environmental impact assessments for construction and industrial projects",
        "Develops measures to reduce environmental harm",
        "Monitors enterprises' compliance with environmental regulations"
      ],
      skills: ["Analytical thinking", "Knowledge of biology, chemistry and environmental law", "Attention to detail when sampling", "Working with measurement data", "Defending findings in front of business interests"],
      schoolSubjects: ["Biology", "Chemistry", "Geography"],
      pros: ["Work with growing social importance amid climate change", "Can work in government, business or science"],
      cons: ["Pay isn't always high outside international projects", "Sometimes has to deliver unwelcome news about a project's harm"],
      workplaces: [
        "The state environmental protection committee",
        "International conservation and climate projects",
        "Environmental departments at large industrial enterprises",
        "Environmental research institutes",
        "Environmental assessment consulting firms"
      ],
    },
    "biotechnologist": {
      name: "Biotechnologist",
      tagline: "Uses living organisms to create products",
      summary: "Uses cells, bacteria and enzymes to create medicines, food products and agricultural solutions.",
      whatTheyDo: [
        "Runs experiments with living cells, bacteria and enzymes",
        "Develops biotechnological production processes",
        "Analyzes experiment results and adjusts methodology",
        "Works on improving crops or medicines"
      ],
      skills: ["Biology and biochemistry", "Analytical thinking", "Lab and microbiology skills", "Patience for long-running experiments", "Attention to sterility and detail"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["One of the most promising scientific fields worldwide", "Applications in medicine, agriculture and food industry"],
      cons: ["Experiment results don't come quickly, sometimes taking months", "Requires deep knowledge of biology and chemistry"],
      workplaces: [
        "Pharmaceutical and biotech laboratories",
        "Agricultural research institutes",
        "Food enterprises (fermentation, starter cultures)",
        "University laboratories",
        "International plant breeding projects"
      ],
    },
    "geographer": {
      name: "Geographer / GIS Specialist",
      tagline: "Studies territories and works with data maps",
      summary: "Studies territories, climate and resources, and builds and analyzes digital geographic maps (GIS).",
      whatTheyDo: [
        "Collects and analyzes geographic and statistical data",
        "Builds and processes digital maps in geographic information systems (GIS)",
        "Compiles thematic maps for territorial planning",
        "Prepares analytical reports for government and private clients"
      ],
      skills: ["Spatial thinking", "Working with GIS software (QGIS, ArcGIS)", "Analytical thinking", "Basic programming for data analysis", "Attention to detail"],
      schoolSubjects: ["Geography", "Computer science", "Mathematics"],
      pros: ["Applications at the intersection of geography and IT", "In demand in territorial planning, environmental work and business"],
      cons: ["Requires both fieldwork and computer work", "Not always a well-understood profession outside the GIS field"],
      workplaces: [
        "State land and cartography agency",
        "Territorial planning design institutes",
        "Telecom and logistics companies (coverage and route analysis)",
        "International mapping and monitoring projects",
        "Geography research institutes"
      ],
    },
    "doctor": {
      name: "Doctor",
      tagline: "Diagnoses and treats illness",
      summary: "Examines patients, makes a diagnosis and prescribes treatment — from a common cold to serious illness.",
      whatTheyDo: [
        "Questions and examines the patient, takes a medical history",
        "Orders lab tests, ultrasounds and other examinations",
        "Makes a diagnosis and prescribes treatment",
        "Monitors the patient's condition and adjusts therapy"
      ],
      skills: ["Attention and observation", "Composure under stress in critical situations", "Empathy and communicating with patients", "A strong memory for a large body of medical knowledge", "Willingness to keep learning for life"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["A respected and always in-demand profession", "Can specialize in a narrow field after basic training"],
      cons: ["Long training and continuous practice throughout the career", "High responsibility and emotional load"],
      workplaces: [
        "Public and private hospitals",
        "Local outpatient clinics",
        "Republican medical centers",
        "International health organizations (WHO, Red Cross)",
        "Private practice after gaining experience"
      ],
    },
    "dentist": {
      name: "Dentist",
      tagline: "Treats teeth and the mouth",
      summary: "Diagnoses and treats conditions of the teeth, gums and mouth, and works on preventing them.",
      whatTheyDo: [
        "Examines the mouth and takes dental X-rays",
        "Treats cavities and other dental diseases",
        "Performs minor surgical procedures (extractions, implants)",
        "Advises on dental care and prevention"
      ],
      skills: ["Fine motor skills and precise hand movement", "Attention to detail", "Calm and patience while working with a patient", "Ability to put a patient at ease", "Physical stamina for long hours standing"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Steady demand in any city or town", "Results are visible immediately, unlike many other medical specialties"],
      cons: ["Long and expensive training", "Requires high physical precision and concentration"],
      workplaces: [
        "Public and private dental clinics",
        "A private practice after gaining experience",
        "Dental departments of hospitals and clinics",
        "Dental material manufacturers (consulting)",
        "University dental clinics"
      ],
    },
    "pharmacist": {
      name: "Pharmacist",
      tagline: "Knows medicines and how to use them",
      summary: "Knows the composition, effects and correct use of medicines — works at a pharmacy or in drug manufacturing.",
      whatTheyDo: [
        "Advises pharmacy customers on choosing and using medicines",
        "Checks drug interactions and prescribed dosages",
        "Monitors storage conditions and expiry dates of medicines",
        "May take part in developing or manufacturing medicines"
      ],
      skills: ["Attention to detail", "A strong memory for drug compositions and interactions", "Responsibility for a client's health", "Chemistry and biology literacy", "Polite, clear communication with people"],
      schoolSubjects: ["Chemistry", "Biology"],
      pros: ["Steady demand in any town", "Can work either in a pharmacy chain or in pharmaceutical manufacturing"],
      cons: ["High responsibility — a dosage error can harm health", "A lot of theory and constant updates on new drugs"],
      workplaces: [
        "Pharmacies and pharmacy chains",
        "Pharmaceutical warehouses and distributors",
        "Pharmaceutical manufacturing plants",
        "Hospital pharmacies",
        "The medicine quality control agency"
      ],
    },
    "paramedic": {
      name: "Paramedic",
      tagline: "Gives first and emergency aid where there is no doctor",
      summary: "A mid-level medical role between a nurse and a doctor: makes an initial diagnosis independently, gives emergency care, and works where the nearest hospital is far away.",
      whatTheyDo: [
        "Gives first and emergency aid for injuries, poisoning and sudden flare-ups of illness",
        "Works on ambulance call-outs, sometimes without a doctor on the crew",
        "Runs the only clinic in a rural feldsher-midwife post (FAP), where no other medic is present",
        "Decides what can be treated on the spot and who needs an urgent hospital transfer"
      ],
      skills: ["Fast, accurate decision-making", "Broad basic knowledge across several fields of medicine at once", "Composure under pressure in emergencies", "Independence — there is often no doctor nearby to ask", "Physical stamina"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["A shorter path into medicine than a university degree — taught at college", "Especially in demand in remote areas, where they are often the only medic around", "Varied practice — from trauma to emergency childbirth"],
      cons: ["Takes on decisions a doctor would normally make, without a doctor's backup", "Irregular hours and call-outs at any time", "Remote FAPs often lack equipment and medicine"],
      workplaces: [
        "Ambulance stations and crews",
        "Feldsher-midwife posts (FAP) in villages",
        "Hospital admissions departments",
        "First-aid stations at workplaces and schools"
      ],
    },
    "social-worker": {
      name: "Social Worker",
      tagline: "Helps people in hardship get the support they need",
      summary: "Works with people who struggle to cope alone — the seriously ill, the elderly, families in crisis — and connects them with the medical, psychological and government support they need.",
      whatTheyDo: [
        "Identifies families and individuals who need social or medical support",
        "Helps arrange benefits, allowances and disability status",
        "Supports patients with severe or chronic illness alongside doctors and psychologists",
        "Works with elderly people, orphans and people with disabilities at home or in institutions"
      ],
      skills: ["Empathy and the ability to build trust", "Knowledge of social legislation and benefits", "Patience with difficult cases", "Communication skills across age groups", "Organizational skills for paperwork"],
      schoolSubjects: ["Social studies", "Biology"],
      pros: ["Work with a real, tangible benefit for a specific person", "A growing field as social services expand in the country", "Variety — can specialize in children, the elderly or people with disabilities"],
      cons: ["Emotionally heavy work with other people's difficult stories", "Salaries in state social services are still low"],
      workplaces: [
        "Social protection centres",
        "Hospitals and medical-social centres",
        "Care homes and residential institutions",
        "International and local NGOs working with vulnerable groups"
      ],
    },
    "medical-equipment-technician": {
      name: "Medical Equipment Technician",
      tagline: "Sets up and repairs the devices diagnosis depends on",
      summary: "Installs, calibrates and repairs medical equipment — from ultrasound and X-ray machines to intensive-care monitors — so doctors can rely on it.",
      whatTheyDo: [
        "Installs and configures new medical equipment in hospitals and clinics",
        "Carries out scheduled maintenance and calibration of devices",
        "Diagnoses and fixes equipment faults",
        "Trains medical staff to use equipment correctly and safely"
      ],
      skills: ["Knowledge of electronics and medical equipment fundamentals", "Precision — a faulty device means a wrong diagnosis", "Technical thinking and reading schematics", "Responsibility and attention to detail", "Willingness to keep learning new equipment models"],
      schoolSubjects: ["Physics", "Biology", "Computer science"],
      pros: ["A rare, narrow specialization with less competition than doctors face", "Works at the intersection of technology and medicine, without direct patient contact", "Demand grows as hospitals update their equipment"],
      cons: ["Needs constant learning as equipment models change quickly", "Smaller towns don't always have enough modern equipment to use all the skills"],
      workplaces: [
        "Hospitals and clinics (engineering/technical services)",
        "Service centres of medical equipment suppliers",
        "Private diagnostic centres",
        "Medical equipment manufacturers and distributors"
      ],
    },
    "dental-therapist": {
      name: "Dental Therapist",
      tagline: "Treats teeth and gums where a university-trained dentist isn't available",
      summary: "Provides dental treatment and oral care after a college programme — working alone where there's no dentist, or alongside one in a clinic.",
      whatTheyDo: [
        "Treats cavities, pulpitis and other common dental diseases",
        "Performs professional cleaning and gum disease prevention",
        "Extracts simple teeth and gives emergency dental care",
        "Refers patients to a specialist dentist for complex cases"
      ],
      skills: ["Fine motor skills and precision", "Knowledge of dental and jaw anatomy", "Calm manner with patients afraid of treatment", "Care and strict sterilization practice", "Readiness to work independently without a doctor nearby"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["A shorter path into dentistry than a medical university degree", "In demand in smaller towns and districts short on dentists"],
      cons: ["Fewer options for complex, expensive treatments than a dentist has", "Constant contact with patients in pain or anxious about treatment"],
      workplaces: [
        "Dental offices at district polyclinics",
        "Rural medical outposts",
        "Private dental clinics (alongside a dentist)",
        "School and student dental offices"
      ],
    },
    "pharmacy-technician": {
      name: "Pharmacy Technician",
      tagline: "Dispenses medicine and advises customers at the pharmacy counter",
      summary: "Works at a pharmacy: dispenses medicine, advises on dosage and drug interactions, and keeps medications properly stored.",
      whatTheyDo: [
        "Dispenses prescription and over-the-counter medicine",
        "Advises customers on use and alternatives for medicines",
        "Monitors expiry dates and storage conditions of medicines",
        "Keeps records and orders stock for the pharmacy"
      ],
      skills: ["Knowledge of the medicine range and drug interactions", "Attention to detail — a dispensing error is dangerous", "A friendly, clear manner with customers", "Accuracy in record-keeping", "Basic computer literacy"],
      schoolSubjects: ["Chemistry", "Biology"],
      pros: ["A shorter path into pharmacy than a university degree", "Pharmacies exist in every town and district — steady demand", "A more predictable schedule than hospital work"],
      cons: ["High responsibility when handling medicine and prescriptions", "Monotonous counter work during busy hours"],
      workplaces: [
        "State and private pharmacies",
        "Pharmacy chains and polyclinic pharmacy counters",
        "Medicine warehouses and distributors",
        "Pharmaceutical manufacturing plants"
      ],
    },
    "cosmetologist": {
      name: "Cosmetology Nurse",
      tagline: "Cares for skin and performs cosmetic procedures",
      summary: "Performs device-based and injectable skincare procedures under the supervision of a dermatologist-cosmetologist.",
      whatTheyDo: [
        "Performs facial cleansing, peels and device-based skincare procedures",
        "Assists a doctor during injectable cosmetic procedures",
        "Selects a skincare programme based on the client's skin type",
        "Keeps instruments sterile and procedures safe"
      ],
      skills: ["Knowledge of skin anatomy and physiology", "Precision and attention to detail", "An eye for aesthetics when judging results", "Communication skills — the work is built on client trust", "Compliance with sanitary standards"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Growing demand as the country's beauty industry grows", "Can combine clinic work with a private practice", "A visible result the client can see directly"],
      cons: ["Needs to keep learning new techniques and devices", "High competition in large cities"],
      workplaces: [
        "Cosmetology clinics and offices",
        "Dermatology and medical centres",
        "Beauty salons with a medical licence",
        "Private practice"
      ],
    },
    "medical-tourism-specialist": {
      name: "Medical & Health Tourism Specialist",
      tagline: "Arranges treatment and wellness trips for travellers",
      summary: "Arranges trips for treatment and recovery — selecting sanatoriums, mineral springs and clinics, and guiding the traveller through the whole programme.",
      whatTheyDo: [
        "Selects a sanatorium or treatment programme to match a traveller's request",
        "Arranges accommodation, transfers and support during treatment",
        "Advises on contraindications together with a doctor",
        "Promotes the country's wellness routes (mountain resorts, mineral springs)"
      ],
      skills: ["Basic knowledge of medicine and balneology", "Organizational skills and attention to detail", "Communication and handling client requests", "Knowledge of the region's tourism infrastructure", "Foreign languages for working with international travellers"],
      schoolSubjects: ["Biology", "Geography"],
      pros: ["Work at the intersection of medicine and tourism — still a rare, promising niche", "Tajikistan is rich in mountain resorts and mineral springs"],
      cons: ["The field is still underdeveloped — not many jobs yet", "Seasonal: demand is higher at certain times of year"],
      workplaces: [
        "Sanatoriums and resorts (Khoja Obi Garm, Garmchashma and others)",
        "Travel companies with wellness programmes",
        "The Ministry of Health and Tourism",
        "Private wellness centres"
      ],
    },
    "agronomist": {
      name: "Agronomist",
      tagline: "Grows crops and improves yields",
      summary: "Responsible for growing agricultural crops, from preparing the soil to harvesting.",
      whatTheyDo: [
        "Plans crop rotation, sowing and crop care",
        "Monitors plant health, pests and disease",
        "Selects fertilizers and plant protection products",
        "Assesses and forecasts the farm's yield"
      ],
      skills: ["Knowledge of plant biology and soil chemistry", "Observation and practical thinking", "Organizational skills for leading a field crew", "Willingness to work in the field in any weather", "Understanding of modern agricultural technology"],
      schoolSubjects: ["Biology", "Chemistry", "Geography"],
      pros: ["In demand in the country's agricultural regions", "An important role in food security and exports (cotton, fruit)"],
      cons: ["Work depends heavily on the season and weather", "Farm income, and so the result of the work, can suffer from factors beyond control"],
      workplaces: [
        "Farmer and dehkan (smallholder) farms",
        "Agroholding companies and cotton clusters",
        "The Ministry of Agriculture and its regional departments",
        "Nurseries and seed-growing farms",
        "International agricultural projects and NGOs"
      ],
    },
    "veterinarian": {
      name: "Veterinarian",
      tagline: "Treats animals and monitors their health",
      summary: "Diagnoses and treats animal illness, and ensures the safety of animal-derived products.",
      whatTheyDo: [
        "Examines and diagnoses animal illnesses",
        "Administers vaccinations, checkups and minor surgeries",
        "Checks the quality and safety of livestock products",
        "Advises pet owners and farmers on animal care"
      ],
      skills: ["Love of animals and a way of handling them", "Attention and observation", "Composure in emergencies", "Willingness for physical work, including with large livestock", "Responsibility for an animal's life"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Steady demand in both rural and urban areas", "Varied work with different kinds of animals"],
      cons: ["Work can be physically demanding and unpredictable (call-outs at any time)", "Emotionally difficult situations with sick or dying animals"],
      workplaces: [
        "State veterinary stations",
        "Private veterinary clinics (in cities)",
        "Livestock farms",
        "Border and market veterinary-sanitary inspection services",
        "Zoos and animal shelters"
      ],
    },
    "zootechnician": {
      name: "Zootechnician",
      tagline: "Handles animal breeding and husbandry",
      summary: "Organizes proper feeding, housing and breeding of livestock to improve their productivity.",
      whatTheyDo: [
        "Draws up feeding rations for different groups of animals",
        "Monitors housing conditions and livestock hygiene",
        "Works on breeding and improving livestock breeds",
        "Assesses productivity (milk yield, weight gain) and tracks herd records"
      ],
      skills: ["Knowledge of the biology and physiology of farm animals", "Organizational skills for running a farm", "Observing the herd's condition", "Willingness to work on a farm and with large livestock", "Responsibility and systematic record-keeping"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["In demand at livestock farms and agricultural enterprises", "An important role in developing agriculture and the dairy/meat industry"],
      cons: ["Work is often far from the city, in rural areas", "Physically tied to daily animal care"],
      workplaces: [
        "Livestock and poultry farms",
        "Dairy and meat farms",
        "Breeding farms and livestock breeding stations",
        "Compound feed producers (ration consulting)",
        "The Ministry of Agriculture (veterinary and zootechnical oversight)"
      ],
    },
    "irrigation-engineer": {
      name: "Irrigation & Land Reclamation Engineer",
      tagline: "Brings water to fields and protects them from drought",
      summary: "Designs and maintains irrigation and water supply systems that bring water to fields in an arid climate.",
      whatTheyDo: [
        "Designs field irrigation and drainage systems",
        "Maintains canals, pump stations and reservoirs",
        "Oversees the fair distribution of water between farms",
        "Assesses the impact of irrigation on soil condition and yield"
      ],
      skills: ["Engineering thinking and knowledge of hydraulics", "Understanding of soil science and agriculture", "Organizational skills for allocating water", "Willingness for fieldwork in a hot climate", "Working with surveying and measuring equipment"],
      schoolSubjects: ["Physics", "Mathematics", "Geography"],
      pros: ["Critically important work for Tajikistan's agriculture", "Steady demand in agricultural regions and with international donor support"],
      cons: ["A lot of fieldwork in a hot climate and at remote sites", "Responsible for supplying water to entire farming communities and mediating water disputes between them"],
      workplaces: [
        "The land reclamation and irrigation agency",
        "State canal operations departments",
        "International irrigation projects (World Bank, Asian Development Bank)",
        "Farmer water-user associations",
        "Water resources design institutes"
      ],
    },
    "soil-scientist": {
      name: "Soil Scientist / Agrochemist",
      tagline: "Studies soil so the land yields more",
      summary: "Analyzes soil composition and fertility, and selects the fertilizers and cultivation methods that raise yields without exhausting the field for the future.",
      whatTheyDo: [
        "Takes and analyzes soil samples for acidity, composition and fertility",
        "Selects fertilizer types and doses for a specific field and crop",
        "Monitors erosion, salinization and soil depletion",
        "Advises farms on crop rotation and soil treatment"
      ],
      skills: ["Knowledge of soil chemistry and biology", "Analytical thinking when working with lab data", "Attention to detail when analyzing samples", "Willingness to combine fieldwork with lab work", "Understanding of agricultural technology"],
      schoolSubjects: ["Chemistry", "Biology", "Geography"],
      pros: ["Directly affects the yield and income of an entire farm", "In demand wherever agronomists are, but with less visible competition"],
      cons: ["The result isn't visible right away — only after a season or two", "Work quality depends heavily on access to a lab and reagents"],
      workplaces: [
        "Agrochemical laboratories",
        "Farmer and smallholder farms",
        "Plant protection and agrochemical service stations",
        "Agricultural research institutes"
      ],
    },
    "landscape-architect": {
      name: "Landscape Architect",
      tagline: "Designs parks, public squares and gardens",
      summary: "Designs and creates green spaces — from a city park or square to a private garden — choosing plants, paths and features so the result is beautiful and practical.",
      whatTheyDo: [
        "Develops a planting design for a park, square or private plot",
        "Selects plants suited to the local climate, soil and seasons",
        "Plans paths, lighting, rest areas and irrigation",
        "Oversees planting and follows the project through to completion"
      ],
      skills: ["Artistic taste and spatial thinking", "Knowledge of plants and their needs", "Basic drafting and design-software skills", "Balancing aesthetics with practicality (watering, upkeep)", "Communication with clients and a gardening crew"],
      schoolSubjects: ["Biology", "Fine arts", "Geography"],
      pros: ["A creative profession with a result the whole city can see", "Growing demand as cities and private homes are landscaped", "Can start with small private commissions and grow a business"],
      cons: ["A project's result only shows years later, once the planting matures", "Depends on the planting season and the weather's mood"],
      workplaces: [
        "City landscaping and urban improvement services",
        "Design and landscape studios",
        "Plant nurseries",
        "Private commissions — gardens and private plots"
      ],
    },
    "plant-breeder": {
      name: "Plant Breeder",
      tagline: "Develops new, higher-yielding, hardier plant varieties",
      summary: "Crosses and selects plants to produce varieties with higher yields and resistance to disease and drought — work that decides what will grow in fields ten years from now.",
      whatTheyDo: [
        "Crosses plants and selects the best for yield and resilience",
        "Trials new varieties on experimental plots under different conditions",
        "Maintains the purity and quality of the seed stock",
        "Prepares the documentation to register a new variety"
      ],
      skills: ["Deep knowledge of plant genetics and physiology", "Patience — results only show after several years and generations", "Rigor and accuracy across multi-year observations", "Research-minded thinking", "Working with lab and field equipment"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Work with a long-term impact — a new variety feeds farms for decades", "Combines scientific work with practical benefit for agriculture"],
      cons: ["A very long cycle — years pass from idea to new variety", "A narrow specialization with a limited number of research positions"],
      workplaces: [
        "Agricultural and plant-breeding research institutes",
        "Seed-growing farms and nurseries",
        "Agricultural universities",
        "International plant-breeding programmes and projects"
      ],
    },
    "poultry-farmer": {
      name: "Poultry Farmer",
      tagline: "Raises chickens, ducks and other domestic birds",
      summary: "Organizes the housing, feeding and breeding of poultry at a poultry farm or farming operation — from egg incubation to selling the finished product.",
      whatTheyDo: [
        "Monitors housing conditions, temperature and ventilation in the poultry house",
        "Draws up feeding rations for different groups of birds",
        "Oversees egg incubation and the rearing of chicks",
        "Monitors the flock's health and catches disease early"
      ],
      skills: ["Knowledge of poultry physiology and disease", "Observing the flock's condition", "Organizational skills for handling large numbers of birds", "Willingness for daily care with no days off", "Understanding of modern poultry-farming technology"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Steady demand — eggs and poultry meat are needed every day", "Can start with a small operation of one's own"],
      cons: ["Daily care with no breaks for weekends or holidays", "Risk of mass flock losses during a disease outbreak"],
      workplaces: [
        "Poultry farms and operations",
        "Hatchery stations",
        "Farming operations",
        "Compound feed producers (ration consulting)"
      ],
    },
    "beekeeper": {
      name: "Beekeeper",
      tagline: "Keeps bees and produces honey",
      summary: "Tends bee colonies, monitors their health, and harvests honey, wax and other beekeeping products.",
      whatTheyDo: [
        "Tends bee colonies throughout the season",
        "Monitors bee health and prevents disease and swarming",
        "Arranges moving hives to good nectar-flow locations",
        "Harvests, processes and prepares honey and other products for sale"
      ],
      skills: ["Knowledge of bee biology and behaviour", "Calm, careful handling of hives", "Observing a colony's condition", "Willingness to travel seasonally for nectar flows", "Basic business skills for selling the product"],
      schoolSubjects: ["Biology"],
      pros: ["Can be run as a small operation of one's own", "Growing interest in natural products raises demand for honey"],
      cons: ["Strongly seasonal work, tied to when plants flower", "Risk of stings and the constant need to monitor colony health"],
      workplaces: [
        "A private apiary",
        "Beekeeping farms and cooperatives",
        "Beekeeping research stations",
        "Farmers' markets and beekeeping-product processing"
      ],
    },
    "rabbit-breeder": {
      name: "Rabbit Breeder",
      tagline: "Raises rabbits for meat and fur",
      summary: "Organizes the housing, feeding and breeding of rabbits on a farm — a compact, fast-growing branch of animal husbandry.",
      whatTheyDo: [
        "Monitors housing conditions and hygiene in the rabbitry",
        "Draws up feeding rations for different groups of rabbits",
        "Organizes mating, kindling and rearing of young rabbits",
        "Monitors the herd's health and runs disease prevention"
      ],
      skills: ["Knowledge of rabbit physiology and disease", "Observation and care in daily handling", "Organizational skills for planning matings and kindlings", "Willingness for daily animal care", "Basic farm record-keeping and planning"],
      schoolSubjects: ["Biology"],
      pros: ["Can start with a small operation and gradually expand", "A faster turnover than large livestock"],
      cons: ["A niche branch where sales aren't always steady", "Rabbits are disease-sensitive and need careful handling"],
      workplaces: [
        "Rabbit-breeding farms and operations",
        "A private smallholding",
        "Farmers' markets and processing (meat, fur)",
        "Pedigree rabbit-breeding farms"
      ],
    },
    "agribusiness-manager": {
      name: "Agribusiness Manager",
      tagline: "Runs a farm so that it turns a profit",
      summary: "Combines knowledge of agronomy or animal husbandry with management — planning a farm's work, costing it out and setting up the sale of its products.",
      whatTheyDo: [
        "Plans the farm's work: planting, purchasing, work schedules",
        "Calculates production costs and looks for ways to cut expenses",
        "Organizes the sale of harvests or livestock products",
        "Manages a crew of field workers or a farm team"
      ],
      skills: ["Knowledge of agronomy or zootechnics fundamentals", "Basic management and accounting skills", "Organizational skills for leading a crew", "Negotiating with suppliers and buyers", "Analytical thinking for calculating profitability"],
      schoolSubjects: ["Biology", "Mathematics", "Social studies"],
      pros: ["Combines hands-on agriculture with a management career", "In demand at growing agroholdings and farming cooperatives"],
      cons: ["Responsible for the whole farm's financial result, not just the harvest", "Work depends on weather and market prices just as much as an agronomist's does"],
      workplaces: [
        "Agroholding companies and large farming operations",
        "Agricultural cooperatives",
        "The Ministry of Agriculture and its projects",
        "Companies that buy and process farm produce"
      ],
    },
    "veterinary-pharmacist": {
      name: "Veterinary Pharmacist",
      tagline: "Selects and produces medicine for animals",
      summary: "Specializes in medicine for animals: selects treatments, oversees correct storage and dosage, and works at a veterinary pharmacy or a veterinary drug manufacturer.",
      whatTheyDo: [
        "Selects medicines and dosages for treating different kinds of animals",
        "Advises veterinarians and animal owners on using medication",
        "Monitors storage conditions and expiry dates of veterinary drugs",
        "Takes part in quality control of feed supplements and vaccines"
      ],
      skills: ["Knowledge of animal pharmacology and physiology", "Precision when working with dosages", "Consulting skills for working with vets and farmers", "Responsibility — a dosage error is dangerous for the animal", "Basic chemistry knowledge"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["A narrow, in-demand niche at the intersection of veterinary medicine and pharmacy", "Can work in a clinic or in drug manufacturing"],
      cons: ["Fewer openings than for a regular veterinarian", "High responsibility when handling potent drugs"],
      workplaces: [
        "Veterinary pharmacies",
        "Veterinary drug and feed-supplement manufacturers",
        "Veterinary clinics and stations",
        "Pet and livestock supply warehouses and distributors"
      ],
    },
    "dendrologist": {
      name: "Dendrologist",
      tagline: "Studies trees and shrubs and monitors their health",
      summary: "Studies the diversity of tree and shrub species, selects species for planting, and monitors the health of mature trees in parks, squares and nurseries.",
      whatTheyDo: [
        "Identifies tree and shrub species and assesses their condition",
        "Selects tree species to suit the climate and conditions of a specific site",
        "Diagnoses tree diseases and pests and prescribes treatment",
        "Advises on setting up nurseries and landscaping projects"
      ],
      skills: ["Deep knowledge of tree and shrub species", "Observation when diagnosing a tree's condition", "Analytical thinking for matching species to site conditions", "Willingness for fieldwork in any weather", "Patience — trees grow and recover slowly"],
      schoolSubjects: ["Biology", "Geography"],
      pros: ["A narrow, expert niche in demand for landscaping and at nurseries", "Work with a long-term result — planted trees grow for decades"],
      cons: ["Few specialized positions specifically in dendrology", "Results are only visible after years"],
      workplaces: [
        "Ornamental plant nurseries",
        "City landscaping services and botanical gardens",
        "Forestry operations and nature reserves",
        "Landscape and design studios (species-selection consulting)"
      ],
    },
    "economist": {
      name: "Economist",
      tagline: "Analyzes markets, trade and financial processes",
      summary: "Studies how markets, international trade and the economy at large work, and produces forecasts and recommendations.",
      whatTheyDo: [
        "Models how a change in prices, taxes or the somoni's exchange rate would affect a business or a budget",
        "Prepares analytical briefs and forecasts for company or government leadership",
        "Assesses the economic impact of new projects, laws or investments",
        "Compares Tajikistan's indicators with other countries in the region"
      ],
      skills: ["Economic analysis and modeling", "Working with macro- and microeconomic indicators", "Excel and statistical software", "English for international statistics", "Defending conclusions in front of leadership"],
      schoolSubjects: ["Mathematics", "Geography", "A foreign language"],
      pros: ["Opens the door to analytics, banking and international organizations", "Desk-based work that also suits remote consulting"],
      cons: ["Conclusions often rest on incomplete or outdated data", "Forecasts rarely come true exactly, and the economist gets the blame"],
      workplaces: [
        "Ministry of Economic Development and Trade",
        "The National Bank of Tajikistan and commercial banks' analytics departments",
        "International organizations (World Bank, ADB) and their projects in Tajikistan",
        "Research centers and universities",
        "Strategic-planning departments of large companies"
      ],
    },
    "financier": {
      name: "Financier / Banking Specialist",
      tagline: "Manages money, loans and investments",
      summary: "Works with the money of companies, banks or individuals: loans, deposits, investments and financial analysis.",
      whatTheyDo: [
        "Assesses the creditworthiness of large clients and companies before a loan is issued",
        "Builds financial models for new credit products or investment decisions",
        "Manages a portfolio of deposits and loans, balancing return against risk",
        "Prepares financial reports for a bank's board or investors"
      ],
      skills: ["Financial modeling and credit risk analysis", "Knowledge of National Bank of Tajikistan regulations", "Working with large volumes of financial data", "Responsibility when handling other people's money", "English for international reporting standards"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["One of the highest-paid sectors in the local economy", "A clear career ladder from specialist to department head"],
      cons: ["Decisions directly affect real people's and companies' money — mistakes are costly", "Constant inspections and strict oversight from the regulator"],
      workplaces: [
        "Commercial banks (Orienbank, Spitamen Bank, Eskhata, Alif Bank)",
        "Finance departments of large companies",
        "Microfinance organizations",
        "The National Bank of Tajikistan",
        "Investment and leasing companies"
      ],
    },
    "accountant": {
      name: "Accountant",
      tagline: "Tracks an organization's money and assets",
      summary: "Responsible for tracking an organization's income, expenses, taxes and assets, and prepares financial statements.",
      whatTheyDo: [
        "Records every financial transaction of the organization in accounting software each day",
        "Calculates staff salaries and withholds taxes and social contributions",
        "Files tax and statistical reports by the deadline",
        "Goes through tax authority inspections and prepares documents for them"
      ],
      skills: ["Knowledge of Tajikistan's Tax Code", "Working in 1C and other accounting software", "Extreme precision — the numbers must balance to the somoni", "Working under tight deadlines around reporting time", "Responsibility for signing off on documents"],
      schoolSubjects: ["Mathematics"],
      pros: ["Every organization, from a shop to a ministry, needs this role", "Can start at a small business and work up to handling accounts for large companies"],
      cons: ["A reporting mistake gets fined at the organization, not just noted against the accountant", "Heavy workload at the end of each quarter and year when accounts close"],
      workplaces: [
        "Accounting departments of private companies and sole proprietors",
        "Government institutions and schools",
        "Large enterprises (dedicated accounting department)",
        "Accounting and audit outsourcing firms"
      ],
    },
    "manager": {
      name: "Manager / Project Lead",
      tagline: "Organizes people and processes toward a goal",
      summary: "Plans the team's work, assigns tasks and makes sure a project or department reaches its goal on time and within budget.",
      whatTheyDo: [
        "Builds a project plan: who does what, and by when",
        "Runs stand-ups and syncs the work of different departments (sales, production, IT)",
        "Tracks the project budget and flags it to leadership if it's slipping",
        "Negotiates with contractors, suppliers and clients on the company's behalf"
      ],
      skills: ["Planning and goal-setting (e.g. SMART goals)", "Reading a project's financial indicators", "Comfortable use of task trackers (Trello, Jira)", "Negotiation and conflict resolution", "Deciding with incomplete information"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["Management experience is valued in every industry, from construction to IT", "Pay and status grow with the scale of projects entrusted to you"],
      cons: ["Accountable for a project's failure even when a team member made the mistake", "Constant context-switching between tasks and people makes it hard to focus on one thing for long"],
      workplaces: [
        "Construction and manufacturing companies",
        "IT companies and startups",
        "Banks and telecom operators",
        "International projects and NGOs",
        "Sales and growth departments of any large business"
      ],
    },
    "foreign-trade-specialist": {
      name: "Foreign Trade Specialist",
      tagline: "Organizes the trade of goods between countries",
      summary: "Organizes the export and import of goods: handles deals, documentation and logistics between countries.",
      whatTheyDo: [
        "Finds foreign suppliers or buyers for the company's goods",
        "Drafts foreign trade contracts in multiple languages and checks their legal validity",
        "Files customs declarations and certificates of origin",
        "Calculates cross-border shipping costs, factoring in duties and exchange rates"
      ],
      skills: ["Fluent foreign language for negotiation and correspondence", "Knowledge of customs law in Tajikistan and partner countries", "Attention to contract and Incoterms detail", "Negotiating price and delivery terms", "Working with currency calculations"],
      schoolSubjects: ["A foreign language", "Mathematics", "Geography"],
      pros: ["Constant work with different countries and cultures", "Companies trading with China, Russia and the Gulf states pay above average"],
      cons: ["A delay at the border or in paperwork can derail a shipment and cost the company dearly", "One specialist carries responsibility for contracts worth large sums"],
      workplaces: [
        "Export-import trading companies",
        "Cotton and fruit-processing plants that export their output",
        "Customs brokers and logistics companies",
        "Foreign trade departments of large enterprises"
      ],
    },
    "marketing-specialist": {
      name: "Marketing Specialist",
      tagline: "Promotes products and studies demand",
      summary: "Studies the market and customers in order to promote a product or service and grow sales.",
      whatTheyDo: [
        "Runs surveys and analyzes why customers pick one product over another",
        "Designs advertising campaigns for social media, TV and outdoor ads",
        "Calculates the cost of acquiring one customer and whether the ad spend pays off",
        "Works with designers and copywriters on the brand's look and voice"
      ],
      skills: ["Understanding consumer behavior", "Basic analytics (Google Analytics, social platforms)", "Copywriting and content work", "Negotiating with ad platforms and influencers", "Creativity backed by numbers"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["You can see the direct effect of your work — sales or followers going up", "In demand at big businesses and as a freelancer for small ones alike"],
      cons: ["Ad budgets are often the first thing cut when a company hits trouble", "Has to keep adapting to fast-changing platforms and algorithms"],
      workplaces: [
        "Marketing departments at banks, telecom operators and retail chains",
        "Advertising and digital agencies",
        "Freelance work or your own agency for small businesses",
        "International brands entering the Tajik market"
      ],
    },
    "banking-specialist": {
      name: "Banking Specialist",
      tagline: "Handles deposits, payments and banking products",
      summary: "Works with a bank's customers: deposits, payments, loans and other banking services.",
      whatTheyDo: [
        "Opens accounts, deposits and bank cards for customers",
        "Processes payments, transfers (including international ones) and currency exchange",
        "Verifies the authenticity of customer documents and compliance with anti-money-laundering procedures",
        "Recommends the right loan or deposit product to a customer"
      ],
      skills: ["Working with banking software and cash operations", "Knowing the bank's full product line", "Polite, patient service with a queue of customers", "Attention to detail when handling money and documents", "Tolerance for routine and stressful moments at the counter"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["A stable schedule and a clear career ladder inside the bank", "Bank branches exist in every city, so it's easy to find work"],
      cons: ["Personally liable for discrepancies in the cash drawer", "Repetitive, similar transactions for most of the day"],
      workplaces: [
        "Branches of commercial banks (Orienbank, Amonatbonk, Eskhata, Spitamen Bank)",
        "Microfinance organizations",
        "Currency exchange points and payment/settlement centers"
      ],
    },
    "auditor": {
      name: "Auditor",
      tagline: "Reviews companies' financial statements",
      summary: "Independently checks an organization's financial statements for accuracy and legal compliance.",
      whatTheyDo: [
        "Goes through a company's accounting records line by line, checking figures against source documents",
        "Checks whether a company pays its taxes correctly and follows the law",
        "Writes the formal audit opinion that investors and tax authorities will read",
        "Visits client sites to inspect warehouses, cash registers and production"
      ],
      skills: ["Deep knowledge of accounting and audit standards", "A skeptical eye for spotting a forged document or an error", "Handling large volumes of data without losing focus", "Independence — not bowing to client pressure", "Business writing and report preparation"],
      schoolSubjects: ["Mathematics"],
      pros: ["Working across industries, from retail to construction, keeps you close to the whole economy", "International audit firms open the door to certifications (ACCA, CIPA) and work abroad"],
      cons: ["A packed, travel-heavy schedule right before clients' annual reports are due", "Has to deliver unwelcome findings to a client's management"],
      workplaces: [
        "Audit and consulting firms (including \"Big Four\" offices in Dushanbe)",
        "Internal audit departments of banks and large companies",
        "The Accounts Chamber and other state oversight bodies"
      ],
    },
    "insurance-specialist": {
      name: "Insurance Specialist",
      tagline: "Helps people and businesses insure against risk",
      summary: "Assesses risk and offers clients suitable insurance products, from health to property.",
      whatTheyDo: [
        "Explains the difference between types of insurance (life, auto, property, health) to a client",
        "Assesses an individual client's risk and calculates the premium",
        "Draws up and renews insurance policies",
        "Reviews insurance claims and decides whether a payout is due"
      ],
      skills: ["Understanding the basics of insurance and actuarial calculations", "Explaining policy terms in plain language", "Working with client databases and policies", "Negotiating in conflict situations (a denied claim)", "Attention to the fine print of a contract"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["Tajikistan's insurance market is still small but growing, making it easier to stand out and build a career", "Varied work, from sales to investigating claims"],
      cons: ["Clients are often upset or angry when filing a claim, not when buying a policy", "Has to be able to deny a claim while staying tactful"],
      workplaces: [
        "Insurance companies operating in Tajikistan",
        "Bancassurance departments within banks",
        "Insurance brokerage agencies",
        "Risk-management departments of large enterprises"
      ],
    },
    "statistician": {
      name: "Statistician",
      tagline: "Collects and analyzes large-scale numerical data",
      summary: "Collects, processes and analyzes statistical data to find patterns in the economy and society.",
      whatTheyDo: [
        "Collects data for population censuses, household surveys and sector statistics",
        "Builds samples and checks data for errors and gaps",
        "Calculates averages, indices, shares and trends in indicators",
        "Prepares official statistical yearbooks and reports for government bodies"
      ],
      skills: ["Mathematics and probability theory", "Working with Excel, SPSS or similar data analysis software", "Attention to numbers and detail", "Spotting errors in large spreadsheets", "Explaining what numbers mean in plain language"],
      schoolSubjects: ["Mathematics"],
      pros: ["Stable work in government and international organizations", "In demand for censuses, social surveys and economic reviews"],
      cons: ["A lot of repetitive data checking and cleaning", "Government statistics salaries are usually lower than in business analytics"],
      workplaces: [
        "The Statistics Agency under the President of Tajikistan and its regional offices",
        "Analytics departments of banks and large companies",
        "International organizations (World Bank, UNDP, UNICEF) collecting country data",
        "Sociological and market research companies"
      ],
    },
    "logistics-manager": {
      name: "Logistics Manager",
      tagline: "Organizes the delivery and transport of goods",
      summary: "Plans and coordinates the movement of goods from warehouse to end recipient, choosing the fastest, cheapest route.",
      whatTheyDo: [
        "Plans delivery routes inside the country and across the border",
        "Tracks the movement of goods in the warehouse and in transit",
        "Negotiates with carriers, suppliers and customs brokers",
        "Resolves problems from border delays or transport breakdowns"
      ],
      skills: ["Organization and planning", "Knowledge of customs and transport procedures", "Working with warehouse management software", "Stress resilience", "Negotiation skills"],
      schoolSubjects: ["Mathematics", "Geography"],
      pros: ["In demand in trade and manufacturing as imports and exports grow", "A clear career path from dispatcher to logistics manager"],
      cons: ["Responsible for supply chain failures", "An irregular schedule when there are border delays or incidents in transit"],
      workplaces: [
        "Trading and distribution companies",
        "Manufacturing plants — warehouse and supply departments",
        "Transport companies moving goods across Tajikistan's borders",
        "Customs brokerage firms"
      ],
    },
    "real-estate-manager": {
      name: "Real Estate Manager",
      tagline: "Values and manages buildings and land",
      summary: "Values real estate and manages buildings and land plots on behalf of their owners.",
      whatTheyDo: [
        "Values the market price of apartments, houses and land plots",
        "Negotiates between buyers, sellers and tenants",
        "Prepares documents for sale and lease transactions",
        "Organizes building maintenance and resolves disputes with tenants"
      ],
      skills: ["Attention to detail", "Knowledge of the local real estate market", "Organizational skills", "Communication and negotiation", "Working with numbers and contracts"],
      schoolSubjects: ["Mathematics", "Geography"],
      pros: ["A growing housing market in Dushanbe and other cities", "Income grows with the number of deals closed"],
      cons: ["Income is unstable and drops when the property market slows", "A lot of paperwork on transactions and contracts"],
      workplaces: [
        "Real estate agencies",
        "Construction and development companies selling or leasing housing",
        "Management companies for residential and commercial complexes",
        "Independent private realtor practice"
      ],
    },
    "innovation-manager": {
      name: "Innovation Manager",
      tagline: "Brings new ideas and technology into a business",
      summary: "Looks for new ideas, technologies and products, and helps a company adopt them for growth and competitiveness.",
      whatTheyDo: [
        "Scouts technologies and ideas that can be brought into the company from other industries or countries",
        "Runs pilot projects and assesses whether they're worth scaling",
        "Calculates the economic impact of adopting an innovation",
        "Coordinates product, production and business teams around a new idea"
      ],
      skills: ["Strategic thinking", "Creativity", "Understanding of technology and markets", "Project management", "Persuading leadership and colleagues"],
      schoolSubjects: ["Mathematics", "Computer science"],
      pros: ["Works at the intersection of business and technology", "Fast career growth in growing companies"],
      cons: ["Not every pilot project makes it to full rollout", "Constantly has to convince leadership to fund unproven ideas"],
      workplaces: [
        "Innovation/development departments of large companies and banks",
        "Tech parks and business incubators",
        "Digitalization projects at government agencies",
        "Consulting firms"
      ],
    },
    "entrepreneur": {
      name: "Entrepreneur",
      tagline: "Builds and grows their own business",
      summary: "Builds a business from scratch: finds an idea, resources and customers, taking on risk to grow the venture.",
      whatTheyDo: [
        "Comes up with a business idea and tests it on real customers",
        "Registers the business and works out how much money it needs to start",
        "Hires and trains the first employees",
        "Is personally responsible for every decision — from buying stock to marketing"
      ],
      skills: ["Initiative", "Willingness to risk money and time", "Basic knowledge of finance and sales", "Ability to persuade customers and partners", "Resilience to failure"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["Complete freedom in decision-making", "Potentially high income if the business succeeds"],
      cons: ["High risk of failure, especially in the first years", "Unstable income, especially at the start"],
      workplaces: [
        "Their own shop, café or workshop",
        "Online business and marketplace trading",
        "A startup with outside investment",
        "A family or farming business"
      ],
    },
    "lawyer": {
      name: "Lawyer",
      tagline: "Knows the law and defends people's rights",
      summary: "Advises on the law, drafts contracts and defends a client's interests in court or in negotiations.",
      whatTheyDo: [
        "Studies the case file and the specific laws that apply to it",
        "Drafts and reviews lawsuits, complaints, contracts and other legal documents",
        "Represents and defends the client's interests in court or negotiations",
        "Provides legal support for deals and disputes from start to finish"
      ],
      skills: ["Knowledge of civil, criminal and other branches of law", "Ability to analyze case law and find precedents", "Public speaking and confident courtroom performance", "Precision with wording in legal documents", "Composure when handling conflict-heavy situations"],
      schoolSubjects: ["History", "Civics / Law", "Native language"],
      pros: ["Can specialize (criminal, family, corporate law) and become a niche expert", "In demand in government, business and private practice alike"],
      cons: ["High responsibility — a mistake in a document can cost a client money or freedom", "Court proceedings can drag on for months or years"],
      workplaces: [
        "Law firms and legal practices",
        "Legal departments of banks and large companies",
        "Courts and the prosecutor's office (after additional certification)",
        "Private practice",
        "Government bodies and ministries"
      ],
    },
    "diplomat": {
      name: "Diplomat / International Affairs Specialist",
      tagline: "Represents the country and conducts international negotiations",
      summary: "Represents the country's interests abroad, takes part in negotiations and follows international relations.",
      whatTheyDo: [
        "Prepares briefings and analysis on the situation in the host country",
        "Takes part in negotiations, meetings and official protocol events",
        "Maintains contacts with foreign colleagues and organizations",
        "Provides consular assistance to citizens abroad"
      ],
      skills: ["Fluency in several foreign languages", "Diplomatic tact and negotiation skills", "Knowledge of international law and protocol", "Ability to adapt quickly to a new country and culture", "Staying composed under high-pressure situations"],
      schoolSubjects: ["History", "A foreign language", "Civics"],
      pros: ["Living and working abroad, exposure to different cultures", "Influence on relations between countries, involvement in major events"],
      cons: ["Very competitive entry into the foreign ministry and postings abroad", "Frequent relocation every few years, away from family and familiar surroundings"],
      workplaces: [
        "The Ministry of Foreign Affairs",
        "Tajikistan's embassies and consulates abroad",
        "Permanent missions to international organizations (UN, OSCE)",
        "Regional organizations (CIS, SCO)"
      ],
    },
    "civil-servant": {
      name: "Civil Servant",
      tagline: "Works within government bodies",
      summary: "Manages affairs at the national or regional level: develops and implements policy, and oversees the enforcement of laws.",
      whatTheyDo: [
        "Drafts decisions, orders and regulatory documents",
        "Receives citizens and reviews their appeals",
        "Monitors the implementation of laws and government programs in their area",
        "Coordinates work between different agencies on specific issues"
      ],
      skills: ["Knowledge of legislation and how government bodies operate", "Clear, professional business writing", "Organization and meeting deadlines", "Ability to communicate with a wide range of citizens", "Accountability for the decisions made"],
      schoolSubjects: ["History", "Civics / Law"],
      pros: ["Stable job with a clear step-by-step career path", "Real ability to influence life in a region or sector"],
      cons: ["A lot of paperwork and reporting", "Entry-level salaries are lower than in private business"],
      workplaces: [
        "Ministries and agencies of the Republic of Tajikistan",
        "City and district administrations (hukumats)",
        "The Majlisi Namoyandagon and local council offices",
        "State committees and agencies"
      ],
    },
    "customs-officer": {
      name: "Customs Officer",
      tagline: "Controls the movement of goods across the border",
      summary: "Inspects goods and documents at the border and enforces customs regulations.",
      whatTheyDo: [
        "Inspects goods, vehicles and documents at border checkpoints",
        "Calculates and collects customs duties and fees",
        "Detects smuggling and violations of customs rules",
        "Processes declarations and accompanying documentation"
      ],
      skills: ["Knowledge of customs law and goods classification", "Attention to detail during inspections and document checks", "Integrity and resistance to bribery attempts", "Working with databases and declarations", "Physical stamina (shift work, border crossings)"],
      schoolSubjects: ["History", "Civics / Law", "A foreign language"],
      pros: ["Stable government job with a uniform and social guarantees", "Constant contact with different countries and cargo at the border"],
      cons: ["Shift work, often far from home (border crossings, airports)", "High responsibility and risk of pressure from violators"],
      workplaces: [
        "Customs posts at borders and airports",
        "Head office of the Customs Service under the Government of Tajikistan",
        "Cargo terminals and temporary storage warehouses"
      ],
    },
    "political-scientist": {
      name: "Political Scientist",
      tagline: "Analyzes politics, power and government systems",
      summary: "Studies political processes, power and systems of government in order to explain and forecast political events.",
      whatTheyDo: [
        "Analyzes domestic and foreign policy and the actions of parties and institutions",
        "Prepares analytical briefs and forecasts for media or government agencies",
        "Studies elections and public opinion",
        "Teaches political science or conducts academic research"
      ],
      skills: ["Deep knowledge of history, law and political theory", "Analyzing large amounts of information to spot trends", "Clear writing and confident public speaking for analysis and commentary", "Objectivity and separating facts from opinions", "Foreign languages for working with international sources"],
      schoolSubjects: ["History", "Civics"],
      pros: ["In demand as an expert in media, think tanks and government", "Interesting work at the crossroads of history, law and current events"],
      cons: ["Pay isn't always high outside expert or international institutions", "Politically sensitive topics require care in public statements"],
      workplaces: [
        "Think tanks and research institutes",
        "Universities (teaching political science)",
        "Ministry and parliament staff offices",
        "Media outlets as a political commentator"
      ],
    },
    "sociologist": {
      name: "Sociologist",
      tagline: "Studies society and how people behave in groups",
      summary: "Studies how society is structured, what social groups exist, and how people behave in them, using surveys and data analysis.",
      whatTheyDo: [
        "Conducts sociological surveys and studies",
        "Analyzes data on how people and groups behave",
        "Prepares reports for organizations and government bodies",
        "Advises on social programs"
      ],
      skills: ["Analytical thinking", "Designing surveys and questionnaires", "Working with data and statistics", "Communication skills", "Objectivity"],
      schoolSubjects: ["Civics", "History", "Mathematics"],
      pros: ["In demand in research, marketing and the public sector", "Helps make sense of real problems in society"],
      cons: ["Pay in academic research isn't always high", "Research results take time and patience"],
      workplaces: [
        "Sociological and market research companies",
        "Research institutes of the Academy of Sciences",
        "Public relations departments in government bodies and NGOs",
        "Universities (teaching and research)"
      ],
    },
    "religious-studies-scholar": {
      name: "Religious Studies Scholar",
      tagline: "Studies religions, their history and role in society",
      summary: "Studies the world's religions, their history, texts and influence on culture and society — scholarly, not preaching.",
      whatTheyDo: [
        "Studies sacred texts, history and rituals of different religions",
        "Analyzes the influence of religion on a region's society, culture and politics",
        "Writes academic papers and takes part in conferences",
        "May advise on interfaith dialogue and preventing extremism"
      ],
      skills: ["Knowledge of the history of religions and primary sources", "Classical and modern languages (Arabic, Persian, etc.)", "Analytical thinking and academic rigor", "Tact when discussing sensitive topics", "Clear academic writing"],
      schoolSubjects: ["History", "Civics"],
      pros: ["A unique expertise valued in academia, education and government", "The chance to deeply study the history and culture of a region and the world"],
      cons: ["A narrow job market outside academia", "The subject requires particular neutrality and care in public statements"],
      workplaces: [
        "The Institute of History, Archaeology and Ethnography of the Academy of Sciences",
        "Universities (religious studies, philosophy, oriental studies departments)",
        "The Committee on Religious Affairs under the Government of Tajikistan",
        "Research and educational centers"
      ],
    },
    "area-studies-specialist": {
      name: "Area Studies Specialist",
      tagline: "Specializes in a specific region of the world",
      summary: "Deeply studies a specific region of the world — its language, politics, economy and culture — for business, diplomacy or media.",
      whatTheyDo: [
        "Deeply studies the language, history, politics and economy of a specific country or region",
        "Prepares analytical briefings for business, diplomacy or media",
        "Supports negotiations and projects related to that region",
        "Translates and adapts materials for the local audience"
      ],
      skills: ["Fluency in the language of the region studied", "Deep knowledge of the history, culture and current politics of the specialization country", "Analytical thinking and structured writing", "Cross-cultural communication", "Flexibility to switch between analysis, translation and support roles"],
      schoolSubjects: ["A foreign language", "History", "Geography"],
      pros: ["A unique, in-demand niche at the crossroads of language, history and international relations", "The chance to work with diplomacy, business or journalism at once"],
      cons: ["Work depends heavily on Tajikistan's relations with that specific country or region", "Often requires combining several roles at once (translator, analyst, advisor)"],
      workplaces: [
        "The foreign ministry and specialized agencies (depending on the region)",
        "Companies doing business with the specialization country",
        "Think tanks and NGOs",
        "Media outlets and international organizations"
      ],
    },
    "police-officer": {
      name: "Law Enforcement Officer",
      tagline: "Maintains public order and safety",
      summary: "Maintains public order, prevents and investigates crime, and protects citizens' rights.",
      whatTheyDo: [
        "Patrols an assigned area and responds to calls from residents",
        "Responds to incidents and files official reports",
        "Runs prevention talks in schools and workplaces",
        "Helps solve and investigate offenses together with investigators"
      ],
      skills: ["Good physical fitness and self-defense training", "Knowledge of the Criminal and Administrative Codes", "Fast decision-making under stress", "Ability to find common ground with different kinds of people", "Discipline and readiness for an irregular schedule"],
      schoolSubjects: ["History", "Civics", "Physical education"],
      pros: ["Stable government job with a uniform, social guarantees and an early pension", "A real chance to help people and keep a district safe"],
      cons: ["Health and life risks during arrests and incidents", "Night shifts and duty on holidays"],
      workplaces: [
        "District and city internal affairs departments",
        "Patrol service",
        "Traffic police (GAI)",
        "The Ministry of Internal Affairs"
      ],
    },
    "forensic-expert": {
      name: "Forensic Expert",
      tagline: "Examines evidence to help solve crimes",
      summary: "Examines physical evidence to help investigators and the courts establish the truth.",
      whatTheyDo: [
        "Examines the crime scene and collects physical evidence",
        "Runs forensic examinations (ballistics, handwriting, chemistry, etc.)",
        "Prepares written expert opinions for investigators and courts",
        "Testifies in court, explaining the examination's findings"
      ],
      skills: ["Deep knowledge of chemistry, biology or physics (depending on specialty)", "Extreme attention to the smallest details", "Working with lab equipment", "Precision in documentation", "Resilience when handling difficult case material"],
      schoolSubjects: ["Chemistry", "Biology", "Civics"],
      pros: ["A unique profession at the crossroads of science and law", "An expert opinion can genuinely change the outcome of a case"],
      cons: ["Psychologically heavy work (criminal case material, crime scenes)", "High responsibility — an expert's mistake can change a case's outcome"],
      workplaces: [
        "The Forensic Examination Center of the Ministry of Justice",
        "Forensic units of the Ministry of Internal Affairs",
        "Laboratories attached to the prosecutor's office and investigative bodies"
      ],
    },
    "investigator-prosecutor": {
      name: "Investigator / Prosecutor",
      tagline: "Investigates crime and pursues prosecution",
      summary: "Investigates criminal cases, gathers evidence, and ensures the law is followed during investigation and trial.",
      whatTheyDo: [
        "Opens and conducts criminal cases within their jurisdiction",
        "Interviews witnesses, suspects and victims",
        "Collects, verifies and organizes evidence",
        "Represents the prosecution in court (for prosecutors)"
      ],
      skills: ["Knowledge of criminal and criminal procedure law", "Logical thinking and building case theories", "Composure under stress and with difficult subject matter (crime)", "Confident speaking for interviews and courtroom appearances", "Integrity and resistance to pressure"],
      schoolSubjects: ["History", "Civics"],
      pros: ["Work directly tied to restoring justice", "Career growth from district investigator to leadership roles in the prosecutor's office"],
      cons: ["Heavy workload and an irregular schedule", "Psychologically difficult cases (violence, serious crimes)"],
      workplaces: [
        "Investigative units of the Ministry of Internal Affairs and the Anti-Corruption Agency",
        "Prosecutor's offices at the district, city and republic level",
        "Courts (as a state prosecutor)"
      ],
    },
    "primary-teacher": {
      name: "Primary School Teacher",
      tagline: "Teaches children to read, write and count",
      summary: "Teaches children aged 6–10 the basics and instills their first study habits and independence.",
      whatTheyDo: [
        "Teaches every core subject to a single class: reading, writing, math and general studies",
        "Explains the same material in different ways depending on each child's level",
        "Prepares worksheets, visual aids and handouts for every lesson",
        "Helps first-graders get used to school routines and rules"
      ],
      skills: ["Patience for explaining the same thing many times", "Ability to hold the attention of a class of 20-30 children", "Legible handwriting and clear speech", "Knowledge of the full primary-school curriculum", "Ability to build rapport with parents"],
      schoolSubjects: ["Native language and literature", "Mathematics"],
      pros: ["Jobs exist in almost every school in the country — no need to move to a big city", "Long summer break", "Results show quickly: a child learns to read and count within a year"],
      cons: ["One teacher is responsible for every subject at once, which means a heavy lesson-prep workload", "Public-school pay is among the lowest of professions requiring a university degree"],
      workplaces: [
        "Public schools in cities and villages",
        "Private schools and learning centers",
        "International and bilingual schools in Dushanbe and other large cities",
        "Private tutoring and school-readiness prep for preschoolers"
      ],
    },
    "english-teacher": {
      name: "English Teacher / Translator",
      tagline: "Teaches English and translates text",
      summary: "Teaches English at school or in courses, or translates spoken and written text between languages.",
      whatTheyDo: [
        "Teaches English lessons under the school curriculum or to private students",
        "Prepares students for international exams (IELTS, TOEFL) or school-leaving tests",
        "Translates documents, letters or business correspondence, written and spoken",
        "Reviews and explains mistakes in written and spoken assignments"
      ],
      skills: ["Fluent English at a C1-C2 level", "Knowledge of language-teaching methods", "Strong memory for vocabulary and grammar", "Strong native-language skills for translation", "Patience working with students at different levels"],
      schoolSubjects: ["English", "Native language and literature"],
      pros: ["One of the highest-earning tutoring subjects thanks to mass demand for English", "Can combine school teaching, courses, private tutoring and translation at once", "Opens the door to work with foreign companies and translation work"],
      cons: ["High competition among private English tutors", "Needs regular upkeep and improvement of language level"],
      workplaces: [
        "Public and private schools",
        "Language courses and centers (e.g. American Councils, Cambridge centers)",
        "Private tutoring practice",
        "Translation bureaus and companies' international-relations departments"
      ],
    },
    "philologist-teacher": {
      name: "Native Language Teacher / Philologist",
      tagline: "Studies and teaches language and literature",
      summary: "Teaches the native language and literature, or works professionally with text: editing, and studying the language and its history.",
      whatTheyDo: [
        "Teaches native-language and literature lessons, analyzes works with the class",
        "Edits and proofreads texts — articles, books, documents",
        "Prepares strong students for olympiads and creative competitions",
        "Studies the history of the language, dialects and written monuments"
      ],
      skills: ["Strong spoken and written language skills", "Deep knowledge of literature and language history", "Analytical thinking for text analysis", "Patience grading written work", "Public-speaking skills for lessons and events"],
      schoolSubjects: ["Native language and literature", "History"],
      pros: ["Besides teaching, can work as an editor, proofreader or in publishing", "In demand for preserving and promoting the native language and culture", "Flexible: research, teaching or media — pick a direction"],
      cons: ["Public-school teacher pay is low", "Grading essays and written work takes a lot of personal time"],
      workplaces: [
        "General schools and lyceums",
        "Publishing houses and newspaper/magazine editorial offices",
        "The Institute of Language and Literature at the Academy of Sciences",
        "Universities and colleges (philology departments)"
      ],
    },
    "psychologist": {
      name: "Psychologist",
      tagline: "Helps people understand their feelings and behavior",
      summary: "Helps people understand their feelings, cope with difficulties and make better decisions and relationships.",
      whatTheyDo: [
        "Runs individual and group counseling on personal and family issues",
        "Conducts psychological testing and interprets the results",
        "Works with schoolchildren on motivation, anxiety and career choice",
        "Keeps session notes and maintains client confidentiality"
      ],
      skills: ["Empathy and non-judgmental listening", "Knowledge of diagnostic and counseling methods", "Analytical thinking to interpret behavior", "Emotional resilience when handling others' problems", "Strict confidentiality and professional ethics"],
      schoolSubjects: ["Civics", "Biology"],
      pros: ["Growing demand for psychological support in schools and companies", "Can specialize in a niche: child, family or clinical psychology", "Meaningful work with visible benefit to people"],
      cons: ["Emotionally demanding work with a risk of burnout", "Pay in public education institutions is usually modest"],
      workplaces: [
        "School psychological services",
        "Private counseling practices and offices",
        "Medical and rehabilitation centers",
        "HR departments at large companies"
      ],
    },
    "preschool-teacher": {
      name: "Preschool Teacher",
      tagline: "Works with children before school age",
      summary: "Organizes activities, play and development for preschool-age children in kindergarten.",
      whatTheyDo: [
        "Plans and runs developmental activities, games and creative work for the group",
        "Oversees the daily routine, meals, naps and safety of children aged 3-6",
        "Observes each child's development and reports progress to parents",
        "Prepares children for school: basic counting, writing and social skills"
      ],
      skills: ["Patience and a genuine love of children", "Energy — on your feet all day with an active group", "A creative approach to games and activities", "Attentiveness to a child's state and behavior", "Ability to calmly talk with worried parents"],
      schoolSubjects: ["Native language and literature", "Civics"],
      pros: ["A stable schedule with no night shifts or overtime", "A visible contribution to child development at the most important age"],
      cons: ["Physically and emotionally demanding work with a group of 15-25 children", "Pay at public kindergartens is modest"],
      workplaces: [
        "Public kindergartens",
        "Private kindergartens and early-development centers",
        "Nursery groups and early-childhood centers",
        "Home-based childcare groups"
      ],
    },
    "translator": {
      name: "Translator / Interpreter",
      tagline: "Translates text and speech between languages",
      summary: "Translates written text or spoken language from one language into another while preserving meaning and style.",
      whatTheyDo: [
        "Translates books, articles, legal or technical documents",
        "Provides simultaneous or consecutive interpreting at meetings and conferences",
        "Checks a draft translation against the original and edits the style",
        "Studies the specialized terminology of the assignment's field (law, medicine, engineering)"
      ],
      skills: ["Fluency in at least two languages, including professional vocabulary", "Strong writing skills in both languages", "Quick reaction time and strong memory for interpreting", "Attention to detail and nuances of meaning", "Broad general knowledge across many topics"],
      schoolSubjects: ["A foreign language", "Native language and literature"],
      pros: ["Can freelance for international companies and publishers", "Wide variety of subjects — from books to business negotiations", "In demand as the country's international contacts grow"],
      cons: ["High competition in the written-translation market", "Interpreting demands intense concentration and causes significant fatigue"],
      workplaces: [
        "Translation agencies",
        "International organizations and embassies",
        "Publishing houses",
        "International-relations departments at companies and universities",
        "Freelance platforms for translators"
      ],
    },
    "foreign-language-teacher": {
      name: "Foreign Language Teacher (German, Arabic, Chinese)",
      tagline: "Teaches foreign languages that are less common in the region",
      summary: "Teaches a foreign language other than English — German, Arabic, Chinese and others — at school, university or in courses.",
      whatTheyDo: [
        "Teaches a language uncommon in the region (German, Arabic, Chinese, etc.) at school or university",
        "Prepares students for exams, olympiads and language scholarship programs",
        "Creates original teaching materials due to a shortage of ready-made textbooks",
        "Translates documents and accompanies delegations when needed"
      ],
      skills: ["Fluency in an uncommon foreign language", "Ability to adapt foreign textbooks to the local curriculum", "Patience and the ability to teach from zero", "Cross-cultural communication", "Organization when preparing students for olympiads"],
      schoolSubjects: ["A foreign language", "Native language and literature"],
      pros: ["Less competition than English teachers face", "Growing demand for Chinese, Arabic and other languages as trade and grants grow", "Often opens the door to scholarships and internships abroad"],
      cons: ["Few ready-made textbooks and materials exist in these languages", "Public-school pay doesn't always reflect how rare the skill is"],
      workplaces: [
        "General schools with in-depth language programs",
        "Language centers run by embassies and cultural foundations (Confucius Institute, Goethe-Institut and similar)",
        "Universities that teach Eastern and European languages",
        "Private courses and tutoring"
      ],
    },
    "sports-coach": {
      name: "Coach / Physical Education Teacher",
      tagline: "Develops physical skills and health",
      summary: "Teaches physical education and sport at school, or coaches athletes, developing their physical skills and health.",
      whatTheyDo: [
        "Teaches PE classes or coaches a team/group in a specific sport",
        "Builds individual and team training programs by season",
        "Monitors exercise technique to prevent injuries",
        "Selects and prepares athletes for competitions and training camps"
      ],
      skills: ["Excellent personal physical fitness", "Knowledge of training methods and sports physiology", "Ability to motivate and keep discipline in a group", "First-aid skills for injuries", "Patience working with students at different fitness levels"],
      schoolSubjects: ["Physical education", "Biology"],
      pros: ["Active work rather than a desk job", "Can be combined with your own athletic career or refereeing", "A chance to take a talented student to a serious competitive level"],
      cons: ["High physical strain and risk of injury", "School PE-teacher pay is low, and a coach's income is unstable without sponsors"],
      workplaces: [
        "General schools",
        "Youth sports schools (DYuSSh)",
        "Sports clubs and fitness centers",
        "National/regional teams by sport"
      ],
    },
    "military-instructor": {
      name: "Basic Military Training Instructor",
      tagline: "Prepares students for service and emergency situations",
      summary: "Teaches basic military training and civil defence at school: drill, first-aid basics, and how to act in emergencies.",
      whatTheyDo: [
        "Teaches basic military training and civil defence classes",
        "Teaches drill and the basics of handling weapons under the curriculum",
        "Prepares students to respond to fire, earthquakes and other emergencies",
        "Organizes school competitions and inspections in military-applied skills"
      ],
      skills: ["Discipline and personal physical fitness", "Knowledge of basic military affairs and civil defence", "Ability to keep order and discipline in class", "First-aid skills", "Organizational skills for running drills and inspections"],
      schoolSubjects: ["Physical education", "Social studies"],
      pros: ["A stable position on every school's timetable", "Can be combined with a PE-teacher role"],
      cons: ["Students don't always take the subject seriously", "Needs to keep up personal fitness and discipline at all times"],
      workplaces: [
        "General schools",
        "Lyceums and colleges",
        "Training camps and field exercises",
        "Local defence-affairs departments"
      ],
    },
    "biology-chemistry-teacher": {
      name: "Biology & Chemistry Teacher",
      tagline: "Explains to students how living and non-living nature works",
      summary: "Teaches biology and chemistry at school, prepares students for exams, and often teaches both subjects together — one of the most common specializations at the country's teacher-training universities.",
      whatTheyDo: [
        "Prepares and teaches biology and/or chemistry classes to the school curriculum",
        "Runs lab and practical sessions",
        "Prepares students for olympiads and entrance exams",
        "Grades work and tracks each student's progress"
      ],
      skills: ["Deep knowledge of biology and chemistry at school and university level", "Ability to explain complex ideas simply", "Patience and discipline managing a class", "Organizational skills (lab work, equipment)", "Interest in new teaching methods"],
      schoolSubjects: ["Biology", "Chemistry"],
      pros: ["Steady demand — the subject exists in every school in the country", "Can be combined with private tutoring", "One of the most accessible specializations, with budget-funded places in many cities"],
      cons: ["School-teacher pay remains one of the profession's main problems", "A heavy workload — grading and lesson prep outside school hours"],
      workplaces: [
        "General schools",
        "Lyceums and science-track gymnasiums",
        "Private education centres and tutoring",
        "Teacher-training colleges and universities (after further study)"
      ],
    },
    "journalist": {
      name: "Journalist / Social Media Specialist",
      tagline: "Gathers and presents information in news media and on social platforms",
      summary: "Finds, verifies and tells news and stories through articles, video or social media posts.",
      whatTheyDo: [
        "Finds story leads, verifies facts and interviews sources",
        "Writes articles, reports or scripts for media outlets",
        "Shoots and edits photo and video for social media and the website",
        "Manages a media outlet's or brand's social accounts, tracking reach and audience response"
      ],
      skills: ["Strong writing skills and the ability to summarize concisely", "Curiosity and willingness to ask uncomfortable questions", "Basic photo/video shooting and editing skills", "Working fast under deadline pressure", "Resilience to criticism and pressure"],
      schoolSubjects: ["Native language and literature", "History", "A foreign language"],
      pros: ["Varied work — from daily news to long investigations", "Can combine traditional media with social-media (SMM) work", "Many remote and freelance opportunities"],
      cons: ["Irregular schedule and constant deadlines", "Personal responsibility for fact-checking and the consequences of publishing"],
      workplaces: [
        "TV channels and radio stations",
        "Print and online publications",
        "SMM departments at companies and government bodies",
        "Personal blogs and social-media channels"
      ],
    },
    "tourism-specialist": {
      name: "Tourism & Hospitality Specialist",
      tagline: "Organizes travel and hotel operations",
      summary: "Organizes tours, hotel operations and events, helping people travel and rest comfortably.",
      whatTheyDo: [
        "Selects tours and routes to fit the client's request and budget",
        "Books flights, hotels and transfers through travel-booking systems",
        "Arranges visa paperwork and travel insurance",
        "Handles trip emergencies: canceled flights, lost luggage, a client falling ill"
      ],
      skills: ["Communication skills and the ability to sell a service", "Knowledge of foreign languages", "Knowledge of geography, visas and popular-destination specifics", "Organization when juggling several bookings at once", "Stress resilience during unplanned situations"],
      schoolSubjects: ["Geography", "A foreign language"],
      pros: ["Discounts and perks for personal travel", "Varied interaction with people and cultures", "Growing demand for inbound and outbound tourism (Pamir, GBAO) in Tajikistan"],
      cons: ["Strong seasonality in demand and income", "Personal responsibility to the client for trip emergencies"],
      workplaces: [
        "Travel agencies and tour operators",
        "Airlines and hotel representative offices",
        "Inbound-tourism offices in GBAO and other regions",
        "Running your own travel agency or freelance guiding"
      ],
    },
    "pr-specialist": {
      name: "PR Specialist",
      tagline: "Shapes how a company or person is seen publicly",
      summary: "Builds a company's or person's relationship with the media and the public, and manages their reputation.",
      whatTheyDo: [
        "Writes press releases and prepares official company comments for the media",
        "Builds and maintains relationships with journalists and bloggers",
        "Organizes press conferences, presentations and public events",
        "Develops a crisis-response plan for reputational risks"
      ],
      skills: ["Strong written and spoken communication", "Strategic thinking and the ability to see a situation from the outside", "Communication skills and confident dealings with journalists", "Stress resilience during crisis situations", "Ability to work with different audiences (media, government, public)"],
      schoolSubjects: ["Native language and literature", "Civics", "A foreign language"],
      pros: ["Varied, dynamic work with visible results", "In demand at companies, government bodies, public figures and NGOs", "Builds a wide network of useful contacts"],
      cons: ["Personal responsibility for the client's reputation during a crisis", "Irregular schedule, especially during events and crises"],
      workplaces: [
        "PR and communications agencies",
        "Press offices at companies and government bodies",
        "Public-relations departments at NGOs and international organizations",
        "Personal brand management for public figures"
      ],
    },
    "hotel-manager": {
      name: "Hotel & Restaurant Manager",
      tagline: "Runs the operations of a hotel or restaurant",
      summary: "Runs a hotel's or restaurant's operations so that guests are comfortable and the business turns a profit.",
      whatTheyDo: [
        "Plans room/table occupancy and builds staff schedules",
        "Monitors service standards at the front desk, in rooms and in the restaurant",
        "Handles guest complaints and unusual situations on the spot",
        "Tracks the venue's expenses, purchasing and revenue"
      ],
      skills: ["Organization and the ability to plan occupancy", "Communication skills and the ability to defuse conflicts with guests", "Basic understanding of finance and accounting", "Stress resilience during peak hours and seasons", "Foreign-language skills for working with tourists"],
      schoolSubjects: ["A foreign language", "Mathematics"],
      pros: ["In demand in Tajikistan's tourist regions (Dushanbe, Panjakent, GBAO)", "Dynamic people-facing work with visible results in service quality", "Career growth from front-desk staff to chain manager"],
      cons: ["Irregular schedule, especially during peak tourist season", "Personal responsibility for the venue's reputation over any guest complaint"],
      workplaces: [
        "Hotels and guesthouses",
        "Restaurants and cafés",
        "Sanatoriums and tourist complexes",
        "International hotel chains opening branches in Tajikistan"
      ],
    },
    "advertising-designer": {
      name: "Advertising Designer",
      tagline: "Creates the visual advertising for brands",
      summary: "Creates visuals for advertising: banners, posters, packaging and brand materials.",
      whatTheyDo: [
        "Designs banners, social media posts and ad layouts",
        "Prepares packaging and brand materials from a client brief",
        "Chooses fonts, colors and style within a company's brand book",
        "Prepares files for print or publishing and revises them based on feedback"
      ],
      skills: ["Working in Photoshop, Illustrator and other design software", "Understanding of branding and visual identity", "Artistic taste and sense of composition", "Ability to meet campaign deadlines", "Staying calm through client revisions"],
      schoolSubjects: ["Art", "Computer science"],
      pros: ["Growing digital advertising and social media market", "Can take freelance projects alongside a regular job"],
      cons: ["Frequent revisions and reworks requested by clients", "Tight deadlines before campaign launches"],
      workplaces: [
        "Advertising and digital agencies",
        "Marketing departments of retail chains and telecom operators",
        "Printing houses and packaging manufacturers",
        "Freelance work or a design studio of one's own"
      ],
    },
    "fine-artist": {
      name: "Fine Artist",
      tagline: "Creates paintings and graphic works",
      summary: "Creates paintings and graphic works, developing a personal artistic style.",
      whatTheyDo: [
        "Paints and creates graphic works in a personal studio",
        "Takes part in exhibitions, plein-airs and competitions",
        "Completes commissioned portraits and custom pieces",
        "May teach drawing clubs or workshops"
      ],
      skills: ["Artistic talent and a personal style", "Knowledge of painting and drawing techniques", "Patience for long, detailed work", "Observation and sense of composition", "Ability to promote own work (social media, exhibitions)"],
      schoolSubjects: ["Art", "History"],
      pros: ["Full creative freedom in choosing subjects and style", "Can be combined with teaching at an art school"],
      cons: ["Income depends entirely on sales and reputation", "No fixed salary or social guarantees"],
      workplaces: [
        "A personal studio",
        "The Union of Artists of Tajikistan",
        "Galleries and exhibition halls",
        "Art schools and studios (teaching)"
      ],
    },
    "fashion-designer": {
      name: "Fashion Designer",
      tagline: "Designs clothing and fabrics",
      summary: "Designs clothing, from the initial sketch and fabric choice through to the finished garment.",
      whatTheyDo: [
        "Sketches clothing collections",
        "Selects fabrics and works with material suppliers",
        "Builds patterns and oversees sewing by seamstresses",
        "Organizes fittings and shows for finished designs"
      ],
      skills: ["Artistic taste and understanding of silhouette", "Basic sewing and garment construction skills", "Knowledge of fabrics and trims", "Ability to negotiate with suppliers and sewing workshops", "Attention to detail"],
      schoolSubjects: ["Art", "Mathematics"],
      pros: ["Can build a personal brand around national motifs", "Growing interest in local fashion and garment production"],
      cons: ["Needs starting capital for fabric and samples", "Competition from cheap imported clothing"],
      workplaces: [
        "A personal atelier or clothing brand",
        "Garment factories and textile mills",
        "Theater costume workshops",
        "Fashion houses and showrooms"
      ],
    },
    "choreographer-dancer": {
      name: "Choreographer / Dancer",
      tagline: "Creates and performs dance pieces",
      summary: "Choreographs and performs dance pieces, developing expressive, physically skilled movement.",
      whatTheyDo: [
        "Choreographs new dance numbers and scenes",
        "Trains movement technique, flexibility and group synchronization",
        "Prepares dancers for festivals, competitions and national holidays",
        "Performs on stage or teaches dance to children and adults"
      ],
      skills: ["Excellent physical fitness and flexibility", "Musicality and sense of rhythm", "Ability to explain movement and coach a group", "Discipline and patience", "Knowledge of folk and contemporary dance styles"],
      schoolSubjects: ["Art", "Physical education"],
      pros: ["In demand at festivals, weddings and state events", "Can combine performing with teaching at a dance studio"],
      cons: ["Short active performing career due to physical strain", "Demanding daily training with risk of injury"],
      workplaces: [
        "State song and dance ensembles",
        "Opera and ballet theaters",
        "Culture houses and centers for aesthetic education",
        "Dance studios and art schools"
      ],
    },
    "actor": {
      name: "Actor",
      tagline: "Plays roles on stage and screen",
      summary: "Embodies characters on stage, in film or on television, conveying the emotion and character of a role.",
      whatTheyDo: [
        "Learns roles and rehearses with the full cast",
        "Performs in plays, films, TV series and on television",
        "Works on voice, movement and emotional delivery",
        "May do voice dubbing or host events"
      ],
      skills: ["Artistry and emotional expressiveness", "Strong memory for scripts", "Discipline and ability to keep a rehearsal schedule", "Resilience to criticism and casting rejections", "Teamwork with directors and fellow actors"],
      schoolSubjects: ["Art", "Native language and literature"],
      pros: ["Work in theater and a growing local film/TV production scene", "Chance to become recognized and sought after across projects"],
      cons: ["High competition for roles and unstable employment", "Irregular schedule of rehearsals and filming"],
      workplaces: [
        "Drama theaters",
        "TV channels and dubbing studios",
        "Film and series production companies",
        "Hosting weddings and corporate events"
      ],
    },
    "musician": {
      name: "Musician",
      tagline: "Performs and composes music",
      summary: "Performs music on an instrument or with their voice, and may also compose original music.",
      whatTheyDo: [
        "Learns and performs pieces on an instrument or with voice",
        "Rehearses individually and as part of an ensemble or orchestra",
        "Performs at concerts, weddings and city events",
        "May compose, arrange music or give private lessons"
      ],
      skills: ["Musical ear and sense of rhythm", "Professional-level skill on an instrument or in voice", "Discipline for daily practice", "Ability to improvise and read an audience", "Basic recording skills (for many genres)"],
      schoolSubjects: ["Art", "Native language and literature"],
      pros: ["Steady demand for musicians at weddings and celebrations", "Can combine performing with teaching at a music school"],
      cons: ["Income is unstable and depends on the events season", "Must maintain and replace own instruments"],
      workplaces: [
        "The state philharmonic and orchestras",
        "Music schools and colleges (teaching)",
        "TV and radio studios",
        "Weddings, restaurants and private events"
      ],
    },
    "stage-designer": {
      name: "Theater Set Designer",
      tagline: "Creates the sets and visual world of a production",
      summary: "Creates the sets, costumes and visual atmosphere of a production, helping the director tell a story on stage.",
      whatTheyDo: [
        "Designs set and costume sketches for a production",
        "Builds stage models and chooses materials and colors",
        "Coordinates the visual concept with the director and lighting designer",
        "Maintains the set during performances and tours"
      ],
      skills: ["Artistic taste and spatial thinking", "Model-making and materials skills (wood, fabric, paint)", "Understanding of stage lighting", "Teamwork under tight deadlines", "Basic knowledge of costume history and periods"],
      schoolSubjects: ["Art", "History"],
      pros: ["Creative work the audience sees come alive at the premiere", "Can work in theater, television and concert venues"],
      cons: ["Limited number of theaters and staff positions", "Very tight deadlines and crunch before a premiere"],
      workplaces: [
        "Opera and ballet theaters, drama theaters",
        "TV studios and concert organizations",
        "Theatrical costume workshops",
        "Organizers of city festivals and celebrations"
      ],
    },
    "ceramic-artist": {
      name: "Ceramic Artist",
      tagline: "Creates pieces from clay and ceramics",
      summary: "Creates artistic and decorative pieces from clay: tableware, sculptures and decor.",
      whatTheyDo: [
        "Shapes clay pieces on a potter's wheel or by hand",
        "Paints and glazes finished pieces",
        "Fires pieces in a kiln, controlling temperature and timing",
        "Sells finished work or takes custom orders for tableware and souvenirs"
      ],
      skills: ["Artistic taste and sense of form", "Fine motor skill and precise handwork", "Knowledge of clay, glazes and firing schedules", "Patience for long handwork sessions", "Basic sales and client-handling skills"],
      schoolSubjects: ["Art", "Chemistry"],
      pros: ["A tangible result and strong tourist interest in handmade ceramics", "Can work independently, without being tied to an office"],
      cons: ["Requires a kiln and wheel of one's own — a real upfront investment", "Income is unstable without an established customer base"],
      workplaces: [
        "A personal pottery workshop",
        "Folk-craft cooperatives and workshops",
        "Souvenir and tourist shops",
        "Art schools (teaching ceramics)"
      ],
    },
    "furniture-designer": {
      name: "Furniture Designer",
      tagline: "Designs and creates furniture",
      summary: "Develops sketches and structural designs for furniture, balancing comfort, function and aesthetics.",
      whatTheyDo: [
        "Sketches furniture designs based on a client's needs",
        "Develops the construction and selects wood, metal or upholstery fabric",
        "Creates 3D models and drawings for production",
        "Coordinates the design with the workshop and reviews the first sample"
      ],
      skills: ["Artistic taste and spatial thinking", "3D modeling skills (SketchUp, 3ds Max and similar)", "Knowledge of wood, metal and upholstery materials", "Understanding of joinery and furniture manufacturing", "Practical thinking and the ability to balance looks against cost"],
      schoolSubjects: ["Art", "Drafting", "Mathematics"],
      pros: ["A visible, long-lasting result of the work", "Demand from furniture workshops, interior design studios and private renovation clients"],
      cons: ["Must design within what local production can actually make, not just aesthetics", "Competition from cheap ready-made and imported furniture"],
      workplaces: [
        "Furniture factories and joinery workshops",
        "Interior design studios",
        "Construction and renovation companies",
        "A small workshop of one's own"
      ],
    },
    "museum-culturologist": {
      name: "Museum Curator / Culturologist",
      tagline: "Studies and preserves cultural heritage",
      summary: "Studies culture and historical heritage, and organizes museum collections and exhibitions to preserve it.",
      whatTheyDo: [
        "Studies and catalogs museum exhibits and historical objects",
        "Prepares and designs museum displays and temporary exhibitions",
        "Takes part in preserving and restoring cultural monuments",
        "Leads tours, lectures and public education events"
      ],
      skills: ["Broad knowledge of history and culture", "Strong written and spoken communication", "Attention to detail when handling artifacts", "Organizational skills for preparing exhibitions", "A passion for archival and research work"],
      schoolSubjects: ["History", "Art"],
      pros: ["Direct work with the country's unique cultural heritage", "Varied work — from archival research to live engagement with visitors"],
      cons: ["Few open positions in the country's museums", "Salaries at state culture institutions are usually modest"],
      workplaces: [
        "The National Museum and regional museums",
        "The Academy of Sciences' institutes of history, archaeology and ethnography",
        "Historical and cultural heritage preservation agencies",
        "Universities and research libraries"
      ],
    },
    "librarian": {
      name: "Librarian",
      tagline: "Organizes access to books and knowledge",
      summary: "Organizes a library's collection, helps readers find the information they need, and promotes a reading culture.",
      whatTheyDo: [
        "Catalogs and organizes the library's collection",
        "Helps readers choose literature and find the information they need",
        "Maintains the digital catalog and digitizes the collection",
        "Runs reading clubs and events that promote reading"
      ],
      skills: ["A love of reading and good familiarity with literature", "Organization and accuracy when managing a collection", "Basic skills with databases and catalog systems", "Communication skills for working with a wide range of readers", "Attention to detail"],
      schoolSubjects: ["Native language and literature", "History"],
      pros: ["Calm, stable work with a predictable schedule", "An important role in giving people access to books and knowledge"],
      cons: ["Modest salaries at state libraries", "The work is sometimes seen as less significant than it actually is"],
      workplaces: [
        "The National Library",
        "University and school libraries",
        "District and city public libraries",
        "Ministry and research institute libraries"
      ],
    },
    "product-manager": {
      name: "Product Manager",
      tagline: "Decides what the team builds and why",
      summary: "Decides which features and products to build to solve users' problems and deliver business value — usually at tech companies worldwide.",
      whatTheyDo: [
        "Interviews users and studies product usage data",
        "Writes user stories for the development team",
        "Prioritizes the product backlog",
        "Analyzes metrics after a new feature launches"
      ],
      skills: ["Analytical thinking", "English for working with an international team", "Communication", "Basic understanding of how software development works", "Making decisions with incomplete data"],
      schoolSubjects: ["Mathematics", "Computer science", "English"],
      pros: ["In demand at international IT companies", "Can work fully remotely from Tajikistan for a company in any country"],
      cons: ["High competition for roles at well-known companies", "Constantly has to prove the value of decisions with data"],
      workplaces: [
        "International IT companies (fully remote)",
        "Early-stage startups",
        "Product teams at banks and telecom operators building their own apps",
        "Outsourcing companies building products for foreign clients"
      ],
    },
    "management-consultant": {
      name: "Management Consultant",
      tagline: "Helps companies solve complex business problems",
      summary: "Analyzes a client's business problem and proposes solutions — from improving efficiency to entering new markets.",
      whatTheyDo: [
        "Studies a client's business and defines its core problem",
        "Analyzes data, the market and competitors",
        "Prepares recommendations and presentations for the client's leadership",
        "Helps implement changes and tracks the results"
      ],
      skills: ["Structured problem-solving", "English", "Analytical thinking", "Presentation skills", "Willingness to travel frequently"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["Works across different industries and countries", "Fast career growth and a strong professional network"],
      cons: ["Frequent travel and long hours", "A high bar for entry at top firms"],
      workplaces: [
        "International consulting firms (usually after studying or interning abroad)",
        "Projects run by international organizations and donors in Tajikistan",
        "Strategy departments at large companies",
        "An independent consulting practice"
      ],
    },
    "investment-analyst": {
      name: "Investment Analyst",
      tagline: "Assesses where it's worth investing money",
      summary: "Analyzes companies, markets and assets to determine how profitable and risky an investment is.",
      whatTheyDo: [
        "Analyzes companies' financial statements",
        "Assesses the risk and potential return of investments",
        "Builds financial models and prepares investment reports",
        "Follows news and trends in global financial markets"
      ],
      skills: ["Mathematics and statistics", "English", "Analytical thinking", "Building financial models in Excel", "Staying calm under market volatility"],
      schoolSubjects: ["Mathematics", "A foreign language"],
      pros: ["High pay in international finance", "Can work at global investment firms remotely or after relocating"],
      cons: ["High competition and education requirements (often needs international certifications)", "Markets are unpredictable — a forecasting mistake is costly"],
      workplaces: [
        "Investment banks and funds abroad",
        "Analytics departments at commercial banks",
        "International financial institutions (IMF, World Bank, EBRD)",
        "Brokerage and asset management firms"
      ],
    },
    "devops-engineer": {
      name: "DevOps Engineer",
      tagline: "Automates how software is shipped and run",
      summary: "Sets up the processes that get code from developer to users quickly and reliably, and keeps servers running without failures.",
      whatTheyDo: [
        "Sets up automated build, test and release pipelines (CI/CD)",
        "Manages a company's servers and cloud infrastructure",
        "Monitors system metrics and is first to respond to outages",
        "Automates developers' repetitive tasks with scripts"
      ],
      skills: ["Linux and the command line", "Cloud platforms (AWS, Azure, GCP)", "Scripting languages (Python, Bash)", "English — the team and docs are almost always international", "Fast, calm reactions under pressure"],
      schoolSubjects: ["Computer science", "Mathematics", "English"],
      pros: ["One of the highest-paid roles in global IT", "Remote work for companies anywhere is almost the default"],
      cons: ["Personal responsibility for production outages, sometimes overnight", "May require on-call duty outside working hours"],
      workplaces: [
        "Foreign product companies — fully remote",
        "International outsourcing firms with European/US clients",
        "Local banks and telecoms building their own infrastructure",
        "Freelance work via international platforms"
      ],
    },
    "cloud-engineer": {
      name: "Cloud Engineer",
      tagline: "Builds infrastructure on cloud platforms",
      summary: "Designs and maintains IT infrastructure on cloud platforms (AWS, Azure, Google Cloud) that companies' applications run on.",
      whatTheyDo: [
        "Designs network and server infrastructure on a cloud platform (AWS, Azure, GCP)",
        "Sets up access permissions and security for cloud resources",
        "Tracks and optimizes the company's cloud spending",
        "Helps development teams deploy new app versions quickly"
      ],
      skills: ["Deep knowledge of one or more cloud platforms", "Networking and programming basics", "English — certifications and docs are in English", "Analytical thinking for cost optimization", "Attention to security configuration"],
      schoolSubjects: ["Computer science", "Mathematics", "English"],
      pros: ["One of the most in-demand roles in global IT", "International certifications (AWS, Azure) open up remote work"],
      cons: ["Cloud technology updates every few months", "A misconfiguration can cost a company real money or a data leak"],
      workplaces: [
        "Foreign technology companies — remotely",
        "International outsourcing and consulting firms",
        "Local banks and IT companies moving infrastructure to the cloud"
      ],
    },
    "ux-researcher": {
      name: "UX Researcher",
      tagline: "Studies users to make products easy to use",
      summary: "Studies how people use a product so the development team can design interfaces that are clear and easy to use.",
      whatTheyDo: [
        "Runs interviews and usability tests with real users",
        "Analyzes how people actually use the product (clicks, paths, errors)",
        "Writes reports with concrete recommendations for designers and product managers",
        "Tests hypotheses for new features before they're built"
      ],
      skills: ["Listening and asking open-ended questions", "Basic statistics for survey data", "English for working with an international team", "Structured thinking when writing reports", "Empathy for different types of users"],
      schoolSubjects: ["Social studies", "Computer science", "A foreign language"],
      pros: ["A growing profession at international product companies", "Combines psychology, analytics and technology"],
      cons: ["Little-known in Tajikistan — hard to explain what the job actually is", "Findings aren't always acted on quickly by the product team"],
      workplaces: [
        "Foreign product IT companies — remotely",
        "International research and consulting agencies",
        "Freelance projects for startups"
      ],
    },
    "game-developer": {
      name: "Game Developer",
      tagline: "Builds video games for PC, consoles and phones",
      summary: "Programs the logic, mechanics and features of video games — solo or as part of a game studio.",
      whatTheyDo: [
        "Programs game mechanics, physics and level logic",
        "Works with game engines (Unity, Unreal Engine)",
        "Tests and debugs gameplay features before release",
        "Collaborates with artists and game designers on the overall vision"
      ],
      skills: ["Programming (C#, C++)", "Math — vectors, geometry and physics for games", "Creative thinking and a feel for player experience", "English — almost the entire industry runs on it", "Working in a cross-disciplinary team"],
      schoolSubjects: ["Computer science", "Mathematics", "English"],
      pros: ["The chance to build something millions of people play", "A global industry with remote jobs and freelance work"],
      cons: ["Fierce competition for spots at major studios", "Crunch periods before a game's release"],
      workplaces: [
        "Foreign game studios — remotely",
        "Independent development of your own indie game",
        "Outsourcing studios building games or art for hire"
      ],
    },
    "remote-support-specialist": {
      name: "Remote Technical Support Specialist",
      tagline: "Helps users solve problems with a product",
      summary: "Helps customers of companies abroad solve technical problems with a product — by chat, email or call, working fully remotely.",
      whatTheyDo: [
        "Answers user questions by chat, email or phone",
        "Diagnoses a technical problem and walks the user through a fix",
        "Documents common issues and their solutions",
        "Escalates complex or recurring bugs to developers"
      ],
      skills: ["Written and spoken English", "Patience with frustrated customers", "Explaining technical things in plain language", "Basic technical knowledge of the product", "Staying calm under a heavy ticket load"],
      schoolSubjects: ["A foreign language", "Computer science"],
      pros: ["Fully remote work for a foreign company without relocating", "A good entry point into an IT career without deep technical skills"],
      cons: ["Repetitive, similar-sounding tickets", "Constant contact with upset or irritated customers"],
      workplaces: [
        "Foreign IT and SaaS companies — fully remote",
        "Technical support outsourcing companies",
        "Call centers and BPO companies serving foreign clients"
      ],
    },
    "international-ngo-specialist": {
      name: "International Organization Specialist",
      tagline: "Works on UN, NGO and development-fund projects",
      summary: "Works on international development, humanitarian aid or human rights projects at UN agencies, NGOs and foundations.",
      whatTheyDo: [
        "Designs and coordinates aid, development or human rights projects",
        "Prepares grant applications and reports for donors",
        "Works with local communities, authorities and partner organizations",
        "Evaluates the results and effectiveness of completed projects"
      ],
      skills: ["Fluent English (often plus another foreign language)", "Project management and grant reporting", "Cross-cultural communication and working in diverse teams", "Analytical thinking to evaluate project outcomes", "Willingness to travel and relocate"],
      schoolSubjects: ["A foreign language", "History", "Social studies"],
      pros: ["Working on significant global and local problems", "International experience, travel, work in different countries"],
      cons: ["High competition for positions, often on temporary project contracts", "May require relocating to remote or unstable regions"],
      workplaces: [
        "UN agencies (UNDP, UNICEF, UNHCR, etc.)",
        "International NGOs (Oxfam, the Red Cross, etc.)",
        "Development funds (World Bank, Asian Development Bank)",
        "NGO offices in Dushanbe and across Tajikistan"
      ],
    },
  },
};

export default en;
