export const blogs = [
  {
    id: 1,
    title: "The Shift to Spec-First API Design: Why Writing Docs Before Code Wins",
    date: "July 2, 2026",
    category: "API Design",
    readTime: "6 min read",
    excerpt: "Explore the benefits of writing OpenAPI specifications before coding endpoints, establishing a single source of truth for both developers and documentation.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&fit=crop",
    content: `
      <p>In modern software engineering, APIs are the interface through which platforms communicate. Traditionally, organizations followed a code-first approach: developers wrote the code, ran a tool to generate a basic API spec, and technical writers cleaned up the descriptions. However, this method frequently results in inconsistencies, late-stage changes, and broken client integrations.</p>
      
      <h3>What is Spec-First API Design?</h3>
      <p>Spec-first API design reverses this sequence. Before a single line of application code is written, stakeholders align on the API design using a machine-readable specification language, typically OpenAPI (Swagger) or AsyncAPI. The specification acts as a contract between the developers building the API and the clients who consume it.</p>
      
      <h3>Key Benefits of Spec-First Design</h3>
      <ul>
        <li><strong>Parallel Development:</strong> Once the spec is defined, frontend and backend teams can work simultaneously. Frontend developers can run mock servers based on the spec, while backend engineers build the actual logic.</li>
        <li><strong>Consistent DX (Developer Experience):</strong> Standardizing endpoints, error models, and naming conventions is much easier in a YAML file than across multiple repositories.</li>
        <li><strong>Fewer Integration Bugs:</strong> Because the spec is validated before coding, architectural issues are discovered early, reducing changes during release cycles.</li>
      </ul>
      
      <h3>The Role of the Technical Writer</h3>
      <p>In a spec-first workflow, technical writers are not just documenters—they are API designers. They ensure descriptions are clear, parameters have explicit types and constraints, error models are robust (such as following RFC 7807), and example payloads are realistic.</p>
    `
  },
  {
    id: 2,
    title: "How to Enforce Style Guides Automatically with Vale and GitHub Actions",
    date: "June 28, 2026",
    category: "Docs-as-Code",
    readTime: "8 min read",
    excerpt: "Learn how to build a continuous integration pipeline that automatically checks markdown files for style guide violations, passive voice, and jargon.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&fit=crop",
    content: `
      <p>Manual review of documentation for style guide compliance is time-consuming and prone to human oversight. A docs-as-code approach solves this by treating documentation files like source code, including automated linting.</p>
      
      <h3>What is Vale?</h3>
      <p>Vale is an open-source, command-line tool designed to enforce editorial style guides. Unlike basic spellcheckers, Vale can check for grammar patterns, check readability metrics, flag passive voice, and enforce custom vocabulary rules (e.g., using "you" instead of "the user").</p>
      
      <h3>Setting Up Vale Rules</h3>
      <p>Vale rules are defined in YAML format under a styles folder. For example, to flag the word "please" in documentation, you can create a rule like this:</p>
      <pre><code>extends: substitution
message: "Avoid using '%s'. Use direct imperative verbs instead."
level: warning
ignorecase: true
swap:
  please: ""</code></pre>
      
      <h3>Integrating with GitHub Actions</h3>
      <p>By placing a workflow file in your <code>.github/workflows</code> folder, you can run Vale on every pull request. This blocks merges if style violations are introduced, ensuring the codebase documentation always matches your editorial standards.</p>
    `
  },
  {
    id: 3,
    title: "Prompt Engineering for Technical Writers: Crafting Context for Better Drafts",
    date: "June 20, 2026",
    category: "AI & Tooling",
    readTime: "7 min read",
    excerpt: "A guide on how technical writers can leverage system prompts and context injection to generate high-quality first drafts of documentation using LLMs.",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&fit=crop",
    content: `
      <p>Generative AI is a powerful assistant for content generation, but raw prompts like "write a guide for our API" often yield generic, wordy, or inaccurate results. To get professional-grade outputs, technical writers must apply prompt engineering principles.</p>
      
      <h3>The Context-Instruction-Examples-Formatting (CIEF) framework</h3>
      <p>For high-quality documentation drafts, structuring your prompt is crucial:</p>
      <ul>
        <li><strong>Context:</strong> Explain the persona (e.g., "acting as a Senior Technical Writer at a cybersecurity firm") and the target reader (e.g., "experienced DevOps engineers").</li>
        <li><strong>Instruction:</strong> Define the core task clearly (e.g., "Draft a quickstart guide for configuring our OAuth credentials").</li>
        <li><strong>Examples:</strong> Provide 1 or 2 existing high-quality docs as templates to teach the model the desired tone and structure.</li>
        <li><strong>Formatting:</strong> Specify MDX, HTML, or markdown expectations, including headings, code block styles, and alerts.</li>
      </ul>
      
      <h3>Refining AI Drafts</h3>
      <p>Never copy-paste AI output directly. The technical writer's role is to verify the accuracy of the output, test the code snippets, remove repetitive phrasing, and ensure the content aligns with the actual product behavior.</p>
    `
  },
  {
    id: 4,
    title: "Implementing RFC 7807 Problem Details for User-Friendly API Errors",
    date: "June 15, 2026",
    category: "API Design",
    readTime: "5 min read",
    excerpt: "Detailing the RFC 7807 standard for API errors, helping developers troubleshoot failed requests faster with structured problem descriptions.",
    image: "https://images.unsplash.com/photo-1597839219216-a773cb2473e4?w=800&fit=crop",
    content: `
      <p>One of the most overlooked aspects of developer experience (DX) is error handling. When an API call fails, returning a generic <code>500 Internal Server Error</code> or a single string like <code>"Invalid input"</code> leaves developers guessing. RFC 7807 establishes a standardized JSON structure for reporting API errors.</p>
      
      <h3>The Structure of an RFC 7807 Response</h3>
      <p>An RFC 7807 response uses the content-type <code>application/problem+json</code> and contains key fields:</p>
      <ul>
        <li><strong>type:</strong> A URI reference that identifies the problem type and points to human-readable documentation.</li>
        <li><strong>title:</strong> A short, summary description of the problem.</li>
        <li><strong>status:</strong> The HTTP status code.</li>
        <li><strong>detail:</strong> An explanation of the specific error instance (e.g., "The field 'email' must contain a valid email address").</li>
        <li><strong>instance:</strong> A URI reference pointing to the specific request occurrence (often a request ID).</li>
      </ul>
      
      <h3>Example Problem Payload</h3>
      <pre><code>{
  "type": "https://api.taskflow.io/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'due_date' field cannot be set in the past.",
  "instance": "/tasks/42"
}</code></pre>
      <p>By standardizing errors, developer tooling can parse failure reasons programmatically, and developers can resolve integration blockers instantly.</p>
    `
  },
  {
    id: 5,
    title: "Docusaurus v3 Architecture: Building Modern Developer Portals",
    date: "June 10, 2026",
    category: "Docs-as-Code",
    readTime: "6 min read",
    excerpt: "An architectural review of Docusaurus v3, explaining its rendering pipeline, localization features, and MDX support for interactive components.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop",
    content: `
      <p>For hosting developer documentation, Docusaurus has emerged as the industry gold standard. Built by Meta and used by leaders like Supabase and Vercel, Docusaurus v3 provides a static site generator optimized for content-focused websites.</p>
      
      <h3>Why Docusaurus?</h3>
      <p>Docusaurus treats documentation as code, saving markdown files in git. Key architectural features include:</p>
      <ul>
        <li><strong>MDX Engine:</strong> Write React components directly inside markdown files, enabling interactive API playgrounds and live code editors.</li>
        <li><strong>Search Engine Integrations:</strong> Works natively with Algolia DocSearch to provide typo-tolerant indexing.</li>
        <li><strong>Localization (i18n):</strong> Supports multi-language translation workflows out-of-the-box.</li>
      </ul>
      <p>Using Docusaurus allows writers to manage docs using git pull requests, branching, and automated builds, integrating documentation directly into the software release cycle.</p>
    `
  },
  {
    id: 6,
    title: "Integrating LLMs into the Documentation Toolchain: A Practical Guide",
    date: "June 2, 2026",
    category: "AI & Tooling",
    readTime: "8 min read",
    excerpt: "Learn how to build scripts that read codebase updates, generate first-draft documentation using LLM APIs, and open pull requests for review.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&fit=crop",
    content: `
      <p>With APIs like OpenAI and Anthropic, developers and technical writers can automate the drafting of release notes, reference specs, and SDK tutorials directly from code edits.</p>
      
      <h3>Building a Github Action for Doc Automation</h3>
      <p>A simple Node.js script in your CI pipeline can detect changed files in a commit, send the diffs to Claude 3.5 Sonnet alongside a strict style template, and append the generated paragraphs to your Docusaurus source folder. The script can then automatically submit a PR titled <code>[AI Draft] Update Docs</code> for human technical writer review.</p>
      
      <h3>The Human-in-the-Loop Filter</h3>
      <p>Automation accelerates drafting, but humans ensure reliability. The writer reviews the PR, checks for hallucinations, refines headings, adds screenshots, and validates technical accuracy before merging to production.</p>
    `
  },
  {
    id: 7,
    title: "Writing for the Machine: Optimizing Technical Docs for AI Agents and RAG",
    date: "May 28, 2026",
    category: "AI & Tooling",
    readTime: "7 min read",
    excerpt: "Understanding how developers use AI code assistants and RAG systems, and how to structure your documentation so models retrieve accurate answers.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&fit=crop",
    content: `
      <p>Today, developers rarely read documentation cover-to-cover. Instead, they use AI assistants like Copilot, Cursor, or custom RAG (Retrieval-Augmented Generation) search bars to query information. As technical writers, we must structure docs so AI parsers read them accurately.</p>
      
      <h3>How RAG Reads Docs</h3>
      <p>RAG pipelines split documentation into "chunks", convert them to vector embeddings, and store them in a database. When a developer asks a question, the vector DB retrieves the most similar chunks and feeds them to the LLM as context.</p>
      
      <h3>Best Practices for AI-Friendly Docs</h3>
      <ul>
        <li><strong>Flat heading hierarchy:</strong> Keep articles modular with clear H2 and H3 structures so chunks retain context.</li>
        <li><strong>Avoid ambiguous pronouns:</strong> Use explicit nouns. Write "TaskFlow OAuth allows..." instead of "It allows..." to keep chunks self-contained.</li>
        <li><strong>Include metadata tags:</strong> Use frontmatter keywords, categories, and concise descriptions to help embedding models categorize content.</li>
      </ul>
    `
  },
  {
    id: 8,
    title: "Automated Link Checking and Spellchecking in Documentation Pipelines",
    date: "May 20, 2026",
    category: "Docs-as-Code",
    readTime: "5 min read",
    excerpt: "Prevent broken links and typos in production. Learn how to configure lychee and automated spelling dictionaries in your git workflows.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&fit=crop",
    content: `
      <p>Broken links in developer portals undermine product credibility and interrupt user workflows. Manually verifying every hyperlink in a 1,000-page portal is impossible. Automating this check is key to a robust docs-as-code strategy.</p>
      
      <h3>Using Lychee Link Checker</h3>
      <p>Lychee is a fast link checker written in Rust. It reads markdown files, extracts all URLs, and validates them via HTTP requests. Setting up Lychee in a GitHub Action takes just a few lines of configuration:</p>
      <pre><code>name: Link Checker
on: [push, pull_request]
jobs:
  linkChecker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Link Checker
        uses: lycheeverse/lychee-action@v1</code></pre>
      <p>This automated check run flags broken links immediately before docs are deployed, saving time and improving page authority.</p>
    `
  },
  {
    id: 9,
    title: "Interactive API Playgrounds: Enhancing Developer Experience (DX)",
    date: "May 10, 2026",
    category: "Developer Experience",
    readTime: "6 min read",
    excerpt: "How embeddable playgrounds and try-it-out consoles reduce developer time-to-first-hello-world and build product trust.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop",
    content: `
      <p>The developer's path to integration starts with testing. If they have to copy API endpoints, configure credentials in Postman, and write local test scripts, their time-to-first-successful-request is long. Interactive playgrounds solve this problem.</p>
      
      <h3>The Power of "Try It Out"</h3>
      <p>An interactive playground embeds a network console directly inside the browser. Users can insert test credentials, edit request payloads, and click a button to execute the request against a sandbox server. The console displays the exact response JSON and headers instantly.</p>
      
      <h3>Best Practices</h3>
      <p>To keep playgrounds safe and useful, always point them to a sandbox or test environment with mock data, rather than production endpoints. Explicitly label sandbox limitations in the documentation.</p>
    `
  },
  {
    id: 10,
    title: "Designing Information Architecture for Multi-Product Developer Portals",
    date: "May 2, 2026",
    category: "Developer Experience",
    readTime: "7 min read",
    excerpt: "How to structure complex portals containing APIs, SDKs, quickstarts, and platform guides into a single navigation strategy.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&fit=crop",
    content: `
      <p>As technology platforms grow, they often release multiple products, SDKs, and platform modules. Without a clear information architecture (IA), developer portals quickly become fragmented, making information hard to find.</p>
      
      <h3>The Pillar Approach to IA</h3>
      <p>Structure your documentation portal around user intent pillars:</p>
      <ul>
        <li><strong>Get Started:</strong> Fast tutorials for setting up and making the first request.</li>
        <li><strong>API Reference:</strong> Deep reference docs detailing endpoints and parameters.</li>
        <li><strong>Guides:</strong> Conceptual explainers detailing complex features and integrations.</li>
        <li><strong>SDKs:</strong> Language-specific libraries with installation and usage instructions.</li>
      </ul>
      <p>Consistent search indexing across all pillars ensures developers find answers quickly regardless of entry points.</p>
    `
  },
  {
    id: 11,
    title: "Vale Style Guide Linting Demo: Try Linter Rules in Your Browser",
    date: "April 28, 2026",
    category: "Docs-as-Code",
    readTime: "5 min read",
    excerpt: "An interactive guide showcasing how automated linter rules enforce technical writing standards in real-time.",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&fit=crop",
    content: `
      <p>In this guide, we review common style rules and how an automated linter evaluates documentation text dynamically. Try modifying your content against style rules to check clarity and tone.</p>
      
      <h3>Sample Linter Scenarios</h3>
      <p>Standard linter packages (like Vale's Google or Microsoft rulesets) evaluate text against rules such as:</p>
      <ul>
        <li><strong>Avoid Passive Voice:</strong> "The code was written by the team" -> "The team wrote the code". Active voice is clearer.</li>
        <li><strong>Eliminate Weasel Words:</strong> Avoid "extremely", "obviously", and "simply". They make assumptions about the reader's expertise.</li>
        <li><strong>Acronym Definitions:</strong> Ensure terms like SDK and RAG are spelled out on their first use in an article.</li>
      </ul>
    `
  }
];
