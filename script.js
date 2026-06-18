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
    },
    completedSessions: {},
    timerInterval: null,
    calendarData: {}, // { 'YYYY-MM-DD': minutes }
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
    else if (status === 'error') { dot.classList.add('error'); label.textContent = 'Offline'; }
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

        // User settings
        const { data: settings } = await db.from('user_settings').select('*').eq('user_id', uid).single();
        if (settings) {
            appState.settings = {
                name: settings.name || 'Aspirant',
                exam: settings.exam || 'upsc',
                goal: settings.goal || 8,
                examDate: settings.exam_date || '',
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
document.addEventListener('DOMContentLoaded', () => {
    // Auth listener — runs once Supabase determines session state
    db.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user ?? null;
        if (currentUser) {
            // User is logged in — show loading, load data, then show app
            showLoadingScreen('Syncing your study data...');
            await loadFromSupabase();
            hideAuthScreen();
            hideLoadingScreen();
            initApp();
            // Show user email in sidebar
            const emailEl = document.getElementById('sidebar-user-email');
            if (emailEl) emailEl.textContent = currentUser.email;
        } else {
            // Not logged in — show auth screen
            showAuthScreen();
        }
    });

    // Keyboard: allow Enter key on auth inputs
    document.getElementById('auth-password')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleAuthSubmit();
    });
    document.getElementById('auth-confirm')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleAuthSubmit();
    });
    document.getElementById('auth-email')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('auth-password')?.focus();
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
}

// ============================================================
// NAVIGATION
// ============================================================
function showSection(name) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const sec = document.getElementById(`section-${name}`);
    if (sec) sec.classList.add('active');
    const navItem = document.querySelector(`.nav-item[data-section="${name}"]`);
    if (navItem) navItem.classList.add('active');
    appState.currentSection = name;
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
    openModal('settings-modal');
}

function saveSettings() {
    appState.settings.name = document.getElementById('settings-name').value.trim() || 'Aspirant';
    appState.settings.exam = document.getElementById('settings-exam').value;
    appState.settings.goal = parseInt(document.getElementById('settings-goal').value) || 8;
    appState.settings.examDate = document.getElementById('settings-exam-date').value;
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
        const color = getSubjectColor(s.subject);
        const done = appState.completedSessions[s.id] || false;
        return `
        <div class="today-item" onclick="toggleSessionDone('${s.id}')">
            <div class="today-item-color" style="background:${color}"></div>
            <div class="today-item-info">
                <div class="today-item-subject">${getSubjectName(s.subject)}</div>
                <div class="today-item-time">${s.start} – ${s.end} ${s.topic ? '| ' + s.topic : ''}</div>
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
    } else {
        appState.streak = 1;
    }
    appState.lastStudyDate = today;
    updateStreakDisplay();
}

function updateStreakDisplay() {
    const val = `🔥 ${appState.streak} Day Streak`;
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
        const paper = exam.papers.find(p => p.id.startsWith(sub.id.split('-')[0] + '-' + sub.id.split('-')[1]));
        // Calculate progress from topic progress
        let done = 0, total = 0;
        exam.papers.forEach(p => {
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
for (let h = 5; h <= 22; h++) {
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

    let html = '';
    // Header row
    html += `<div class="tt-header" style="background:var(--bg-surface)">Time</div>`;
    DAYS.forEach(day => {
        const isToday = day === today;
        html += `<div class="tt-header ${isToday ? 'today-col' : ''}">${day.slice(0, 3)}${isToday ? ' ✦' : ''}</div>`;
    });

    // Time rows
    TIME_SLOTS.forEach(time => {
        html += `<div class="tt-time">${time}</div>`;
        DAYS.forEach(day => {
            const isToday = day === today;
            const sessionsHere = appState.sessions.filter(s =>
                s.day === day &&
                s.exam === appState.currentExam &&
                s.start <= time && s.end > time
            );
            const sessionsStart = appState.sessions.filter(s =>
                s.day === day &&
                s.exam === appState.currentExam &&
                s.start === time
            );
            const sessionContent = sessionsStart.map(s => {
                const color = getSubjectColor(s.subject);
                const done = appState.completedSessions[s.id];
                return `<div class="tt-session" style="background:${color};opacity:${done ? 0.6 : 1}" onclick="editSession('${s.id}')">
                    <span>${getSubjectName(s.subject)}</span>
                    <span class="tt-session-time">${s.start}–${s.end}</span>
                </div>`;
            }).join('');
            html += `<div class="tt-cell ${isToday ? 'today-col' : ''}">${sessionContent}</div>`;
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

function editSession(id) {
    const session = appState.sessions.find(s => s.id === id);
    if (!session) return;
    appState.editingSession = id;
    document.getElementById('session-modal-title').textContent = 'Edit Session';
    document.getElementById('session-subject').value = session.subject;
    document.getElementById('session-day').value = session.day;
    document.getElementById('session-start').value = session.start;
    document.getElementById('session-end').value = session.end;
    document.getElementById('session-topic').value = session.topic || '';
    document.getElementById('session-repeat').value = session.repeat || 'none';
    setPriority(session.priority || 'medium');
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
    const session = appState.sessions.find(s => s.id === id);
    appState.sessions = appState.sessions.filter(s => s.id !== id);
    saveState();
    if (session) syncSession(session, true);
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
            if (appState.timerState.mode === 'focus') {
                appState.timerState.sessionMinutes++;
            }
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

        // Auto switch to break
        if (appState.timerState.pomodoroCount % 4 === 0) {
            setTimerMode('long');
        } else {
            setTimerMode('short');
        }
    } else {
        showToast('Break over! Ready to focus again. 💪', 'info');
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

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

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
updateTimerDisplay();
updateTimerStats();

// ============================================================
// SERVICE WORKER (for offline) - Optional
// ============================================================
if ('serviceWorker' in navigator) {
    // Silently skip if not available
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
    const auth = document.getElementById('auth-screen');
    const main = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    if (auth) auth.classList.remove('hidden');
    if (main) main.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    document.getElementById('auth-email')?.focus();
}

function hideAuthScreen() {
    const auth = document.getElementById('auth-screen');
    const main = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    if (auth) auth.classList.add('hidden');
    if (main) main.style.display = '';
    if (sidebar) sidebar.style.display = '';
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
    }, 800);
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
    // Reset app state
    appState.sessions = [];
    appState.notes = [];
    appState.topicProgress = {};
    appState.studyLog = [];
    appState.calendarData = {};
    appState.streak = 0;
    showAuthScreen();
    showToast('Signed out successfully.', 'info');
}
