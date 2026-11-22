export interface LawDetail {
  id: string;
  title: string;
  enactedYear: number;
  status: "enacted" | "pending_notification" | "draft" | "proposed";
  keySections: string[];
  maxPrison: string;
  maxFine: string;
  summary: string;
  pendingNoticeDetails?: string; // Specific details if available but not notified
}

export interface AICybercrimeDetail {
  hasDedicatedAILaw: boolean;
  status: "enacted" | "pending" | "none";
  actName: string;
  summary: string;
  coveredOffenses: string[]; // e.g. ["Deepfake Impersonation", "AI Fraud", "Autonomous Malware", "Biometric Spoofing"]
  strictnessRating: "Very High" | "High" | "Medium" | "Low" | "Emerging";
}

export interface StrictnessFactor {
  pillar: string;
  weight: string;
  rationale: string;
}

export interface CountryCyberLaw {
  id: string;
  country: string;
  code: string;
  flag: string;
  continent: "North America" | "Europe" | "Asia-Pacific" | "Middle East" | "Latin America" | "Africa";
  strictnessScore: number; // 1.0 to 10.0
  strictnessRating: "Very High" | "High" | "Moderate" | "Developing";
  executiveVerdict: string; // 1-sentence plain-English takeaway readable in 3 seconds by anyone
  breachPill: string; // Clean scannable badge
  penaltyPill: string; // Clean scannable badge
  aiLawPill: string; // Clean scannable badge
  strictnessRationale: string; // EXPLICIT REASONING answering: Why is this country rated this strict?
  strictnessFactors: StrictnessFactor[]; // Substantive breakdown
  breachReportingHours: string;
  conciseBreachMandate: string; // Zero-ellipsis formatted string
  extraterritorialReach: boolean;
  leadEnforcementAgency: string;
  primaryActs: LawDetail[];
  pendingOrDraftActs: LawDetail[]; // SPECIFIC REQUIREMENT: Available but not notified as laws yet
  pipelineHighlight: string; // Explicit explanation of what's in the legislative pipeline
  aiCybercrime: AICybercrimeDetail;
  aiGovernanceSummary: string; // Substantive summary answering: What does the AI law actually enforce?
  keyHighlights: string[];
}

export const COUNTRIES_DATA: CountryCyberLaw[] = [
  {
    id: "in",
    country: "India",
    code: "IND",
    flag: "🇮🇳",
    continent: "Asia-Pacific",
    strictnessScore: 8.4,
    strictnessRating: "High",
    executiveVerdict: "Enforces the world's fastest 6-hour breach disclosure window, with life imprisonment for cyber terrorism under IT Act Sec 66F.",
    breachPill: "6h (CERT-In)",
    penaltyPill: "Life Sentence",
    aiLawPill: "In Progress (Draft DIA)",
    strictnessRationale: "Driven by the world's fastest mandatory breach notification window (6 hours to CERT-In), compulsory 5-year log retention directives, and life imprisonment for Sec 66F cyber terrorism.",
    strictnessFactors: [
      { pillar: "Disclosure Urgency", weight: "Critical", rationale: "Strictest globally: 6-hour disclosure to CERT-In for 20+ incident categories." },
      { pillar: "Penal Severity", weight: "High", rationale: "Life imprisonment for attacks compromising sovereign infrastructure (IT Act Sec 66F)." },
      { pillar: "Enforcement Gap", weight: "Moderate", rationale: "DPDP Act 2023 passed with up to ₹250 Cr fines, but operating rules await formal Gazette notification." },
    ],
    breachReportingHours: "6 Hours (CERT-In Mandate)",
    conciseBreachMandate: "6 Hours to CERT-In (Fastest globally)",
    extraterritorialReach: true,
    leadEnforcementAgency: "CERT-In & Indian Cyber Crime Coordination Centre (I4C)",
    primaryActs: [
      {
        id: "in-it-act",
        title: "Information Technology Act, 2000 (Amended 2008)",
        enactedYear: 2000,
        status: "enacted",
        keySections: [
          "Sec 43/66: Unauthorized computer access, hacking, and data damage (up to 3 years)",
          "Sec 66C: Identity theft and fraudulent password usage (up to 3 years)",
          "Sec 66D: Cheating by personation using computer resource (up to 3 years)",
          "Sec 66F: Cyber terrorism (Life imprisonment)",
          "Sec 67/67A: Transmitting obscene or sexually explicit material in electronic form"
        ],
        maxPrison: "Life Imprisonment (Sec 66F Cyber Terrorism)",
        maxFine: "Unlimited compensation + statutory fines up to ₹5 Crore",
        summary: "India's foundational cyber statute governing hacking, cyber terrorism, digital signatures, and intermediary liabilities."
      },
      {
        id: "in-bns",
        title: "Bharatiya Nyaya Sanhita (BNS), 2023",
        enactedYear: 2023,
        status: "enacted",
        keySections: [
          "Sec 111: Organized crime including coordinated cyber extortion and syndicate fraud",
          "Sec 318: Cheating and cyber impersonation",
          "Sec 356: Cyber defamation"
        ],
        maxPrison: "Life Imprisonment (Organized Cyber Syndicates)",
        maxFine: "Subject to court discretion, restitution prioritized",
        summary: "Modern criminal code replacing the IPC, codifying organized cyber syndicate crimes and electronic evidence rules."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "in-dpdp-rules",
        title: "Digital Personal Data Protection (DPDP) Act, 2023 - Pending Implementation Rules",
        enactedYear: 2023,
        status: "pending_notification",
        keySections: [
          "Data Protection Board of India (DPBI) constitution rules",
          "Breach notification procedural guidelines",
          "Children's verifiable parental consent mechanisms"
        ],
        maxPrison: "Civil penalties only (No incarceration)",
        maxFine: "Up to ₹250 Crore (~$30 Million USD) per incident",
        summary: "Passed by Parliament and received Presidential assent in Aug 2023; however, the operating sub-rules and notification establishing the Data Protection Board are awaiting formal Gazette publication.",
        pendingNoticeDetails: "Statute enacted but operative enforcement delayed pending notification of secondary rules regarding data fiduciaries, consent managers, and DPBI tribunal setup."
      },
      {
        id: "in-dia-draft",
        title: "Digital India Act (DIA) - Draft Bill",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Replacement of outdated 2000 IT Act",
          "Algorithmic accountability and AI bias prevention",
          "Banning dark patterns and predatory addictive algorithms"
        ],
        maxPrison: "Proposed up to 7-10 years for algorithmic harm and deepfake fraud",
        maxFine: "Proposed proportionate turnover penalties",
        summary: "A comprehensive replacement for the 24-year-old IT Act, intended to regulate emerging tech, generative AI, dark patterns, and platform monopolies.",
        pendingNoticeDetails: "Pre-legislative consultation paper released; full bill text awaiting formal cabinet introduction and Parliamentary debate."
      }
    ],
    pipelineHighlight: "DPDP Act Rules: Enacted Aug 2023; pending Gazette notification of Data Protection Board operating rules (fines up to ₹250 Cr).",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Draft Digital India Act & MeitY Deepfake Advisory 2023/2024",
      summary: "Currently tackled via IT Rules 2021 Advisories (mandating removal of deepfakes within 24-36 hours) and IT Act Sec 66D (cheating by personation). Dedicated AI governance is drafted in the upcoming Digital India Act.",
      coveredOffenses: [
        "Deepfake Celebrity & Revenge Porn impersonation (Sec 66E / 67A)",
        "Voice cloning banking fraud",
        "Algorithmic election disinformation"
      ],
      strictnessRating: "Medium"
    },
    aiGovernanceSummary: "MeitY IT Rules Advisories: Mandatory 24-36h takedown for synthetic deepfakes under Sec 66D/67A; algorithmic accountability codified in upcoming Digital India Act.",
    keyHighlights: [
      "World's fastest mandatory breach notification window (6 hours to CERT-In).",
      "Explicit life imprisonment for cyber terrorism under IT Act Sec 66F.",
      "Dual track: IT Act + criminal BNS provisions."
    ]
  },
  {
    id: "us",
    country: "United States",
    code: "USA",
    flag: "🇺🇸",
    continent: "North America",
    strictnessScore: 9.1,
    strictnessRating: "Very High",
    executiveVerdict: "Global extraterritorial CFAA prosecutions with cumulative life sentences and mandatory 4-day SEC incident disclosures.",
    breachPill: "72h CIRCIA / 4d SEC",
    penaltyPill: "Life Imprisonment",
    aiLawPill: "State Bans & EO 14110",
    strictnessRationale: "Reflects aggressive global extraterritorial reach under CFAA with cumulative life sentences, mandatory 4-day SEC Form 8-K disclosures for public firms, and CISA 72h CIRCIA critical infrastructure reporting.",
    strictnessFactors: [
      { pillar: "Extraterritorial Prosecution", weight: "Extreme", rationale: "Extensive DOJ cross-border indictments and arrests of foreign state and ransomware hackers." },
      { pillar: "Regulatory Enforcement", weight: "Very High", rationale: "SEC 4-day material incident disclosure; FTC 20-year consent decrees for data negligence." },
      { pillar: "Penal Sentences", weight: "Severe", rationale: "Cumulative federal counts under 18 U.S.C. § 1030 yielding 20+ years to life imprisonment." },
    ],
    breachReportingHours: "72 Hours (CIRCIA) / 4 Days (SEC for public co.)",
    conciseBreachMandate: "72h Critical Infra (CIRCIA) · 4 Days SEC 8-K",
    extraterritorialReach: true,
    leadEnforcementAgency: "FBI Cyber Division, CISA, & US Secret Service",
    primaryActs: [
      {
        id: "us-cfaa",
        title: "Computer Fraud and Abuse Act (CFAA) (18 U.S.C. § 1030)",
        enactedYear: 1986,
        status: "enacted",
        keySections: [
          "§ 1030(a)(2): Intentionally accessing a computer without authorization or exceeding authorized access",
          "§ 1030(a)(4): Defrauding through computer access",
          "§ 1030(a)(5): Knowingly transmitting programs, codes, or commands causing damage (malware/ransomware)",
          "§ 1030(a)(7): Extortion involving computers"
        ],
        maxPrison: "Life Imprisonment (if offense results in death or critical infrastructure devastation)",
        maxFine: "Up to $250,000 for individuals, $500,000 for orgs, or double the pecuniary gain/loss",
        summary: "The bedrock US federal anti-hacking statute criminalizing unauthorized access to protected computers, malware distribution, and cyber extortion."
      },
      {
        id: "us-circia",
        title: "Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA)",
        enactedYear: 2022,
        status: "enacted",
        keySections: [
          "72-hour reporting mandate for covered cyber incidents",
          "24-hour reporting mandate for ransomware payments"
        ],
        maxPrison: "Subpoena powers and administrative contempt",
        maxFine: "Civil contempt penalties and regulatory referral",
        summary: "Mandates prompt incident and ransomware payment disclosures to CISA for critical infrastructure entities."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "us-defiance",
        title: "DEFIANCE Act (Disrupt Explicit Forged Images and Non-Consensual Edits)",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Federal civil right of action for victims of non-consensual sexually explicit deepfakes",
          "Statutory damages up to $150,000 per violation plus punitive damages",
          "Immunity exemptions for platforms if acting as mere conduits"
        ],
        maxPrison: "Civil liability primarily; complementary state criminal statutes",
        maxFine: "$150,000+ statutory damages per violation",
        summary: "Passed the US Senate unanimously in July 2024; creates a federal civil cause of action against creators and conscious disseminators of non-consensual AI sexual deepfakes.",
        pendingNoticeDetails: "Passed Senate; pending House concurrence and final Presidential signing into law."
      },
      {
        id: "us-circia-final-rules",
        title: "CISA CIRCIA Notice of Proposed Rulemaking (NPRM)",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Detailed definitions of 'covered entities' across 16 critical infrastructure sectors",
          "Exact criteria triggering mandatory 72-hour incident and 24-hour ransom reporting"
        ],
        maxPrison: "Civil penalties & judicial contempt",
        maxFine: "Contempt sanctions & loss of federal contracts",
        summary: "While CIRCIA was signed in 2022, CISA's final implementation rules defining exact reporting scopes are in public comment phase, expected effective late 2025.",
        pendingNoticeDetails: "NPRM issued; final rule publication and formal effective date scheduled for 2025."
      }
    ],
    pipelineHighlight: "DEFIANCE Act (Passed Senate July 2024) · CISA CIRCIA Final Rulemaking (Mandatory 24h ransom reporting effective 2025).",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Executive Order 14110 on Safe, Secure AI & State Level Deepfake Statutes",
      summary: "Regulated through state criminal laws (e.g. California, Texas deepfake bans), FTC enforcement on deceptive AI practices, and federal EO 14110. Federal criminal deepfake statutes are pending.",
      coveredOffenses: [
        "AI-generated synthetic Child Sexual Abuse Material (CSAM)",
        "Election deepfake voice robocalls (FCC banned in 2024)",
        "Autonomous offensive AI cyber weapon development"
      ],
      strictnessRating: "High"
    },
    aiGovernanceSummary: "Federal EO 14110 & DEFIANCE Act: FTC Sec 5 enforcement on deceptive AI; FCC ban on AI robocalls; state-level criminal bans on synthetic CSAM.",
    keyHighlights: [
      "Extremely aggressive global extraterritorial reach (frequent indictments of foreign hackers).",
      "SEC 4-day material cybersecurity incident reporting rule.",
      "Dual state and federal criminal charges with cumulative sentencing."
    ]
  },
  {
    id: "eu",
    country: "European Union (Germany / France / Collective)",
    code: "EU",
    flag: "🇪🇺",
    continent: "Europe",
    strictnessScore: 9.3,
    strictnessRating: "Very High",
    executiveVerdict: "World's benchmark cybersecurity regime: personal C-suite liability for negligence, up to 4% turnover fines, and mandatory 24-hr incident alert.",
    breachPill: "24h Warning / 72h GDPR",
    penaltyPill: "Executive Bans / 4% Turnover",
    aiLawPill: "Enacted (EU AI Act)",
    strictnessRationale: "Strictest globally due to personal C-suite liability for security non-compliance, up to 4% worldwide turnover fines under GDPR, and mandatory 24-hr initial incident alert under NIS2.",
    strictnessFactors: [
      { pillar: "Executive Debarment", weight: "Critical", rationale: "NIS2 Art. 20 allows temporary bans on C-level directors for persistent cybersecurity negligence." },
      { pillar: "Turnover-Based Fines", weight: "Extreme", rationale: "Fines scale to €20M / 4% global revenue (GDPR) and €10M / 2% global revenue (NIS2)." },
      { pillar: "Supply Chain Auditing", weight: "Very High", rationale: "Mandatory third-party cyber auditing across 18 critical and essential infrastructure sectors." },
    ],
    breachReportingHours: "72 Hours (GDPR) / 24 Hours Early Warning (NIS2)",
    conciseBreachMandate: "24h Early Warning (NIS2) · 72h Full Notice (GDPR)",
    extraterritorialReach: true,
    leadEnforcementAgency: "ENISA, Europol EC3, & National CSIRTs (e.g. BSI Germany)",
    primaryActs: [
      {
        id: "eu-nis2",
        title: "NIS 2 Directive (Directive 2022/2555)",
        enactedYear: 2022,
        status: "enacted",
        keySections: [
          "Article 21: Cybersecurity risk-management measures for essential and important entities",
          "Article 23: Multi-stage reporting: early warning within 24 hours, detailed incident report within 72 hours",
          "Direct personal management liability for C-suite executive non-compliance"
        ],
        maxPrison: "Executive bans from managerial positions; criminal penalties per national transposition",
        maxFine: "Up to €10 Million or 2% of total worldwide annual turnover",
        summary: "EU-wide legislation on cybersecurity, imposing strict incident reporting, supply chain audits, and personal executive liability."
      },
      {
        id: "eu-gdpr",
        title: "General Data Protection Regulation (GDPR) (Regulation 2016/679)",
        enactedYear: 2016,
        status: "enacted",
        keySections: [
          "Article 32: Security of processing and cryptographic safeguards",
          "Article 33: Notification of a personal data breach to supervisory authority within 72 hours",
          "Article 34: Direct communication of high-risk breach to affected data subjects"
        ],
        maxPrison: "Civil/administrative fines (criminal sanctions left to member states e.g. German StGB § 202a)",
        maxFine: "Up to €20 Million or 4% of total worldwide annual turnover (whichever is higher)",
        summary: "The world's benchmark data privacy framework, imposing severe administrative penalties for data leaks resulting from weak cybersecurity."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "eu-cra",
        title: "Cyber Resilience Act (CRA)",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Mandatory CE-marking cybersecurity standards for hardware/software with digital elements",
          "Mandatory vulnerability reporting to ENISA within 24 hours",
          "Software Bill of Materials (SBOM) requirement for all commercial software sold in the EU"
        ],
        maxPrison: "Market withdrawal and executive sanctions",
        maxFine: "Up to €15 Million or 2.5% of global annual turnover",
        summary: "Formally approved by EU Council in Oct 2024; sets binding cybersecurity requirements for connected hardware and software products. It enters into force with a 36-month transition grace period.",
        pendingNoticeDetails: "Passed into law; operative enforcement phased over 2024-2027 transition timeline (reporting obligations trigger first in 2026)."
      }
    ],
    pipelineHighlight: "Cyber Resilience Act (CRA): Approved Oct 2024; mandates CE cybersecurity marking and SBOM for commercial software (fines up to €15M / 2.5%).",
    aiCybercrime: {
      hasDedicatedAILaw: true,
      status: "enacted",
      actName: "EU Artificial Intelligence Act (Regulation 2024/1689)",
      summary: "The world's first comprehensive horizontal AI law. Prohibits cognitive behavioral manipulation, biometric categorization for policing, and social scoring. Imposes rigorous cyber defense testing on General Purpose AI (GPAI).",
      coveredOffenses: [
        "Prohibited AI practices (subliminal manipulation, social scoring)",
        "Mandatory watermarking and disclosure of AI-generated content and deepfakes",
        "Penalties for deploying unvetted high-risk AI in critical infrastructure"
      ],
      strictnessRating: "Very High"
    },
    aiGovernanceSummary: "EU AI Act (Regulation 2024/1689): Criminalizes biometric mass surveillance & cognitive manipulation; mandates deepfake watermarks; fines up to €35M / 7%.",
    keyHighlights: [
      "World's gold standard for AI governance (EU AI Act enacted 2024).",
      "Executive personal disqualification for C-level directors failing cybersecurity oversight.",
      "Turnover-based penalties that scale to billions of Euros."
    ]
  },
  {
    id: "uk",
    country: "United Kingdom",
    code: "GBR",
    flag: "🇬🇧",
    continent: "Europe",
    strictnessScore: 8.7,
    strictnessRating: "High",
    executiveVerdict: "Severe criminal penalties including life imprisonment for critical infrastructure attacks, backed by Online Safety Act executive jail terms.",
    breachPill: "72h to ICO",
    penaltyPill: "Life Sentence",
    aiLawPill: "Enacted (Online Safety)",
    strictnessRationale: "Features life imprisonment under CMA Sec 3ZA for cyberattacks causing catastrophic damage to national security, reinforced by Online Safety Act executive jail provisions and UK GDPR fines.",
    strictnessFactors: [
      { pillar: "Statutory Max Prison", weight: "Severe", rationale: "Life sentence under CMA Section 3ZA for cyber offenses threatening human welfare or defense." },
      { pillar: "Platform Executive Accountability", weight: "High", rationale: "Online Safety Act 2023 subjects senior platform managers to criminal liability for non-compliance." },
      { pillar: "Turnover Penalties", weight: "High", rationale: "ICO fines up to £17.5M or 4% revenue; OSA fines up to £18M or 10% global turnover." },
    ],
    breachReportingHours: "72 Hours (UK GDPR) / Promptly to ICO",
    conciseBreachMandate: "72 Hours to ICO (UK GDPR)",
    extraterritorialReach: true,
    leadEnforcementAgency: "National Crime Agency (NCA) National Cyber Crime Unit & NCSC",
    primaryActs: [
      {
        id: "uk-cma",
        title: "Computer Misuse Act 1990 (CMA)",
        enactedYear: 1990,
        status: "enacted",
        keySections: [
          "Sec 1: Unauthorized access to computer material (up to 2 years)",
          "Sec 2: Unauthorized access with intent to commit or facilitate commission of further offenses (up to 5 years)",
          "Sec 3: Unauthorized acts with intent to impair computer operation (ransomware/DDoS) (up to 10 years)",
          "Sec 3ZA: Unauthorized acts causing serious damage to national security or human welfare (Life Imprisonment)"
        ],
        maxPrison: "Life Imprisonment (Sec 3ZA for catastrophic infrastructure attack)",
        maxFine: "Unlimited fine on indictment",
        summary: "The core UK hacking and malware legislation, updated to penalize DDoS, ransomware, and catastrophic infrastructure attacks."
      },
      {
        id: "uk-osa",
        title: "Online Safety Act 2023",
        enactedYear: 2023,
        status: "enacted",
        keySections: [
          "Criminal offense for creating or sharing non-consensual deepfake pornography",
          "Duty of care on social platforms to proactively filter illegal and fraudulent cyber content"
        ],
        maxPrison: "Up to 2 years for deepfake sharing; senior platform managers face imprisonment for persistent non-compliance",
        maxFine: "Up to £18 Million or 10% of worldwide revenue",
        summary: "Sweeping online harms legislation holding technology platforms accountable and criminalizing malicious cyber communications."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "uk-cma-reform",
        title: "Computer Misuse Act Modernization & Cyber Security Bill",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Statutory defense for ethical security researchers and bug bounty hunters",
          "Domain seizure powers to disrupt ransomware infrastructure",
          "Mandatory reporting of ransomware payments by UK critical businesses"
        ],
        maxPrison: "Proposed expansion of extraterritorial arrest warrants",
        maxFine: "Enhanced administrative and criminal fines",
        summary: "UK Home Office review into updating the 1990 statute to provide safe harbor for white-hat vulnerability researchers and tackle ransomware syndicates.",
        pendingNoticeDetails: "Under consultation; formal legislative bill slated for introduction in upcoming parliamentary session."
      }
    ],
    pipelineHighlight: "CMA Modernization Bill: Consultation on mandatory ransomware payment disclosure and safe harbor for white-hat ethical researchers.",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Pro-Innovation AI White Paper & Online Safety Act Deepfake Provisions",
      summary: "UK takes an outcomes-based, regulator-led approach rather than an overarching EU-style AI statute, relying on existing sectoral regulators (FCA, CMA, ICO) alongside the Online Safety Act's criminalization of deepfakes.",
      coveredOffenses: [
        "Non-consensual sexually explicit deepfakes (explicitly criminalized in 2024)",
        "Algorithmic financial fraud (FCA rules)",
        "Automated bot-driven cyber attacks"
      ],
      strictnessRating: "Medium"
    },
    aiGovernanceSummary: "Online Safety Act 2023: Criminalizes non-consensual deepfake creation/sharing; empowers Ofcom to fine tech platforms up to £18M or 10% global revenue.",
    keyHighlights: [
      "Life sentence provision under Sec 3ZA for critical infrastructure devastation.",
      "Criminalized sharing and creation of intimate deepfakes without consent in 2024.",
      "Extensive powers under the Online Safety Act against platform executives."
    ]
  },
  {
    id: "sg",
    country: "Singapore",
    code: "SGP",
    flag: "🇸🇬",
    continent: "Asia-Pacific",
    strictnessScore: 9.2,
    strictnessRating: "Very High",
    executiveVerdict: "Ultra-rapid 2-hour reporting for critical infrastructure, proactive ministerial takeover powers, and criminal bans on political deepfakes.",
    breachPill: "2h Critical Infra",
    penaltyPill: "Up to 20 Years",
    aiLawPill: "Enacted (Elections Act)",
    strictnessRationale: "Enforces an ultra-strict 2-hour reporting mandate for Critical Information Infrastructure (CII), sentences up to 20 years for targeting national systems, and proactive ministerial takeover powers under 2024 amendments.",
    strictnessFactors: [
      { pillar: "Reporting Speed", weight: "Extreme", rationale: "Mandatory 2-hour incident reporting to CSA for Critical Information Infrastructure." },
      { pillar: "Statutory Max Prison", weight: "Severe", rationale: "Up to 20 years imprisonment for attacks targeting protected national systems." },
      { pillar: "Infrastructure Reach", weight: "Very High", rationale: "2024 Amendment Act extends regulation to cloud clusters and foundational digital infrastructure." },
    ],
    breachReportingHours: "2 Hours (CII Incident to CSA) / 3 Days (PDPC)",
    conciseBreachMandate: "2 Hours for Critical Infrastructure (CSA)",
    extraterritorialReach: true,
    leadEnforcementAgency: "Cyber Security Agency of Singapore (CSA)",
    primaryActs: [
      {
        id: "sg-cmca",
        title: "Computer Misuse Act (CMA)",
        enactedYear: 1993,
        status: "enacted",
        keySections: [
          "Sec 3: Unauthorized access to computer material (up to $5,000 fine / 2 years)",
          "Sec 4: Access with intent to commit offences (up to $50,000 / 10 years)",
          "Sec 5: Unauthorized modification of computer contents (up to $10,000 / 3 years; up to 20 years for protected systems)",
          "Sec 8A: Cyber security measures to prevent attacks on national infrastructure"
        ],
        maxPrison: "Up to 20 Years (for attacks targeting protected systems or public security)",
        maxFine: "Up to S$100,000 + severe civil damages",
        summary: "One of the most rigorously enforced cyber crime statutes in Asia, with aggressive extraterritorial jurisdiction if the target computer is in Singapore or the hacker is in Singapore."
      },
      {
        id: "sg-csa-act",
        title: "Cybersecurity (Amendment) Act 2024",
        enactedYear: 2024,
        status: "enacted",
        keySections: [
          "Expanding regulation beyond Critical Information Infrastructure (CII) to Foundational Digital Infrastructure (FDI)",
          "Entities of Special Cybersecurity Interest (ESCI) regulatory framework",
          "Mandatory reporting of cybersecurity incidents within 2 hours of confirmation"
        ],
        maxPrison: "Up to 3 years imprisonment for deliberate non-disclosure",
        maxFine: "Up to S$200,000 or 10% of annual turnover",
        summary: "Landmark 2024 amendment modernizing Singapore's cybersecurity framework to cover cloud services, AI clusters, and third-party operational tech."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "sg-model-ai-gov",
        title: "Model AI Governance Framework for Generative AI - Statutory Code",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Nine core dimensions of AI safety: accountability, data quality, content provenance",
          "Mandatory incident disclosure for high-impact synthetic media systems"
        ],
        maxPrison: "Administrative sanctions & licensing revocations",
        maxFine: "Subject to sectoral regulator penalty matrices",
        summary: "Singapore's world-leading practical framework for Generative AI, currently progressing from voluntary compliance guidelines to binding statutory requirements for regulated sectors.",
        pendingNoticeDetails: "Framework published; binding sectoral directives being rolled out by the Infocomm Media Development Authority (IMDA)."
      }
    ],
    pipelineHighlight: "Model AI Governance Code: Transitioning voluntary Generative AI safety guidelines into binding statutory sector directives via IMDA.",
    aiCybercrime: {
      hasDedicatedAILaw: true,
      status: "enacted",
      actName: "Elections (Integrity of Online Advertising) Act 2024 & AI Governance Framework",
      summary: "In Sept 2024, Singapore passed emergency legislation banning digitally generated or manipulated content (deepfakes) depicting election candidates during elections. Combined with AI Verify testing toolkits.",
      coveredOffenses: [
        "Election campaign deepfakes and AI voice cloning (Criminalized 2024)",
        "Prompt injection exploitation targeting government LLMs",
        "Algorithmic financial fraud and identity deception"
      ],
      strictnessRating: "High"
    },
    aiGovernanceSummary: "Elections Act 2024 & AI Verify: Criminal ban on deepfake candidate representations; world-first open-source LLM governance & red-teaming toolkit.",
    keyHighlights: [
      "Ultra-strict 2-hour reporting mandate for critical infrastructure incidents.",
      "Sentences up to 20 years for targeting national security or water/energy grids.",
      "Global pioneer in practical AI verification tools (AI Verify Project)."
    ]
  },
  {
    id: "cn",
    country: "China",
    code: "CHN",
    flag: "🇨🇳",
    continent: "Asia-Pacific",
    strictnessScore: 9.6,
    strictnessRating: "Very High",
    executiveVerdict: "Total sovereign data localization, mandatory zero-day exploit reporting to the state before vendors, and life imprisonment for cyber sabotage.",
    breachPill: "Immediate / 8h CAC",
    penaltyPill: "Life Imprisonment",
    aiLawPill: "Enacted (Deep Synthesis)",
    strictnessRationale: "Highest global strictness: total state data localization, mandatory zero-day vulnerability reporting to state before vendors, strict algorithmic licensing, and life imprisonment for state cyber sabotage.",
    strictnessFactors: [
      { pillar: "Vulnerability Control", weight: "Extreme", rationale: "Security researchers are legally barred from disclosing zero-day exploits abroad without prior state ministry approval." },
      { pillar: "Data Sovereign Localization", weight: "Extreme", rationale: "Core and important data must remain on domestic servers; cross-border transfer requires CAC security clearance." },
      { pillar: "State Penalties", weight: "Severe", rationale: "Penal Code Articles 285/286 provide life imprisonment for sabotage against critical state information systems." },
    ],
    breachReportingHours: "Immediate / Within 8 Hours to CAC",
    conciseBreachMandate: "Immediate / Within 8 Hours to CAC",
    extraterritorialReach: true,
    leadEnforcementAgency: "Cyberspace Administration of China (CAC) & Ministry of Public Security",
    primaryActs: [
      {
        id: "cn-csl",
        title: "Cybersecurity Law of the People's Republic of China (CSL)",
        enactedYear: 2017,
        status: "enacted",
        keySections: [
          "Article 21: Multi-Level Protection Scheme (MLPS 2.0)",
          "Article 37: Critical Information Infrastructure data localization",
          "Article 47: Mandatory censorship and cyber incident suppression"
        ],
        maxPrison: "Up to 7 years (Criminal Law Article 285/286) or Life for state sabotage",
        maxFine: "Up to 50 Million RMB or 5% of previous year's turnover",
        summary: "The cornerstone of China's sovereign cyberspace strategy, establishing strict data localization, state surveillance integration, and real-name internet verification."
      },
      {
        id: "cn-dsl",
        title: "Data Security Law (DSL) & Personal Information Protection Law (PIPL)",
        enactedYear: 2021,
        status: "enacted",
        keySections: [
          "Categorization of data into 'Important Data' and 'Core State Data'",
          "Export restrictions on cybersecurity vulnerabilities and critical data"
        ],
        maxPrison: "Criminal detention up to 7 years",
        maxFine: "Up to 50 Million RMB or 5% annual turnover; revocation of business licenses",
        summary: "Imposes severe national security controls on data handling, cross-border transfers, and prohibits providing Chinese data to foreign judicial bodies without state permission."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "cn-ai-law-draft",
        title: "National Artificial Intelligence Law of the PRC (Draft)",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Unified horizontal statute covering all domestic and foreign AI operating in China",
          "Mandatory security assessments for foundation models prior to public release",
          "Explicit socialist core values compliance requirement for LLM outputs"
        ],
        maxPrison: "Criminal sanctions under state security laws",
        maxFine: "Severe commercial bans and asset freezes",
        summary: "Comprehensive draft intended to unify China's patchwork of Generative AI, Deep Synthesis, and Algorithmic Recommendation provisions into a singular legal code.",
        pendingNoticeDetails: "Included in the State Council 2024 legislative work plan; awaiting National People's Congress standing committee review."
      }
    ],
    pipelineHighlight: "National AI Law (Draft 2024): Comprehensive unified AI code mandating pre-release state security filings & model red-teaming.",
    aiCybercrime: {
      hasDedicatedAILaw: true,
      status: "enacted",
      actName: "Deep Synthesis Provisions (2023) & Generative AI Interim Measures (2023)",
      summary: "World's most restrictive operational regulations on AI. Requires mandatory visible and invisible cryptographic watermarks on all AI-generated audio/video/text, real-identity registration of users, and prior security filing with the CAC.",
      coveredOffenses: [
        "Failure to watermarking deepfakes and AI synthetic media",
        "Using AI to produce state-disapproved or destabilizing content",
        "Unauthorized scraping of personal biometric and financial data for model training"
      ],
      strictnessRating: "Very High"
    },
    aiGovernanceSummary: "CAC Deep Synthesis Provisions: Mandatory visible and invisible cryptographic watermarking; prior CAC algorithm registry filing; criminal charges for AI scams.",
    keyHighlights: [
      "Strict data localization & state security classification of all enterprise data.",
      "First country to criminally prosecute individuals for deepfake face-swapping fraud.",
      "Prohibits researchers from sharing zero-day vulnerabilities with foreign entities before reporting to the state."
    ]
  },
  {
    id: "ae",
    country: "United Arab Emirates",
    code: "ARE",
    flag: "🇦🇪",
    continent: "Middle East",
    strictnessScore: 9.0,
    strictnessRating: "Very High",
    executiveVerdict: "Life imprisonment for compromising government systems, mandatory deportation of expatriate offenders, and strict anti-rumor laws.",
    breachPill: "Within 72 Hours",
    penaltyPill: "Life / Deportation",
    aiLawPill: "Enacted (Decree-Law 34)",
    strictnessRationale: "Explicit life imprisonment for cyberattacks compromising sovereign government systems, mandatory deportation of expatriate offenders, and strict criminalization of online disinformation.",
    strictnessFactors: [
      { pillar: "Sovereign Target Sentences", weight: "Severe", rationale: "Article 10 imposes life imprisonment for unauthorized access to defense or state networks." },
      { pillar: "Expatriate Deportation", weight: "High", rationale: "Mandatory statutory deportation for any foreign resident convicted under Decree-Law No. 34." },
      { pillar: "Financial Restitution", weight: "High", rationale: "Mandatory minimum fines starting from AED 100,000 reaching AED 5 Million." },
    ],
    breachReportingHours: "Promptly / Within 72 Hours",
    conciseBreachMandate: "Within 72 Hours (Federal Council)",
    extraterritorialReach: true,
    leadEnforcementAgency: "UAE Cyber Security Council & Federal Public Prosecution",
    primaryActs: [
      {
        id: "ae-cybercrime-law",
        title: "Federal Decree-Law No. 34 of 2021 on Combatting Rumors and Cybercrime",
        enactedYear: 2021,
        status: "enacted",
        keySections: [
          "Article 2: Unauthorized hacking and illicit website intrusion (minimum AED 100,000 fine)",
          "Article 10: Unauthorized interception of data on government networks (Life Imprisonment)",
          "Article 25: Extortion or cyber blackmail (Imprisonment up to 10 years)",
          "Article 44: Deepfake manipulation to defame or deceive (Imprisonment + heavy fines)",
          "Article 52: Disseminating fake news and rumors online"
        ],
        maxPrison: "Life Imprisonment (Attacks on sovereign, government, or critical infrastructure systems)",
        maxFine: "Up to AED 5,000,000 (~$1.36 Million USD) and mandatory deportation of expatriates",
        summary: "One of the strictest cybercrime legal codes in the world, explicitly imposing life imprisonment for state infrastructure attacks and mandatory deportation for foreign offenders."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "ae-ai-reg-code",
        title: "UAE National Artificial Intelligence Ethics and Regulatory Framework",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Mandatory self-assessment for autonomous agents and algorithmic decisions",
          "Specific compliance protocols for high-risk autonomous AI systems in finance and logistics"
        ],
        maxPrison: "Administrative revocation & referral to Federal Decree-Law No. 34",
        maxFine: "Up to AED 3,000,000",
        summary: "Spearheaded by the UAE Artificial Intelligence, Digital Economy, and Remote Work Applications Office; translating the national AI strategy into enforceable regulatory mandates.",
        pendingNoticeDetails: "Framework adopted by Cabinet; technical compliance guidelines currently in phased rollout across Dubai and Abu Dhabi free zones."
      }
    ],
    pipelineHighlight: "National AI Regulatory Framework: Cabinet-approved binding compliance rules for autonomous agents in finance and logistics.",
    aiCybercrime: {
      hasDedicatedAILaw: true,
      status: "enacted",
      actName: "Federal Decree-Law No. 34 (Article 44) - AI Deepfake Provisions",
      summary: "Explicitly penalizes using technology to produce fake audio, video, or images with intent to defame, extort, or deceive the public, carrying imprisonment and fines up to AED 500,000.",
      coveredOffenses: [
        "Deepfake voice cloning and video impersonation",
        "Algorithmic defamation and reputation sabotage",
        "Autonomous social media bot disinformation campaigns"
      ],
      strictnessRating: "Very High"
    },
    aiGovernanceSummary: "Federal Decree-Law No. 34 (Art. 44): Strict imprisonment and fines up to AED 500,000 for creating or distributing deepfakes intended to deceive or defame.",
    keyHighlights: [
      "Mandatory deportation for non-citizen residents convicted of cybercrimes.",
      "Life imprisonment for compromising government, defense, or utility networks.",
      "Aggressive criminal penalties for spreading unverified information and rumors online."
    ]
  },
  {
    id: "au",
    country: "Australia",
    code: "AUS",
    flag: "🇦🇺",
    continent: "Asia-Pacific",
    strictnessScore: 8.8,
    strictnessRating: "High",
    executiveVerdict: "Unprecedented government powers to physically take over private corporate networks during crises, with mandatory 72-hour ransomware reporting.",
    breachPill: "12h Critical / 72h General",
    penaltyPill: "Up to 15 Years",
    aiLawPill: "In Progress (Guardrails)",
    strictnessRationale: "Empowers the Australian Signals Directorate (ASD) to legally take physical control of private computer networks during catastrophic attacks, backed by mandatory 72h ransomware payment reporting.",
    strictnessFactors: [
      { pillar: "Intervention Powers", weight: "Extreme", rationale: "ASD possesses statutory authority to physically alter, access, or take over private corporate servers during crises." },
      { pillar: "Ransomware Reporting", weight: "High", rationale: "2024 Cyber Security Bill mandates commercial disclosure of ransomware payments within 72 hours." },
      { pillar: "eSafety Extraterritoriality", weight: "High", rationale: "Rapid 24-hour civil and criminal takedown notices issued globally for non-consensual synthetic media." },
    ],
    breachReportingHours: "12 Hours (Critical Incident) / 72 Hours (General)",
    conciseBreachMandate: "12h Critical Infrastructure · 72h General",
    extraterritorialReach: true,
    leadEnforcementAgency: "Australian Cyber Security Centre (ACSC) & Australian Federal Police (AFP)",
    primaryActs: [
      {
        id: "au-cyber-act",
        title: "Cyber Security Bill 2024 & Security of Critical Infrastructure (SOCI) Act 2018",
        enactedYear: 2024,
        status: "enacted",
        keySections: [
          "Mandatory reporting of ransomware payments within 72 hours",
          "Government intervention powers allowing ASD to take control of private networks during catastrophic cyber crises",
          "Security standards for smart internet-connected devices"
        ],
        maxPrison: "Up to 10 years imprisonment for non-cooperation with intervention directions",
        maxFine: "Up to AUD $15 Million for corporate entities",
        summary: "Australia's first standalone Cyber Security Act, introduced following devastating breaches at Optus and Medibank, empowering federal intervention in private networks."
      },
      {
        id: "au-criminal-code",
        title: "Commonwealth Criminal Code Act 1995 (Part 10.7 - Computer Offences)",
        enactedYear: 1995,
        status: "enacted",
        keySections: [
          "Sec 477.1: Unauthorized access, modification, or impairment with intent to commit a serious crime (up to 10 years)",
          "Sec 477.2: Unauthorized modification of data to cause impairment (up to 10 years)",
          "Sec 478.1: Unauthorized access to, or modification of, restricted data (up to 2 years)"
        ],
        maxPrison: "Up to 10-15 Years depending on national security impact",
        maxFine: "Over AUD $1.5 Million for individuals, multi-million fines for corporations",
        summary: "Core federal criminal statutes covering hacking, malware dissemination, denial-of-service attacks, and computerized extortion."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "au-ai-guardrails",
        title: "Mandatory Guardrails for High-Risk AI - Proposals Paper",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "10 mandatory guardrails for testing, transparency, and human oversight in high-risk AI",
          "Watermarking mandates for all synthetic and generated media",
          "Accountability for autonomous agents performing administrative transactions"
        ],
        maxPrison: "Civil penalties proposed",
        maxFine: "Proportionate corporate revenue penalties",
        summary: "Australian Department of Industry, Science and Resources plan to introduce statutory obligations for high-risk AI models.",
        pendingNoticeDetails: "Public consultation concluded in Oct 2024; drafting of formal legislative amendment currently underway."
      }
    ],
    pipelineHighlight: "High-Risk AI Mandatory Guardrails: Drafting of binding statutory standards for synthetic media watermarking & automated decision audits.",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Online Safety (Deepfake) Amendment & Upcoming AI Guardrails",
      summary: "In 2024, Australia strengthened the eSafety Commissioner's powers to issue rapid takedown notices for non-consensual deepfake pornography with fines up to AUD $660,000.",
      coveredOffenses: [
        "Non-consensual deepfake adult material (Criminal and civil fines)",
        "AI-facilitated identity fraud and scam operations",
        "Targeted synthetic media harassment"
      ],
      strictnessRating: "High"
    },
    aiGovernanceSummary: "Online Safety Act Amendments 2024: Criminalizes non-consensual sexual deepfakes; eSafety Commissioner issues fines up to AUD $660,000.",
    keyHighlights: [
      "Australian Signals Directorate (ASD) has unprecedented legal power to physically take control of a private company's servers during major attacks.",
      "Mandatory ransomware payment disclosure requirement.",
      "World-leading active eSafety Commissioner with swift extraterritorial takedown powers."
    ]
  },
  {
    id: "ca",
    country: "Canada",
    code: "CAN",
    flag: "🇨🇦",
    continent: "North America",
    strictnessScore: 8.2,
    strictnessRating: "High",
    executiveVerdict: "Critical infrastructure penalties up to $15M/day under Bill C-26, paired with proposed 5-year prison terms for deceitful AI under Bill C-27.",
    breachPill: "As Soon as Feasible",
    penaltyPill: "10 Years / $15M Day",
    aiLawPill: "Pending (Bill C-27)",
    strictnessRationale: "Pending Bill C-26 introduces massive daily penalties (up to $15M/day) for critical infrastructure cyber failures, paired with proposed 5-year criminal prison sentences for harmful AI under Bill C-27.",
    strictnessFactors: [
      { pillar: "Daily Compliance Fines", weight: "Very High", rationale: "Bill C-26 establishes penalties up to $15 Million CAD per day for non-compliant critical cyber systems." },
      { pillar: "Criminal AI Deployment", weight: "High", rationale: "AIDA proposes 5-year prison terms for deploying deceitful AI causing serious harm or economic loss." },
      { pillar: "Reporting Standard", weight: "Moderate", rationale: "Current OPC standard 'as soon as feasible' is being tightened to mandatory immediate notice under CCSPA." },
    ],
    breachReportingHours: "As soon as feasible (OPC Mandate)",
    conciseBreachMandate: "As Soon as Feasible (OPC Mandate)",
    extraterritorialReach: true,
    leadEnforcementAgency: "Canadian Centre for Cyber Security (CCCS) & RCMP Cybercrime Directorate",
    primaryActs: [
      {
        id: "ca-criminal-code",
        title: "Criminal Code of Canada (R.S.C., 1985, c. C-46) - Sec 342.1 & 430(1.1)",
        enactedYear: 1985,
        status: "enacted",
        keySections: [
          "Sec 342.1: Unauthorized use of computer (obtaining service, intercepting function, using passwords without color of right) (up to 10 years)",
          "Sec 342.2: Possession of device or software to obtain unauthorized use (up to 2 years)",
          "Sec 430(1.1): Mischief in relation to computer data (destroying, altering, or hindering lawful use) (up to 10 years)"
        ],
        maxPrison: "Up to 10 Years Imprisonment",
        maxFine: "Indictable offenses carry discretionary judicial fines + victim restitution",
        summary: "Federal criminal code penalizing hacking, unauthorized computer interception, malware deployment, and ransomware data destruction."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "ca-bill-c26",
        title: "Bill C-26: An Act Respecting Cyber Security (ARCS)",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Amends the Telecommunications Act to allow the government to ban high-risk vendors (e.g. Huawei) from telecom networks",
          "Enacts the Critical Cyber Systems Protection Act (CCSPA) requiring mandatory reporting of cyber incidents to CCCS immediately"
        ],
        maxPrison: "Administrative monetary penalties and executive compliance orders",
        maxFine: "Up to $15 Million CAD for corporations, $1 Million CAD for individuals per day of violation",
        summary: "Passed the House of Commons in 2024; establishes a federal cybersecurity baseline across federally regulated vital systems (telecoms, energy, transport, banking).",
        pendingNoticeDetails: "Passed House of Commons; currently before the Senate Standing Committee on National Security, awaiting third reading and Royal Assent."
      },
      {
        id: "ca-bill-c27-aida",
        title: "Bill C-27: Artificial Intelligence and Data Act (AIDA)",
        enactedYear: 2024,
        status: "pending_notification",
        keySections: [
          "Regulates high-impact AI systems",
          "Criminal offense for knowingly using biased or deceitfully manipulated AI that causes serious physical or psychological harm or property damage"
        ],
        maxPrison: "Up to 5 years imprisonment for deliberate deployment of fraudulent/harmful AI",
        maxFine: "Up to $25 Million CAD or 5% of global gross revenues",
        summary: "Canada's landmark federal AI legislation establishing an AI and Data Commissioner and creating explicit criminal penalties for reckless AI deployment.",
        pendingNoticeDetails: "Under active clause-by-clause review by the Standing Committee on Industry and Technology (INDU)."
      }
    ],
    pipelineHighlight: "Bill C-26 (ARCS): Imposes fines up to $15M/day on critical infrastructure · Bill C-27 (AIDA): Proposes 5-year prison terms for fraudulent AI systems.",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Bill C-27 (Artificial Intelligence and Data Act - AIDA)",
      summary: "Currently pending in Parliament; when notified, it will introduce criminal liability for deploying AI systems that cause serious psychological harm or economic fraud.",
      coveredOffenses: [
        "Deploying high-impact AI models without safety auditing",
        "Deepfake manipulation causing economic harm or extortion",
        "Biometric discrimination and unconsented voice synthesis"
      ],
      strictnessRating: "High"
    },
    aiGovernanceSummary: "Bill C-27 (AIDA): Proposes up to 5 years imprisonment & $25M fines for knowingly deploying fraudulent, manipulative, or harmful AI systems.",
    keyHighlights: [
      "Bill C-26 introduces massive daily penalties (up to $15M/day) for critical infrastructure cyber failures.",
      "First country to propose 5-year prison terms specifically for fraudulent and harmful AI systems under AIDA.",
      "Close intelligence integration with US/UK/NZ/AU under the Five Eyes cyber alliance."
    ]
  },
  {
    id: "ee",
    country: "Estonia",
    code: "EST",
    flag: "🇪🇪",
    continent: "Europe",
    strictnessScore: 9.4,
    strictnessRating: "Very High",
    executiveVerdict: "World benchmark in state digital resilience: 24-hour breach notice, immutable blockchain-verified registers, and criminalized offensive exploit preparation.",
    breachPill: "24h RIA Mandate",
    penaltyPill: "Up to 10 Years",
    aiLawPill: "Enacted (EU AI Act)",
    strictnessRationale: "World benchmark in state digital resilience: 24h RIA breach notification, immutable KSI blockchain verification for all state registers, and criminal statutes specifically penalizing offensive code creation.",
    strictnessFactors: [
      { pillar: "e-Governance Auditing", weight: "Extreme", rationale: "99% of public services run on X-Road with mandatory real-time cryptographic audit logging." },
      { pillar: "Incident Reporting", weight: "Very High", rationale: "Mandatory 24-hour breach notification to Estonian Information System Authority (RIA)." },
      { pillar: "Offensive Tool Penalization", weight: "High", rationale: "Penal Code § 208 criminalizes preparation and trading in offensive cyber exploitation tools." },
    ],
    breachReportingHours: "24 Hours (RIA Mandate)",
    conciseBreachMandate: "24 Hours to RIA Mandate",
    extraterritorialReach: true,
    leadEnforcementAgency: "Estonian Information System Authority (RIA) & NATO CCDCOE Host",
    primaryActs: [
      {
        id: "ee-penal-code",
        title: "Estonian Penal Code (Karistusseadustik) - Chapter 14: Computer Crimes",
        enactedYear: 2002,
        status: "enacted",
        keySections: [
          "§ 206: Interfering with computer systems or spreading malware (up to 5 years)",
          "§ 207: Causing denial of service or cyber disruption to state or vital infrastructure (up to 10 years)",
          "§ 217: Identity theft and digital forgery (up to 3 years)",
          "§ 208: Preparation of computer crimes, trading in access codes and offensive cyber tools"
        ],
        maxPrison: "Up to 10 Years Imprisonment",
        maxFine: "Heavy pecuniary penalties for legal entities up to €16 Million",
        summary: "Following the historic 2007 cyber attacks, Estonia established the world's most resilient e-governance and cyber defense legal framework."
      },
      {
        id: "ee-cyber-act",
        title: "Cyber Security Act 2018 (Küberturvalisuse seadus)",
        enactedYear: 2018,
        status: "enacted",
        keySections: [
          "Mandatory cybersecurity audits for all digital state infrastructure (e-Residency, X-Road, i-Voting)",
          "Real-time state monitoring of digital signatures and blockchain-backed ledger logs"
        ],
        maxPrison: "Executive removal & criminal referral",
        maxFine: "Substantial administrative fines and revocation of digital operating certificates",
        summary: "Establishes legal duties for service providers maintaining public and vital e-services to guarantee continuous cybersecurity."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "ee-kratatt-act",
        title: "Kratt Act - National Autonomous AI Legal Framework",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Clarifying legal personhood and strict civil liability for autonomous algorithms ('Kratt')",
          "Direct algorithmic audit mechanisms embedded into national X-Road architecture"
        ],
        maxPrison: "Civil strict liability prioritized",
        maxFine: "Harm-proportional financial compensation",
        summary: "Estonia's forward-looking legislative initiative to regulate fully autonomous AI agents operating within state e-governance and private commerce.",
        pendingNoticeDetails: "Expert legal working group draft; aligning with the European Union AI Act harmonization."
      }
    ],
    pipelineHighlight: "Kratt Act (Draft): Pioneer legal framework establishing algorithmic liability & automated agent governance on the state X-Road network.",
    aiCybercrime: {
      hasDedicatedAILaw: true,
      status: "enacted",
      actName: "EU AI Act Transposition & Estonian Kratt AI Guidelines",
      summary: "Governed under the EU AI Act directly, combined with Estonia's unique automated government services ('Bürokratt') ethical protocols.",
      coveredOffenses: [
        "Tampering with algorithmic state decisions and digital IDs",
        "Deepfake identity spoofing targeting digital signatures (Smart-ID)",
        "Autonomous AI bot attacks against e-voting and X-Road"
      ],
      strictnessRating: "High"
    },
    aiGovernanceSummary: "EU AI Act & Kratt Code: Governs automated government decision agents; penalizes synthetic media tampering with digital ID & Smart-ID.",
    keyHighlights: [
      "Home to the NATO Cooperative Cyber Defence Centre of Excellence (CCDCOE).",
      "99% of government services online, guarded by immutable Keyless Signature Infrastructure (KSI) blockchain.",
      "Global leader in digital forensics and cyber warfare legal doctrine (Tallinn Manual)."
    ]
  },
  {
    id: "jp",
    country: "Japan",
    code: "JPN",
    flag: "🇯🇵",
    continent: "Asia-Pacific",
    strictnessScore: 8.5,
    strictnessRating: "High",
    executiveVerdict: "Notably criminalizes the creation or possession of virus code without deployment, while advancing Active Cyber Defense counter-intrusion laws.",
    breachPill: "3-5 Days to PPC",
    penaltyPill: "5-10 Years",
    aiLawPill: "In Progress (AI Law)",
    strictnessRationale: "Explicitly criminalizes the mere creation or possession of malicious virus code without legitimate cause, and is currently pioneering 'Active Cyber Defense' laws allowing state counter-intrusions.",
    strictnessFactors: [
      { pillar: "Inchoate Offense Penalties", weight: "Very High", rationale: "Article 168-2 penalizes creating or obtaining malware code even before any deployment occurs." },
      { pillar: "Counter-Intrusion Reforms", weight: "Severe", rationale: "Draft Active Cyber Defense legislation authorizes preemptive neutralization of foreign hacker servers." },
      { pillar: "Critical Industry Baselines", weight: "Moderate", rationale: "Cybersecurity Basic Act mandates strict operational defenses across 14 vital social infrastructure sectors." },
    ],
    breachReportingHours: "Promptly (3-5 Days to PPC)",
    conciseBreachMandate: "Promptly (3-5 Days to PPC)",
    extraterritorialReach: true,
    leadEnforcementAgency: "National Police Agency (NPA) Cyber Affairs Bureau & NISC",
    primaryActs: [
      {
        id: "jp-penal-code",
        title: "Penal Code of Japan (Act No. 45 of 1907, Amended) - Computer Offenses",
        enactedYear: 2011,
        status: "enacted",
        keySections: [
          "Article 161-2: Unauthorized creation or alteration of electromagnetic records (up to 5 years)",
          "Article 168-2 & 168-3: Creation, provision, or storage of unauthorized computer commands (Creation of Computer Virus) (up to 3 years)",
          "Article 234-2: Obstruction of business by damaging computer or electromagnetic records (up to 5 years)"
        ],
        maxPrison: "Up to 5-10 Years Imprisonment",
        maxFine: "Up to 1,000,000 Yen per charge + civil tort damages",
        summary: "Notably criminalizes not just launching cyber attacks, but even the mere creation or possession of malicious computer viruses without legitimate purpose."
      },
      {
        id: "jp-cyber-basic",
        title: "Cybersecurity Basic Act (Act No. 104 of 2014)",
        enactedYear: 2014,
        status: "enacted",
        keySections: [
          "Establishment of the National center of Incident readiness and Strategy for Cybersecurity (NISC)",
          "Mandatory cybersecurity baselines for critical infrastructure operators and government agencies"
        ],
        maxPrison: "Administrative compliance orders",
        maxFine: "Regulatory sanctions and public naming",
        summary: "Basic statute governing national cybersecurity doctrine, public-private intelligence sharing, and defense of key social infrastructure."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "jp-active-cyber-defense",
        title: "Active Cyber Defense (ACD) Legislation",
        enactedYear: 2024,
        status: "draft",
        keySections: [
          "Empowering Japanese Self-Defense Forces and Police to conduct pre-emptive intrusions into foreign adversary servers to neutralize imminent cyber threats",
          "Reforming the Constitution's Article 21 'secrecy of communications' principle to allow monitoring of malicious packet traffic"
        ],
        maxPrison: "Counter-intrusion military authorization",
        maxFine: "State sovereign sanctions",
        summary: "Historic shift in Japan's pacifist defense posture, proposing legal authority to penetrate and disarm foreign hackers' command-and-control servers in real time.",
        pendingNoticeDetails: "Under fierce constitutional and parliamentary debate; government aiming for formal Diet submission in 2025."
      }
    ],
    pipelineHighlight: "Active Cyber Defense (ACD) Bill: Proposes legal authorization for Self-Defense Forces to preemptively hack foreign adversary C2 servers.",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "pending",
      actName: "Hiroshima AI Process Guidelines & Draft AI Basic Law",
      summary: "Japan has maintained one of the most AI-friendly copyright regimes in the world (allowing machine learning on copyrighted works), but is currently drafting binding AI regulations to counter deepfake scams and electoral manipulation.",
      coveredOffenses: [
        "Malicious deepfakes used in investment scams and extortion",
        "Unauthorized biometric impersonation",
        "Automated ransomware deployment via generative AI"
      ],
      strictnessRating: "Medium"
    },
    aiGovernanceSummary: "Hiroshima AI Process & Draft Basic Law: Moving from voluntary safety guidelines to binding prohibitions on malicious deepfake scams & extortion.",
    keyHighlights: [
      "Explicitly criminalizes the *creation* or *possession* of computer virus code even without deployment.",
      "Currently advancing groundbreaking 'Active Cyber Defense' laws to strike back at foreign state hackers.",
      "World's leading diplomatic champion of the G7 Hiroshima AI Process."
    ]
  },
  {
    id: "za",
    country: "South Africa",
    code: "ZAF",
    flag: "🇿🇦",
    continent: "Africa",
    strictnessScore: 8.0,
    strictnessRating: "High",
    executiveVerdict: "Africa's benchmark cyber statute: up to 15 years for cyber extortion, with express criminal penalties for malicious communications and non-consensual deepfakes.",
    breachPill: "As Soon as Possible",
    penaltyPill: "Up to 15 Years",
    aiLawPill: "Under Cybercrimes Act",
    strictnessRationale: "Africa's benchmark statutory cyber law, imposing up to 15 years for cyber extortion and hacking, with mandatory incident reporting duties for electronic communications providers.",
    strictnessFactors: [
      { pillar: "Cyber Extortion Terms", weight: "High", rationale: "Part II of Cybercrimes Act provides up to 15 years for ransomware encryption and extortion." },
      { pillar: "Malicious Communication", weight: "Moderate", rationale: "Part III specifically criminalizes sending intimate images without consent with up to 3 years imprisonment." },
      { pillar: "Institutional Notification Gap", weight: "Moderate", rationale: "Crucial Chapter 6 administrative structures (24/7 Cyber Hub) remain pending presidential proclamation." },
    ],
    breachReportingHours: "As soon as reasonably possible (Information Regulator)",
    conciseBreachMandate: "As Soon as Reasonably Possible (POPIA)",
    extraterritorialReach: true,
    leadEnforcementAgency: "Cybercrime Hub (SAPS) & Information Regulator",
    primaryActs: [
      {
        id: "za-cybercrime-act",
        title: "Cybercrimes Act No. 19 of 2020",
        enactedYear: 2020,
        status: "enacted",
        keySections: [
          "Part II: Unlawful access, interception of data, cyber extortion, and cyber forgery (up to 15 years)",
          "Part III: Malicious communications: sending messages that incite damage to property or intimate image distribution without consent (up to 3 years)",
          "Mandatory reporting duty for electronic communications service providers (ECSPs) and financial institutions"
        ],
        maxPrison: "Up to 15 Years Imprisonment",
        maxFine: "Substantial fines up to R10 Million (~$550,000 USD)",
        summary: "Comprehensive modern African cybercrime law replacing common law theft/fraud for digital offenses and establishing 24/7 point of contact for international mutual legal assistance."
      }
    ],
    pendingOrDraftActs: [
      {
        id: "za-cybercrimes-ch6",
        title: "Cybercrimes Act - Unpromulgated Sections (Chapter 6: Cyber Response Committee)",
        enactedYear: 2020,
        status: "pending_notification",
        keySections: [
          "Formal notification of the National Cybercrime Centre and 24/7 POC infrastructure",
          "Rules of court regarding electronic search, seizure, and chain-of-custody procedures"
        ],
        maxPrison: "Procedural framework",
        maxFine: "Regulatory penalties",
        summary: "While core offenses were commenced in Dec 2021, crucial institutional frameworks including the specialized 24/7 Cyber Point of Contact and court rules remain pending presidential proclamation.",
        pendingNoticeDetails: "Core criminal sections enacted; Chapter 6 administrative structures awaiting official Presidential Gazetting."
      }
    ],
    pipelineHighlight: "Cybercrimes Act Chapter 6: Pending presidential proclamation to formally activate the National Cybercrime Centre and 24/7 mutual assistance point.",
    aiCybercrime: {
      hasDedicatedAILaw: false,
      status: "none",
      actName: "Artificial Intelligence Institute of South Africa (AIISA) & Common Law / Cybercrimes Act",
      summary: "No dedicated AI statute yet; AI offenses are prosecuted under Part II (cyber extortion/fraud) and Part III (unlawful intimate deepfakes) of the Cybercrimes Act.",
      coveredOffenses: [
        "Non-consensual synthetic intimate imagery (Part III)",
        "AI-enabled SIM-swapping and financial phishing",
        "Deepfake impersonation for fraud"
      ],
      strictnessRating: "Emerging"
    },
    aiGovernanceSummary: "Cybercrimes Act (Part III): Prosecutes synthetic media under non-consensual image distribution and common law fraud; dedicated AI statute absent.",
    keyHighlights: [
      "Africa's most comprehensive statutory cybercrime legislation.",
      "Express criminalization of revenge porn and non-consensual intimate image distribution.",
      "Clear extraterritorial jurisdiction if the victim or server is inside South Africa."
    ]
  }
];
