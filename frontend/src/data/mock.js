// Mock data for Manish Jaiswal's Portfolio

export const personalInfo = {
  name: "Manish Kumar",
  title: "Technical Writer & Developer Educator",
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
  description: "Technical writer and developer educator with 10+ years of experience helping developers successfully adopt cloud-native, AI, cybersecurity, and DevOps platforms. Experienced in creating developer-focused tutorials, API documentation, reference architectures, quickstarts, and AI-ready documentation that improve developer onboarding and product adoption. Passionate about developer experience, AI-assisted documentation, developer communities, and helping engineering teams build trusted technical content. Experienced collaborating across engineering, product, DevEx, marketing, and customer success.",
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
    role: "Developer Advocate",
    duration: "March 2025 - April 2026",
    location: "Remote/Bangalore",
    domain: "Observability and monitoring",
    description: "Owned the developer education strategy for an AI-native observability platform.",
    highlights: [
      "Produced developer tutorials, quickstarts, architecture documentation, and infrastructure guides that accelerated customer adoption",
      "Structured documentation for LLM ingestion, improving discoverability through AI assistants and RAG systems",
      "Worked closely with engineering and product teams to improve developer onboarding and self-service success",
      "Used customer feedback and documentation analytics to continuously improve the developer experience"
    ]
  },
  {
    id: 2,
    company: "Safe Security",
    role: "Senior Technical Writer",
    duration: "Aug 2023 - Sep 2024",
    location: "Bangalore",
    domain: "CRQM, CyberSecurity, AI, LLM",
    description: "Led developer documentation for a cybersecurity AI platform.",
    highlights: [
      "Published over 400 REST API references, onboarding guides, SDK documentation, and integration tutorials",
      "Built AI-ready documentation used to train an internal AI support assistant, improving developer self-service and technical support resolution",
      "Partnered with engineering and product teams to improve API usability and developer onboarding through documentation, analytics, and customer feedback",
      "Used product analytics (Pendo), NPS, and support insights to identify friction points and improve the developer journey"
    ]
  },
  {
    id: 3,
    company: "Harness.io",
    role: "Senior Technical Writer",
    duration: "March 2021 - July 2023",
    location: "Bangalore",
    domain: "DevOps, ML, AI",
    description: "Led documentation strategy for a cloud-native CI platform.",
    highlights: [
      "Created developer education content including quickstarts, tutorials, troubleshooting guides, release notes, and infrastructure documentation",
      "Built CI/CD pipelines, Docker containers, and Kubernetes deployments to validate documentation using real-world developer workflows",
      "Partnered with engineering throughout feature development to ensure documentation shipped with product releases",
      "Created technical content that improved developer onboarding and product adoption"
    ]
  },
  {
    id: 4,
    company: "McAfee",
    role: "Technical Writer",
    duration: "Nov 2018 - April 2021",
    location: "Bangalore",
    domain: "Cloud Security",
    description: "Documented McAfee's Cloud Security Access Broker.",
    highlights: [
      "Documented McAfee's Cloud Security Access Broker, improving usability and accessibility",
      "Coordinated with engineers and product managers to align documentation with product releases"
    ]
  },
  {
    id: 5,
    company: "KanTime",
    role: "Technical Writer",
    duration: "Dec 2015 - Nov 2018",
    location: "Bangalore",
    domain: "Healthcare, SaaS",
    description: "Created comprehensive user assistance and product documentation.",
    highlights: [
      "Created User Guides and Release Notes",
      "Conducted in-depth functional testing to ensure the accuracy and reliability of documentation for the US Healthcare platform"
    ]
  }
];

export const writingSamples = [
  {
    id: 1,
    title: "NeuralDocs Docusaurus Docs Site Showcase",
    category: "AI & Tooling",
    description: "A production-grade developer documentation site built using Docusaurus v3 with custom theme integration, Inter typography, dark-mode toggle, search architecture, and comprehensive content. Showcases information architecture and docs-as-code principles.",
    link: "https://jaiswalwrites.github.io/docusaurus-portfolio-site/",
    company: "AI & Docs Project",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Interactive AI-Assisted Docs Workflow",
    category: "AI & Tooling",
    description: "A premium dark-mode interactive portal demonstrating a human-in-the-loop writing methodology. Features a copyable technical prompt library, before/after case studies, workflow phase breakdown, and a documentation toolchain (Claude 3.5 Sonnet, Vale style linter, etc.).",
    link: "https://jaiswalwrites.github.io/ai-doc-workflow/",
    company: "AI & Docs Project",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "TaskFlow OpenAPI & Redoc API Reference",
    category: "API Docs",
    description: "A complete OpenAPI 3.0.3 design spec for an enterprise task platform rendered via a custom-styled Redoc interface. Details OAuth authorization, REST endpoint patterns, event webhooks, RFC 7807 error responses, and includes a strict API documentation style guide.",
    link: "https://jaiswalwrites.github.io/openapi-docs-generator/",
    company: "API Design & Spec",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 4,
    title: "Harness CI Enterprise Documentation",
    category: "DevOps",
    description: "End-to-end documentation for Harness CI Enterprise, including QuickStart guide for setting up CI pipeline and running tests. Led product documentation from scratch to successful GA.",
    link: "https://developer.harness.io/docs/continuous-integration/",
    company: "Harness.io",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop"
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
  advocacy_docs: [
    "Developer Relations", "Developer Experience (DevEx)", "Technical Education", "Developer Documentation", "Developer Onboarding", "API Documentation", "Community Enablement", "Content Strategy", "AI Documentation", "Developer Advocacy", "LLM Content Optimization", "Technical Storytelling"
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
    title: "Newsletter Creator",
    description: "Technical writing newsletter with 1,000+ LinkedIn subscribers."
  },
  {
    title: "Developer Advocate",
    description: "Published developer-focused technical articles and regularly mentor technical writers and engineers on Markdown, Docs-as-Code, AI documentation, and developer communication."
  },
  {
    title: "AI Docs Framework Creator",
    description: "Built AI-ready documentation strategies for enterprise developer products."
  },
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
    description: "Conducted various training and development sessions on emerging tech writing areas, including tooltips, markdown, minimalism, and developer advocacy."
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