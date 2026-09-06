import { ProblemStatementDetailed, EvaluationCriterion } from '../types';

export const OFFICIAL_EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    criteria: "Innovation",
    weight: "20%",
    description: "Originality and creativity of the proposed approach."
  },
  {
    criteria: "Technical Implementation",
    weight: "25%",
    description: "Quality, complexity, and appropriateness of the technology used."
  },
  {
    criteria: "Problem Relevance",
    weight: "20%",
    description: "How effectively the solution addresses the assigned problem."
  },
  {
    criteria: "Functionality & Prototype",
    weight: "20%",
    description: "Working features, demonstration quality, and usability."
  },
  {
    criteria: "Scalability & Impact",
    weight: "15%",
    description: "Potential real-world usefulness, scalability, and future scope."
  }
];

export const HACKATHON_SUBMISSION_GUIDANCE = {
  title: "Hackathon Submission Guidance",
  rules: [
    {
      title: "Choose One Problem",
      detail: "Teams should select one problem statement and clearly define the scope of their prototype."
    },
    {
      title: "Focus on the Core Problem",
      detail: "The solution should directly address the selected problem rather than adding unrelated features."
    },
    {
      title: "Innovation",
      detail: "Teams may choose suitable AI/ML, NLP, computer vision, deep learning, LLM, RAG, anomaly detection, recommendation, or other technologies."
    },
    {
      title: "Working Prototype",
      detail: "The final submission should demonstrate a functional prototype or meaningful proof of concept."
    },
    {
      title: "Explainability",
      detail: "Where AI makes decisions or generates alerts, provide understandable reasons, confidence scores, evidence, or supporting indicators where practical."
    },
    {
      title: "Responsible AI & Security",
      detail: "Solutions should prioritize privacy, security, fairness, misuse risks, and human oversight. For defence challenges, teams must not develop autonomous weapons, targeting systems, weapon-control systems, or offensive capabilities."
    },
    {
      title: "Technology Freedom",
      detail: "Participants may choose their programming languages, frameworks, datasets, APIs, and deployment approach unless otherwise specified."
    }
  ]
};

export const OFFICIAL_PROBLEM_STATEMENTS: ProblemStatementDetailed[] = [
  // ==========================================
  // DOMAIN 1: DEFENCE (D-01 to D-05)
  // ==========================================
  {
    id: "def-01",
    problemId: "D-01",
    title: "Defence Equipment Inventory Management",
    domainId: "defense",
    domainName: "Defence",
    difficulty: "Easy",
    description: "Defence organizations manage large numbers of vehicles, communication devices, protective equipment, tools, and other assets. Tracking their availability, location, condition, and maintenance status manually can lead to delays and inefficient resource management.",
    background: "Manual logbooks and fragmented registries in defence depots cause critical delays in asset deployment and maintenance tracking during tactical preparedness operations.",
    challenges: [
      "Register and categorize equipment.",
      "Track equipment availability and location.",
      "Monitor operational and maintenance status.",
      "Maintain service history.",
      "Generate maintenance alerts.",
      "View inventory analytics through a dashboard."
    ],
    expectedOutcome: "A user-friendly inventory management system that provides a clear overview of available, deployed, and non-operational equipment.",
    keyRequirements: [
      "Centralized asset cataloging and lifecycle tracking",
      "Real-time depot and unit location mapping",
      "Automated operational status tagging and inspection logs",
      "Visual analytical dashboard showing operational readiness"
    ],
    expectedDeliverables: [
      "Responsive inventory management web portal",
      "Asset status dashboard with filterable deployment status",
      "Maintenance history logging and alert trigger mechanism"
    ],
    suggestedTech: ["React", "TypeScript", "Tailwind CSS", "Node.js / Express", "Firestore / SQLite", "Chart.js / Recharts"],
    evaluationCriteria: [
      "Inventory Tracking & Categorization Accuracy (30%)",
      "Dashboard Usability & Analytics UX (30%)",
      "Alert & History Logging System (25%)",
      "Code Quality & Presentation (15%)"
    ],
    scopeSafetyNote: "System must focus on administrative inventory tracking, asset readiness, and logistics management.",
    sponsor: "HackHertz Defence Track"
  },
  {
    id: "def-02",
    problemId: "D-02",
    title: "Defence Personnel Emergency Communication System",
    domainId: "defense",
    domainName: "Defence",
    difficulty: "Easy",
    description: "During emergencies, communication between personnel and command teams can become difficult, especially when multiple teams are operating across different locations.",
    background: "Personnel deployed in remote or volatile environments require rapid, resilient channels to transmit SOS signals, coordinate tactical positions, and receive mission priority updates.",
    challenges: [
      "Send emergency alerts.",
      "Share simulated current location.",
      "Report incidents.",
      "Receive priority messages.",
      "View team status.",
      "Maintain an incident communication log."
    ],
    expectedOutcome: "A centralized communication dashboard that helps coordinators quickly identify emergency reports and the status of deployed teams.",
    keyRequirements: [
      "Instant SOS and emergency broadcast transmission",
      "Simulated GPS coordinate sharing with interactive map markers",
      "Priority triage message queues (Critical, High, Routine)",
      "Persistent and timestamped incident audit communication log"
    ],
    expectedDeliverables: [
      "Command center dispatcher dashboard",
      "Field personnel simulated communicator interface",
      "Incident logging and priority notification system"
    ],
    suggestedTech: ["React", "WebSockets / Realtime DB", "Leaflet / Mapbox", "Tailwind CSS", "TypeScript"],
    evaluationCriteria: [
      "Speed & Reliability of Alert Dispatch (30%)",
      "Incident Logging & Priority Hierarchy (25%)",
      "Coordinator UX & Team Status Visibility (25%)",
      "Technical Execution (20%)"
    ],
    scopeSafetyNote: "Designed for personnel safety, emergency alert dispatch, and simulated team status coordination.",
    sponsor: "HackHertz Defence Track"
  },
  {
    id: "def-03",
    problemId: "D-03",
    title: "Defence Vehicle Maintenance Prediction",
    domainId: "defense",
    domainName: "Defence",
    difficulty: "Easy",
    description: "Unexpected vehicle failures can disrupt operations and increase maintenance costs. Maintenance schedules based only on fixed time intervals may fail to account for actual vehicle usage and operating conditions.",
    background: "Standard scheduled maintenance fails when vehicles undergo high operational stress, harsh terrain transit, or irregular engine idling, leading to unexpected breakdown during missions.",
    challenges: [
      "Analyze simulated distance travelled and engine hours.",
      "Use fuel-consumption data where available.",
      "Consider previous maintenance and component replacement history.",
      "Identify vehicles that may require maintenance.",
      "Display maintenance history and upcoming recommendations."
    ],
    expectedOutcome: "A dashboard that displays vehicle health, maintenance history, and maintenance recommendations.",
    keyRequirements: [
      "Vehicle health scoring algorithm based on usage telemetry",
      "Component wear prediction (brakes, transmission, engine oil, tires)",
      "Maintenance history timeline and service log manager",
      "Proactive warning indicators for high-risk fleet units"
    ],
    expectedDeliverables: [
      "Fleet health monitoring dashboard",
      "Vehicle predictive maintenance risk calculator",
      "Service recommendation report generator"
    ],
    suggestedTech: ["TypeScript", "React", "Python / Scikit-learn or JS heuristic ML", "Recharts", "Tailwind CSS"],
    evaluationCriteria: [
      "Predictive Logic & Health Scoring Accuracy (30%)",
      "Data Visualization & Fleet Overview (30%)",
      "Recommendation Clarity & History Auditing (25%)",
      "Implementation Quality (15%)"
    ],
    scopeSafetyNote: "Focus on vehicular fleet longevity, fuel efficiency, and preventive maintenance scheduling.",
    sponsor: "HackHertz Defence Track"
  },
  {
    id: "def-04",
    problemId: "D-04",
    title: "AI-Based Perimeter Intrusion Detection",
    domainId: "defense",
    domainName: "Defence",
    difficulty: "Moderate",
    description: "Restricted facilities may require continuous monitoring of large areas. Relying entirely on humans to monitor multiple camera feeds can result in delayed detection of unauthorized activity.",
    background: "Security personnel experience alarm fatigue and surveillance blind spots when manually reviewing multiple video feeds across perimeter fencing.",
    challenges: [
      "Detect unauthorized entry into predefined zones.",
      "Identify movement inside restricted areas.",
      "Detect loitering or unusual movement patterns.",
      "Identify unauthorized vehicles in simulated footage.",
      "Generate alerts when predefined security conditions are detected."
    ],
    expectedOutcome: "An AI-powered monitoring dashboard capable of detecting and reporting suspicious activity in a simulated restricted environment.",
    keyRequirements: [
      "Virtual boundary / restricted zone overlay definition",
      "Computer vision detection of persons and vehicles inside red zones",
      "Loitering timer and abnormal trajectory detection",
      "Instant visual/audio security alert dispatch with frame snapshot"
    ],
    expectedDeliverables: [
      "Interactive perimeter surveillance dashboard",
      "Simulated video/webcam feed with real-time bounding boxes & intrusion alarms",
      "Intrusion incident log with confidence scores and captured evidence"
    ],
    suggestedTech: ["TensorFlow.js / YOLO / OpenCV", "Canvas API", "React", "TypeScript", "Tailwind CSS"],
    evaluationCriteria: [
      "Intrusion Detection Accuracy & Zone Calibration (30%)",
      "Loitering & Vehicle Detection Pipeline (25%)",
      "Alert Dispatch & Evidence Logging (25%)",
      "Real-time Performance & Presentation (20%)"
    ],
    scopeSafetyNote: "Teams should use publicly available or synthetic datasets. The system must focus on surveillance and alerting, not autonomous engagement, weapon control, or targeting.",
    sponsor: "HackHertz Defence Track"
  },
  {
    id: "def-05",
    problemId: "D-05",
    title: "Multi-Source Defence Situational Awareness System",
    domainId: "defense",
    domainName: "Defence",
    difficulty: "Hard",
    description: "Decision-makers may receive information from multiple sources such as surveillance feeds, equipment reports, weather conditions, maps, and incident reports. Processing this information separately can make it difficult to obtain a clear overall picture.",
    background: "Command rooms struggle with cognitive overload when synthesizing siloed data feeds during fast-evolving tactical or peacetime emergency operations.",
    challenges: [
      "Integrate multiple simulated data sources.",
      "Display events on an interactive map.",
      "Detect significant anomalies or changes.",
      "Prioritize important alerts.",
      "Track simulated equipment and team status.",
      "Provide historical information.",
      "Generate concise situation summaries.",
      "Display confidence levels for detected events."
    ],
    expectedOutcome: "A unified decision-support dashboard that provides authorized users with a clear overview of a simulated operational environment.",
    keyRequirements: [
      "Multi-stream data aggregation engine (weather, radar, personnel, logs, incidents)",
      "Interactive geospatial operational tactical map",
      "AI-driven situation synthesis and concise executive summary briefing",
      "Confidence level indicator for multi-source intelligence reports"
    ],
    expectedDeliverables: [
      "Comprehensive unified command & decision-support center",
      "Dynamic map layer toggle (assets, alerts, weather, zones)",
      "AI situation summary generator with prioritized action items"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API (for situation summarization)", "Leaflet / MapLibre", "Tailwind CSS", "Recharts"],
    evaluationCriteria: [
      "Data Fusion & Multi-Source Integration (30%)",
      "Command Map & Geospatial UX (25%)",
      "AI Situation Summarization & Alert Prioritization (25%)",
      "System Scalability & UI Craftsmanship (20%)"
    ],
    scopeSafetyNote: "The solution should remain focused on situational awareness and decision support. Do not develop autonomous targeting, weapon-control, or offensive capabilities.",
    sponsor: "HackHertz Defence Track"
  },

  // ==========================================
  // DOMAIN 2: CRISIS TECH (C-01 to C-05)
  // ==========================================
  {
    id: "cri-01",
    problemId: "C-01",
    title: "Emergency Alert & Information System",
    domainId: "crisis-tech",
    domainName: "Crisis Tech",
    difficulty: "Easy",
    description: "During disasters, people may receive emergency information from multiple sources, making it difficult to identify important and verified instructions.",
    background: "Misinformation, outdated circulars, and panic spread rapidly during disasters when citizens lack a single source of verified government bulletins.",
    challenges: [
      "Publish emergency announcements.",
      "Provide safety instructions.",
      "Support location-based alerts.",
      "Display emergency contact information.",
      "Publish evacuation updates.",
      "Track incident status."
    ],
    expectedOutcome: "A centralized emergency information platform that provides citizens with clear, organized, and timely crisis information.",
    keyRequirements: [
      "Verified authority bulletin publishing console",
      "Geo-targeted advisory broadcast by region/city",
      "Emergency contact directory (fire, medical, rescue, disaster helplines)",
      "Interactive live evacuation route and safety guideline center"
    ],
    expectedDeliverables: [
      "Citizen emergency public portal (mobile-first)",
      "Authority announcement & alert publisher interface",
      "Incident status feed with verification badges"
    ],
    suggestedTech: ["React", "TypeScript", "Tailwind CSS", "Web Push Notifications / PWA", "Firestore"],
    evaluationCriteria: [
      "Clarity & Accessibility of Emergency Information (35%)",
      "Location-Based Filtering & Evacuation Guidance (25%)",
      "Admin Publishing & Verification Workflow (25%)",
      "UI Responsiveness & Performance (15%)"
    ],
    scopeSafetyNote: "Aimed at public safety, prompt civilian awareness, and anti-panic verified information delivery.",
    sponsor: "HackHertz Crisis Track"
  },
  {
    id: "cri-02",
    problemId: "C-02",
    title: "Disaster Shelter Management System",
    domainId: "crisis-tech",
    domainName: "Crisis Tech",
    difficulty: "Easy",
    description: "During floods, earthquakes, cyclones, or other disasters, emergency shelters need to manage large numbers of displaced people. Lack of accurate information about shelter capacity can result in overcrowding and inefficient resource distribution.",
    background: "Displaced families arrive at already full relief camps while nearby schools or community halls remain underutilized due to lack of real-time occupancy tracking.",
    challenges: [
      "Register emergency shelters.",
      "Track available capacity.",
      "Register affected individuals.",
      "Monitor occupancy.",
      "Track basic resource requirements.",
      "Display shelter locations on a map."
    ],
    expectedOutcome: "A real-time shelter management dashboard showing occupancy, capacity, and resource requirements.",
    keyRequirements: [
      "Shelter capacity vs. current head-count visual indicators",
      "Fast resident intake registration with family grouping",
      "Map view of active shelters with color-coded occupancy states (Green/Yellow/Red)",
      "Basic relief requirement tracker (beds, ration kits, clean water, medical aid)"
    ],
    expectedDeliverables: [
      "Live shelter coordination dashboard",
      "On-site intake registration module",
      "Public shelter availability map for evacuees and volunteers"
    ],
    suggestedTech: ["React", "TypeScript", "Tailwind CSS", "Leaflet / Google Maps", "Firestore"],
    evaluationCriteria: [
      "Real-time Occupancy & Capacity Tracking (30%)",
      "Intake Speed & Family Grouping Usability (25%)",
      "Interactive Map & Status Visuals (25%)",
      "Resource Requirement Auditing (20%)"
    ],
    scopeSafetyNote: "Built for disaster management agencies, NGOs, and municipal rescue operators.",
    sponsor: "HackHertz Crisis Track"
  },
  {
    id: "cri-03",
    problemId: "C-03",
    title: "Emergency Resource Inventory System",
    domainId: "crisis-tech",
    domainName: "Crisis Tech",
    difficulty: "Easy",
    description: "During a disaster, emergency teams require resources such as food, water, medicines, blankets, rescue equipment, and temporary shelters. Poor inventory tracking can lead to shortages in critical locations.",
    background: "Relief supplies often spoil in central warehouses while frontline disaster zones run out of life-saving medicines and infant food.",
    challenges: [
      "Track available resources.",
      "Record incoming supplies or donations.",
      "Track distribution and consumption.",
      "Show location-wise stock.",
      "Generate low-stock alerts.",
      "Provide basic resource analytics."
    ],
    expectedOutcome: "A centralized resource-management dashboard that helps coordinators identify shortages and track resource distribution.",
    keyRequirements: [
      "Supply cataloging with expiration dates and batch tracking",
      "Multi-depot inventory visibility across relief distribution centers",
      "Automated critical threshold alerts for ration, oxygen, and medical stock",
      "Supply-demand analytics and burn rate forecasting"
    ],
    expectedDeliverables: [
      "Centralized relief supply dashboard",
      "Incoming donation/cargo logging interface",
      "Location-wise stock breakdown and automated deficiency warning system"
    ],
    suggestedTech: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Node.js / Express"],
    evaluationCriteria: [
      "Inventory Logistics & Tracking Accuracy (30%)",
      "Deficiency Alerts & Reorder Thresholds (25%)",
      "Data Analytics & Consumption Trends (25%)",
      "User Experience & Code Organization (20%)"
    ],
    scopeSafetyNote: "Essential for humanitarian aid logistics, disaster supply chains, and emergency volunteer groups.",
    sponsor: "HackHertz Crisis Track"
  },
  {
    id: "cri-04",
    problemId: "C-04",
    title: "AI-Based Flood Risk Prediction & Alert System",
    domainId: "crisis-tech",
    domainName: "Crisis Tech",
    difficulty: "Moderate",
    description: "Flooding can rapidly affect communities, roads, and infrastructure. Early identification of areas at risk can help authorities prepare resources and issue warnings.",
    background: "Flash floods and sudden dam water releases submerge low-lying urban wards before municipal evacuation orders can be triggered.",
    challenges: [
      "Analyze simulated or historical rainfall data.",
      "Use water-level information where available.",
      "Consider weather conditions and elevation.",
      "Use historical flood records.",
      "Generate flood-risk scores.",
      "Identify high-risk zones on a map.",
      "Generate early warnings.",
      "Provide trend or risk predictions."
    ],
    expectedOutcome: "An interactive flood monitoring dashboard capable of identifying areas that may require early intervention.",
    keyRequirements: [
      "Hydrological and precipitation telemetry risk algorithm",
      "Interactive watershed / flood elevation contour heatmap",
      "Automated threshold alert generator for river gauge levels",
      "24-48 hour predictive risk trajectory curve"
    ],
    expectedDeliverables: [
      "Interactive hydrological risk dashboard",
      "GIS map with simulated inundation zones",
      "Proactive early warning broadcaster with actionable advisory levels"
    ],
    suggestedTech: ["React", "TypeScript", "Leaflet / D3.js", "Python / Scikit-learn / TensorFlow", "Tailwind CSS"],
    evaluationCriteria: [
      "Prediction Model / Risk Formula Depth (30%)",
      "Geospatial Inundation Visualization (25%)",
      "Alert Generation & Timeline Forecasting (25%)",
      "Real-world Feasibility & Interface Polish (20%)"
    ],
    scopeSafetyNote: "Aimed at early flood warnings, reservoir monitoring, and municipal flood defense planning.",
    sponsor: "HackHertz Crisis Track"
  },
  {
    id: "cri-05",
    problemId: "C-05",
    title: "Intelligent Disaster Response Coordination Platform",
    domainId: "crisis-tech",
    domainName: "Crisis Tech",
    difficulty: "Hard",
    description: "During large-scale disasters, emergency coordinators must simultaneously manage rescue requests, hospitals, shelters, ambulances, roads, weather conditions, and limited resources. The challenge is to create a system capable of turning this fragmented information into actionable response recommendations.",
    background: "Command teams lose precious golden hours trying to cross-reference flooded roads, hospital bed vacancies, ambulance locations, and stranded victim distress calls.",
    challenges: [
      "Integrate simulated emergency incident reports.",
      "Estimate affected population and incident severity.",
      "Track hospital capacity.",
      "Track ambulance availability.",
      "Monitor shelter capacity.",
      "Represent road accessibility.",
      "Incorporate weather conditions.",
      "Track emergency resource inventory.",
      "Prioritize emergency incidents.",
      "Recommend resource allocation.",
      "Identify suitable response routes.",
      "Predict potential resource shortages.",
      "Display incidents on an interactive map.",
      "Generate situation summaries.",
      "Update recommendations as conditions change."
    ],
    expectedOutcome: "A unified crisis command platform that supports emergency coordinators in making faster, data-driven decisions during a simulated disaster.",
    keyRequirements: [
      "Dynamic multi-agency incident aggregation (EMS, Fire, Police, Relief)",
      "Real-time routing engine accounting for blocked/flooded roads",
      "AI recommendation engine for hospital triage and ambulance dispatch optimization",
      "Dynamic crisis situation summary and shortage forecasting"
    ],
    expectedDeliverables: [
      "Unified emergency coordination command portal",
      "Interactive map with incidents, road closures, and live assets",
      "AI dispatch recommendation and situation briefing generator"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API", "D3.js / Leaflet", "Tailwind CSS", "Firebase / Express"],
    evaluationCriteria: [
      "Complexity of Crisis Data Fusion & Resource Optimization (30%)",
      "AI Recommendation & Road Routing Capabilities (25%)",
      "Real-Time Map & Command Center UX (25%)",
      "Scalability & Robustness (20%)"
    ],
    scopeSafetyNote: "The platform is intended for decision support and simulation. Recommendations should remain under human oversight and should not autonomously execute emergency actions.",
    sponsor: "HackHertz Crisis Track"
  },

  // ==========================================
  // DOMAIN 3: AI / ML (A-01 to A-05)
  // ==========================================
  {
    id: "aiml-01",
    problemId: "A-01",
    title: "Smart Image Quality Checker",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Easy",
    description: "Images submitted through online forms, applications, e-commerce platforms, and digital services are often blurry, poorly illuminated, overexposed, or incorrectly framed. Such low-quality images can reduce the accuracy of downstream computer vision and document-processing systems. Develop an AI/ML-based solution that automatically analyzes an uploaded image and determines whether it meets predefined quality standards.",
    background: "Customer onboarding, KYC document scanning, and marketplace listings suffer high failure rates when users submit blurry, skewed, or poorly lit photographs.",
    challenges: [
      "Detect blur and lack of sharpness.",
      "Identify poor lighting, overexposure, and underexposure.",
      "Detect excessive noise and poor image composition.",
      "Handle images captured under different devices and environments.",
      "Provide meaningful quality assessment rather than only a binary decision."
    ],
    expectedOutcome: "A system that accepts an image and provides: Overall Image Quality Score, Detected quality issues, Accept / Retake recommendation, Confidence or reliability score, and Optional suggestions for improving the image.",
    keyRequirements: [
      "Laplacian variance / FFT for blur detection",
      "Luminance histogram analysis for exposure assessment",
      "Real-time visual feedback on web camera / file upload",
      "Actionable retake tips (e.g. 'Turn on flashlight', 'Hold camera steady')"
    ],
    expectedDeliverables: [
      "Interactive image quality analyzer web app",
      "Detailed breakdown report with metric gauges",
      "Instant pass/fail recommendation with enhancement tips"
    ],
    suggestedTech: ["OpenCV.js / Canvas API", "TensorFlow.js", "React", "TypeScript", "Tailwind CSS"],
    evaluationCriteria: [
      "Image Quality Metric Precision (Blur, Lighting, Framing) (30%)",
      "Actionable Feedback & Retake Guidance (30%)",
      "Speed of Client-Side Inference (25%)",
      "UI Presentation & Ease of Use (15%)"
    ],
    scopeSafetyNote: "Built for online KYC, document onboarding, and consumer photo verification pipelines.",
    sponsor: "HackHertz AI/ML Track"
  },
  {
    id: "aiml-02",
    problemId: "A-02",
    title: "AI-Based Duplicate Image Detection",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Easy",
    description: "Users and organizations often store multiple copies of the same or visually similar images. Slight modifications such as resizing, cropping, compression, or minor edits can make traditional file-based duplicate detection ineffective. Develop a computer-vision-based solution that identifies exact duplicates and visually similar images within a collection.",
    background: "Cloud storage costs soar when digital asset libraries accumulate visually identical photos with renamed files, re-saved JPEG compression, or slight color filters.",
    challenges: [
      "Detect duplicates with different file names or formats.",
      "Identify visually similar images after resizing or compression.",
      "Handle cropped or slightly edited versions.",
      "Compare large image collections efficiently.",
      "Minimize false matches."
    ],
    expectedOutcome: "A system that analyzes an image collection and provides: Duplicate image groups, Visually similar image groups, Similarity score, Duplicate/similar image count, and Optional storage-saving estimation.",
    keyRequirements: [
      "Perceptual Hashing (pHash, dHash, aHash) or CNN embedding cosine similarity",
      "Batch folder / zip upload and clustering algorithm",
      "Side-by-side visual diff comparison interface",
      "Estimated disk storage savings calculation upon duplicate cleanup"
    ],
    expectedDeliverables: [
      "Duplicate finder workspace web app",
      "Clustered image group viewer with similarity scores",
      "Storage optimization summary report"
    ],
    suggestedTech: ["React", "TypeScript", "Canvas / Perceptual Hash / MobileNet Embeddings", "Tailwind CSS"],
    evaluationCriteria: [
      "Duplicate & Near-Duplicate Detection Accuracy (35%)",
      "Resilience to Resizing, Cropping & Compression (30%)",
      "Batch Processing Speed & Cluster UI (20%)",
      "Code Cleanliness (15%)"
    ],
    scopeSafetyNote: "Focus on storage optimization, digital forensics, and media asset de-duplication.",
    sponsor: "HackHertz AI/ML Track"
  },
  {
    id: "aiml-03",
    problemId: "A-03",
    title: "AI-Based Meeting Action Item Extractor",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Easy",
    description: "Teams often need to review lengthy meeting transcripts to determine what decisions were made, what tasks were assigned, who is responsible, and when tasks should be completed. Important action items can easily be lost within general discussion. Develop an AI/NLP-based solution that analyzes meeting transcripts and automatically extracts decisions, action items, responsible individuals, and deadlines.",
    background: "Hours are wasted after team meetings clarifying ownership because action items were buried across thousands of words of conversational banter.",
    challenges: [
      "Distinguish action items from general conversation.",
      "Identify the person responsible for each task.",
      "Detect deadlines expressed in different formats.",
      "Handle long and unstructured conversations.",
      "Generate concise and meaningful outputs."
    ],
    expectedOutcome: "A structured meeting output containing: Key decisions, Action items, Assigned person, Deadline, and Priority, where applicable.",
    keyRequirements: [
      "NLP Entity recognition for speakers, tasks, and temporal expressions",
      "Confidence-weighted action item categorization",
      "Exportable task table (Markdown, CSV, Jira/Trello format)",
      "Meeting summary highlighting key decisions vs. open discussions"
    ],
    expectedDeliverables: [
      "Transcript upload and text paste analyzer",
      "Interactive Action Item Kanban / checklist board",
      "Summary card with assigned owner tags and deadlines"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API / Natural / compromise NLP", "Tailwind CSS"],
    evaluationCriteria: [
      "Accuracy in Task & Assignee Extraction (35%)",
      "Deadline Normalization & Decision Detection (30%)",
      "Output Structure & Export Options (20%)",
      "User Interface Quality (15%)"
    ],
    scopeSafetyNote: "Built for enterprise productivity, agile standups, and corporate team meeting governance.",
    sponsor: "HackHertz AI/ML Track"
  },
  {
    id: "aiml-04",
    problemId: "A-04",
    title: "Autonomous AI/ML Model Execution Platform",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Moderate",
    description: "Thousands of AI/ML models and projects are available through model hubs, code repositories, research resources, and downloadable project packages. However, executing these models often requires users to manually understand documentation, identify dependencies, configure environments, download model assets, resolve compatibility issues, and troubleshoot runtime errors. Develop an intelligent platform that analyzes a model or AI/ML project from sources such as Hugging Face, ModelScope, Kaggle, code repositories, uploaded project files, or model packages, and automatically prepares the required execution environment.",
    background: "Researchers and developers spend up to 70% of prototype time wrestling with CUDA driver mismatches, deprecated PyTorch packages, and conflicting Hugging Face hub dependencies.",
    challenges: [
      "Automatically understand documentation and project structure.",
      "Identify required runtime and framework versions.",
      "Detect and install dependencies.",
      "Resolve dependency/version conflicts.",
      "Detect CPU/GPU and CUDA compatibility.",
      "Download required model weights or assets.",
      "Analyze and handle runtime errors.",
      "Securely execute third-party code."
    ],
    expectedOutcome: "A one-click AI/ML execution platform following: Input → Project Analysis → Requirement Detection → Environment Creation → Dependency Setup → Model Setup → Execution → Error Handling → Result. The platform should provide environment status, setup logs, detected compatibility issues, error/resolution information, model output, and an execution summary.",
    keyRequirements: [
      "Repository / HuggingFace model card structure parser",
      "Automated requirements.txt / environment.yml dependency graph resolver",
      "Execution sandbox with real-time streaming setup logs",
      "Interactive test inference UI generated dynamically for the model"
    ],
    expectedDeliverables: [
      "Model repository analyzer & execution orchestrator dashboard",
      "Streaming build logs & dependency conflict resolver visualizer",
      "Dynamic test playground to run inputs and view model outputs"
    ],
    suggestedTech: ["React", "TypeScript", "Node.js / Python API", "Docker / WASM", "Tailwind CSS"],
    evaluationCriteria: [
      "Automated Dependency & Environment Resolution Logic (30%)",
      "Log Transparency & Error Handling (25%)",
      "Interactive Model Execution & UI Generation (25%)",
      "Security & Performance (20%)"
    ],
    scopeSafetyNote: "Ensures safe third-party code isolation and automated ML reproduction pipelines.",
    sponsor: "HackHertz AI/ML Track"
  },
  {
    id: "aiml-05",
    problemId: "A-05",
    title: "Autonomous AI Research Reproduction & Validation Agent",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Hard",
    description: "Reproducing results from AI/ML research papers is challenging because experimental methodologies, datasets, model architectures, hyperparameters, evaluation metrics, and implementation details may be distributed across different sections or supplementary resources. Develop an autonomous AI agent that analyzes a research paper/PDF and its available resources to understand the proposed methodology and attempt to reproduce the reported experiment.",
    background: "The scientific AI reproducibility crisis means over 60% of published academic papers cannot be validated by peer labs due to omitted hyperparameter tables or vague preprocessing descriptions.",
    challenges: [
      "Understand complex scientific papers and methodologies.",
      "Extract model architecture and experimental configurations.",
      "Interpret equations and technical descriptions.",
      "Identify required datasets and resources.",
      "Determine missing implementation details.",
      "Automatically configure the experimental environment.",
      "Execute experiments and evaluation pipelines.",
      "Compare reproduced and reported results.",
      "Identify potential reasons for reproduction failures."
    ],
    expectedOutcome: "Research Paper → Method Extraction → Experiment Planning → Environment Setup → Data Preparation → Experiment Execution → Evaluation → Result Comparison → Reproducibility Report. The report should include reported results, reproduced results, performance difference, experimental configuration, successfully reproduced components, failed components, possible reasons for failure, and an overall reproducibility assessment.",
    keyRequirements: [
      "PDF paper parsing with multi-modal formula, table, and architecture extraction",
      "Experiment step planner and missing hyperparameter hallucination detector",
      "Execution & evaluation pipeline with metric delta calculation (e.g. Accuracy, F1, BLEU)",
      "Comprehensive reproducibility score & breakdown report generator"
    ],
    expectedDeliverables: [
      "Paper-to-Code Reproduction Agent dashboard",
      "Structured experiment recipe visualizer",
      "Comparative reproducibility audit report with diff metrics"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API (Multimodal Document Analysis)", "Python / Jupyter backend", "Tailwind CSS"],
    evaluationCriteria: [
      "Paper Extraction & Architecture Dissection Accuracy (30%)",
      "Experiment Planning & Missing Detail Recovery (25%)",
      "Result Comparison & Audit Report Quality (25%)",
      "Innovation & Autonomous Agent Architecture (20%)"
    ],
    scopeSafetyNote: "Built for academic transparency, ML peer-review acceleration, and reproducible AI research.",
    sponsor: "HackHertz AI/ML Track"
  },

  // ==========================================
  // DOMAIN 4: EDTECH & SMART LEARNING (E-01 to E-05)
  // ==========================================
  {
    id: "edt-01",
    problemId: "E-01",
    title: "AI-Based Lecture Engagement Analyzer",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Easy",
    description: "In online and recorded classes, educators often have limited insight into which parts of a lecture students find engaging, confusing, or difficult to follow. Develop an AI-based solution that analyzes lecture transcripts, timestamps, and available student interaction data to identify sections that may require additional explanation or attention.",
    background: "Professors post 60-minute video lectures with zero feedback on where students paused, re-watched, dropped off, or flooded comment sections with confusion.",
    challenges: [
      "Identify potentially confusing sections.",
      "Analyze pauses, rewatches, and question frequency.",
      "Correlate lecture sections with student responses.",
      "Generate meaningful insights with minimal manual analysis."
    ],
    expectedOutcome: "A lecture engagement report showing high/low engagement sections, difficult topics, frequently revisited sections, question hotspots, and recommended revision topics.",
    keyRequirements: [
      "Lecture timeline heatmap highlighting student drop-off and re-watch spikes",
      "Transcript semantic difficulty scoring and concept complexity tagging",
      "Question hotspot clustering by timestamp",
      "Automated educator revision checklist recommendations"
    ],
    expectedDeliverables: [
      "Instructor analytics dashboard with timeline visualizer",
      "Lecture transcript reader with engagement annotations",
      "Student confusion hotspot summary report"
    ],
    suggestedTech: ["React", "TypeScript", "Recharts", "Gemini API", "Tailwind CSS"],
    evaluationCriteria: [
      "Engagement Metric & Confusion Spotting Logic (35%)",
      "Instructor Dashboard Clarity & Timeline Heatmap (30%)",
      "Actionable Recommendations for Educators (20%)",
      "Technical Implementation (15%)"
    ],
    scopeSafetyNote: "Empowers educators with actionable student-centric pedagogical feedback.",
    sponsor: "HackHertz EdTech Track"
  },
  {
    id: "edt-02",
    problemId: "E-02",
    title: "AI-Based Answer Evaluation Assistant",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Easy",
    description: "Evaluating descriptive and short-answer questions manually can be time-consuming, especially when students express the same concept using different words or sentence structures. Develop an AI-based solution that evaluates student answers based on expected concepts, keywords, and reasoning rather than relying only on exact keyword matching.",
    background: "Manual grading of hundreds of subjective essays leads to human grading fatigue, bias, and generic 'Good' comments devoid of personalized feedback.",
    challenges: [
      "Understand different ways of expressing the same concept.",
      "Identify essential concepts and missing points.",
      "Distinguish partially correct from incorrect answers.",
      "Provide consistent evaluation and constructive feedback.",
      "Handle minor spelling and grammatical errors."
    ],
    expectedOutcome: "A system that provides score/marks, correctness assessment, missing concepts, strengths and weaknesses, constructive feedback, and an optional suggested answer.",
    keyRequirements: [
      "Semantic rubric matcher comparing student submission against model answer",
      "Granular marks breakdown with concept-by-concept justification",
      "Highlighting strengths, missed key terminology, and misconceptions",
      "Teacher moderation console to adjust AI marks and add custom feedback"
    ],
    expectedDeliverables: [
      "Teacher evaluation workbench with batch grading",
      "Student score card with constructive feedback breakdown",
      "Rubric configuration manager"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API", "Tailwind CSS"],
    evaluationCriteria: [
      "Evaluation Consistency & Semantic Understanding (35%)",
      "Constructive Feedback & Concept Gap Identification (30%)",
      "Educator Moderation UI & Rubric Builder (20%)",
      "System Usability (15%)"
    ],
    scopeSafetyNote: "Assists teachers while maintaining educator oversight in final grading decisions.",
    sponsor: "HackHertz EdTech Track"
  },
  {
    id: "edt-03",
    problemId: "E-03",
    title: "Smart Study Material Summarizer",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Easy",
    description: "Students often need to study from lengthy textbooks, lecture notes, PDFs, and other educational resources. Extracting the most important information from large volumes of content can be time-consuming and inefficient. Develop an AI-based solution that transforms educational content into concise, structured, and revision-friendly study material while preserving important concepts and technical information.",
    background: "Exam cramming with 300-page textbooks causes cognitive overload; students need rapid formula sheets, core definitions, and memory flashcards.",
    challenges: [
      "Identify key concepts and important information from lengthy content.",
      "Generate concise summaries without losing essential context.",
      "Preserve important definitions, formulas, and technical terminology.",
      "Handle different document formats and subject domains.",
      "Adapt output to different learning levels."
    ],
    expectedOutcome: "Educational Content → Key Concepts → Summary → Important Definitions → Key Points → Revision Notes. The solution may additionally generate flashcards, important questions, or quick-revision material.",
    keyRequirements: [
      "Multi-level summarization (Quick Glance, Deep Summary, Exam Cram)",
      "Auto-generated interactive flashcards with spaced repetition preview",
      "Formula and definition glossary extraction",
      "Self-assessment quiz generation based on summarized material"
    ],
    expectedDeliverables: [
      "Study material upload and summarization portal",
      "Interactive flashcard and quiz generator",
      "Exportable PDF/Markdown cheat sheet"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "PDF-parse"],
    evaluationCriteria: [
      "Summary Quality & Retention of Core Concepts/Formulas (35%)",
      "Flashcard & Question Generator Utility (30%)",
      "Adaptive Learning Level Support (20%)",
      "Design & Usability (15%)"
    ],
    scopeSafetyNote: "Enhances student comprehension and exam revision efficiency.",
    sponsor: "HackHertz EdTech Track"
  },
  {
    id: "edt-04",
    problemId: "E-04",
    title: "Personalized Learning Path Generator",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Moderate",
    description: "Students have different levels of prior knowledge, learning speeds, goals, and areas of difficulty. However, traditional learning platforms often provide the same sequence of content to every learner. Develop an intelligent system that analyzes a student's current knowledge, assessment results, learning goals, progress, and available educational resources to generate a personalized and adaptive learning path.",
    background: "One-size-fits-all curricula bore advanced learners while leaving struggling students behind due to unaddressed prerequisite knowledge gaps.",
    challenges: [
      "Determine current competency level.",
      "Identify knowledge gaps and prerequisite concepts.",
      "Recommend an effective sequence of topics.",
      "Select appropriate learning resources.",
      "Adapt the learning path based on performance.",
      "Prevent unnecessary repetition of mastered concepts."
    ],
    expectedOutcome: "Student Profile → Assessment → Knowledge Gap → Topic Recommendation → Learning Resource → Practice → Reassessment → Updated Learning Path. The learning path should continuously adapt based on student progress and performance.",
    keyRequirements: [
      "Prerequisite concept dependency graph engine",
      "Diagnostic pre-test with dynamic question difficulty adjustment",
      "Personalized modular roadmap with milestone badges",
      "Real-time roadmap re-routing when a student fails a milestone assessment"
    ],
    expectedDeliverables: [
      "Student learning roadmap portal with interactive skill tree",
      "Diagnostic assessment and knowledge gap visualizer",
      "Adaptive recommendation feed with multi-modal resources"
    ],
    suggestedTech: ["React", "TypeScript", "D3.js / React Flow", "Gemini API", "Tailwind CSS"],
    evaluationCriteria: [
      "Adaptive Path Generation & Prerequisite Graph Logic (35%)",
      "Interactive Roadmap & Skill Tree Visuals (25%)",
      "Assessment-to-Adaptation Feedback Loop (25%)",
      "Overall Polish & UX (15%)"
    ],
    scopeSafetyNote: "Tailors educational journey dynamically to individual learner needs.",
    sponsor: "HackHertz EdTech Track"
  },
  {
    id: "edt-05",
    problemId: "E-05",
    title: "Autonomous AI Tutor & Adaptive Learning Agent",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Hard",
    description: "Traditional digital learning platforms generally provide similar content and teaching approaches to all students despite differences in knowledge, learning speed, misconceptions, and learning requirements. Develop an autonomous AI learning agent that acts as a personalized tutor. It should identify knowledge gaps and misconceptions, determine what the student should learn next, provide appropriate explanations and exercises, evaluate responses, and continuously adapt its teaching strategy.",
    background: "Most AI chatbots simply spit out final answers, robbing students of the vital cognitive struggle necessary for true conceptual mastery.",
    challenges: [
      "Build a student knowledge model.",
      "Detect misconceptions from student responses.",
      "Adapt explanations to the learner's level.",
      "Generate personalized examples and practice questions.",
      "Dynamically adjust question difficulty.",
      "Determine when a student has mastered a concept.",
      "Track long-term learning progress.",
      "Select appropriate teaching strategies based on performance.",
      "Avoid simply providing answers when guided learning is more appropriate."
    ],
    expectedOutcome: "Assess → Diagnose → Teach → Practice → Evaluate → Detect Misconception → Adapt → Reassess. The system should provide personalized explanations, adaptive practice questions, concept mastery tracking, misconception detection, dynamic difficulty adjustment, learning progress analytics, and personalized next-step recommendations.",
    keyRequirements: [
      "Socratic pedagogy agent that guides students with hints rather than direct answers",
      "Student misconception diagnosis matrix (e.g. syntax error vs. algorithmic logic bug)",
      "Dynamic mastery level barometer per topic",
      "Conversational voice/text interactive tutor interface"
    ],
    expectedDeliverables: [
      "Autonomous Socratic AI Tutor classroom interface",
      "Student Knowledge Model & Misconception Tracker dashboard",
      "Adaptive practice arena with dynamic difficulty modulation"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini 2.5 API (System Prompt Engineering / Function Calling)", "Tailwind CSS", "Web Speech API"],
    evaluationCriteria: [
      "Socratic Pedagogical Quality & Misconception Handling (35%)",
      "Knowledge Modeling & Mastery Tracking Depth (25%)",
      "Adaptive Practice & Dynamic Difficulty Logic (25%)",
      "Interface Craft & Conversational UX (15%)"
    ],
    scopeSafetyNote: "Encourages deep critical thinking and guided discovery rather than rote memorization or answer shortcutting.",
    sponsor: "HackHertz EdTech Track"
  },

  // ==========================================
  // DOMAIN 5: CYBER SECURITY (CS-01 to CS-05 / C-01 to C-05)
  // ==========================================
  {
    id: "sec-01",
    problemId: "CS-01",
    title: "Smart Stadium Entry Verification",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Easy",
    description: "Large cricket matches can experience delays and security risks during entry due to manual ticket and pass verification. Duplicate, invalid, or unauthorized credentials may also lead to improper access. Develop an AI-enabled system that assists security personnel in verifying entry credentials and identifying suspicious or duplicate access attempts.",
    background: "Stadium turnstiles during major matches suffer massive bottle-necks and fake ticket scams when paper/digital barcodes are shared or duplicated.",
    challenges: [
      "Detect duplicate or invalid credentials.",
      "Handle different ticket and pass formats.",
      "Process large numbers of entries efficiently.",
      "Minimize false rejections."
    ],
    expectedOutcome: "A system providing ticket/pass verification, duplicate detection, suspicious-entry alerts, and entry logs.",
    keyRequirements: [
      "High-speed QR / barcode cryptographic verification (sub-300ms)",
      "Instant duplicate scan detection with anti-passback rules",
      "Security gate turnstile UI with clear Pass/Fail/Duplicate audiovisual cues",
      "Live turnstile throughput telemetry and gate capacity monitoring"
    ],
    expectedDeliverables: [
      "Gate security scanner web app with camera QR reader",
      "Supervisor live stadium crowd & gate occupancy dashboard",
      "Tamper-proof entry audit logs"
    ],
    suggestedTech: ["React", "TypeScript", "HTML5 QR Scanner / jsQR", "Tailwind CSS", "WebSockets / Firestore"],
    evaluationCriteria: [
      "Verification Speed & Duplicate Flagging Accuracy (35%)",
      "Gate Operator UX & Audio-Visual Feedback (25%)",
      "Anti-Passback & Fraud Prevention Logic (25%)",
      "Live Stadium Telemetry Polish (15%)"
    ],
    scopeSafetyNote: "Designed for sporting venues, concert arenas, and high-volume public stadiums.",
    sponsor: "HackHertz CyberSecurity Track"
  },
  {
    id: "sec-02",
    problemId: "CS-02",
    title: "AI-Based Phishing Message Detector",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Easy",
    description: "Users frequently receive deceptive emails, SMS messages, and online messages designed to trick them into revealing sensitive information or visiting malicious links. Develop an AI-based system that analyzes message content and identifies potential phishing or social-engineering attempts.",
    background: "Modern spear-phishing and smishing attacks use hyper-realistic LLM text and deceptive brand spoofing to steal banking OTPs and passwords.",
    challenges: [
      "Detect suspicious language and patterns.",
      "Identify deceptive links and requests.",
      "Handle newly emerging phishing techniques.",
      "Reduce false positives."
    ],
    expectedOutcome: "Message → Risk Analysis → Phishing Probability → Threat Indicators → Safety Recommendation.",
    keyRequirements: [
      "Heuristic & NLP feature extraction (urgency language, typosquatting domains, credential harvesting forms)",
      "Phishing risk score gauge (0-100%) with categorized threat breakdown",
      "Safe link previewer with redirect inspection and domain reputation lookup",
      "Actionable safety advice ('Do not click link', 'Sender domain does not match bank')"
    ],
    expectedDeliverables: [
      "Phishing analyzer portal (email & SMS paste/upload)",
      "Threat indicator breakdown card with highlighted risky text spans",
      "Browser extension / mobile preview simulation"
    ],
    suggestedTech: ["React", "TypeScript", "Gemini API / Heuristic NLP rules", "Tailwind CSS"],
    evaluationCriteria: [
      "Detection Accuracy & Threat Indicator Precision (35%)",
      "Explainability & Risk Breakdown UX (30%)",
      "Handling of Emerging Social Engineering Vectors (20%)",
      "Interface Polish (15%)"
    ],
    scopeSafetyNote: "Protects end-users and corporate staff from deceptive social engineering attacks.",
    sponsor: "HackHertz CyberSecurity Track"
  },
  {
    id: "sec-03",
    problemId: "CS-03",
    title: "AI-Based Restricted Area Intrusion Detection",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Easy",
    description: "Cricket environments contain restricted zones such as player areas, pitch surroundings, equipment areas, and service entrances. Unauthorized entry can create safety and security risks. Develop a computer-vision-based system that detects when an unauthorized person enters a predefined restricted area.",
    background: "During high-profile cricket tournaments, pitch invaders and unauthorized personnel in player dugout zones pose major safety threats.",
    challenges: [
      "Detect people in real time.",
      "Define and monitor virtual restricted zones.",
      "Track individuals across video frames.",
      "Reduce false alerts from authorized personnel."
    ],
    expectedOutcome: "A real-time system that detects restricted-area violations, identifies the location and timestamp, and generates an alert for authorized security personnel.",
    keyRequirements: [
      "Interactive polygon drawing tool to define restricted pitch / dugout zones",
      "Real-time object detection tracking person centroid inside zones",
      "Instant visual siren and timestamped intrusion snapshot capture",
      "Incident review feed with security personnel acknowledgment button"
    ],
    expectedDeliverables: [
      "Stadium security CCTV monitoring dashboard",
      "Virtual zone calibration tool",
      "Intrusion alarm log with replay snapshots"
    ],
    suggestedTech: ["TensorFlow.js (Coco-SSD) / OpenCV", "Canvas API", "React", "TypeScript", "Tailwind CSS"],
    evaluationCriteria: [
      "Real-Time Person Tracking & Zone Boundary Precision (35%)",
      "False Alert Mitigation & Zone Calibration UX (30%)",
      "Incident Snapshot & Alarm Dispatch (20%)",
      "System Performance (15%)"
    ],
    scopeSafetyNote: "Focus on venue security, player safety, and restricted area perimeter surveillance.",
    sponsor: "HackHertz CyberSecurity Track"
  },
  {
    id: "sec-04",
    problemId: "CS-04",
    title: "AI-Based Cyber Threat Detection from System Logs",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Moderate",
    description: "Organizations generate large volumes of system and network logs, making it difficult for security teams to manually identify suspicious activity. Develop an ML-based system that analyzes logs and detects potential cyber threats and abnormal system behavior.",
    background: "SOC analysts drown in gigabytes of daily syslog, auth.log, and firewall events, missing subtle lateral movement and brute force reconnaissance.",
    challenges: [
      "Process large and diverse log data.",
      "Identify normal versus abnormal behavior.",
      "Detect previously unseen patterns.",
      "Reduce false positives.",
      "Prioritize threats based on severity."
    ],
    expectedOutcome: "Logs → Behavior Analysis → Anomaly Detection → Threat Classification → Risk Score → Alert. The system should provide useful evidence and context for each flagged event.",
    keyRequirements: [
      "Log parser supporting syslog, Apache/Nginx, Windows Event Logs, and auth logs",
      "Anomaly detection model for frequency spikes, port scans, and brute-force spikes",
      "MITRE ATT&CK technique mapping for detected threat events",
      "Interactive SOC investigator timeline with raw log evidence viewer"
    ],
    expectedDeliverables: [
      "SOC Threat Hunting dashboard",
      "Real-time log ingestion and anomaly alert pipeline",
      "Threat classification and severity triage report"
    ],
    suggestedTech: ["React", "TypeScript", "Recharts", "Gemini API (for log explanation)", "Tailwind CSS"],
    evaluationCriteria: [
      "Log Parsing & Anomaly Detection Efficacy (35%)",
      "Threat Classification & Evidence Context (30%)",
      "SOC Dashboard Usability & MITRE Mapping (20%)",
      "Processing Performance (15%)"
    ],
    scopeSafetyNote: "Built for enterprise security operations centers (SOC) and defensive cyber telemetry.",
    sponsor: "HackHertz CyberSecurity Track"
  },
  {
    id: "sec-05",
    problemId: "CS-05",
    title: "Smart Digital Visitor & Group Pass Verification System",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Moderate",
    description: "In events, institutions, public facilities, and other controlled-access locations, visitors often need to register their personal details before visiting and receive an access pass. Managing individual passes for large families or groups can become time-consuming for both visitors and administrators. Develop a digital visitor registration and pass management system where visitors can register their details remotely before arrival. The system should allow an authorized family/group representative to register multiple members and generate individual, uniquely verifiable digital passes with QR codes for each member.",
    background: "When a family of 20 visits a venue, verifying 20 individual passes manually creates long queues and administrative confusion. A single group representative must be able to manage all family members while each member carries their own cryptographically verifiable QR pass.",
    challenges: [
      "Allow visitors to register remotely before arrival.",
      "Support registration of multiple people under a single family/group.",
      "Generate a unique digital pass for every individual.",
      "Associate individual passes with an authorized family/group representative.",
      "Generate tamper-resistant and verifiable QR codes.",
      "Allow administrators to instantly verify a pass.",
      "Detect duplicate, expired, cancelled, or already-used passes.",
      "Support new visitors who register at the location.",
      "Maintain visitor and verification records securely.",
      "Protect personal information and prevent unauthorized access."
    ],
    expectedOutcome: "Online Registration → Identity Verification → Family/Group Registration → Individual Pass Generation → QR Verification → Entry Validation → Visitor Records.",
    workflowSteps: [
      "1. Family/Group Lead registers remotely and adds up to 20 member details",
      "2. System generates Master Group ID and individual QR passes for each member",
      "3. Authorized representative can display all passes or share individual QR codes",
      "4. Gate Administrator scans QR to instantly verify identity, group ID, pass validity & entry status",
      "5. Walk-in visitors can register on-site and instantly receive verified digital passes",
      "6. Real-time access ledger updates with entry timestamps and prevents duplicate entry reuse"
    ],
    visitorCapabilities: [
      "Online remote pre-registration",
      "Family/group member management",
      "Individual digital passes with wallet download",
      "Unique QR code for every visitor",
      "Live pass status and validity tracking"
    ],
    adminCapabilities: [
      "Instant QR scanning & camera verification",
      "Family/group pass hierarchy management",
      "Duplicate / invalid / expired pass detection & warning",
      "On-site walk-in visitor fast registration",
      "Live entry/exit telemetry and verification audit history"
    ],
    keyRequirements: [
      "1 Family/Group → 1 Authorized Representative → Multiple Individually Verifiable QR Passes",
      "Cryptographic payload embedded in QR code with tamper-evident digital signature",
      "Anti-replay and one-time entry validation mechanics",
      "Offline-capable verification mode for low-connectivity stadium/venue gates"
    ],
    expectedDeliverables: [
      "Visitor Portal for family/group pre-registration and pass management",
      "Administrator High-Speed QR Scanner & Gate Control console",
      "Walk-in visitor fast pass issuance terminal"
    ],
    suggestedTech: ["React", "TypeScript", "Tailwind CSS", "QRCode.react / jsQR", "Firestore", "Web Crypto API"],
    evaluationCriteria: [
      "Group/Family Multi-Pass Hierarchy & QR Generation (35%)",
      "Admin Gate Scanning & Fraud Detection (30%)",
      "Walk-in Registration & On-Site Workflow (20%)",
      "Security & Data Protection (15%)"
    ],
    scopeSafetyNote: "Streamlines high-volume public venue access while preventing unauthorized pass duplication or fraudulent re-use.",
    sponsor: "HackHertz CyberSecurity Track"
  }
];

// ==========================================
// OPEN INNOVATION TRACK (OPEN THEME - NO FIXED PROBLEM STATEMENT)
// ==========================================
export const OPEN_INNOVATION_SPECIFICATION: ProblemStatementDetailed = {
  id: "open-innovation-open-theme",
  problemId: "OPEN-THEME",
  title: "Open Innovation — Bring Your Own Problem Statement & Solution",
  domainId: "open-innovation",
  domainName: "Open Innovation",
  difficulty: "Open Theme",
  description: "In the Open Innovation track, no predetermined problem statement is assigned by the committee. Your team has 100% complete autonomy and creative freedom to identify any real-world challenge, formulate your own idea, and build a working prototype using any tech stack of your choice.",
  background: "Open Innovation is designed to foster unrestricted ingenuity. Whether it's cutting-edge AI, Decentralized Systems, Healthcare Tech, FinTech, Sustainability, Robotics, Developer Tooling, or Consumer Apps, teams are free to push boundaries without rigid constraints.",
  challenges: [
    "Identify a clear, genuine real-world problem or unmet need.",
    "Formulate a novel, creative, and feasible technical solution.",
    "Architect and engineer a working prototype or proof-of-concept during the 30-hour hackathon.",
    "Demonstrate functionality, user experience, and practical real-world impact."
  ],
  expectedOutcome: "A functional working prototype or application addressing the team's self-defined problem statement, accompanied by a public GitHub repository and live presentation deck.",
  keyRequirements: [
    "Self-selected problem statement clearly articulated in your pitch",
    "Functional working prototype demonstrated live to the jury",
    "Clean, documented source code on GitHub with README",
    "Pitch deck highlighting: Problem, Solution, Tech Architecture, Scalability & Impact"
  ],
  expectedDeliverables: [
    "Live functional prototype demonstration (Web, Mobile, Cloud, AI, or Hardware)",
    "GitHub repository with project source code and architecture documentation",
    "Final presentation pitch deck explaining the self-chosen problem and solution"
  ],
  suggestedTech: ["Any Modern Tech Stack: React, Next.js, Python, Flutter, Node.js, AI/ML, Cloud, Web3, IoT"],
  evaluationCriteria: [
    "Innovation & Originality of the Idea (30%)",
    "Technical Complexity & Implementation Quality (30%)",
    "Problem Relevance & Practical Real-World Impact (20%)",
    "Prototype Completeness & Live Presentation Pitch (20%)"
  ],
  sponsor: "HackHertz Open Innovation Track"
};

