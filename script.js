/* ======================================================
   STUDYMASTER PRO — Complete JavaScript
   Timetable App for UPSC | TGPSC | Bank | SSC
   ====================================================== */

'use strict';

// ============================================================
// SUPABASE CONFIGURATION
// Replace these with your actual Supabase project credentials
// Get them from: supabase.com → Your Project → Settings → API
// ============================================================
const SUPABASE_URL = 'https://mxsmqsczyabsbeknaemj.supabase.co';        // e.g. https://xyzabc.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14c21xc2N6eWFic2Jla25hZW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3ODM1NzcsImV4cCI6MjA5NzM1OTU3N30.xgyHZ0NqDWMC-ymQTwFpwejAxZtdFE8gDSIDP_1O5nI'; // starts with eyJ...

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Current authenticated user (set by onAuthStateChange)
let currentUser = null;


// ============================================================
// EXAM SYLLABI DATA (Deep Research Based)
// ============================================================
const EXAM_SYLLABI = {

    upsc: {
        name: 'UPSC Civil Services (IAS/IPS/IFS)',
        color: '#6366f1',
        subjects: [
            { id: 'upsc-gs1', name: 'GS Paper I – History & Culture', icon: '🏛️', color: '#6366f1' },
            { id: 'upsc-gs2', name: 'GS Paper II – Polity & Governance', icon: '⚖️', color: '#8b5cf6' },
            { id: 'upsc-gs3', name: 'GS Paper III – Economy & Env', icon: '💰', color: '#10b981' },
            { id: 'upsc-gs4', name: 'GS Paper IV – Ethics', icon: '🧭', color: '#f59e0b' },
            { id: 'upsc-essay', name: 'Essay', icon: '✍️', color: '#ef4444' },
            { id: 'upsc-csat', name: 'CSAT (GS Paper II Prelims)', icon: '🧮', color: '#06b6d4' },
            { id: 'upsc-optional', name: 'Optional Subject', icon: '📚', color: '#ec4899' },
            { id: 'upsc-current', name: 'Current Affairs', icon: '📰', color: '#84cc16' },
        ],
        papers: [
            {
                id: 'upsc-prelims-gs1', icon: '📋', title: 'Prelims – GS Paper I (100 Q, 200 Marks)',
                desc: 'Qualifying + Merit. History, Geography, Polity, Economy, Environment, Science, Current Affairs',
                topics: [
                    'Indian History – Ancient (IVC, Vedic, Maurya, Gupta)', 'Indian History – Medieval (Delhi Sultanate, Mughals, Bhakti-Sufi)',
                    'Indian History – Modern & Freedom Struggle', 'World History (Colonialism, World Wars, Cold War)',
                    'Indian National Movement – Phases & Leaders', 'Indian Geography – Physical Features',
                    'Indian Geography – Climate, Monsoon, Rivers', 'Indian Geography – Soils, Agriculture, Resources',
                    'World Geography – Continents, Oceans, Mountains', 'Indian Polity – Constitution (Preamble, Features)',
                    'Indian Polity – Fundamental Rights & Duties', 'Indian Polity – DPSPs & Constitutional Amendments',
                    'Indian Polity – Parliament & Legislation', 'Indian Polity – President, PM & Cabinet',
                    'Indian Polity – Judiciary & Supreme Court', 'Panchayati Raj & Local Bodies (73rd/74th)',
                    'Indian Economy – Planning, NITI Aayog', 'Indian Economy – GDP, Growth, Inflation',
                    'Indian Economy – Banking, RBI & Monetary Policy', 'Indian Economy – Budget, Fiscal Policy',
                    'Indian Economy – Trade, Balance of Payments', 'Poverty, Unemployment & Social Issues',
                    'Environment – Ecosystems & Biodiversity', 'Environment – Climate Change, IPCC Reports',
                    'Environment – Protected Areas, National Parks', 'Environment – Pollution & Waste Management',
                    'General Science – Physics Basics', 'General Science – Chemistry Basics',
                    'General Science – Biology & Human Body', 'General Science – Diseases & Health',
                    'Science & Technology – Space (ISRO)', 'Science & Technology – Defence & Nuclear',
                    'Science & Technology – IT & Cybersecurity', 'Current Affairs – National',
                    'Current Affairs – International', 'Disaster Management',
                ]
            },
            {
                id: 'upsc-prelims-csat', icon: '🧮', title: 'Prelims – CSAT Paper II (80 Q, 200 Marks, Qualifying 33%)',
                desc: 'Comprehension, Reasoning, Maths, Decision Making',
                topics: [
                    'Reading Comprehension (RC Passages)', 'English Language Skills',
                    'Logical Reasoning – Statements & Conclusions', 'Analytical Reasoning – Arguments & Assumptions',
                    'Critical Reasoning', 'Number System & Simplification',
                    'HCF, LCM & Divisibility', 'Ratio, Proportion & Percentages',
                    'Averages & Mixtures', 'Profit, Loss & Discount',
                    'Simple & Compound Interest', 'Time, Speed & Distance',
                    'Time & Work, Pipes & Cisterns', 'Data Interpretation – Tables',
                    'Data Interpretation – Graphs & Charts', 'Decision Making & Problem Solving',
                    'General Mental Ability', 'Interpersonal Skills',
                ]
            },
            {
                id: 'upsc-mains-gs1', icon: '🏛️', title: 'Mains – GS Paper I (History, Culture, Society)',
                desc: '250 Marks | Heritage, Culture, History, Geography, World Society',
                topics: [
                    'Indian Culture – Art Forms, Literature, Architecture', 'Indus Valley Civilization',
                    'Vedic Culture & Upanishads', 'Buddhism, Jainism & their Impact',
                    'Mauryan Empire – Ashoka & Administration', 'Gupta Empire – Golden Age',
                    'Bhakti & Sufi Movements', 'Mughal Empire – Culture & Administration',
                    'British Colonialism – Land Revenue, Trade Policies', 'Social Reforms (Ram Mohan Roy, Ambedkar etc.)',
                    '1857 Revolt & Aftermath', 'Role of Women in Freedom Struggle',
                    'Post-Independence India – Integration of States', 'Geomorphology – Landforms & Processes',
                    'Climatology & Weather Systems', 'Oceanography',
                    'Economic Geography – Agriculture, Industry', 'Population Geography',
                    'Urbanization & Migration', 'World History – Industrialization',
                    'World History – Colonization of Asia, Africa', 'World History – World War I & II',
                    'Decolonization & Restructuring', 'Social Empowerment & Communalism',
                    'Salient Features of Indian Society', 'Globalization & its Effects',
                ]
            },
            {
                id: 'upsc-mains-gs2', icon: '⚖️', title: 'Mains – GS Paper II (Polity, Governance, IR)',
                desc: '250 Marks | Constitution, Governance, Social Justice, IR',
                topics: [
                    'Indian Constitution – Historical Underpinnings', 'Features of Indian Constitution',
                    'Constitutional Bodies – UPSC, EC, CAG, CBI', 'Parliament & State Legislature',
                    'Executive – President, PM, Council of Ministers', 'Judiciary – Independence, PIL, Tribunals',
                    'Federalism – Centre-State Relations', 'Emergency Provisions',
                    'Local Bodies – Urban & Rural', 'Governance – E-Governance, Accountability',
                    'Government Policies & Schemes', 'Welfare Schemes for Vulnerable Groups',
                    'Education & Health Policies', 'Issues Related to Poor & Minorities',
                    'Mechanisms & Laws Against Corruption', 'Statutory & Quasi-Judicial Bodies',
                    'India & Neighbourhood (Pakistan, China, Nepal, Bangladesh)', 'Bilateral & Multi-lateral Relations',
                    'International Organizations (UN, WTO, IMF, World Bank)', 'Foreign Policy of India',
                    'Diaspora – Role in India\'s Interests', 'Treaties & Agreements',
                    'Effect of Policies & Politics on India\'s Interest', 'Social Justice & Rights',
                ]
            },
            {
                id: 'upsc-mains-gs3', icon: '💰', title: 'Mains – GS Paper III (Economy, Environment, Security)',
                desc: '250 Marks | Economy, Science, Environment, Security, Disaster Mgmt',
                topics: [
                    'Indian Economy – Planning & Development', 'Agriculture – Issues, Marketing, Price Policies',
                    'Food Security & PDS', 'Land Reforms',
                    'Infrastructure – Roads, Railways, Ports, Energy', 'Investment Models',
                    'Science & Technology – Developments & Achievements', 'Biotechnology – Applications & Issues',
                    'Intellectual Property Rights', 'R&D & Innovation Policy',
                    'Space Technology – ISRO Missions', 'Defence Technology',
                    'Environment – Conservation & Laws', 'Biodiversity – CBD, CITES, Ramsar',
                    'Environmental Impact Assessment', 'Climate Change – Paris Agreement',
                    'Disaster Management – NDMA, Sendai Framework', 'Internal Security – Challenges',
                    'Terrorism – Types, Funding, Counter-Measures', 'Left Wing Extremism (Naxalism)',
                    'Cyber Security & Digital Threats', 'Border Management',
                    'Money Laundering & Organised Crime', 'Inclusive Growth & Issues',
                ]
            },
            {
                id: 'upsc-mains-gs4', icon: '🧭', title: 'Mains – GS Paper IV (Ethics, Integrity, Aptitude)',
                desc: '250 Marks | Ethics, Integrity, Aptitude, Case Studies',
                topics: [
                    'Ethics – Concept, Sources & Determinants', 'Human Values – Role in Personal Life',
                    'Attitude – Content, Structure, Influence', 'Aptitude & Values for Civil Service',
                    'Emotional Intelligence – Applications in Administration', 'Contributions of Moral Thinkers',
                    'Public/Civil Service Values & Ethics', 'Status & Problems of Ethics in Public Administration',
                    'Ethical Concerns in Government & Private Institutions', 'Corruption – Types, Causes, Remedies',
                    'Probity in Governance', 'Philosophical Basis of Governance & Integrity',
                    'Information Sharing & Transparency', 'Codes of Ethics & Codes of Conduct',
                    'Citizen\'s Charter', 'Work Culture, Quality of Service Delivery',
                    'Case Studies on Ethics in Administration', 'Utilitarian Ethics',
                ]
            },
            {
                id: 'upsc-mains-essay', icon: '✍️', title: 'Mains – Essay Paper (250 Marks)',
                desc: 'Two essays on any topic. Tests expression, clarity & depth.',
                topics: [
                    'Essay Writing – Structure & Format', 'Philosophical Essays',
                    'Social Issues Essays', 'Political & Governance Essays',
                    'Economic Development Essays', 'Science & Technology Essays',
                    'Environmental Essays', 'Ethics & Values Essays',
                    'International Relations Essays', 'Culture & Heritage Essays',
                    'Women Empowerment Essays', 'Education & Skill Development Essays',
                    'Vocabulary & Expression Building', 'Quote-Based Essays',
                ]
            },
            {
                id: 'upsc-mains-optional', icon: '📚', title: 'Mains – Optional Subject (2 Papers × 250 = 500 Marks)',
                desc: 'Choose one optional: History, Geography, Sociology, Pub Admin, etc.',
                topics: [
                    'Optional: History (Indian & World)', 'Optional: Geography (Physical & Human)',
                    'Optional: Sociology (Theory & Change)', 'Optional: Public Administration',
                    'Optional: Political Science & IR', 'Optional: Economics',
                    'Optional: Philosophy', 'Optional: Psychology',
                    'Optional: Anthropology', 'Optional: Law',
                    'Optional: Tamil/Telugu/Hindi Literature', 'Optional: Mathematics',
                    'Optional: STEM Subjects', 'Previous Year Questions Practice',
                ]
            },
        ]
    },

    tgpsc: {
        name: 'TGPSC (Group 1/2/3/4 Services)',
        color: '#10b981',
        subjects: [
            { id: 'tgpsc-gs', name: 'General Studies', icon: '📖', color: '#10b981' },
            { id: 'tgpsc-telangana', name: 'Telangana History & Movement', icon: '🌺', color: '#059669' },
            { id: 'tgpsc-polity', name: 'Polity & Governance', icon: '⚖️', color: '#6366f1' },
            { id: 'tgpsc-economy', name: 'Economy & Development', icon: '💰', color: '#f59e0b' },
            { id: 'tgpsc-science', name: 'Science & Technology', icon: '🔬', color: '#06b6d4' },
            { id: 'tgpsc-reasoning', name: 'Mental Ability & Reasoning', icon: '🧮', color: '#8b5cf6' },
            { id: 'tgpsc-current', name: 'Current Affairs (Telangana/National)', icon: '📰', color: '#84cc16' },
        ],
        papers: [
            {
                id: 'tgpsc-prelims', icon: '📋', title: 'Prelims – General Studies & Mental Ability (150 Marks)',
                desc: 'Group 1 Prelims. Objective type. 150 Questions.',
                topics: [
                    'History of Telangana – Ancient & Medieval', 'Telangana Movement (1969 Agitation)',
                    'Telangana State Formation 2014', 'Culture & Heritage of Telangana',
                    'Folk Arts – Perini, Gussadi, Kolattam', 'Tribes of Telangana',
                    'Famous Personalities of Telangana', 'Telangana Geography – Rivers (Godavari, Krishna)',
                    'Telangana Geography – Districts & Headquarters', 'Indian History – Ancient, Medieval, Modern',
                    'Freedom Struggle – Hyderabad Liberation', 'Indian Geography – Physical Features',
                    'Indian Polity – Constitution Basics', 'Fundamental Rights & Directive Principles',
                    'Parliament & State Legislature', 'Panchayati Raj (AP Reorganization Act 2014)',
                    'Indian Economy – Basics', 'Agriculture in Telangana',
                    'Irrigation Projects – Kaleshwaram, Srisailam', 'Government Schemes (TS-iPass, KCR Kit)',
                    'Science – Physics, Chemistry, Biology', 'Environmental Science',
                    'General Awareness', 'Current Affairs – Telangana State',
                    'Current Affairs – National & International', 'Mental Ability – Series Completion',
                    'Mental Ability – Analogies', 'Mental Ability – Coding-Decoding',
                    'Mental Ability – Blood Relations', 'Mental Ability – Direction Sense',
                    'Mental Ability – Data Interpretation', 'Mental Ability – Logical Reasoning',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p1', icon: '✍️', title: 'Group 1 Mains – Paper I (General Essay, 150 Marks)',
                desc: 'Descriptive. Essay on Social, Economic, Political, Environmental themes.',
                topics: [
                    'Essay Writing – Telangana Development', 'Essay Writing – Social Issues (Women Empowerment)',
                    'Essay Writing – Agriculture & Farmers', 'Essay Writing – IT & Infrastructure',
                    'Essay Writing – Governance & Administration', 'Essay Writing – Environmental Conservation',
                    'Essay Writing – Education & Skill Development', 'Essay Writing – Tribal Welfare',
                    'Essay Writing – Water Resources Management', 'Current Affairs Based Essays',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p2', icon: '🏛️', title: 'Group 1 Mains – Paper II (History, Culture & Geography)',
                desc: '150 Marks | Telangana History, Indian History, World History, Geography',
                topics: [
                    'Indus Valley Civilization', 'Vedic Period & Later Vedic',
                    'Mauryan Empire & Ashokan Policy', 'Satavahana Dynasty (Telangana Connection)',
                    'Kakatiyas – Administration & Culture', 'Vijayanagara Empire',
                    'Qutub Shahi Dynasty & Hyderabad', 'Nizams of Hyderabad (1724-1948)',
                    'Hyderabad State Accession 1948', 'Telangana Movement History',
                    'British Rule – Policies, Effects in Hyderabad', 'Freedom Movement – Telangana Aspect',
                    'Art & Culture – Kakatiya Era Architecture', 'Physical Geography – Deccan Plateau',
                    'Telangana Geography – Landforms, Climate', 'Godavari & Krishna River Systems',
                    'World History – Renaissance, Industrial Revolution', 'World History – World Wars',
                    'Post-Independence India', 'Geopolitics of South Asia',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p3', icon: '⚖️', title: 'Group 1 Mains – Paper III (Society, Constitution & Governance)',
                desc: '150 Marks | Indian Society, Constitution, Polity, Public Administration',
                topics: [
                    'Indian Constitution – Features & Framers', 'Fundamental Rights (Articles 12-35)',
                    'Fundamental Duties & DPSPs', 'Constitutional Amendments (Major ones)',
                    'Parliament – Structure, Functions, Committees', 'State Legislature – TS Assembly & Council',
                    'Executive – President, Governor, CM', 'Judiciary – SC, HC, Subordinate Courts',
                    'Panchayati Raj (73rd Amendment)', 'Urban Local Bodies (74th Amendment)',
                    'TSPC, State Public Service Commission', 'Telangana State Administration',
                    'District Administration', 'Police Administration in TS',
                    'Social Structure – Caste, Religion, Tribes', 'Women\'s Issues & Empowerment',
                    'SC/ST Welfare – Constitutional Safeguards', 'Social Reform Movements in AP/Telangana',
                    'Urbanization – Smart Cities in TS', 'RTI Act & Transparency',
                    'Ethics in Public Administration', 'E-Governance in Telangana',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p4', icon: '💰', title: 'Group 1 Mains – Paper IV (Economy & Development)',
                desc: '150 Marks | Indian & Telangana Economy, Development, Planning',
                topics: [
                    'Indian Economy – Structural Features', 'National Income Concepts – GDP, GNP, NNP',
                    'Economic Planning in India – Five Year Plans', 'NITI Aayog vs Planning Commission',
                    'Agriculture in India – Challenges & Reforms', 'Green Revolution & Its Impact',
                    'Land Reforms in Telangana', 'Telangana Agriculture – Mission Kakatiya, Rythu Bandhu',
                    'Irrigation in TS – Kaleshwaram Lift Irrigation', 'Telangana Budget & Revenue',
                    'MSME & Industrial Policy', 'IT Sector in Hyderabad – HITEC City',
                    'Foreign Trade & Balance of Payments', 'RBI – Functions & Monetary Policy',
                    'Banking Sector Reforms', 'GST – Implementation & Impact',
                    'Public Finance – Fiscal Policy, Deficit Types', 'Poverty Alleviation Programmes',
                    'Human Development Index', 'SDGs – India\'s Progress',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p5', icon: '🔬', title: 'Group 1 Mains – Paper V (Science, Technology & Data Interpretation)',
                desc: '150 Marks | S&T, Environment, Data Interpretation',
                topics: [
                    'Basic Physics – Mechanics, Electricity, Light', 'Basic Chemistry – Reactions, Acids, Bases',
                    'Biology – Cell, Genetics, Evolution', 'Human Biology – Systems & Diseases',
                    'Biotechnology – GM Crops, Cloning', 'Space Science – ISRO, PSLV, GSLV',
                    'Nuclear Energy – Reactors & Policy', 'Renewable Energy – Solar, Wind in TS',
                    'Defence Technology', 'IT & Communication Technology',
                    'Cybersecurity', 'Digital Telangana Initiatives',
                    'Environment – Ecosystems & Biodiversity', 'Environmental Laws & Acts',
                    'Pollution – Types & Control Measures', 'Climate Change & Carbon Emissions',
                    'Natural Disasters – Floods, Cyclones in TS', 'Disaster Management – NDMA, TSDMA',
                    'Data Interpretation – Tables & Graphs', 'Data Interpretation – Pie Charts & Bar Graphs',
                    'Data Sufficiency', 'Statistical Analysis Basics',
                ]
            },
            {
                id: 'tgpsc-g1-mains-p6', icon: '🌺', title: 'Group 1 Mains – Paper VI (Telangana Movement & State Formation)',
                desc: '150 Marks | The most crucial paper for TGPSC',
                topics: [
                    'Telangana Region – Historical Background', 'Hyderabad State – Nizam Rule',
                    'Police Action 1948 – Operation Polo', 'States Reorganisation Act 1956',
                    'Gentlemen\'s Agreement 1956', 'Mulki Rules Issue',
                    '1969 Telangana Agitation – Causes & Events', 'JAC & Student Leadership in 1969',
                    'Telangana People\'s Convention (TPS)', 'Eight Point Formula 1969',
                    'Post-1969 Developments', 'Andhra Agitation 1972',
                    'KCR & Telangana Rashtra Samithi (TRS/BRS)', 'Second Agitation 2000-2014',
                    'Key Milestones – Srikrishna Committee Report', 'TRS Political History',
                    'AP Reorganisation Act 2014 (APRA)', 'Formation of Telangana State – June 2, 2014',
                    'Post-Statehood Development – KCR Government', 'Discrimination Issues – Jobs, Education, Water',
                    'Key Leaders – Chenna Reddy, Rajaiah, Kondal Rao', 'Cultural Identity of Telangana',
                    'Telangana State – Districts Reorganization 2016', '33 Districts Formation',
                ]
            },
            {
                id: 'tgpsc-g2', icon: '📋', title: 'Group 2 – 4 Papers (Objective, 600 Marks)',
                desc: 'Paper I: GS, Paper II: History/Polity, Paper III: Economy, Paper IV: Telangana Movement',
                topics: [
                    'General Studies & General Abilities', 'Telangana Culture & Heritage',
                    'Indian History – Brief Overview', 'Indian Polity – Basics',
                    'Indian Society – Key Features', 'Telangana History & Movement',
                    'Indian & Telangana Economy', 'Rural Development Schemes',
                    'Telangana Formation – Key Events', 'Mental Ability – Reasoning',
                    'Quantitative Aptitude – Basic Maths', 'English Language Skills',
                    'Computer Literacy Basics', 'Current Affairs (Last 6 Months)',
                ]
            },
            {
                id: 'tgpsc-g3', icon: '📝', title: 'Group 3 – 3 Papers (Objective, 450 Marks)',
                desc: 'Paper I: GS, Paper II: History/Polity/Society, Paper III: Economy',
                topics: [
                    'Telangana State GK – Districts, Capitals, Rivers', 'Telangana Culture – Festivals, Art',
                    'General Science Basics', 'Indian Polity – Simple Concepts',
                    'Fundamental Rights & Duties', 'History of Telangana – Summary',
                    'Telangana Movement – Key Events', 'Indian Economy – Basic Concepts',
                    'Agriculture & Rural Economy', 'Environmental Awareness',
                    'Current Affairs – State & National', 'Mental Ability – Easy Level',
                    'Basic Arithmetic', 'English Grammar Basics',
                ]
            },
            {
                id: 'tgpsc-g4', icon: '📄', title: 'Group 4 – 2 Papers (Objective, 300 Marks) + CPT',
                desc: 'Paper I: General Knowledge, Paper II: Secretarial Abilities, Computer Proficiency Test',
                topics: [
                    'General Knowledge – Telangana State', 'GK – India & World',
                    'Current Affairs – Last 3 Months', 'Basic Indian History',
                    'Basic Geography', 'Basic Polity (Constitution)',
                    'Basic Economy', 'Secretarial Abilities – Office Procedures',
                    'File Noting & Drafting', 'Office Management Basics',
                    'Basic Computer Skills – MS Office', 'Internet & Email Usage',
                    'Computer Hardware Basics', 'Keyboard Shortcut Skills',
                ]
            },
        ]
    },

    bank: {
        name: 'Bank Exams (IBPS/SBI PO & Clerk)',
        color: '#06b6d4',
        subjects: [
            { id: 'bank-reasoning', name: 'Reasoning Ability', icon: '🧩', color: '#6366f1' },
            { id: 'bank-quant', name: 'Quantitative Aptitude', icon: '🔢', color: '#10b981' },
            { id: 'bank-english', name: 'English Language', icon: '📝', color: '#06b6d4' },
            { id: 'bank-ga', name: 'General/Banking Awareness', icon: '🏦', color: '#f59e0b' },
            { id: 'bank-computer', name: 'Computer Aptitude', icon: '💻', color: '#8b5cf6' },
        ],
        papers: [
            {
                id: 'bank-reasoning-paper', icon: '🧩', title: 'Reasoning Ability (Prelims + Mains)',
                desc: 'High-scoring section. Puzzles dominate Mains.',
                topics: [
                    'Puzzles – Linear Arrangement', 'Puzzles – Circular Arrangement (Inward & Outward)',
                    'Puzzles – Square/Rectangular Arrangement', 'Puzzles – Floor & Building Based',
                    'Puzzles – Box & Stack Based', 'Puzzles – Month, Day, Year Based',
                    'Puzzles – Scheduling & Comparison', 'Syllogism – Possibility & Definite Conclusion',
                    'Coding-Decoding – New Pattern (Symbol/Number)', 'Blood Relations – Direct & Coded',
                    'Direction Sense – Distance & Shadow Problems', 'Ranking & Ordering',
                    'Alphanumeric Series', 'Number Series (Missing/Wrong)',
                    'Inequalities – Coded & Direct', 'Data Sufficiency – Two Statement',
                    'Machine Input-Output', 'Statement & Assumptions',
                    'Statement & Conclusion', 'Course of Action',
                    'Statement & Arguments', 'Cause & Effect',
                    'Verbal Reasoning – Odd One Out', 'Logical Venn Diagrams',
                ]
            },
            {
                id: 'bank-quant-paper', icon: '🔢', title: 'Quantitative Aptitude (Prelims + Mains)',
                desc: 'Arithmetic + Data Interpretation + Number Series. Strong DI skills needed.',
                topics: [
                    'Number Series – Missing & Wrong', 'Simplification & Approximation',
                    'Quadratic Equations', 'Percentage',
                    'Ratio & Proportion', 'Average',
                    'Mixtures & Alligations', 'Simple Interest (SI)',
                    'Compound Interest (CI)', 'Profit & Loss',
                    'Discount – Marked Price', 'Time, Speed & Distance',
                    'Problems on Trains', 'Boats & Streams',
                    'Time & Work', 'Pipes & Cisterns',
                    'Partnership', 'Permutation & Combination',
                    'Probability', 'Age Problems',
                    'DI – Bar Graphs', 'DI – Line Graphs',
                    'DI – Pie Charts', 'DI – Tables',
                    'DI – Caselet (Paragraph Based DI)', 'DI – Mixed Graph',
                    'Mensuration – 2D & 3D', 'Number System Basics',
                    'Surds & Indices', 'Sequence & Series',
                ]
            },
            {
                id: 'bank-english-paper', icon: '📝', title: 'English Language (Prelims + Mains)',
                desc: 'Reading Comprehension, Cloze Test, Sentence Correction, Para Jumbles.',
                topics: [
                    'Reading Comprehension (RC) – Story Based', 'RC – Economy/Banking Themed',
                    'RC – Social Issue Themed', 'RC – Vocabulary Questions',
                    'Cloze Test – Fill in the Blanks', 'Error Spotting – Parts of Sentence',
                    'Phrase Replacement / Sentence Correction', 'Para Jumbles – Rearranging Sentences',
                    'Para Completion – Selecting Best Sentence', 'Sentence Connectors',
                    'Word Usage – Double Fillers', 'Column-Based Sentence Fillers',
                    'Vocabulary – Synonyms, Antonyms', 'Idioms & Phrases',
                    'One Word Substitution', 'Spelling Errors',
                    'Active & Passive Voice', 'Direct & Indirect Speech',
                    'Spotting Errors – Grammar Rules', 'Sentence Starters',
                ]
            },
            {
                id: 'bank-ga-paper', icon: '🏦', title: 'General/Banking Awareness (Mains Only)',
                desc: 'Crucial for Mains. Banking & Finance + Current Affairs + Static GK.',
                topics: [
                    'RBI – Functions, Monetary Policy, Tools', 'RBI – Governor, Deputy Governors',
                    'Monetary Policy Committee (MPC)', 'Repo Rate, Reverse Repo, SLR, CRR, MSF',
                    'Types of Banks in India', 'Nationalization of Banks (1969, 1980)',
                    'NABARD, SIDBI, NHB, EXIM Bank', 'Basel Norms (Basel I, II, III)',
                    'NPA – Types, SARFAESI Act', 'Insolvency & Bankruptcy Code (IBC)',
                    'Banking Reforms – Narasimham Committee', 'Payment Banks & Small Finance Banks',
                    'UPI, RTGS, NEFT, IMPS', 'Financial Inclusion – PMJDY, PM-KMY',
                    'Insurance – LIC, IRDAI', 'Capital Market – SEBI, BSE, NSE',
                    'Mutual Funds & FDI/FII', 'Government Securities (G-Sec)',
                    'Budget Terminology – Deficit, Revenue, Capital', 'Economic Survey & Key Data',
                    'Banking Current Affairs (Last 6 Months)', 'Current Affairs – National',
                    'Current Affairs – International & Sports', 'Static GK – Countries & Capitals',
                    'National Parks & Rivers', 'Awards & Recognitions',
                    'Important Days & Themes', 'Sports Events & Champions',
                ]
            },
            {
                id: 'bank-computer-paper', icon: '💻', title: 'Computer Aptitude (Mains – Some Exams)',
                desc: 'Basics of hardware, software, networking, MS Office, Internet.',
                topics: [
                    'History of Computers', 'Computer Generations',
                    'Input & Output Devices', 'Memory – RAM, ROM, Cache',
                    'Storage Devices – HDD, SSD, USB', 'CPU Components & Functions',
                    'Operating System – Windows, Linux Basics', 'MS Word – Features & Shortcuts',
                    'MS Excel – Formulas, Functions', 'MS PowerPoint Basics',
                    'Internet – WWW, URLs, HTTP/HTTPS', 'Email & E-commerce',
                    'Networking – LAN, WAN, MAN', 'Network Devices – Router, Hub, Switch',
                    'Cybersecurity – Threats & Protection', 'Database – DBMS Basics',
                    'Programming Languages Overview', 'Binary & Number Systems',
                    'Data Communication Basics', 'Cloud Computing',
                ]
            },
        ]
    },

    ssc: {
        name: 'SSC (CGL, CHSL, MTS, CPO)',
        color: '#f59e0b',
        subjects: [
            { id: 'ssc-reasoning', name: 'General Intelligence & Reasoning', icon: '🧩', color: '#6366f1' },
            { id: 'ssc-quant', name: 'Quantitative Aptitude', icon: '🔢', color: '#10b981' },
            { id: 'ssc-english', name: 'English Language', icon: '📝', color: '#06b6d4' },
            { id: 'ssc-gk', name: 'General Awareness', icon: '🌍', color: '#f59e0b' },
        ],
        papers: [
            {
                id: 'ssc-reasoning-paper', icon: '🧩', title: 'General Intelligence & Reasoning (All SSC Exams)',
                desc: 'Verbal + Non-Verbal Reasoning. High scoring with practice.',
                topics: [
                    'Analogies – Word, Number, Letter', 'Odd One Out – Word, Figure, Number',
                    'Series – Number, Letter, Alphabet, Mixed', 'Coding-Decoding – Letter/Number',
                    'Blood Relations', 'Direction & Distance',
                    'Ranking & Arrangement', 'Syllogism – All/Some/No',
                    'Seating Arrangement – Linear & Circular', 'Venn Diagrams',
                    'Mathematical Operations (BODMAS Puzzles)', 'Statement & Conclusion',
                    'Statement & Assumptions', 'Mirror & Water Image',
                    'Paper Folding & Cutting', 'Embedded Figures',
                    'Figure Completion', 'Counting Figures (Triangles, Squares)',
                    'Cube & Dice', 'Matrix & Non-Verbal Problems',
                    'Clock & Calendar', 'Missing Number in Matrix',
                ]
            },
            {
                id: 'ssc-quant-paper', icon: '🔢', title: 'Quantitative Aptitude (All SSC Exams)',
                desc: 'Arithmetic + Advanced Maths for CGL. Basic for CHSL/MTS.',
                topics: [
                    'Number System – Classification, HCF, LCM', 'BODMAS & Simplification',
                    'Percentage – Concept & Applications', 'Ratio & Proportion',
                    'Average', 'Age Problems',
                    'Partnership', 'Simple Interest',
                    'Compound Interest', 'Profit, Loss & Discount',
                    'Time, Speed & Distance', 'Relative Speed – Trains & Boats',
                    'Time & Work – Chain Rule', 'Pipes & Cisterns',
                    'Mixture & Alligation', 'Sequence & Series (AP, GP)',
                    'Algebra – Linear & Quadratic Equations', 'Algebra – Polynomials',
                    'Trigonometry – Ratios, Identities', 'Trigonometry – Height & Distance',
                    'Geometry – Lines, Angles, Triangles', 'Geometry – Circles, Quadrilaterals',
                    'Mensuration – Area, Perimeter (2D)', 'Mensuration – Surface Area, Volume (3D)',
                    'Data Interpretation – Tables', 'Data Interpretation – Bar/Pie/Line Graph',
                    'Statistics – Mean, Median, Mode', 'Probability Basics',
                    'Surds & Indices', 'Number Theory – Divisibility Rules',
                ]
            },
            {
                id: 'ssc-english-paper', icon: '📝', title: 'English Language & Comprehension (All SSC Exams)',
                desc: 'Grammar + Vocabulary + Comprehension. 200-mark paper in CGL Tier II.',
                topics: [
                    'Reading Comprehension', 'Vocabulary – Synonyms',
                    'Vocabulary – Antonyms', 'Idioms & Phrases',
                    'One Word Substitution', 'Error Spotting – Parts of Speech',
                    'Fill in the Blanks – Grammar', 'Sentence Completion',
                    'Phrase Replacement / Sentence Improvement', 'Para Jumbles',
                    'Active & Passive Voice', 'Direct & Indirect Speech (Narration)',
                    'Cloze Test', 'Spelling Errors',
                    'Spelling Correction', 'Comprehension – Inference Based',
                    'Sentence Structure – Subject-Verb Agreement', 'Articles & Prepositions',
                    'Tenses – Simple, Continuous, Perfect', 'Modals & Conditionals',
                ]
            },
            {
                id: 'ssc-ga-paper', icon: '🌍', title: 'General Awareness (All SSC Exams)',
                desc: 'History, Geography, Polity, Economy, Science, Current Affairs. Static + Dynamic GK.',
                topics: [
                    'Indian History – Ancient Civilizations', 'Indian History – Gupta, Maurya, Medieval',
                    'Mughal Empire – Administration & Culture', 'British India – Key Events',
                    'Freedom Movement – Key Leaders & Events', 'Post-Independence India',
                    'World History Highlights', 'Physical Geography – Earth & Universe',
                    'Indian Geography – Physical Features', 'Rivers, Lakes & Dams of India',
                    'Climate & Monsoon of India', 'Economic Geography – Agriculture & Resources',
                    'Political Geography – States, Capitals, UTs', 'Indian Polity – Constitution Basics',
                    'Fundamental Rights & Duties', 'Parliament & Judiciary',
                    'Indian Economy – Basic Concepts', 'Five Year Plans & NITI Aayog',
                    'General Science – Physics (Heat, Sound, Light, Force)', 'General Science – Chemistry (Elements, Compounds, Acids)',
                    'General Science – Biology (Cell, Human Body)', 'General Science – Nutrition & Diseases',
                    'Computer Science Basics', 'Science & Technology Current',
                    'Environment & Ecology Basics', 'Art & Culture of India',
                    'Misc GK – Books & Authors, National Symbols', 'Awards – Nobel, Bharat Ratna, Padma',
                    'Sports – Olympics, Commonwealth, Asian Games', 'Current Affairs – Last 6 Months',
                ]
            },
            {
                id: 'ssc-cgl-tier2', icon: '📊', title: 'SSC CGL Tier II – Advanced (Statistics & GK Finance)',
                desc: 'Only for specific CGL posts. Statistics + Finance & Accounting',
                topics: [
                    'Statistics – Measures of Central Tendency', 'Statistics – Dispersion (Variance, SD)',
                    'Statistics – Correlation & Regression', 'Statistics – Probability Distributions',
                    'Statistics – Index Numbers', 'Statistics – Time Series',
                    'Statistics – Sampling Theory', 'Finance – Capital Budgeting',
                    'Financial Accounting Basics', 'Accounting Principles & Standards',
                    'Government Finance & Budgeting', 'Audit & Accounts (CAG)',
                    'Economics – Demand & Supply', 'Economics – Market Structures',
                    'Computer Proficiency for DEO Posts', 'Speed Typing Practice',
                ]
            },
        ]
    }
};

// ============================================================
// MOTIVATIONAL QUOTES
// ============================================================
const QUOTES = [
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "Strive for progress, not perfection.", author: "Unknown" },
    { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward" },
    { text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.", author: "Marie Forleo" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Persistence is the key to success in any competitive exam.", author: "Unknown" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Excellence is not a destination but a continuous journey that never ends.", author: "Brian Tracy" },
    { text: "The civil servant's life is one of service and sacrifice. Prepare accordingly.", author: "Unknown" },
];

// ============================================================
// APP STATE
// ============================================================
let appState = {
    currentSection: 'dashboard',
    currentExam: 'upsc',
    currentSyllabusExam: 'upsc',
    sessions: [],
    topicProgress: {}, // { topicId: true/false }
    notes: [],
    studyLog: [],
    streak: 0,
    lastStudyDate: null,
    quoteIndex: 0,
    timerState: {
        mode: 'focus',
        isRunning: false,
        timeLeft: 25 * 60,
        totalTime: 25 * 60,
        pomodoroCount: 0,
        totalFocusMinutes: 0,
        sessionMinutes: 0,
    },
    timerSettings: { focus: 25, short: 5, long: 15 },
    weekOffset: 0,
    editingSession: null,
    editingNote: null,
    selectedPriority: 'medium',
    selectedNoteColor: '#6366f1',
    settings: {
        name: 'Aspirant',
        exam: 'upsc',
        goal: 8,
        examDate: '',
        geminiApiKey: localStorage.getItem('studymaster_gemini_key') || '',
    },
    completedSessions: {},
    timerInterval: null,
    calendarData: {}, // { 'YYYY-MM-DD': minutes }
    timeline: [],
    timelineCompleted: {}, // { dateStr: true/false }
};

// ============================================================
// SYNC STATUS HELPERS
// ============================================================
function setSyncStatus(status) {
    // status: 'synced' | 'syncing' | 'error' | 'offline'
    const dot = document.getElementById('sync-dot');
    const label = document.getElementById('sync-label');
    if (!dot || !label) return;
    dot.className = 'sync-dot';
    if (status === 'syncing') { dot.classList.add('syncing'); label.textContent = 'Syncing…'; }
    else if (status === 'error') {
        dot.classList.add('error'); label.textContent = 'Offline';
        addInAppNotif('error', '❌ Sync failed — changes saved locally. Will retry on next action.');
    }
    else { label.textContent = 'Synced'; } // green pulse by default
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function saveState() {
    // Always keep localStorage as fast offline fallback
    try {
        const toSave = { ...appState };
        delete toSave.timerInterval;
        localStorage.setItem('studymaster_state', JSON.stringify(toSave));
    } catch (e) { }
    // Cloud sync is handled per-operation (see syncXxx functions below)
}

function loadState() {
    try {
        const raw = localStorage.getItem('studymaster_state');
        if (raw) {
            const saved = JSON.parse(raw);
            Object.assign(appState, saved);
            appState.timerInterval = null;
            if (!appState.calendarData) appState.calendarData = {};
        }
    } catch (e) { }
}

// ============================================================
// SUPABASE DATA LAYER — Load all user data on login
// ============================================================
async function loadFromSupabase() {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        const uid = currentUser.id;

        // Sessions
        const { data: sessions } = await db.from('sessions').select('*').eq('user_id', uid);
        if (sessions) {
            appState.sessions = sessions.map(s => ({
                id: s.id, exam: s.exam, subject: s.subject,
                day: s.day, start: s.start_time, end: s.end_time,
                topic: s.topic, priority: s.priority,
                repeat: s.repeat_type, createdAt: s.created_at,
            }));
        }

        // Topic progress
        const { data: progress } = await db.from('topic_progress').select('*').eq('user_id', uid);
        if (progress) {
            appState.topicProgress = {};
            progress.forEach(p => { appState.topicProgress[p.topic_id] = p.completed; });
        }

        // Notes
        const { data: notes } = await db.from('notes').select('*').eq('user_id', uid).order('created_at', { ascending: false });
        if (notes) {
            appState.notes = notes.map(n => ({
                id: n.id, title: n.title, content: n.content,
                tag: n.tag, color: n.color, createdAt: n.created_at,
            }));
        }

        // Study log
        const { data: log } = await db.from('study_log').select('*').eq('user_id', uid).order('logged_at', { ascending: false });
        if (log) {
            appState.studyLog = log.map(l => ({
                subject: l.subject, duration: l.minutes,
                date: l.date, color: l.color,
            }));
        }

        // User settings — use maybeSingle() so new users (no row yet) get null instead of a 406 error
        const { data: settings } = await db.from('user_settings').select('*').eq('user_id', uid).maybeSingle();
        if (settings) {
            appState.settings = {
                name: settings.name || 'Aspirant',
                exam: settings.exam || 'upsc',
                goal: settings.goal || 8,
                examDate: settings.exam_date || '',
                geminiApiKey: localStorage.getItem('studymaster_gemini_key') || '',
            };
            appState.streak = settings.streak || 0;
            appState.lastStudyDate = settings.last_study_date || null;
            appState.timerState.pomodoroCount = settings.pomodoro_count || 0;
            appState.calendarData = settings.calendar_data || {};
        }


        // Persist to localStorage as offline cache
        saveState();
        setSyncStatus('synced');
    } catch (e) {
        console.warn('Supabase load error:', e);
        setSyncStatus('error');
        // Fall back to localStorage
        loadState();
    }
}

// ============================================================
// SUPABASE DATA LAYER — Sync individual data types
// ============================================================
async function syncSession(session, isDelete = false) {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        if (isDelete) {
            await db.from('sessions').delete().eq('id', session.id).eq('user_id', currentUser.id);
        } else {
            await db.from('sessions').upsert({
                id: session.id, user_id: currentUser.id,
                exam: session.exam, subject: session.subject,
                day: session.day, start_time: session.start, end_time: session.end,
                topic: session.topic, priority: session.priority,
                repeat_type: session.repeat,
            }, { onConflict: 'id' });
        }
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}

async function syncTopicProgress(key, completed) {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        await db.from('topic_progress').upsert({
            user_id: currentUser.id, topic_id: key, completed,
        }, { onConflict: 'user_id,topic_id' });
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}

async function syncNote(note, isDelete = false) {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        if (isDelete) {
            await db.from('notes').delete().eq('id', note.id).eq('user_id', currentUser.id);
        } else {
            await db.from('notes').upsert({
                id: note.id, user_id: currentUser.id,
                title: note.title, content: note.content,
                tag: note.tag, color: note.color,
            }, { onConflict: 'id' });
        }
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}

async function syncStudyLogEntry(entry) {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        await db.from('study_log').insert({
            user_id: currentUser.id,
            subject: entry.subject, minutes: entry.duration,
            date: entry.date, color: entry.color,
        });
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}

async function syncUserSettings() {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        await db.from('user_settings').upsert({
            user_id: currentUser.id,
            name: appState.settings.name,
            exam: appState.settings.exam,
            goal: appState.settings.goal,
            exam_date: appState.settings.examDate,
            streak: appState.streak,
            last_study_date: appState.lastStudyDate,
            pomodoro_count: appState.timerState.pomodoroCount,
            calendar_data: appState.calendarData,
        }, { onConflict: 'user_id' });
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}

async function clearStudyLogOnSupabase() {
    if (!currentUser) return;
    setSyncStatus('syncing');
    try {
        await db.from('study_log').delete().eq('user_id', currentUser.id);
        setSyncStatus('synced');
    } catch (e) { setSyncStatus('error'); }
}


function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function getDateStr(date = new Date()) {
    return date.toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(msg, type = 'info') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || '📢'}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

// ============================================================
// EXAM COLOR MAP
// ============================================================
const EXAM_COLORS = {
    upsc: { bg: '#6366f1', light: 'rgba(99,102,241,0.15)' },
    tgpsc: { bg: '#10b981', light: 'rgba(16,185,129,0.15)' },
    bank: { bg: '#06b6d4', light: 'rgba(6,182,212,0.15)' },
    ssc: { bg: '#f59e0b', light: 'rgba(245,158,11,0.15)' },
};

function getSubjectColor(subjectId) {
    const exam = Object.values(EXAM_SYLLABI).find(e => e.subjects.some(s => s.id === subjectId));
    if (exam) {
        const sub = exam.subjects.find(s => s.id === subjectId);
        return sub ? sub.color : '#6366f1';
    }
    return '#6366f1';
}

// ============================================================
// INITIALIZATION
// ============================================================
let appInitialized = false; // Guard: prevents initApp running more than once

document.addEventListener('DOMContentLoaded', () => {
    // Auth listener — Supabase fires this on every page load to restore session
    db.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user ?? null;

        if (currentUser) {
            if (!appInitialized) {
                // First time: load data then launch app
                showLoadingScreen('Syncing your study data...');
                loadState();
                await loadFromSupabase();
                hideAuthScreen();
                hideLoadingScreen();
                initApp();
                appInitialized = true;

                // Show user email in sidebar
                const emailEl = document.getElementById('sidebar-user-email');
                if (emailEl) emailEl.textContent = currentUser.email;

                // Request browser notification permission after login
                if ('Notification' in window && Notification.permission === 'default') {
                    setTimeout(() => Notification.requestPermission(), 3000);
                }

                // Welcome back notification
                addInAppNotif('info', `👋 Welcome back! Data synced successfully.`);
            }
        } else {
            // Signed out or no session — show auth screen
            appInitialized = false;
            showAuthScreen();
        }
    });

    // Enter-key support on auth inputs
    document.getElementById('auth-password')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleAuthSubmit();
    });
    document.getElementById('auth-confirm')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleAuthSubmit();
    });
    document.getElementById('auth-email')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('auth-password')?.focus();
    });

    // Close notification panel when clicking outside
    document.addEventListener('click', e => {
        const wrapper = document.getElementById('notif-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            document.getElementById('notif-panel')?.classList.remove('open');
        }
    });

    // Hashchange listener for URL router
    window.addEventListener('hashchange', () => {
        const section = window.location.hash.substring(1);
        const validSections = ['dashboard', 'timetable', 'syllabus', 'progress', 'timer', 'notes', 'ai'];
        if (validSections.includes(section) && appState.currentSection !== section) {
            showSection(section);
        }
    });
});

function initApp() {
    updateDateTime();
    setInterval(updateDateTime, 60000);
    updateGreeting();
    applySettings();
    renderTimetableGrid();
    renderTodaySchedule();
    renderStatCards();
    renderSubjectProgress();
    renderSyllabus();
    renderExamProgressBars();
    renderStudyLog();
    renderCalendarHeatmap();
    renderWeeklyHeatmap();
    renderSessionList();
    renderNotes();
    populateSubjectSelects();
    renderTimerSubjects();
    updateStreakDisplay();
    refreshQuote();
    renderCountdownBanner();
    populateNoteTagFilter();
    renderTimelineList();
    
    // Hash routing initialization
    const initialSection = window.location.hash.substring(1) || appState.currentSection || 'dashboard';
    showSection(initialSection);
}

// ============================================================
// NAVIGATION
// ============================================================
function showSection(name) {
    const validSections = ['dashboard', 'timetable', 'syllabus', 'progress', 'timer', 'notes', 'ai'];
    if (!validSections.includes(name)) name = 'dashboard';

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const sec = document.getElementById(`section-${name}`);
    if (sec) sec.classList.add('active');
    
    const navItem = document.querySelector(`.nav-item[data-section="${name}"]`);
    if (navItem) navItem.classList.add('active');
    
    appState.currentSection = name;
    
    // Update hash router
    if (window.location.hash !== '#' + name) {
        window.location.hash = name;
    }
    
    if (name === 'timetable') renderTimetableGrid();
    if (name === 'syllabus') renderSyllabus();
    if (name === 'progress') { renderExamProgressBars(); renderStudyLog(); renderCalendarHeatmap(); }
    if (name === 'notes') renderNotes();
    if (window.innerWidth < 900) closeSidebar();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (window.innerWidth < 900) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    } else {
        sidebar.classList.toggle('collapsed');
        document.getElementById('main-content').classList.toggle('expanded');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
}

// ============================================================
// SETTINGS & EXAM
// ============================================================
function openSettings() {
    document.getElementById('settings-name').value = appState.settings.name;
    document.getElementById('settings-exam').value = appState.settings.exam;
    document.getElementById('settings-goal').value = appState.settings.goal;
    document.getElementById('settings-exam-date').value = appState.settings.examDate || '';
    document.getElementById('settings-api-key').value = appState.settings.geminiApiKey || '';
    openModal('settings-modal');
}

function saveSettings() {
    appState.settings.name = document.getElementById('settings-name').value.trim() || 'Aspirant';
    appState.settings.exam = document.getElementById('settings-exam').value;
    appState.settings.goal = parseInt(document.getElementById('settings-goal').value) || 8;
    appState.settings.examDate = document.getElementById('settings-exam-date').value;
    const apiKey = document.getElementById('settings-api-key').value.trim();
    appState.settings.geminiApiKey = apiKey;
    localStorage.setItem('studymaster_gemini_key', apiKey);
    applySettings();
    saveState();
    syncUserSettings();
    closeModal('settings-modal');
    showToast('Settings saved!', 'success');
}

function applySettings() {
    const { name, exam } = appState.settings;
    document.getElementById('profile-name-nav').textContent = name;
    document.getElementById('profile-avatar-nav').textContent = name.charAt(0).toUpperCase();
    document.getElementById('profile-exam-nav').textContent = EXAM_SYLLABI[exam]?.name?.split(' ')[0] || 'UPSC';
    document.getElementById('greeting-name').textContent = name;
    setExam(appState.currentExam, false);
    renderCountdownBanner();
}

function setExam(exam, save = true) {
    appState.currentExam = exam;
    document.querySelectorAll('.exam-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.exam === exam);
    });
    document.body.setAttribute('data-exam', exam);
    document.getElementById('dashboard-exam-badge').textContent = exam.toUpperCase();
    populateSubjectSelects();
    renderSubjectProgress();
    renderTodaySchedule();
    renderSessionList();
    renderTimerSubjects();
    if (save) saveState();
}

// ============================================================
// DATE & GREETING
// ============================================================
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-IN', options);
}

function updateGreeting() {
    const h = new Date().getHours();
    let time = 'Morning';
    if (h >= 12 && h < 17) time = 'Afternoon';
    else if (h >= 17 && h < 21) time = 'Evening';
    else if (h >= 21 || h < 5) time = 'Night';
    document.getElementById('greeting-time').textContent = time;
}

// ============================================================
// THEME TOGGLE
// ============================================================
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    document.getElementById('theme-btn').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('studymaster_theme', isLight ? 'light' : 'dark');
}

// Load saved theme
if (localStorage.getItem('studymaster_theme') === 'light') {
    document.body.classList.add('light-theme');
    setTimeout(() => {
        const btn = document.getElementById('theme-btn');
        if (btn) btn.textContent = '☀️';
    }, 100);
}

// ============================================================
// QUOTES
// ============================================================
function refreshQuote() {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    document.getElementById('quote-text').textContent = `"${q.text}"`;
    document.getElementById('quote-author').textContent = `— ${q.author}`;
}

// ============================================================
// STAT CARDS
// ============================================================
function renderStatCards() {
    const today = getDateStr();
    const todayMins = appState.calendarData[today] || 0;
    document.getElementById('stat-today-hours').textContent =
        `${Math.floor(todayMins / 60)}h ${todayMins % 60}m`;

    const weekMins = getWeekMinutes();
    document.getElementById('stat-week-hours').textContent = `${Math.floor(weekMins / 60)}h`;

    const doneTopics = Object.values(appState.topicProgress).filter(Boolean).length;
    document.getElementById('stat-topics-done').textContent = doneTopics;

    document.getElementById('stat-streak').textContent = appState.streak;
}

function getWeekMinutes() {
    let total = 0;
    const now = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        total += appState.calendarData[getDateStr(d)] || 0;
    }
    return total;
}

// ============================================================
// TODAY'S SCHEDULE
// ============================================================
function renderTodaySchedule() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayStr = getDateStr();
    const todaySessions = appState.sessions.filter(s =>
        s.day === today && s.exam === appState.currentExam
    );
    const list = document.getElementById('today-schedule-list');

    if (!todaySessions.length) {
        list.innerHTML = `<div class="empty-state-sm"><span>📭</span><p>No sessions today.<br>Click "+ New Session" to add!</p></div>`;
        return;
    }

    todaySessions.sort((a, b) => a.start.localeCompare(b.start));
    list.innerHTML = todaySessions.map(s => {
        const done = appState.completedSessions[s.id] || false;
        
        let displaySubject = s.subject;
        let displayTopic = s.topic;
        if (appState.timeline && appState.timeline.length > 0) {
            const timelineDay = appState.timeline.find(td => td.date === todayStr);
            if (timelineDay) {
                if (s.start === "04:00" && timelineDay.morning) {
                    displayTopic = timelineDay.morning.desc;
                    displaySubject = timelineDay.morning.subject;
                } else if (s.start === "05:45" && timelineDay.optionalMorning) {
                    displayTopic = timelineDay.optionalMorning.desc;
                    displaySubject = timelineDay.optionalMorning.subject;
                } else if (s.start === "19:30" && timelineDay.evening1) {
                    displayTopic = timelineDay.evening1.desc;
                    displaySubject = timelineDay.evening1.subject;
                } else if (s.start === "20:45" && timelineDay.evening2) {
                    displayTopic = timelineDay.evening2.desc;
                    displaySubject = timelineDay.evening2.subject;
                } else if (s.start === "21:30" && timelineDay.test) {
                    displayTopic = timelineDay.test.desc;
                    displaySubject = timelineDay.test.subject;
                }
            }
        }
        const color = getSubjectColor(displaySubject);

        return `
        <div class="today-item" onclick="toggleSessionDone('${s.id}')">
            <div class="today-item-color" style="background:${color}"></div>
            <div class="today-item-info">
                <div class="today-item-subject">${getSubjectName(displaySubject)}</div>
                <div class="today-item-time">${s.start} – ${s.end} ${displayTopic ? '| ' + displayTopic : ''}</div>
            </div>
            <div class="today-item-check ${done ? 'done' : ''}">${done ? '✓' : ''}</div>
        </div>`;
    }).join('');
}

function toggleSessionDone(id) {
    appState.completedSessions[id] = !appState.completedSessions[id];
    const session = appState.sessions.find(s => s.id === id);
    if (session && appState.completedSessions[id]) {
        const today = getDateStr();
        // Estimate duration
        const [sh, sm] = session.start.split(':').map(Number);
        const [eh, em] = session.end.split(':').map(Number);
        const dur = (eh * 60 + em) - (sh * 60 + sm);
        if (dur > 0) {
            appState.calendarData[today] = (appState.calendarData[today] || 0) + dur;
            const logEntry = {
                subject: getSubjectName(session.subject),
                duration: dur,
                date: today,
                color: getSubjectColor(session.subject),
            };
            appState.studyLog.unshift(logEntry);
            updateStreak();
            syncStudyLogEntry(logEntry);
            syncUserSettings(); // update streak + calendarData
        }
        showToast(`✅ ${getSubjectName(session.subject)} session marked done!`, 'success');
        addInAppNotif('success', `✅ ${getSubjectName(session.subject)} – ${session.start}–${session.end} completed!`);
    }
    saveState();
    renderTodaySchedule();
    renderStatCards();
    renderStudyLog();
    renderCalendarHeatmap();
    renderWeeklyHeatmap();
}

function updateStreak() {
    const today = getDateStr();
    if (appState.lastStudyDate === today) return;
    const yesterday = getDateStr(new Date(Date.now() - 86400000));
    if (appState.lastStudyDate === yesterday) {
        appState.streak++;
        if (appState.streak % 5 === 0) {
            addInAppNotif('success', `🔥 ${appState.streak}-Day Streak! You're on fire! Keep going!`);
        }
    } else {
        if (appState.streak > 0) {
            addInAppNotif('warning', `⚠️ Streak reset. A new streak starts today — you got this!`);
        }
        appState.streak = 1;
    }
    appState.lastStudyDate = today;
    updateStreakDisplay();
}

function updateStreakDisplay() {
    document.getElementById('streak-display').textContent = `${appState.streak} Day Streak`;
    document.getElementById('stat-streak').textContent = appState.streak;
}

// ============================================================
// SUBJECT PROGRESS
// ============================================================
function renderSubjectProgress() {
    const list = document.getElementById('subject-progress-list');
    const exam = EXAM_SYLLABI[appState.currentExam];
    if (!exam) return;

    list.innerHTML = exam.subjects.map(sub => {
        // Filter papers that belong to this subject by matching the subject id prefix
        const subPrefix = sub.id; // e.g. 'upsc-gs1'
        const relatedPapers = exam.papers.filter(p => p.id.startsWith(subPrefix));
        // Calculate progress from topic progress for this subject's papers only
        let done = 0, total = 0;
        relatedPapers.forEach(p => {
            p.topics.forEach(t => {
                const key = `${p.id}_${t}`;
                total++;
                if (appState.topicProgress[key]) done++;
            });
        });
        const pct = total ? Math.round((done / total) * 100) : 0;
        return `
        <div class="subject-prog-item">
            <div class="subject-prog-header">
                <span class="subject-prog-name">${sub.icon} ${sub.name}</span>
                <span class="subject-prog-pct">${pct}%</span>
            </div>
            <div class="prog-bar">
                <div class="prog-bar-fill" style="width:${pct}%;background:${sub.color}"></div>
            </div>
        </div>`;
    }).join('');
}

// ============================================================
// WEEKLY HEATMAP
// ============================================================
function renderWeeklyHeatmap() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const heatmap = document.getElementById('weekly-heatmap');
    const today = new Date();
    const cells = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = getDateStr(d);
        const mins = appState.calendarData[ds] || 0;
        const level = mins === 0 ? 0 : mins < 60 ? 1 : mins < 180 ? 2 : mins < 360 ? 3 : 4;
        const isToday = i === 0;
        cells.push(`
        <div class="heat-cell h${level} ${isToday ? 'active-day' : ''}" title="${days[d.getDay()]} – ${mins}min">
            <span>${days[d.getDay()]}</span>
        </div>`);
    }
    heatmap.innerHTML = cells.join('');
}

// ============================================================
// TIMETABLE
// ============================================================
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [];
for (let h = 4; h <= 22; h++) {
    TIME_SLOTS.push(`${h.toString().padStart(2, '0')}:00`);
}

function renderTimetableGrid() {
    const grid = document.getElementById('timetable-grid');
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const weekOffset = appState.weekOffset;

    // Update week label
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const weekLabel = weekOffset === 0 ? 'This Week' : weekOffset < 0 ? `${Math.abs(weekOffset)} Week(s) Ago` : `In ${weekOffset} Week(s)`;
    document.getElementById('week-label').textContent = weekLabel;

    // Calculate Monday of the viewed week to map dates
    const currentDayOfWeek = now.getDay();
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMonday);

    let html = '';
    // Header row
    html += `<div class="tt-header" style="background:var(--bg-surface)">Time</div>`;
    DAYS.forEach((day, dayIdx) => {
        const isToday = day === today;
        const colDate = new Date(monday);
        colDate.setDate(monday.getDate() + dayIdx);
        const dayLabel = colDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        html += `<div class="tt-header ${isToday ? 'today-col' : ''}">${day.slice(0, 3)}<br><span style="font-size:0.68rem;font-weight:normal;opacity:0.7;">${dayLabel}</span>${isToday ? ' ✦' : ''}</div>`;
    });

    // Track spanned rows for each day column to skip rendering overlapping cells
    const spannedRows = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };

    // Time rows
    TIME_SLOTS.forEach(time => {
        const slotHour = parseInt(time.split(':')[0]);
        html += `<div class="tt-time">${time}</div>`;
        DAYS.forEach((day, dayIdx) => {
            const isToday = day === today;
            
            // If this cell was spanned by a session starting in a previous hour slot, skip rendering
            if (spannedRows[day] > 0) {
                spannedRows[day]--;
                return;
            }
            
            // Get dateStr for this cell
            const colDate = new Date(monday);
            colDate.setDate(monday.getDate() + dayIdx);
            const year = colDate.getFullYear();
            const month = String(colDate.getMonth() + 1).padStart(2, '0');
            const dateNum = String(colDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${dateNum}`;

            // Match sessions that start exactly within this hour slot
            const sessionsStart = appState.sessions.filter(s => {
                if (s.day !== day || s.exam !== appState.currentExam) return false;
                const startHour = parseInt(s.start.split(':')[0]);
                return startHour === slotHour;
            });
            
            if (sessionsStart.length > 0) {
                // Find start hours of other sessions starting later today
                const daySessions = appState.sessions.filter(s => s.day === day && s.exam === appState.currentExam);
                const laterStartHours = daySessions
                    .map(s => parseInt(s.start.split(':')[0]))
                    .filter(h => h > slotHour);
                const nextStartHour = laterStartHours.length > 0 ? Math.min(...laterStartHours) : Infinity;
                const allowedSpan = nextStartHour - slotHour;

                // Find the maximum span (in hours) of the starting sessions
                let maxSpan = 1;
                sessionsStart.forEach(s => {
                    const startHour = parseInt(s.start.split(':')[0]);
                    const endHour = parseInt(s.end.split(':')[0]);
                    const normalSpan = Math.max(1, (endHour - startHour) + 1);
                    const span = Math.min(normalSpan, allowedSpan);
                    if (span > maxSpan) maxSpan = span;
                });
                
                // Set the spanned rows counter to skip the next (maxSpan - 1) rows
                spannedRows[day] = maxSpan - 1;

                const sessionContent = sessionsStart.map(s => {
                    const done = appState.completedSessions[s.id];
                    
                    // Lookup chronological topic and subject for this date and time slot
                    let displaySubject = s.subject;
                    let displayTopic = s.topic;
                    if (appState.timeline && appState.timeline.length > 0) {
                        const timelineDay = appState.timeline.find(td => td.date === dateStr);
                        if (timelineDay) {
                            if (s.start === "04:00" && timelineDay.morning) {
                                displayTopic = timelineDay.morning.desc;
                                displaySubject = timelineDay.morning.subject;
                            } else if (s.start === "05:45" && timelineDay.optionalMorning) {
                                displayTopic = timelineDay.optionalMorning.desc;
                                displaySubject = timelineDay.optionalMorning.subject;
                            } else if (s.start === "19:30" && timelineDay.evening1) {
                                displayTopic = timelineDay.evening1.desc;
                                displaySubject = timelineDay.evening1.subject;
                            } else if (s.start === "20:45" && timelineDay.evening2) {
                                displayTopic = timelineDay.evening2.desc;
                                displaySubject = timelineDay.evening2.subject;
                            } else if (s.start === "21:30" && timelineDay.test) {
                                displayTopic = timelineDay.test.desc;
                                displaySubject = timelineDay.test.subject;
                            }
                        }
                    }
                    const color = getSubjectColor(displaySubject);

                    return `<div class="tt-session" style="background:${color};opacity:${done ? 0.6 : 1};height:100%;display:flex;flex-direction:column;justify-content:center;margin:0;" onclick="editSession('${s.id}', '${dateStr}')">
                        <span>${getSubjectName(displaySubject)}</span>
                        <span class="tt-session-topic" style="font-size:0.7rem;opacity:0.87;display:block;margin:3px 0;font-weight:normal;line-height:1.2;">${displayTopic || ''}</span>
                        <span class="tt-session-time">${s.start}–${s.end}</span>
                    </div>`;
                }).join('');

                html += `<div class="tt-cell ${isToday ? 'today-col' : ''}" style="grid-column:${dayIdx + 2}; grid-row:span ${maxSpan}; display:flex; flex-direction:column; justify-content:stretch; padding:4px; height:auto;">${sessionContent}</div>`;
            } else {
                html += `<div class="tt-cell ${isToday ? 'today-col' : ''}" style="grid-column:${dayIdx + 2};"></div>`;
            }
        });
    });

    grid.innerHTML = html;
}

function changeWeek(dir) {
    appState.weekOffset += dir;
    renderTimetableGrid();
}

function getSubjectName(subjectId) {
    for (const exam of Object.values(EXAM_SYLLABI)) {
        const sub = exam.subjects.find(s => s.id === subjectId);
        if (sub) return sub.name.replace(/^[^\s]+\s/, '').split(' – ')[0];
    }
    return subjectId;
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================
function populateSubjectSelects() {
    const exam = EXAM_SYLLABI[appState.currentExam];
    const options = exam.subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
    const selects = ['session-subject', 'filter-subject'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'filter-subject') {
                el.innerHTML = '<option value="">All Subjects</option>' + options;
            } else {
                el.innerHTML = options;
            }
        }
    });
}

function openAddSessionModal(dayPrefill = '') {
    appState.editingSession = null;
    
    // Hide dynamic info banner and delete button
    const dynInfo = document.getElementById('session-modal-dynamic-info');
    if (dynInfo) dynInfo.style.display = 'none';
    const delBtn = document.getElementById('session-delete-btn');
    if (delBtn) delBtn.style.display = 'none';
    
    document.getElementById('session-modal-title').textContent = 'Add Study Session';
    document.getElementById('session-subject').value = EXAM_SYLLABI[appState.currentExam]?.subjects[0]?.id || '';
    document.getElementById('session-day').value = dayPrefill || new Date().toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('session-start').value = '08:00';
    document.getElementById('session-end').value = '09:00';
    document.getElementById('session-topic').value = '';
    document.getElementById('session-repeat').value = 'none';
    setPriority('medium');
    openModal('session-modal');
}

function editSession(id, dateStr = '') {
    const session = appState.sessions.find(s => s.id === id);
    if (!session) return;
    appState.editingSession = id;
    
    // Check if this is a dynamic chronological block and resolve details
    const dynInfo = document.getElementById('session-modal-dynamic-info');
    const dynText = document.getElementById('session-modal-dynamic-text');
    let isDynamic = false;
    let displaySubject = session.subject;
    let displayTopic = session.topic;
    
    if (dateStr && appState.timeline && appState.timeline.length > 0) {
        const timelineDay = appState.timeline.find(td => td.date === dateStr);
        if (timelineDay) {
            if (session.start === "04:00" && timelineDay.morning) {
                displayTopic = timelineDay.morning.desc;
                displaySubject = timelineDay.morning.subject;
                isDynamic = true;
            } else if (session.start === "05:45" && timelineDay.optionalMorning) {
                displayTopic = timelineDay.optionalMorning.desc;
                displaySubject = timelineDay.optionalMorning.subject;
                isDynamic = true;
            } else if (session.start === "19:30" && timelineDay.evening1) {
                displayTopic = timelineDay.evening1.desc;
                displaySubject = timelineDay.evening1.subject;
                isDynamic = true;
            } else if (session.start === "20:45" && timelineDay.evening2) {
                displayTopic = timelineDay.evening2.desc;
                displaySubject = timelineDay.evening2.subject;
                isDynamic = true;
            } else if (session.start === "21:30" && timelineDay.test) {
                displayTopic = timelineDay.test.desc;
                displaySubject = timelineDay.test.subject;
                isDynamic = true;
            }
        }
    }
    
    if (isDynamic && dynInfo && dynText) {
        dynText.textContent = `${getSubjectName(displaySubject)} — ${displayTopic}`;
        dynInfo.style.display = 'block';
    } else if (dynInfo) {
        dynInfo.style.display = 'none';
    }
    
    document.getElementById('session-modal-title').textContent = 'Edit Session';
    document.getElementById('session-subject').value = displaySubject;
    document.getElementById('session-day').value = session.day;
    document.getElementById('session-start').value = session.start;
    document.getElementById('session-end').value = session.end;
    document.getElementById('session-topic').value = displayTopic || '';
    document.getElementById('session-repeat').value = session.repeat || 'none';
    setPriority(session.priority || 'medium');
    
    // Show delete button
    const delBtn = document.getElementById('session-delete-btn');
    if (delBtn) delBtn.style.display = 'inline-block';
    
    openModal('session-modal');
}

function saveSession() {
    const subject = document.getElementById('session-subject').value;
    const day = document.getElementById('session-day').value;
    const start = document.getElementById('session-start').value;
    const end = document.getElementById('session-end').value;
    const topic = document.getElementById('session-topic').value.trim();
    const repeat = document.getElementById('session-repeat').value;

    if (!subject || !day || !start || !end) {
        showToast('Please fill all required fields!', 'error');
        return;
    }
    if (start >= end) {
        showToast('End time must be after start time!', 'error');
        return;
    }

    let sessionToSync;
    if (appState.editingSession) {
        const idx = appState.sessions.findIndex(s => s.id === appState.editingSession);
        if (idx !== -1) {
            appState.sessions[idx] = { ...appState.sessions[idx], subject, day, start, end, topic, repeat, priority: appState.selectedPriority };
            sessionToSync = appState.sessions[idx];
        }
        showToast('Session updated!', 'success');
    } else {
        const session = {
            id: `s_${Date.now()}`,
            exam: appState.currentExam,
            subject, day, start, end, topic,
            priority: appState.selectedPriority,
            repeat,
            createdAt: getDateStr(),
        };
        appState.sessions.push(session);
        sessionToSync = session;
        showToast('Session added!', 'success');
    }

    saveState();
    if (sessionToSync) syncSession(sessionToSync);
    closeModal('session-modal');
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    populateSubjectSelects();
    renderTimerSubjects();
}

function deleteSession(id) {
    const targetId = id || appState.editingSession;
    if (!targetId) return;

    if (!confirm('Are you sure you want to delete this study session template?')) return;

    const session = appState.sessions.find(s => s.id === targetId);
    appState.sessions = appState.sessions.filter(s => s.id !== targetId);
    saveState();
    if (session) syncSession(session, true);
    closeModal('session-modal');
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    showToast('Session deleted.', 'info');
}

function setPriority(p) {
    appState.selectedPriority = p;
    document.querySelectorAll('.priority-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.p === p);
    });
}

function renderSessionList() {
    const filterSubject = document.getElementById('filter-subject')?.value || '';
    const filterDay = document.getElementById('filter-day')?.value || '';
    const list = document.getElementById('session-list');

    let sessions = appState.sessions.filter(s => s.exam === appState.currentExam);
    if (filterSubject) sessions = sessions.filter(s => s.subject === filterSubject);
    if (filterDay) sessions = sessions.filter(s => s.day === filterDay);

    if (!sessions.length) {
        list.innerHTML = `<div class="empty-state-sm"><span>📅</span><p>No sessions found. Add your first session!</p></div>`;
        return;
    }

    sessions.sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start));
    list.innerHTML = sessions.map(s => {
        const color = getSubjectColor(s.subject);
        const pClass = `priority-${s.priority || 'medium'}`;
        const pText = (s.priority || 'medium').charAt(0).toUpperCase() + (s.priority || 'medium').slice(1);
        return `
        <div class="session-item">
            <div class="session-color-dot" style="background:${color}"></div>
            <div class="session-info">
                <div class="session-subject">${getSubjectName(s.subject)}</div>
                <div class="session-meta">${s.day} | ${s.start} – ${s.end}${s.topic ? ' | ' + s.topic : ''}</div>
            </div>
            <span class="session-priority ${pClass}">${pText}</span>
            <div class="session-actions">
                <button class="session-action-btn" onclick="editSession('${s.id}')" title="Edit">✏️</button>
                <button class="session-action-btn delete" onclick="deleteSession('${s.id}')" title="Delete">🗑️</button>
            </div>
        </div>`;
    }).join('');
}

// ============================================================
// SYLLABUS EXPLORER
// ============================================================
function switchSyllabusExam(exam) {
    appState.currentSyllabusExam = exam;
    document.querySelectorAll('.exam-switch-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.exam === exam);
    });
    renderSyllabus();
}

function renderSyllabus() {
    const exam = EXAM_SYLLABI[appState.currentSyllabusExam];
    if (!exam) return;
    const content = document.getElementById('syllabus-content');

    let totalDone = 0, totalTopics = 0;
    exam.papers.forEach(p => {
        p.topics.forEach(t => {
            totalTopics++;
            if (appState.topicProgress[`${p.id}_${t}`]) totalDone++;
        });
    });
    const overallPct = totalTopics ? Math.round((totalDone / totalTopics) * 100) : 0;
    document.getElementById('syllabus-overall-progress').textContent = `${overallPct}%`;

    content.innerHTML = exam.papers.map(paper => {
        const done = paper.topics.filter(t => appState.topicProgress[`${paper.id}_${t}`]).length;
        const pct = paper.topics.length ? Math.round((done / paper.topics.length) * 100) : 0;
        return `
        <div class="syllabus-paper" id="paper-${paper.id}">
            <div class="syllabus-paper-header" onclick="togglePaper('${paper.id}')">
                <div class="syllabus-paper-left">
                    <span class="syllabus-paper-icon">${paper.icon}</span>
                    <div>
                        <div class="syllabus-paper-title">${paper.title}</div>
                        <div class="syllabus-paper-desc">${paper.desc}</div>
                    </div>
                </div>
                <div class="syllabus-paper-right">
                    <div class="syllabus-mini-bar">
                        <div class="mini-prog-bar">
                            <div class="mini-prog-fill" style="width:${pct}%"></div>
                        </div>
                        <span class="syllabus-pct">${done}/${paper.topics.length}</span>
                    </div>
                    <span class="syllabus-toggle">▼</span>
                </div>
            </div>
            <div class="syllabus-topics">
                ${paper.topics.map(topic => {
            const key = `${paper.id}_${topic}`;
            const done2 = appState.topicProgress[key];
            return `
                    <div class="topic-item ${done2 ? 'done' : ''}" onclick="toggleTopic('${key}', '${paper.id}')">
                        <div class="topic-check">${done2 ? '✓' : ''}</div>
                        <span class="topic-name">${topic}</span>
                    </div>`;
        }).join('')}
            </div>
        </div>`;
    }).join('');
}

function togglePaper(paperId) {
    const paper = document.getElementById(`paper-${paperId}`);
    if (paper) paper.classList.toggle('open');
}

function toggleTopic(key, paperId) {
    appState.topicProgress[key] = !appState.topicProgress[key];
    saveState();
    syncTopicProgress(key, appState.topicProgress[key]);
    renderSyllabus();
    renderSubjectProgress();
    renderExamProgressBars();
    renderStatCards();
    updateSyllabusOverall();
}

function updateSyllabusOverall() {
    const exam = EXAM_SYLLABI[appState.currentSyllabusExam];
    if (!exam) return;
    let totalDone = 0, totalTopics = 0;
    exam.papers.forEach(p => {
        p.topics.forEach(t => {
            totalTopics++;
            if (appState.topicProgress[`${p.id}_${t}`]) totalDone++;
        });
    });
    const pct = totalTopics ? Math.round((totalDone / totalTopics) * 100) : 0;
    document.getElementById('syllabus-overall-progress').textContent = `${pct}%`;
}

// ============================================================
// PROGRESS TRACKER
// ============================================================
function renderExamProgressBars() {
    const container = document.getElementById('exam-progress-bars');
    const exams = [
        { key: 'upsc', name: '🏛️ UPSC IAS/IPS', color: '#6366f1' },
        { key: 'tgpsc', name: '🌺 TGPSC Groups', color: '#10b981' },
        { key: 'bank', name: '🏦 Bank Exams', color: '#06b6d4' },
        { key: 'ssc', name: '📋 SSC Exams', color: '#f59e0b' },
    ];
    container.innerHTML = exams.map(exam => {
        const syllabus = EXAM_SYLLABI[exam.key];
        let done = 0, total = 0;
        syllabus.papers.forEach(p => {
            p.topics.forEach(t => {
                total++;
                if (appState.topicProgress[`${p.id}_${t}`]) done++;
            });
        });
        const pct = total ? Math.round((done / total) * 100) : 0;
        return `
        <div class="exam-prog-item">
            <div class="exam-prog-header">
                <span class="exam-prog-name">${exam.name}</span>
                <span class="exam-prog-pct">${pct}%</span>
            </div>
            <div class="big-prog-bar">
                <div class="big-prog-fill" style="width:${pct}%;background:${exam.color}"></div>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${done} / ${total} topics completed</div>
        </div>`;
    }).join('');
}

function renderStudyLog() {
    const log = document.getElementById('study-log');
    if (!appState.studyLog.length) {
        log.innerHTML = `<div class="empty-state-sm"><span>📓</span><p>No study log yet. Complete sessions to log time!</p></div>`;
        return;
    }
    log.innerHTML = appState.studyLog.slice(0, 20).map(entry => `
    <div class="log-item">
        <div class="log-dot" style="background:${entry.color || '#6366f1'}"></div>
        <div class="log-info">
            <span>${entry.subject} – ${entry.duration} min</span>
            <div class="log-time">${formatDate(entry.date)}</div>
        </div>
    </div>`).join('');
}

function clearStudyLog() {
    if (confirm('Clear all study logs?')) {
        appState.studyLog = [];
        saveState();
        clearStudyLogOnSupabase();
        renderStudyLog();
        showToast('Study log cleared.', 'info');
    }
}

function renderCalendarHeatmap() {
    const container = document.getElementById('calendar-heatmap');
    const today = new Date();
    const cells = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = getDateStr(d);
        const mins = appState.calendarData[ds] || 0;
        const lvl = mins === 0 ? 0 : mins < 60 ? 1 : mins < 180 ? 2 : mins < 360 ? 3 : 4;
        cells.push(`<div class="cal-cell ch${lvl}" data-tip="${d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – ${mins}min" title="${ds}: ${mins} min"></div>`);
    }
    container.innerHTML = cells.join('');
}

// ============================================================
// FOCUS TIMER (Pomodoro)
// ============================================================
function setTimerMode(mode) {
    if (appState.timerState.isRunning) {
        showToast('Stop the timer before switching mode.', 'warning');
        return;
    }
    appState.timerState.mode = mode;
    const times = {
        focus: appState.timerSettings.focus * 60,
        short: appState.timerSettings.short * 60,
        long: appState.timerSettings.long * 60
    };
    appState.timerState.timeLeft = times[mode];
    appState.timerState.totalTime = times[mode];
    document.querySelectorAll('.timer-mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`mode-${mode}`).classList.add('active');
    const labels = { focus: 'Focus Session', short: 'Short Break', long: 'Long Break' };
    document.getElementById('timer-mode-label').textContent = labels[mode];
    updateTimerDisplay();
    updateTimerRing();
}

function updateTimerSettings() {
    appState.timerSettings.focus = parseInt(document.getElementById('set-focus').value) || 25;
    appState.timerSettings.short = parseInt(document.getElementById('set-short').value) || 5;
    appState.timerSettings.long = parseInt(document.getElementById('set-long').value) || 15;
    setTimerMode(appState.timerState.mode);
    saveState();
}

function toggleTimer() {
    if (appState.timerState.isRunning) {
        clearInterval(appState.timerInterval);
        appState.timerInterval = null;
        appState.timerState.isRunning = false;
        document.getElementById('timer-start').textContent = '▶ Resume';
    } else {
        appState.timerState.isRunning = true;
        document.getElementById('timer-start').textContent = '⏸ Pause';
        appState.timerInterval = setInterval(() => {
            appState.timerState.timeLeft--;
            updateTimerDisplay();
            updateTimerRing();
            if (appState.timerState.timeLeft <= 0) {
                timerComplete();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
    appState.timerState.isRunning = false;
    document.getElementById('timer-start').textContent = '▶ Start';
    setTimerMode(appState.timerState.mode);
}

function timerComplete() {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
    appState.timerState.isRunning = false;
    document.getElementById('timer-start').textContent = '▶ Start';

    if (appState.timerState.mode === 'focus') {
        appState.timerState.pomodoroCount++;
        document.getElementById('pomodoro-count').textContent = appState.timerState.pomodoroCount;
        const todayStr = getDateStr();
        const mins = appState.timerSettings.focus;
        appState.calendarData[todayStr] = (appState.calendarData[todayStr] || 0) + mins;

        const subjectId = document.getElementById('timer-subject-pick').value;
        if (subjectId) {
            appState.studyLog.unshift({
                subject: `🍅 ${getSubjectName(subjectId)}`,
                duration: mins,
                date: todayStr,
                color: getSubjectColor(subjectId),
            });
        }
        updateStreak();
        showToast(`🍅 Pomodoro #${appState.timerState.pomodoroCount} complete! Take a break.`, 'success');
        addInAppNotif('success', `🍅 Pomodoro #${appState.timerState.pomodoroCount} done! ${mins} min of focused study logged.`);

        // Auto switch to break
        if (appState.timerState.pomodoroCount % 4 === 0) {
            setTimerMode('long');
            addInAppNotif('info', '☕ Time for a long break — you\'ve done 4 pomodoros!');
        } else {
            setTimerMode('short');
        }
    } else {
        showToast('Break over! Ready to focus again. 💪', 'info');
        addInAppNotif('info', '⏰ Break over! Jump back into focus mode.');
        setTimerMode('focus');
    }

    // Play sound
    try { document.getElementById('timer-alert').play(); } catch (e) { }
    // Notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('StudyMaster Pro', { body: 'Timer complete! 🎉' });
    }

    renderStatCards();
    renderWeeklyHeatmap();
    renderCalendarHeatmap();
    renderStudyLog();
    updateTimerStats();
    saveState();
    syncUserSettings(); // sync pomodoro count + calendar data
}

function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = formatTime(appState.timerState.timeLeft);
}

function updateTimerRing() {
    const ring = document.getElementById('timer-ring-fill');
    if (!ring) return;
    const circumference = 2 * Math.PI * 95; // r=95
    const progress = appState.timerState.timeLeft / appState.timerState.totalTime;
    const offset = circumference * (1 - progress);
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
    // Change color based on mode
    const colors = { focus: '#6366f1', short: '#10b981', long: '#06b6d4' };
    ring.style.stroke = colors[appState.timerState.mode] || '#6366f1';
}

function renderTimerSubjects() {
    const exam = EXAM_SYLLABI[appState.currentExam];
    const sel = document.getElementById('timer-subject-pick');
    if (!sel || !exam) return;
    sel.innerHTML = `<option value="">Select Subject...</option>` +
        exam.subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
}

function updateTimerStats() {
    const today = getDateStr();
    const todayMins = appState.calendarData[today] || 0;
    document.getElementById('ts-today').textContent = `${todayMins} min`;
    document.getElementById('ts-week').textContent = `${getWeekMinutes()} min`;
    document.getElementById('ts-total-pomo').textContent = appState.timerState.pomodoroCount;
}

// Notification permission is requested after login (see onAuthStateChange)

// ============================================================
// NOTES
// ============================================================
function addNote() {
    appState.editingNote = null;
    document.getElementById('note-modal-title').textContent = 'Add Note';
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-tag').value = 'General';
    setNoteColor('#6366f1');
    openModal('note-modal');
}

function setNoteColor(color) {
    appState.selectedNoteColor = color;
    document.querySelectorAll('.color-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.color === color);
    });
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    const tag = document.getElementById('note-tag').value;
    if (!title && !content) {
        showToast('Please add a title or content!', 'error');
        return;
    }
    let noteToSync;
    if (appState.editingNote !== null) {
        appState.notes[appState.editingNote] = {
            ...appState.notes[appState.editingNote],
            title, content, tag, color: appState.selectedNoteColor,
            updatedAt: getDateStr(),
        };
        noteToSync = appState.notes[appState.editingNote];
        showToast('Note updated!', 'success');
    } else {
        const note = {
            id: `n_${Date.now()}`, title, content, tag,
            color: appState.selectedNoteColor,
            createdAt: getDateStr(),
        };
        appState.notes.unshift(note);
        noteToSync = note;
        showToast('Note saved!', 'success');
    }
    saveState();
    syncNote(noteToSync);
    closeModal('note-modal');
    renderNotes();
    populateNoteTagFilter();
}

function deleteNote(id) {
    const note = appState.notes.find(n => n.id === id);
    appState.notes = appState.notes.filter(n => n.id !== id);
    saveState();
    if (note) syncNote(note, true);
    renderNotes();
    populateNoteTagFilter();
    showToast('Note deleted.', 'info');
}

function renderNotes() {
    const search = document.getElementById('notes-search')?.value.toLowerCase() || '';
    const tagFilter = document.getElementById('notes-tag-filter')?.value || '';
    const grid = document.getElementById('notes-grid');

    let notes = [...appState.notes];
    if (search) notes = notes.filter(n =>
        (n.title || '').toLowerCase().includes(search) ||
        (n.content || '').toLowerCase().includes(search)
    );
    if (tagFilter) notes = notes.filter(n => n.tag === tagFilter);

    if (!notes.length) {
        grid.innerHTML = `<div class="empty-state-sm" style="grid-column:1/-1"><span>📝</span><p>No notes yet. Click "+ Add Note" to get started!</p></div>`;
        return;
    }

    grid.innerHTML = notes.map(note => `
    <div class="note-card" style="border-color:${note.color}30" onclick="openNoteEdit('${note.id}')">
        <div class="note-accent-bar" style="background:${note.color}"></div>
        <div class="note-header">
            <div class="note-title">${note.title || 'Untitled Note'}</div>
            <button class="note-delete" onclick="event.stopPropagation();deleteNote('${note.id}')" title="Delete Note">✕</button>
        </div>
        <div class="note-content-preview">${(note.content || '').slice(0, 120)}${note.content?.length > 120 ? '...' : ''}</div>
        <div class="note-footer">
            <span class="note-tag">${note.tag}</span>
            <span class="note-date">${note.createdAt ? formatDate(note.createdAt) : ''}</span>
        </div>
    </div>`).join('');
}

function openNoteEdit(id) {
    const idx = appState.notes.findIndex(n => n.id === id);
    if (idx === -1) return;
    const note = appState.notes[idx];
    appState.editingNote = idx;
    document.getElementById('note-modal-title').textContent = 'Edit Note';
    document.getElementById('note-title').value = note.title || '';
    document.getElementById('note-content').value = note.content || '';
    document.getElementById('note-tag').value = note.tag || 'General';
    setNoteColor(note.color || '#6366f1');
    openModal('note-modal');
}

function populateNoteTagFilter() {
    const tags = [...new Set(appState.notes.map(n => n.tag).filter(Boolean))];
    const sel = document.getElementById('notes-tag-filter');
    if (sel) {
        sel.innerHTML = '<option value="">All Tags</option>' +
            tags.map(t => `<option value="${t}">${t}</option>`).join('');
    }
}

// ============================================================
// COUNTDOWN BANNER
// ============================================================
function renderCountdownBanner() {
    const examDate = appState.settings.examDate;
    if (!examDate) return;

    const target = new Date(examDate + 'T00:00:00');
    const now = new Date();
    const diff = target - now;
    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const existingBanner = document.querySelector('.countdown-banner');
    if (existingBanner) existingBanner.remove();

    const banner = document.createElement('div');
    banner.className = 'countdown-banner';
    banner.innerHTML = `
        <div class="countdown-title">⏳ Exam Countdown (${target.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })})</div>
        <div class="countdown-items">
            <div class="countdown-item">
                <span class="countdown-num">${days}</span>
                <span class="countdown-unit">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-num">${hours}</span>
                <span class="countdown-unit">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-num">${minutes}</span>
                <span class="countdown-unit">Minutes</span>
            </div>
        </div>
    `;

    const dashHeader = document.querySelector('#section-dashboard .section-header');
    if (dashHeader) {
        dashHeader.insertAdjacentElement('afterend', banner);
    }
    setInterval(() => {
        const remaining = new Date(examDate + 'T00:00:00') - new Date();
        if (remaining > 0) {
            const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const h = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const nums = banner.querySelectorAll('.countdown-num');
            if (nums[0]) nums[0].textContent = d;
            if (nums[1]) nums[1].textContent = h;
            if (nums[2]) nums[2].textContent = m;
        }
    }, 60000);
}

// ============================================================
// CLOSE MODALS ON OVERLAY CLICK
// ============================================================
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
    if (e.ctrlKey && e.key === 'n') { e.preventDefault(); openAddSessionModal(); }
    if (e.ctrlKey && e.key === 't') { e.preventDefault(); showSection('timetable'); }
    if (e.ctrlKey && e.key === 'd') { e.preventDefault(); showSection('dashboard'); }
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); showSection('syllabus'); }
    if (e.ctrlKey && e.key === 'p') { e.preventDefault(); showSection('progress'); }
});

// ============================================================
// DATA EXPORT / IMPORT
// ============================================================
function exportData() {
    const data = JSON.stringify(appState);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `studymaster_backup_${getDateStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!', 'success');
}

// ============================================================
// INITIAL TIMER RENDER
// ============================================================
// Timer display is initialized inside initApp() after DOM is ready

// ============================================================
// SERVICE WORKER (for offline) - Optional
// ============================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('ServiceWorker registered successfully.', reg))
            .catch(err => console.error('ServiceWorker registration failed:', err));
    });
}

// ============================================================
// PRINT TIMETABLE
// ============================================================
function printTimetable() {
    window.print();
}

// Export useful functions to window
window.showSection = showSection;
window.setExam = setExam;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.openSettings = openSettings;
window.saveSettings = saveSettings;
window.toggleTheme = toggleTheme;
window.refreshQuote = refreshQuote;
window.openAddSessionModal = openAddSessionModal;
window.editSession = editSession;
window.deleteSession = deleteSession;
window.saveSession = saveSession;
window.setPriority = setPriority;
window.changeWeek = changeWeek;
window.switchSyllabusExam = switchSyllabusExam;
window.togglePaper = togglePaper;
window.toggleTopic = toggleTopic;
window.clearStudyLog = clearStudyLog;
window.setTimerMode = setTimerMode;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;
window.updateTimerSettings = updateTimerSettings;
window.addNote = addNote;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.openNoteEdit = openNoteEdit;
window.closeModal = closeModal;
window.setNoteColor = setNoteColor;
window.toggleSessionDone = toggleSessionDone;
window.renderSessionList = renderSessionList;
window.renderNotes = renderNotes;
window.exportData = exportData;
window.printTimetable = printTimetable;
// Auth
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.handleSignOut = handleSignOut;

console.log('🎓 StudyMaster Pro + Supabase loaded!');
console.log('Shortcuts: Ctrl+N (New Session), Ctrl+T (Timetable), Ctrl+D (Dashboard), Ctrl+S (Syllabus), Ctrl+P (Progress)');

// ============================================================
// AUTH SCREEN HELPERS
// ============================================================
function showAuthScreen() {
    hideLoadingScreen();
    const auth = document.getElementById('auth-screen');
    const main = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    if (auth) auth.classList.remove('hidden');
    if (main) main.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    // Reset form
    const emailEl = document.getElementById('auth-email');
    if (emailEl) { emailEl.value = ''; emailEl.focus(); }
    const pwEl = document.getElementById('auth-password');
    if (pwEl) pwEl.value = '';
    clearAuthMessages();
}

function hideAuthScreen() {
    hideLoadingScreen();
    const auth = document.getElementById('auth-screen');
    const main = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    if (auth) auth.classList.add('hidden');
    if (main) main.style.display = 'flex';
    if (sidebar) sidebar.style.display = 'flex';
}

function showLoadingScreen(msg = 'Loading...') {
    const ls = document.getElementById('loading-screen');
    const txt = document.getElementById('loader-sub-text');
    if (ls) ls.style.display = 'flex';
    if (txt) txt.textContent = msg;
}

function hideLoadingScreen() {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.style.display = 'none';
    }, 600);
}

// ============================================================
// AUTH TAB TOGGLE
// ============================================================
let authMode = 'login'; // 'login' | 'signup'

function switchAuthTab(mode) {
    authMode = mode;
    document.getElementById('auth-tab-login')?.classList.toggle('active', mode === 'login');
    document.getElementById('auth-tab-signup')?.classList.toggle('active', mode === 'signup');
    document.getElementById('auth-btn-text').textContent = mode === 'login' ? 'Sign In' : 'Create Account';
    const confirmField = document.getElementById('auth-confirm-field');
    if (confirmField) confirmField.style.display = mode === 'signup' ? '' : 'none';
    clearAuthMessages();
}

function clearAuthMessages() {
    const err = document.getElementById('auth-error');
    const suc = document.getElementById('auth-success');
    if (err) { err.style.display = 'none'; err.textContent = ''; }
    if (suc) { suc.style.display = 'none'; suc.textContent = ''; }
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function showAuthSuccess(msg) {
    const el = document.getElementById('auth-success');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function setAuthLoading(loading) {
    const btn = document.getElementById('auth-submit-btn');
    const spinner = document.getElementById('auth-btn-spinner');
    if (btn) btn.disabled = loading;
    if (spinner) spinner.style.display = loading ? 'inline-block' : 'none';
}

// ============================================================
// AUTH SUBMIT HANDLER
// ============================================================
async function handleAuthSubmit() {
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;
    const confirm = document.getElementById('auth-confirm')?.value;

    clearAuthMessages();

    if (!email || !password) { showAuthError('Please enter your email and password.'); return; }
    if (authMode === 'signup' && password !== confirm) { showAuthError('Passwords do not match.'); return; }
    if (password.length < 6) { showAuthError('Password must be at least 6 characters.'); return; }

    setAuthLoading(true);

    try {
        if (authMode === 'signup') {
            const { error } = await db.auth.signUp({ email, password });
            if (error) throw error;
            showAuthSuccess('Account created! Please check your email to confirm, then sign in.');
        } else {
            const { error } = await db.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // onAuthStateChange will handle the rest
        }
    } catch (err) {
        showAuthError(err.message || 'Authentication failed. Please try again.');
    } finally {
        setAuthLoading(false);
    }
}

// ============================================================
// SIGN OUT
// ============================================================
async function handleSignOut() {
    if (!confirm('Sign out of StudyMaster Pro?')) return;
    await db.auth.signOut();
    currentUser = null;
    appInitialized = false;
    // Reset app state
    appState.sessions = [];
    appState.notes = [];
    appState.topicProgress = {};
    appState.studyLog = [];
    appState.calendarData = {};
    appState.streak = 0;
    inAppNotifs = [];
    showAuthScreen();
    showToast('Signed out successfully.', 'info');
}

// ============================================================
// IN-APP NOTIFICATION SYSTEM
// ============================================================
let inAppNotifs = []; // { id, type, message, time, read }

function addInAppNotif(type, message) {
    // type: 'info' | 'success' | 'warning' | 'error'
    const notif = {
        id: Date.now(),
        type,
        message,
        time: new Date(),
        read: false,
    };
    inAppNotifs.unshift(notif);
    if (inAppNotifs.length > 30) inAppNotifs = inAppNotifs.slice(0, 30);
    renderNotifPanel();
    updateNotifBadge();

    // Also fire a browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            new Notification('StudyMaster Pro', {
                body: message.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim(),
                icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>'
            });
        } catch (e) { }
    }
}

function renderNotifPanel() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    if (!inAppNotifs.length) {
        list.innerHTML = '<div class="notif-empty">🎉 All caught up!</div>';
        return;
    }
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    list.innerHTML = inAppNotifs.map(n => {
        const timeStr = n.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        return `
        <div class="notif-item ${n.type} ${n.read ? 'read' : ''}" onclick="markNotifRead(${n.id})">
            <span class="notif-icon">${icons[n.type] || '🔔'}</span>
            <div class="notif-body">
                <div class="notif-msg">${n.message}</div>
                <div class="notif-time">${timeStr}</div>
            </div>
        </div>`;
    }).join('');
}

function markNotifRead(id) {
    const n = inAppNotifs.find(x => x.id === id);
    if (n) n.read = true;
    updateNotifBadge();
    renderNotifPanel();
}

function updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    const unread = inAppNotifs.filter(n => !n.read).length;
    if (badge) {
        badge.textContent = unread > 9 ? '9+' : unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
    }
}

function toggleNotifPanel() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    if (isOpen) {
        // Mark all as read when opened
        inAppNotifs.forEach(n => n.read = true);
        updateNotifBadge();
        renderNotifPanel();
    }
}

function clearAllNotifs() {
    inAppNotifs = [];
    renderNotifPanel();
    updateNotifBadge();
}

function toggleNotifPanel() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    if (isOpen) {
        // Mark all as read when opened
        inAppNotifs.forEach(n => n.read = true);
        updateNotifBadge();
        renderNotifPanel();
    }
}

function clearAllNotifs() {
    inAppNotifs = [];
    renderNotifPanel();
    updateNotifBadge();
}

// ============================================================
// AI STUDY ASSISTANT CONTROLLER LOGIC
// ============================================================
let lastParsedAISession = null;
let suggestedAISessions = [];

function setAIStatus(status, text) {
    const badge = document.getElementById('ai-status-badge');
    const label = document.getElementById('ai-status-text');
    if (!badge || !label) return;
    
    if (status === 'loading') {
        badge.classList.add('loading');
    } else {
        badge.classList.remove('loading');
    }
    label.textContent = text;
}

// Helper to call OpenRouter API (using free models)
async function callGeminiAPI(prompt, systemInstruction) {
    const key = appState.settings.geminiApiKey;
    if (!key) throw new Error("No API Key configured.");
    
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const models = [
        "meta-llama/llama-3-8b-instruct:free",
        "openrouter/free"
    ];
    
    let lastError = null;
    
    for (const model of models) {
        try {
            const bodyObj = {
                model: model,
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: prompt }
                ]
            };
            
            // Only use json_object response format for specific models known to support it
            if (model !== "openrouter/free") {
                bodyObj.response_format = { type: "json_object" };
            }
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                },
                body: JSON.stringify(bodyObj)
            });
            
            if (response.ok) {
                const data = await response.json();
                let txt = data?.choices?.[0]?.message?.content;
                if (!txt) throw new Error("Empty response from AI.");
                
                // Sanitize potential markdown code blocks wrapped in response
                txt = txt.trim();
                if (txt.startsWith("```")) {
                    txt = txt.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
                }
                return JSON.parse(txt);
            } else {
                const errData = await response.json().catch(() => ({}));
                lastError = new Error(errData?.error?.message || `API request failed with status ${response.status}`);
            }
        } catch (e) {
            lastError = e;
        }
    }
    
    throw lastError || new Error("Failed to communicate with OpenRouter API.");
}

// Smart Local Fallback Parser using regex and keyword matching
function localFallbackParser(prompt) {
    const cleanPrompt = prompt.toLowerCase();
    const exam = appState.currentExam;
    const syllabi = EXAM_SYLLABI[exam];
    if (!syllabi) return null;

    // 1. Identify Subject
    let subjectId = syllabi.subjects[0]?.id; // default
    let score = -1;
    syllabi.subjects.forEach(sub => {
        const subNameWords = sub.name.toLowerCase().split(/\s+/);
        let matchCount = 0;
        subNameWords.forEach(w => {
            if (w.length > 3 && cleanPrompt.includes(w)) matchCount++;
        });
        // check direct ID/short tags matching
        const shortTag = sub.id.split('-')[1] || '';
        if (shortTag && cleanPrompt.includes(shortTag)) matchCount += 3;
        
        if (matchCount > score) {
            score = matchCount;
            subjectId = sub.id;
        }
    });

    // 2. Identify Day
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let day = days[new Date().getDay() - 1] || 'Monday'; // default to today
    days.forEach(d => {
        if (cleanPrompt.includes(d.toLowerCase())) day = d;
    });

    // 3. Identify Time
    let start = "08:00";
    let end = "09:00";
    
    // Check for HH:MM to HH:MM format
    const timeRangeRegex = /(\d{1,2}):(\d{2})\s*(am|pm)?\s*(?:to|and|-)\s*(\d{1,2}):(\d{2})\s*(am|pm)?/i;
    const matchRange = prompt.match(timeRangeRegex);
    if (matchRange) {
        let sh = parseInt(matchRange[1]);
        const sm = matchRange[2];
        const sAmPm = matchRange[3];
        let eh = parseInt(matchRange[4]);
        const em = matchRange[5];
        const eAmPm = matchRange[6];
        
        if (sAmPm && sAmPm.toLowerCase() === 'pm' && sh < 12) sh += 12;
        if (sAmPm && sAmPm.toLowerCase() === 'am' && sh === 12) sh = 0;
        if (eAmPm && eAmPm.toLowerCase() === 'pm' && eh < 12) eh += 12;
        if (eAmPm && eAmPm.toLowerCase() === 'am' && eh === 12) eh = 0;
        
        start = `${sh.toString().padStart(2, '0')}:${sm}`;
        end = `${eh.toString().padStart(2, '0')}:${em}`;
    } else {
        // Look for single time and default 1 hour duration
        const singleTimeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i;
        const matchSingle = prompt.match(singleTimeRegex);
        if (matchSingle) {
            let sh = parseInt(matchSingle[1]);
            const sm = matchSingle[2] || "00";
            const ampm = matchSingle[3].toLowerCase();
            
            if (ampm === 'pm' && sh < 12) sh += 12;
            if (ampm === 'am' && sh === 12) sh = 0;
            
            start = `${sh.toString().padStart(2, '0')}:${sm}`;
            let eh = sh + 1;
            if (eh >= 24) eh = 0;
            end = `${eh.toString().padStart(2, '0')}:${sm}`;
        }
    }

    // 4. Identify Priority
    let priority = "medium";
    if (cleanPrompt.includes("high") || cleanPrompt.includes("urgent") || cleanPrompt.includes("important")) priority = "high";
    else if (cleanPrompt.includes("low") || cleanPrompt.includes("easy")) priority = "low";

    // 5. Extract Topic
    let topic = "";
    const topicKeywords = ["topic", "about", "on", "focusing on", "studying"];
    for (const keyword of topicKeywords) {
        const index = cleanPrompt.indexOf(keyword);
        if (index !== -1) {
            topic = prompt.substring(index + keyword.length).trim();
            // clean punctuation
            topic = topic.replace(/^(is|on|about|of|study|a)\s+/i, '').split(/[.,;]/)[0].trim();
            break;
        }
    }
    if (!topic) {
        topic = prompt.split(/at|on|for/)[0].trim();
        if (topic.length > 50) topic = topic.substring(0, 50) + "...";
    }

    return {
        subject: subjectId,
        day: day,
        start: start,
        end: end,
        topic: topic || "Study Session",
        priority: priority,
        repeat: "none"
    };
}

// Action: Parse natural language prompt
async function parseSessionWithAI() {
    const input = document.getElementById('ai-prompt-input')?.value.trim();
    if (!input) {
        showToast("Please write details of the session first!", "warning");
        return;
    }
    
    setAIStatus('loading', 'Thinking...');
    
    const key = appState.settings.geminiApiKey;
    const exam = appState.currentExam;
    const examName = EXAM_SYLLABI[exam]?.name || exam.toUpperCase();
    const subjectsText = EXAM_SYLLABI[exam]?.subjects.map(s => `- ${s.id}: ${s.name}`).join('\n');
    
    if (key) {
        try {
            const systemInstruction = `You are a strict parser for StudyMaster Pro. Parse the user request into a single session JSON.
Return ONLY raw JSON conforming exactly to this structure:
{
  "subject": "matching subject_id string from the list",
  "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday",
  "start": "HH:MM",
  "end": "HH:MM",
  "topic": "topic description",
  "priority": "low" | "medium" | "high",
  "repeat": "none" | "daily" | "weekly" | "weekdays"
}
Rules:
- Select the best subject ID match from the available list below.
- Time format is 24-hour (HH:MM). If end time is not specified, default to 1 hour after start.
- Do not output markdown, code blocks, or explanations. Just return raw JSON.

Available Subjects for ${examName}:
${subjectsText}`;
            
            const result = await callGeminiAPI(input, systemInstruction);
            if (result && result.subject) {
                lastParsedAISession = result;
                renderAIParsedPreview(result);
                showToast("✨ AI successfully parsed your session!", "success");
            } else {
                throw new Error("Invalid schema received.");
            }
        } catch (e) {
            console.warn("OpenRouter parse failed. Falling back to local parser.", e);
            showToast("⚠️ AI failed, using local offline fallback parser...", "warning");
            const fallback = localFallbackParser(input);
            lastParsedAISession = fallback;
            renderAIParsedPreview(fallback);
        }
    } else {
        showToast("💡 Configure your OpenRouter API Key in settings for full contextual parsing!", "info");
        const fallback = localFallbackParser(input);
        lastParsedAISession = fallback;
        renderAIParsedPreview(fallback);
    }
    
    setAIStatus('ready', 'AI Ready');
}

// Render parsed preview
function renderAIParsedPreview(session) {
    const placeholder = document.getElementById('ai-preview-placeholder');
    const content = document.getElementById('ai-preview-content');
    
    if (!placeholder || !content) return;
    placeholder.style.display = 'none';
    content.style.display = 'flex';
    
    document.getElementById('ai-preview-subject').textContent = getSubjectName(session.subject);
    document.getElementById('ai-preview-day').textContent = session.day;
    document.getElementById('ai-preview-time').textContent = `${session.start} - ${session.end}`;
    document.getElementById('ai-preview-topic').textContent = session.topic || 'No topic details';
    
    const priMap = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };
    document.getElementById('ai-preview-priority').textContent = priMap[session.priority] || '🟡 Medium';
    
    const repMap = { none: 'No Repeat', daily: 'Every Day', weekly: 'Every Week', weekdays: 'Weekdays Only' };
    document.getElementById('ai-preview-repeat').textContent = repMap[session.repeat] || 'No Repeat';
    
    // Dynamic background matching subject color
    const color = getSubjectColor(session.subject);
    const badge = document.getElementById('ai-preview-subject');
    if (badge) {
        badge.style.backgroundColor = `${color}20`;
        badge.style.color = color;
        badge.style.borderColor = `${color}40`;
    }
}

// Action: Save previewed session to timetable
function addAIParsedSession() {
    if (!lastParsedAISession) return;
    
    const session = {
        id: `s_${Date.now()}`,
        exam: appState.currentExam,
        ...lastParsedAISession,
        createdAt: getDateStr()
    };
    
    appState.sessions.push(session);
    saveState();
    syncSession(session);
    
    // Refresh UIs
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    populateSubjectSelects();
    renderTimerSubjects();
    
    showToast(`Session added successfully!`, `success`);
    
    // Reset preview
    document.getElementById('ai-preview-placeholder').style.display = 'flex';
    document.getElementById('ai-preview-content').style.display = 'none';
    document.getElementById('ai-prompt-input').value = '';
    lastParsedAISession = null;
}

// Action: Suggest complete weekly plan based on target exam
async function generateWeeklyPlanWithAI() {
    const key = appState.settings.geminiApiKey;
    if (!key) {
        showToast("Please provide an OpenRouter API Key in Settings to generate smart study plans!", "warning");
        return;
    }
    
    setAIStatus('loading', 'Generating Study Plan...');
    
    const exam = appState.currentExam;
    const examName = EXAM_SYLLABI[exam]?.name || exam.toUpperCase();
    const subjectsText = EXAM_SYLLABI[exam]?.subjects.map(s => `- ${s.id}: ${s.name}`).join('\n');
    
    try {
        const systemInstruction = `You are a premium study planner assistant for StudyMaster Pro. Generate a balanced, realistic weekly study plan (array of study sessions) for a student preparing for: ${examName}.
Return ONLY a valid raw JSON array conforming to this structure:
[
  {
    "subject": "matching subject_id string",
    "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday",
    "start": "HH:MM",
    "end": "HH:MM",
    "topic": "topic suggestion suitable for ${examName}",
    "priority": "low" | "medium" | "high",
    "repeat": "none"
  },
  ...
]
Rules:
- Generate between 5 and 7 sessions.
- Sessions must map to subjects in the list below.
- Schedule times realistically (e.g. 09:00 to 11:00, 14:00 to 16:00).
- Do not output markdown, HTML, code blocks, or explanations. Just return raw JSON.

Available Subjects:
${subjectsText}`;

        const prompt = `Generate a balanced weekly study timetable for a competitive exam student in ${examName}. Ensure it has daily structure.`;
        const result = await callGeminiAPI(prompt, systemInstruction);
        
        if (Array.isArray(result)) {
            suggestedAISessions = result;
            renderSuggestedWeeklyPlan(result);
            showToast("✨ AI generated a personalized study plan!", "success");
        } else {
            throw new Error("Response was not a JSON array.");
        }
    } catch (e) {
        console.error(e);
        showToast("❌ Plan generation failed. Verify OpenRouter API Key and try again.", "error");
    } finally {
        setAIStatus('ready', 'AI Ready');
    }
}


// Render weekly plan list
function renderSuggestedWeeklyPlan(sessions) {
    const card = document.getElementById('ai-plan-card');
    const list = document.getElementById('ai-suggested-list');
    if (!card || !list) return;
    
    card.style.display = 'block';
    
    if (sessions.length === 0) {
        list.innerHTML = '<div class="empty-state-sm">No suggested sessions.</div>';
        return;
    }
    
    list.innerHTML = sessions.map((s, idx) => {
        const color = getSubjectColor(s.subject);
        return `
        <div class="ai-suggested-item" id="ai-sug-${idx}">
            <div class="ai-suggested-indicator" style="background:${color}"></div>
            <div class="ai-suggested-info">
                <div class="ai-suggested-subject">${getSubjectName(s.subject)}</div>
                <div class="ai-suggested-meta">${s.day} | ${s.start} - ${s.end} | ${s.topic}</div>
            </div>
            <button class="ai-suggested-remove" onclick="removeAISuggestedSession(${idx})" title="Remove item">✕</button>
        </div>`;
    }).join('');
}

// Remove single suggested session from preview list
function removeAISuggestedSession(idx) {
    suggestedAISessions.splice(idx, 1);
    renderSuggestedWeeklyPlan(suggestedAISessions);
}

// Import all plan sessions to timetable
function importAISuggestedPlan() {
    if (suggestedAISessions.length === 0) return;
    
    suggestedAISessions.forEach(item => {
        const session = {
            id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            exam: appState.currentExam,
            ...item,
            createdAt: getDateStr()
        };
        appState.sessions.push(session);
        syncSession(session);
    });
    
    saveState();
    
    // Refresh UIs
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    populateSubjectSelects();
    renderTimerSubjects();
    
    showToast(`Imported ${suggestedAISessions.length} sessions to your timetable!`, `success`);
    
    // Hide plan panel
    document.getElementById('ai-plan-card').style.display = 'none';
    suggestedAISessions = [];
}

// Export useful functions to window
window.showSection = showSection;
window.setExam = setExam;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.openSettings = openSettings;
window.saveSettings = saveSettings;
window.toggleTheme = toggleTheme;
window.refreshQuote = refreshQuote;
window.openAddSessionModal = openAddSessionModal;
window.editSession = editSession;
window.deleteSession = deleteSession;
window.saveSession = saveSession;
window.setPriority = setPriority;
window.changeWeek = changeWeek;
window.switchSyllabusExam = switchSyllabusExam;
window.togglePaper = togglePaper;
window.toggleTopic = toggleTopic;
window.clearStudyLog = clearStudyLog;
window.setTimerMode = setTimerMode;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;
window.updateTimerSettings = updateTimerSettings;
window.addNote = addNote;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.openNoteEdit = openNoteEdit;
window.closeModal = closeModal;
window.setNoteColor = setNoteColor;
window.toggleSessionDone = toggleSessionDone;
window.renderSessionList = renderSessionList;
window.renderNotes = renderNotes;
window.exportData = exportData;
window.printTimetable = printTimetable;
// Preset UPSC 6-Hour strategy plan
async function importUPSC6HourPlan() {
    if (!confirm("This preset is designed for UPSC IAS aspirants. It will clear your existing UPSC timetable and populate it with the 6-Hour/Day Daily Parallel schedule (Mains, Prelims, Optional, and Tests). Proceed?")) {
        return;
    }
    
    // Switch exam mode to UPSC to align subject IDs
    setExam('upsc');
    
    // Clear existing UPSC sessions to ensure clean state
    const oldSessions = appState.sessions.filter(s => s.exam === 'upsc');
    for (const old of oldSessions) {
        await syncSession(old, true); // Deletes from Supabase
    }
    appState.sessions = appState.sessions.filter(s => s.exam !== 'upsc');
    
    const presetSessions = [];
    const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    DAYS_OF_WEEK.forEach(day => {
        presetSessions.push(
            { subject: "upsc-gs1", day: day, start: "04:00", end: "05:30", topic: "Mains GS study block", priority: "high", repeat: "weekly" },
            { subject: "upsc-optional", day: day, start: "05:45", end: "06:45", topic: "Optional study block (Morning)", priority: "high", repeat: "weekly" },
            { subject: "upsc-optional", day: day, start: "19:30", end: "20:30", topic: "Optional study block (Evening)", priority: "medium", repeat: "weekly" },
            { subject: "upsc-gs1", day: day, start: "20:45", end: "21:30", topic: "Prelims study block", priority: "medium", repeat: "weekly" },
            { subject: "upsc-essay", day: day, start: "21:30", end: "22:00", topic: "Daily Test block", priority: "high", repeat: "weekly" }
        );
    });
    
    // Add all to appState
    for (const item of presetSessions) {
        const session = {
            id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            exam: "upsc",
            ...item,
            createdAt: getDateStr()
        };
        appState.sessions.push(session);
        await syncSession(session);
    }
    
    saveState();
    
    // Refresh UI components
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    populateSubjectSelects();
    renderTimerSubjects();
    
    showToast("🏛️ UPSC 6-Hour Parallel Study Plan loaded successfully!", "success");
    showSection("timetable");
}

async function clearCurrentTimetable() {
    const examName = EXAM_SYLLABI[appState.currentExam]?.name || appState.currentExam.toUpperCase();
    if (!confirm(`Are you sure you want to clear all study sessions for the ${examName} exam? This will remove them permanently from local and cloud database.`)) {
        return;
    }
    
    const sessionsToClear = appState.sessions.filter(s => s.exam === appState.currentExam);
    for (const session of sessionsToClear) {
        await syncSession(session, true); // Deletes from Supabase
    }
    
    appState.sessions = appState.sessions.filter(s => s.exam !== appState.currentExam);
    saveState();
    
    // Refresh UIs
    renderTimetableGrid();
    renderTodaySchedule();
    renderSessionList();
    populateSubjectSelects();
    renderTimerSubjects();
    
    showToast(`Cleared study sessions for ${examName}.`, 'info');
}

// ============================================================
// CHRONOLOGICAL STUDY PLANNER ENGINE
// ============================================================
// ============================================================
// CHRONOLOGICAL STUDY PLANNER ENGINE
// ============================================================
function getDynamicTimeline() {
    // 1. Build Mains GS Queue (180 chapters)
    const mainsGSQueue = [];
    for (let i = 1; i <= 20; i++) mainsGSQueue.push({ subject: 'upsc-gs4', desc: `GS4: Ethics - Chapter ${i}` });
    for (let i = 1; i <= 9; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Internal Security - Chapter ${i}` });
    for (let i = 1; i <= 8; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Agriculture - Chapter ${i}` });
    for (let i = 1; i <= 3; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Environment - Chapter ${i}` });
    for (let i = 1; i <= 3; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Disaster Management - Chapter ${i}` });
    for (let i = 1; i <= 5; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Economy - Chapter ${i}` });
    for (let i = 1; i <= 6; i++) mainsGSQueue.push({ subject: 'upsc-gs3', desc: `GS3: Science & Technology - Chapter ${i}` });
    for (let i = 1; i <= 18; i++) mainsGSQueue.push({ subject: 'upsc-gs2', desc: `GS2: Polity & Governance - Chapter ${i}` });
    for (let i = 1; i <= 11; i++) mainsGSQueue.push({ subject: 'upsc-gs2', desc: `GS2: International Relations (IR) - Chapter ${i}` });
    for (let i = 1; i <= 3; i++) mainsGSQueue.push({ subject: 'upsc-gs2', desc: `GS2: Social Justice - Chapter ${i}` });
    for (let i = 1; i <= 18; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: World History - Chapter ${i}` });
    for (let i = 1; i <= 11; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: Modern History - Chapter ${i}` });
    for (let i = 1; i <= 17; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: Art & Culture - Chapter ${i}` });
    for (let i = 1; i <= 7; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: Post-Independence India (PCI) - Chapter ${i}` });
    for (let i = 1; i <= 15; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: Indian Society - Chapter ${i}` });
    for (let i = 1; i <= 26; i++) mainsGSQueue.push({ subject: 'upsc-gs1', desc: `GS1: Geography - Chapter ${i}` });

    // 2. Optional Queue (170 chapters)
    const optionalQueue = [];
    for (let i = 1; i <= 86; i++) optionalQueue.push({ subject: 'upsc-optional', desc: `Optional: Paper I - Chapter ${i}` });
    for (let i = 1; i <= 84; i++) optionalQueue.push({ subject: 'upsc-optional', desc: `Optional: Paper II - Chapter ${i}` });

    // 3. Build Prelims Queue (102 chapters)
    const prelimsQueue = [];
    for (let i = 1; i <= 18; i++) prelimsQueue.push({ subject: 'upsc-gs3', desc: `Prelims: Economy - Chapter ${i}` });
    for (let i = 1; i <= 18; i++) prelimsQueue.push({ subject: 'upsc-gs2', desc: `Prelims: Polity - Chapter ${i}` });
    for (let i = 1; i <= 12; i++) prelimsQueue.push({ subject: 'upsc-gs1', desc: `Prelims: Geography - Chapter ${i}` });
    for (let i = 1; i <= 12; i++) prelimsQueue.push({ subject: 'upsc-gs3', desc: `Prelims: Science & Technology - Chapter ${i}` });
    for (let i = 1; i <= 12; i++) prelimsQueue.push({ subject: 'upsc-gs1', desc: `Prelims: Modern History - Chapter ${i}` });
    for (let i = 1; i <= 12; i++) prelimsQueue.push({ subject: 'upsc-gs3', desc: `Prelims: Environment - Chapter ${i}` });
    for (let i = 1; i <= 6; i++)  prelimsQueue.push({ subject: 'upsc-gs2', desc: `Prelims: International Relations (IR) - Chapter ${i}` });
    for (let i = 1; i <= 12; i++) prelimsQueue.push({ subject: 'upsc-gs1', desc: `Prelims: Ancient, Medieval & Art & Culture (AMAC) - Chapter ${i}` });

    const startDate = new Date(2026, 6, 1);
    const endDate = new Date(2027, 0, 31);
    const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    const dates = [];
    for (let i = 0; i < totalDays; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const dateNum = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${dateNum}`;
        
        dates.push({
            dateStr: dateStr,
            dayName: d.toLocaleDateString('en-US', { weekday: 'long' })
        });
    }
    
    let completedCount = 0;
    
    // Pass 1: Count completed days (each completed day represents 1 step forward in all queues)
    const timeline = dates.map((d, idx) => {
        const completed = !!appState.timelineCompleted[d.dateStr];
        if (completed) {
            completedCount++;
        }
        return {
            index: idx + 1,
            date: d.dateStr,
            dayName: d.dayName,
            completed: completed,
            morning: null,
            optionalMorning: null,
            evening1: null,
            evening2: null,
            test: null
        };
    });
    
    // Helper to get test details based on day of week
    function getTestDetails(dayName) {
        if (dayName === 'Monday') {
            return { subject: 'upsc-csat', desc: 'Test: CSAT + GS Test' };
        } else if (dayName === 'Tuesday') {
            return { subject: 'upsc-csat', desc: 'Test: CSAT Analysis & Review' };
        } else if (dayName === 'Wednesday' || dayName === 'Friday' || dayName === 'Sunday') {
            return { subject: 'upsc-optional', desc: 'Test: Optional Subject Test' };
        } else {
            return { subject: 'upsc-gs1', desc: 'Test: GS Mains Answer Writing & MCQ Test' };
        }
    }
    
    // Assign completed days sequentially
    let completedIndex = 0;
    timeline.forEach(day => {
        if (!day.completed) return;
        
        const mainsItem = mainsGSQueue[completedIndex] || { subject: 'upsc-gs1', desc: 'GS Mains Revision' };
        const optItem = optionalQueue[completedIndex] || { subject: 'upsc-optional', desc: 'Optional Revision' };
        const preItem = prelimsQueue[completedIndex] || { subject: 'upsc-gs3', desc: 'Prelims Revision' };
        const testItem = getTestDetails(day.dayName);
        
        day.morning = { time: '04:00 - 05:30', subject: mainsItem.subject, desc: mainsItem.desc };
        day.optionalMorning = { time: '05:45 - 06:45', subject: 'upsc-optional', desc: optItem.desc };
        day.evening1 = { time: '19:30 - 20:30', subject: 'upsc-optional', desc: `${optItem.desc} (Revision)` };
        day.evening2 = { time: '20:45 - 21:30', subject: preItem.subject, desc: preItem.desc };
        day.test = { time: '21:30 - 22:00', subject: testItem.subject, desc: testItem.desc };
        
        completedIndex++;
    });
    
    // Assign uncompleted days starting from completedCount
    let nextIndex = completedCount;
    timeline.forEach(day => {
        if (day.completed) return;
        
        const mainsItem = mainsGSQueue[nextIndex] || { subject: 'upsc-gs1', desc: 'GS Mains Revision' };
        const optItem = optionalQueue[nextIndex] || { subject: 'upsc-optional', desc: 'Optional Revision' };
        const preItem = prelimsQueue[nextIndex] || { subject: 'upsc-gs3', desc: 'Prelims Revision' };
        const testItem = getTestDetails(day.dayName);
        
        day.morning = { time: '04:00 - 05:30', subject: mainsItem.subject, desc: mainsItem.desc };
        day.optionalMorning = { time: '05:45 - 06:45', subject: 'upsc-optional', desc: optItem.desc };
        day.evening1 = { time: '19:30 - 20:30', subject: 'upsc-optional', desc: `${optItem.desc} (Revision)` };
        day.evening2 = { time: '20:45 - 21:30', subject: preItem.subject, desc: preItem.desc };
        day.test = { time: '21:30 - 22:00', subject: testItem.subject, desc: testItem.desc };
        
        nextIndex++;
    });
    
    return timeline;
}

function generateChronologicalTimeline(force = false) {
    if (appState.timeline && appState.timeline.length > 0 && !force) {
        return; // Already initialized, don't overwrite unless forced
    }
    
    if (force && !confirm("Reinitializing the timeline will reset your checked days. Proceed?")) {
        return;
    }
    
    appState.timelineCompleted = {};
    appState.timeline = getDynamicTimeline();
    saveState();
    
    if (force) {
        showToast("📅 Chronological study timeline initialized!", "success");
    }
    renderTimelineList();
}

function renderTimelineList() {
    const timeline = getDynamicTimeline();
    appState.timeline = timeline; // Keep in sync for grid lookups

    const container = document.getElementById('ai-timeline-list');
    const searchVal = document.getElementById('timeline-search')?.value.toLowerCase() || '';
    const filterStatus = document.getElementById('timeline-status-filter')?.value || 'all';
    
    if (!container) return;
    
    const todayStr = getDateStr();
    
    // Filters logic
    let filtered = timeline;
    if (searchVal) {
        filtered = filtered.filter(day => {
            const dateMatch = day.date.includes(searchVal) || day.dayName.toLowerCase().includes(searchVal);
            const morningMatch = day.morning?.desc?.toLowerCase().includes(searchVal);
            const evening1Match = day.evening1?.desc?.toLowerCase().includes(searchVal);
            const evening2Match = day.evening2?.desc?.toLowerCase().includes(searchVal);
            return dateMatch || morningMatch || evening1Match || evening2Match;
        });
    }
    
    if (filterStatus === 'completed') {
        filtered = filtered.filter(day => appState.timelineCompleted[day.date]);
    } else if (filterStatus === 'uncompleted') {
        filtered = filtered.filter(day => !appState.timelineCompleted[day.date]);
    }
    
    // Stats calculation
    const completedDays = Object.values(appState.timelineCompleted).filter(Boolean).length;
    const totalDaysCount = appState.timeline.length;
    const progressPct = totalDaysCount ? Math.round((completedDays / totalDaysCount) * 100) : 0;
    
    // Find current focus (first uncompleted day)
    const activeDay = appState.timeline.find(day => !appState.timelineCompleted[day.date]);
    const focusText = activeDay ? `${activeDay.morning?.desc || 'General study'}` : 'All complete! 🎉';
    
    // Update stats UI
    const progressEl = document.getElementById('t-stat-progress');
    const daysEl = document.getElementById('t-stat-days');
    const focusEl = document.getElementById('t-stat-focus');
    if (progressEl) progressEl.textContent = `${progressPct}%`;
    if (daysEl) daysEl.textContent = `${completedDays} / ${totalDaysCount} days`;
    if (focusEl) focusEl.textContent = focusText;
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state-sm"><span>📅</span><p>No matching study plan dates found.</p></div>`;
        return;
    }
    
    container.innerHTML = filtered.map(day => {
        const isDone = appState.timelineCompleted[day.date];
        const isToday = day.date === todayStr;
        
        let detailsHTML = '';
        if (day.morning) {
            const mColor = getSubjectColor(day.morning.subject);
            detailsHTML += `
            <div class="timeline-session-pill">
                <span class="pill-tag" style="background:${mColor}">${getSubjectName(day.morning.subject).split(' ')[0]}</span>
                <span class="pill-desc">${day.morning.desc}</span>
                <span class="pill-sub">${day.morning.time}</span>
            </div>`;
        }
        if (day.optionalMorning) {
            const opColor = getSubjectColor(day.optionalMorning.subject);
            detailsHTML += `
            <div class="timeline-session-pill">
                <span class="pill-tag" style="background:${opColor}">${getSubjectName(day.optionalMorning.subject).split(' ')[0]}</span>
                <span class="pill-desc">${day.optionalMorning.desc}</span>
                <span class="pill-sub">${day.optionalMorning.time}</span>
            </div>`;
        }
        if (day.evening1) {
            const evColor1 = getSubjectColor(day.evening1.subject);
            detailsHTML += `
            <div class="timeline-session-pill">
                <span class="pill-tag" style="background:${evColor1}">${getSubjectName(day.evening1.subject).split(' ')[0]}</span>
                <span class="pill-desc">${day.evening1.desc}</span>
                <span class="pill-sub">${day.evening1.time}</span>
            </div>`;
        }
        if (day.evening2) {
            const evColor2 = getSubjectColor(day.evening2.subject);
            detailsHTML += `
            <div class="timeline-session-pill">
                <span class="pill-tag" style="background:${evColor2}">${getSubjectName(day.evening2.subject).split(' ')[0]}</span>
                <span class="pill-desc">${day.evening2.desc}</span>
                <span class="pill-sub">${day.evening2.time}</span>
            </div>`;
        }
        if (day.test) {
            const testColor = getSubjectColor(day.test.subject);
            detailsHTML += `
            <div class="timeline-session-pill">
                <span class="pill-tag" style="background:${testColor}">Test</span>
                <span class="pill-desc">${day.test.desc}</span>
                <span class="pill-sub">${day.test.time}</span>
            </div>`;
        }
        
        return `
        <div class="timeline-day-card ${isDone ? 'completed' : ''} ${isToday ? 'active-day' : ''}">
            <div class="timeline-day-check" onclick="toggleTimelineDay(${day.index}, '${day.date}')">
                ${isDone ? '✓' : ''}
            </div>
            <div class="timeline-day-info">
                <div class="timeline-day-num">Day ${day.index}</div>
                <div class="timeline-day-date">${formatDate(day.date)} (${day.dayName.slice(0,3)})</div>
            </div>
            <div class="timeline-day-details">
                ${detailsHTML}
            </div>
        </div>`;
    }).join('');
}

function toggleTimelineDay(dayIndex, date) {
    const isDone = !appState.timelineCompleted[date];
    appState.timelineCompleted[date] = isDone;
    
    // Integrate with study log and calendar data
    if (isDone) {
        // Log study time: 6 hours = 360 min
        appState.studyLog.unshift({
            subject: `📅 UPSC Day ${dayIndex} Complete`,
            duration: 360,
            date: date,
            color: '#8b5cf6'
        });
        appState.calendarData[date] = (appState.calendarData[date] || 0) + 360;
        showToast(`Day ${dayIndex} completed! 360 focus minutes logged. 📚`, 'success');
    } else {
        // Remove from log
        appState.studyLog = appState.studyLog.filter(l => l.subject !== `📅 UPSC Day ${dayIndex} Complete`);
        if (appState.calendarData[date] >= 360) appState.calendarData[date] -= 360;
        showToast(`Day ${dayIndex} unmarked.`, 'info');
    }
    
    saveState();
    syncUserSettings(); // sync calendar data
    
    // Refresh UIs
    renderTimelineList();
    renderStudyLog();
    renderCalendarHeatmap();
    renderWeeklyHeatmap();
    renderStatCards();
}

window.importUPSC6HourPlan = importUPSC6HourPlan;
window.clearCurrentTimetable = clearCurrentTimetable;

// Auth
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.handleSignOut = handleSignOut;
// AI
window.parseSessionWithAI = parseSessionWithAI;
window.addAIParsedSession = addAIParsedSession;
window.generateWeeklyPlanWithAI = generateWeeklyPlanWithAI;
window.removeAISuggestedSession = removeAISuggestedSession;
window.importAISuggestedPlan = importAISuggestedPlan;
// Timeline
window.generateChronologicalTimeline = generateChronologicalTimeline;
window.renderTimelineList = renderTimelineList;
window.toggleTimelineDay = toggleTimelineDay;

console.log('🎓 StudyMaster Pro + Supabase loaded!');
console.log('Shortcuts: Ctrl+N (New Session), Ctrl+T (Timetable), Ctrl+D (Dashboard), Ctrl+S (Syllabus), Ctrl+P (Progress)');
