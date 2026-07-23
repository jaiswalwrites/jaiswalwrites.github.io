// Mock data for Manish Jaiswal's Portfolio

export const personalInfo = {
  name: "Manish Kumar",
  title: "Senior Technical Writer",
  tagline: "Helping developers adopt cloud-native & AI platforms",
  email: "jaiswalmanish060@gmail.com",
  phone: "+91 8015973380",
  linkedin: "https://www.linkedin.com/in/manish-jaiswal1993/",
  github: "https://github.com/jaiswalwrites",
  website: "https://jaiswalwrites.github.io/",
  image: "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg",
  resumeUrl: "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/r8290els_Manish_Resume_Senior_Tech_Writer.pdf"
};

export const about = {
  description: "Senior Technical Writer with 10+ years of experience creating developer documentation for cloud-native, DevOps, AI, and SaaS platforms. Experienced in owning documentation end-to-end—from planning and information architecture through release and maintenance—while partnering closely with engineering, product management, and design teams. Strong hands-on expertise with Kubernetes, Docker, CI/CD, APIs, Docs-as-Code, and developer platforms. Passionate about creating deployment guides, installation documentation, API references, tutorials, and infrastructure documentation that help developers become productive quickly. Experienced in Docusaurus, Git-based documentation workflows, and documenting complex distributed systems.",
  stats: [
    { label: "Years in Tech Docs", value: 10 },
    { label: "AI Ecosystems Documented", value: 15 },
    { label: "Docs-as-Code Systems Built", value: 8 },
    { label: "Certifications", value: 6 }
  ]
};

export const experience = [
  {
    id: 1,
    company: "Kloudfuse",
    logo: "/logos/kloudfuse.png",
    role: "Lead Technical Writer",
    duration: "March 2025 - April 2026",
    location: "Remote/Bangalore",
    domain: "Observability and monitoring",
    description: "Built and owned the end-to-end documentation system for Kloudfuse — a cloud-native observability platform.",
    highlights: [
      "Created deployment documentation for cloud-native observability infrastructure running on Kubernetes.",
      "Authored installation and configuration guides for customer-managed deployments.",
      "Worked directly with engineering teams to validate documentation using real product deployments.",
      "Designed reusable documentation architecture supporting versioned releases.",
      "Designed the full doc system architecture using Antora and AsciiDoc — modular, versioned, and built for scale across a fast-moving product team.",
      "Built an end-to-end customer feedback loop for documentation — capturing signal from users, triaging gaps, and closing the loop with content updates tied directly to support and product cycles.",
      "Authored and maintained API documentation, release notes, and logging/monitoring developer guides — written for SREs, platform engineers, and developers integrating with observability infrastructure.",
      "Made documentation AI-ready — structured content following emerging AI-consumption standards (semantic chunking, metadata tagging, LLM-friendly formatting) so docs surface accurately in AI assistants, RAG pipelines, and copilot tools.",
      "Integrated AI into the documentation workflow — used LLM tooling to accelerate content drafting, maintain consistency at scale, and reduce time-to-publish for new feature releases."
    ]
  },
  {
    id: 2,
    company: "Safe Security",
    logo: "/logos/safe.png",
    role: "Lead Technical Writer",
    duration: "Aug 2023 - Sep 2024",
    location: "Bangalore",
    domain: "CRQM, CyberSecurity, AI, LLM",
    description: "Developed API integration guides, authentication workflows, deployment documentation, and onboarding tutorials for enterprise customers.",
    highlights: [
      "Revolutionized documentation strategy, resulting in a 40% increase in user engagement and a 30% reduction in support tickets.",
      "Optimized and maintained 400+ SAFE APIs on Swagger, reducing API-related queries by 50% for both internal teams and external customers.",
      "Spearheaded the ingestion and training of the in-house AI agent (Safex), enabling it to provide accurate and contextually relevant answers based on ML and product documentation (prompt engineering), improving query resolution accuracy by 60% and reducing response time by 75%.",
      "Leveraged Pendo for documentation analytics and product announcements, driving data-informed decisions to improve user engagement and product experience using Session Replays and NPS.",
      "Redesigned user onboarding with a persona-based approach, reducing time-to-value by 50% and increasing product adoption rates by 30%.",
      "Created product demo videos that increased feature utilization by 55% and reduced onboarding support requests by 40%.",
      "Implemented an outcome-based and guided example documentation style, improving topic comprehension by 65% and user task completion rates by 50%.",
      "Collaborated cross-functionally with founders, PMs, developers, UI/UX teams, customer support, and sales engineers to ensure comprehensive and accurate documentation."
    ]
  },
  {
    id: 3,
    company: "Harness.io",
    logo: "/logos/harness.png",
    role: "Senior Technical Writer",
    duration: "March 2021 - July 2023",
    location: "Bangalore",
    domain: "DevOps, ML, AI",
    description: "Owned documentation for the Continuous Integration product, partnering daily with engineering, product management, QA, and design throughout the feature lifecycle.",
    highlights: [
      "Authored installation guides, deployment documentation, release notes, tutorials, troubleshooting guides, conceptual documentation, and API references for enterprise customers.",
      "Built production-ready CI/CD pipelines using Harness, Kubernetes, Docker, AWS, GCP, and artifact repositories to validate documentation against real-world deployment scenarios.",
      "Documented Kubernetes-based container build and deployment workflows, including pipeline configuration, secrets management, image registries, and infrastructure integrations.",
      "Collaborated directly with engineering during beta-to-GA releases, ensuring documentation shipped alongside every feature release.",
      "Improved developer onboarding through hands-on tutorials and Quickstarts that reduced customer ramp-up time.",
      "Maintained documentation using Docs-as-Code workflows with Git, Markdown, pull requests, and continuous publishing."
    ]
  },
  {
    id: 4,
    company: "McAfee",
    logo: "/logos/mcafee.png",
    role: "Technical Writer",
    duration: "Nov 2018 - April 2021",
    location: "Bangalore",
    domain: "Cloud Security",
    description: "Documented McAfee's Cloud Security Access Broker.",
    highlights: [
      "Documented McAfee's Cloud Security Access Broker, improving usability and accessibility.",
      "Coordinated with engineers and product managers to align documentation with product releases, akin to the McAfee collaborative environment."
    ]
  },
  {
    id: 5,
    company: "KanTime",
    logo: "/logos/kantime.png",
    role: "Technical Writer",
    duration: "Dec 2015 - Nov 2018",
    location: "Bangalore",
    domain: "Healthcare, SaaS",
    description: "Created comprehensive user assistance and product documentation.",
    highlights: [
      "Created User Guides and Release Notes, conducting in-depth functional testing to ensure the accuracy and reliability of documentation for the US Healthcare platform."
    ]
  }
];

export const writingSamples = [
  {
    id: 1,
    title: "Kloudfuse Platform Documentation",
    category: "Observability & AI",
    description: "End-to-end documentation system for a cloud-native observability platform, covering logging, monitoring, and developer-facing infrastructure docs.",
    link: "https://docs.kloudfuse.com/platform/latest/",
    company: "Kloudfuse",
    logo: "/logos/kloudfuse.png",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    featured: true,
    caseStudy: {
      architecture: "Modular and versioned architecture built for scale using Antora and AsciiDoc, integrating seamlessly with CI/CD for Docs-as-Code publishing.",
      philosophy: "AI-Ready Documentation Design. Structured content with semantic chunking and metadata tagging to ensure LLM-friendly formatting for RAG pipelines and copilots.",
      personas: "SREs, Platform Engineers, and DevOps Engineers integrating with complex observability infrastructure.",
      achievements: [
        "Built an end-to-end customer feedback loop capturing signals for rapid content updates.",
        "Created LLM workflows to accelerate drafting and ensure consistency."
      ]
    }
  },
  {
    id: 2,
    title: "Harness CI Enterprise Documentation",
    category: "DevOps",
    description: "Comprehensive installation guides, deployment documentation, API references, and conceptual architectures for an enterprise Continuous Integration platform.",
    link: "https://developer.harness.io/docs/continuous-integration/",
    company: "Harness.io",
    logo: "/logos/harness.png",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    featured: true,
    caseStudy: {
      architecture: "Git-based Markdown documentation workflow leveraging automated pull requests, continuous publishing, and tight coupling with product code releases.",
      philosophy: "Developer-First Enablement. Emphasized hands-on Quickstarts and real-world deployment scenarios (Kubernetes, Docker) over dry reference material.",
      personas: "DevOps Engineers, Software Developers, and Release Managers.",
      achievements: [
        "Reduced customer ramp-up time significantly through outcome-based tutorials.",
        "Shipped documentation alongside every beta-to-GA feature release with zero delays."
      ]
    }
  },
  {
    id: 3,
    title: "Safe Security API & In-App Portal",
    category: "CyberSecurity",
    description: "API integration guides and onboarding tutorials for enterprise CRQM customers. (Note: External docs are legacy; updated docs are fully embedded in the product).",
    link: "https://docs.safe.security/",
    company: "Safe Security",
    logo: "/logos/safe.png",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    featured: true,
    caseStudy: {
      architecture: "Swagger/OpenAPI spec generation tightly coupled with product UI. Designed to feed directly into the in-house AI agent (Safex) for contextual answers.",
      philosophy: "Data-Driven Content Strategy. Utilized Pendo analytics, Session Replays, and NPS to identify friction points and redesign persona-based onboarding.",
      personas: "CISOs, Security Admins, and API Integrators.",
      achievements: [
        "Optimized 400+ REST APIs, reducing API-related support queries by 50%.",
        "Trained AI support agent via prompt engineering, reducing response time by 75%."
      ]
    }
  },
  {
    id: 4,
    title: "McAfee (Skyhigh) Cloud Security Broker",
    category: "Cloud Security",
    description: "Documentation for McAfee's Cloud Security Access Broker, focusing on usability, accessibility, and high-stakes enterprise cloud security.",
    link: "https://success.skyhighsecurity.com/Skyhigh_CASB",
    company: "McAfee (Skyhigh)",
    logo: "/logos/mcafee.png",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    featured: false,
    caseStudy: {
      architecture: "Enterprise Content Management System with strict compliance tracking and version control mirroring product releases.",
      philosophy: "Clarity and Minimalism in Security. Prioritized unambiguous procedural instructions to prevent security misconfigurations.",
      personas: "Cloud Security Architects and IT Administrators.",
      achievements: [
        "Significantly improved the usability and accessibility of core security documentation.",
        "Streamlined release note delivery, replacing a massive 400-page legacy document."
      ]
    }
  },
  {
    id: 5,
    title: "KanTime Healthcare SaaS Portal",
    category: "Healthcare SaaS",
    description: "Comprehensive user assistance and product documentation embedded directly into the user login portal for the US Healthcare platform.",
    link: "https://kantime.com/",
    company: "KanTime",
    logo: "/logos/kantime.png",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    featured: false,
    caseStudy: {
      architecture: "In-app contextual help architecture. Documentation acts as an embedded companion directly within the secure user login portal.",
      philosophy: "Workflow-Driven Assistance. Healthcare professionals need answers without leaving their clinical workflows; docs are designed as tooltips and modal guides.",
      personas: "Healthcare Administrators, Clinicians, and Billing Specialists.",
      achievements: [
        "Conducted in-depth functional testing to ensure zero-error reliability.",
        "Successfully transitioned off legacy offline guides to embedded digital adoption."
      ]
    }
  }
];

export const skills = {
  ai_and_ml: [
    "OpenAI GPT", "LangChain", "LlamaIndex", "RAG Systems", "Prompt Engineering", "TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face Transformers", "Reinforcement Learning", "Agentic Systems", "Diffusion Models", "Fine-tuning", "Embeddings"
  ],
  programming_scripting: [
    "Python", "Java", "GoLang", "SQL", "C", "Solidity", "Shell Scripting", "Curl"
  ],
  cloud_devops: [
    "AWS", "GCP", "Microsoft Azure", "Kubernetes", "Docker", "Helm", "Linux", "Jenkins", "GitHub Actions", "GitLab CI", "Docker Hub", "Artifactory (JFrog, GCR)"
  ],
  finops_data: [
    "AWS Cost Explorer", "Azure Cost Management", "GCP Billing API", "Savings Plans Analysis", "Custom Dashboards", "Pendo", "Analytics", "Anomaly Detection", "Predictive Budgeting", "Resource Tagging"
  ],
  tech_docs_tools: [
    "Docs-as-Code: Git, GitHub, GitLab, Docusaurus, MkDocs, Sphinx", "API Tools: Swagger/OpenAPI, Postman", "Traditional Authoring: Oxygen XML, MadCap Flare, Adobe RoboHelp, Confluence, JIRA"
  ]
};

export const certifications = [
  {
    name: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
    issuer: "Online Course",
    year: "Pursuing"
  },
  {
    name: "Swagger and the OpenAPI Specification",
    issuer: "Online Course",
    year: "2023"
  },
  {
    name: "DevOps MasterClass: Terraform Jenkins Kubernetes Ansible",
    issuer: "Online Course",
    year: "2023"
  },
  {
    name: "Cloud Computing: Core Concepts",
    issuer: "Online Course",
    year: "2021"
  },
  {
    name: "A Complete Guide to Ethereum and Solidity Developer",
    issuer: "Online Course",
    year: "2022"
  },
  {
    name: "Certification in JAVA",
    issuer: "C-DAC (Advanced Computing and Training School, Pune)",
    year: "2015"
  }
];

export const achievements = [
  {
    title: "Customer Champion",
    description: "Recognized for my efforts in assisting the support team and helping McAfee business and its customers."
  },
  {
    title: "Unicorn Growth Contributor",
    description: "Contributed to the documentation of the product team that took a bootstrapped product and turned it into a unicorn."
  },
  {
    title: "Documentation Optimizer",
    description: "Significantly reduced the huge volume of Release Notes (300-400 pages) by introducing new methods of user assistance."
  },
  {
    title: "Team Development Lead",
    description: "Conducted various training and development sessions on emerging tech writing areas, including tooltips, markdown, minimalism, and developer advocacy, aimed at enhancing the team's performance."
  },
  {
    title: "Newsletter Creator",
    description: "I run a newsletter for Tech Writers, with a subscriber base of over 1K on LinkedIn."
  },
  {
    title: "Rapid Product Launch",
    description: "Recognized and rewarded for successfully bringing the CI product to GA within three months of joining the company during the beta phase."
  }
];

export const newsletter = {
  title: "Tech Writing Insights",
  description: "Weekly newsletter covering latest trends in technical writing, documentation tools, developer advocacy, and emerging technologies like AI and Web3.",
  subscribers: "1,000+",
  frequency: "Weekly",
  topics: [
    "Technical Writing Best Practices",
    "Docs-as-Code Workflows",
    "API Documentation",
    "Developer Experience",
    "Web3 & Blockchain",
    "AI Tools for Writers"
  ]
};

export const education = {
  degree: "B.Tech in Computer Science and Engineering",
  university: "Vel Tech University, Chennai",
  year: "2015",
  cgpa: "7.34"
};