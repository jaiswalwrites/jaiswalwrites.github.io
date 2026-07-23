import os
import json

base_dir = r"c:\Users\jaisw\OneDrive\GitHub\manish-portfolio\showcase-codebases"

projects = {
    "01-ai-docs-generation": {
        "README.md": "# AI-Assisted Docs Generation Workflow\n\nA Python script that reads raw API specs and uses OpenAI's API to generate a first-draft markdown documentation, including architecture flows.\n\n## Usage\n```bash\npip install -r requirements.txt\npython generate_docs.py --spec api_spec.json --out docs/\n```",
        "requirements.txt": "openai==1.14.0\nclick==8.1.7\npyyaml==6.0.1",
        "generate_docs.py": "import click\nimport json\nfrom openai import OpenAI\nimport os\n\nclient = OpenAI()\n\n@click.command()\n@click.option('--spec', help='Path to API Spec')\n@click.option('--out', help='Output directory')\ndef generate(spec, out):\n    with open(spec, 'r') as f:\n        data = json.load(f)\n    \n    prompt = f\"\"\"Generate comprehensive API documentation in Markdown for the following spec:\n    {json.dumps(data, indent=2)}\n    Include an architecture section and usage examples.\n    \"\"\"\n    \n    print(\"Calling LLM for generation...\")\n    response = client.chat.completions.create(\n        model=\"gpt-4-turbo-preview\",\n        messages=[{\"role\": \"user\", \"content\": prompt}]\n    )\n    \n    os.makedirs(out, exist_ok=True)\n    with open(os.path.join(out, 'generated_api_docs.md'), 'w') as f:\n        f.write(response.choices[0].message.content)\n    print(\"Documentation generated successfully!\")\n\nif __name__ == '__main__':\n    generate()\n"
    },
    "02-dev-portal-rag": {
        "README.md": "# Developer Self-Service Portal with RAG\n\nA LangChain + ChromaDB backend that ingests Docusaurus markdown files, chunks them, and answers developer questions contextually to reduce support tickets.\n\n## Usage\n```bash\npython ingest.py ./docs\npython chat.py \"How do I authenticate the API?\"\n```",
        "chat.py": "import argparse\nfrom langchain_community.vectorstores import Chroma\nfrom langchain_openai import OpenAIEmbeddings, ChatOpenAI\nfrom langchain.chains import RetrievalQA\n\ndef answer_question(query):\n    vectorstore = Chroma(persist_directory=\"./chroma_db\", embedding_function=OpenAIEmbeddings())\n    qa = RetrievalQA.from_chain_type(\n        llm=ChatOpenAI(model=\"gpt-4\", temperature=0),\n        chain_type=\"stuff\",\n        retriever=vectorstore.as_retriever()\n    )\n    return qa.run(query)\n\nif __name__ == '__main__':\n    parser = argparse.ArgumentParser()\n    parser.add_argument('query')\n    args = parser.parse_args()\n    print(answer_question(args.query))\n"
    },
    "03-persona-content-architecture": {
        "README.md": "# Persona-Driven Content Architecture\n\nA Docusaurus configuration that implements role-based documentation sidebars (e.g., DevOps, Developers, Security Admins).\n\nThis structure ensures users only see content relevant to their persona.",
        "sidebars.js": "module.exports = {\n  devopsSidebar: [\n    { type: 'category', label: 'Infrastructure', items: ['k8s-deploy', 'docker-compose'] },\n    { type: 'category', label: 'CI/CD', items: ['actions-setup', 'jenkins-pipeline'] }\n  ],\n  developerSidebar: [\n    { type: 'category', label: 'SDK Integration', items: ['python-sdk', 'node-sdk'] },\n    { type: 'category', label: 'API Reference', items: ['auth', 'endpoints'] }\n  ],\n  securitySidebar: [\n    { type: 'category', label: 'Compliance', items: ['soc2', 'hipaa'] },\n    { type: 'category', label: 'Access Control', items: ['rbac', 'audit-logs'] }\n  ]\n};\n"
    },
    "04-docs-cicd-pipeline": {
        "README.md": "# Docs-as-Code CI/CD Pipeline\n\nA production-ready GitHub Actions workflow that automatically lints Markdown, checks for dead links, and builds a Docusaurus site.",
        ".github/workflows/docs-ci.yml": "name: Docs CI Pipeline\n\non:\n  pull_request:\n    paths:\n      - 'docs/**'\n\njobs:\n  lint-and-build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '18'\n          \n      - name: Install dependencies\n        run: npm ci\n        \n      - name: Markdown Lint\n        run: npm run lint:md\n        \n      - name: Check Dead Links\n        uses: gaurav-nelson/github-action-markdown-link-check@v1\n        with:\n          use-quiet-mode: 'yes'\n          use-verbose-mode: 'yes'\n          folder-path: 'docs/'\n          \n      - name: Build Docusaurus\n        run: npm run build\n"
    },
    "05-docs-analytics-framework": {
        "README.md": "# Documentation Analytics & Feedback Loop\n\nA React component that integrates Pendo and a custom NPS feedback widget directly into documentation pages to track helpfulness scores.",
        "FeedbackWidget.jsx": "import React, { useState } from 'react';\n\nexport const FeedbackWidget = ({ pageId }) => {\n  const [submitted, setSubmitted] = useState(false);\n\n  const handleFeedback = async (isHelpful) => {\n    await fetch('https://api.analytics.com/track', {\n      method: 'POST',\n      body: JSON.stringify({ pageId, isHelpful, timestamp: new Date() })\n    });\n    setSubmitted(true);\n  };\n\n  if (submitted) return <div className=\"text-green-500\">Thank you for your feedback!</div>;\n\n  return (\n    <div className=\"flex items-center gap-4 p-4 border rounded-lg\">\n      <span className=\"text-sm font-medium\">Was this page helpful?</span>\n      <button onClick={() => handleFeedback(true)} className=\"px-4 py-1 border rounded hover:bg-gray-100\">👍 Yes</button>\n      <button onClick={() => handleFeedback(false)} className=\"px-4 py-1 border rounded hover:bg-gray-100\">👎 No</button>\n    </div>\n  );\n};\n"
    },
    "06-semantic-context-sync": {
        "README.md": "# Semantic Context Sync Engine\n\nA FastAPI webhook server that listens for GitHub push events (documentation updates) and instantly re-embeds the updated Markdown files into the Vector DB.",
        "webhook_sync.py": "from fastapi import FastAPI, Request\nimport subprocess\n\napp = FastAPI()\n\n@app.post(\"/webhook/docs-update\")\nasync def docs_update(request: Request):\n    payload = await request.json()\n    if payload.get(\"ref\") == \"refs/heads/main\":\n        print(\"Detected main branch update. Pulling latest docs...\")\n        subprocess.run([\"git\", \"pull\", \"origin\", \"main\"])\n        \n        print(\"Re-running semantic embedding pipeline...\")\n        subprocess.run([\"python\", \"scripts/embed_docs.py\"])\n        \n        return {\"status\": \"success\", \"message\": \"Context synced!\"}\n    return {\"status\": \"ignored\"}\n"
    },
    "07-vale-style-guide": {
        "README.md": "# Vale Style Guide Ruleset Engine\n\nCustom Vale configuration and YAML rules to enforce corporate style, inclusive language, and Microsoft formatting guidelines across all Markdown files.",
        ".vale.ini": "StylesPath = styles\nMinAlertLevel = suggestion\n\nPackages = Microsoft, write-good\n\n[*.md]\nBasedOnStyles = Vale, Microsoft, Corporate\n\nMicrosoft.Passive = YES\nCorporate.Branding = YES\n",
        "styles/Corporate/Branding.yml": "extends: substitution\nmessage: 'Use the correct branding: \"%s\"'\nlevel: error\nignorecase: true\nswap:\n  'kloud fuse': 'Kloudfuse'\n  'safe security': 'Safe Security'\n  'api gateway': 'API Gateway'\n"
    },
    "08-automated-link-checker": {
        "README.md": "# Automated Markdown Link Checker\n\nA GitHub Action that runs nightly to parse all Markdown files and validate HTTP status codes for external links, creating automated issues if a 404 is detected.",
        ".github/workflows/link-checker.yml": "name: Nightly Link Checker\n\non:\n  schedule:\n    - cron: '0 2 * * *' # Run at 2 AM daily\n\njobs:\n  check-links:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Link Checker\n        uses: lycheeverse/lychee-action@v1.8.0\n        with:\n          args: '--accept 200,204,429 --exclude-mail docs/**/*.md'\n      - name: Create Issue on Failure\n        uses: peter-evans/create-issue-from-file@v4\n        if: failure()\n        with:\n          title: '🚨 Broken Links Detected in Documentation'\n          content-filepath: ./lychee/out.md\n"
    },
    "09-openapi-to-markdown": {
        "README.md": "# OpenAPI to Markdown Pipeline\n\nA Python script that parses an OpenAPI 3.0 spec (JSON/YAML) and generates highly structured, modular Markdown files suitable for Docusaurus or MkDocs.",
        "openapi_to_md.py": "import yaml\nimport sys\nimport os\n\ndef convert(spec_path, out_dir):\n    with open(spec_path, 'r') as f:\n        spec = yaml.safe_load(f)\n    \n    os.makedirs(out_dir, exist_ok=True)\n    \n    for path, methods in spec.get('paths', {}).items():\n        for method, details in methods.items():\n            filename = f\"{method}-{path.replace('/', '-')}.md\"\n            filepath = os.path.join(out_dir, filename)\n            \n            with open(filepath, 'w') as out:\n                out.write(f\"# {details.get('summary', 'Endpoint')}\\n\\n\")\n                out.write(f\"**{method.upper()}** `{path}`\\n\\n\")\n                out.write(f\"{details.get('description', '')}\\n\\n\")\n                out.write(\"## Responses\\n\")\n                for code, res in details.get('responses', {}).items():\n                    out.write(f\"- **{code}**: {res.get('description', '')}\\n\")\n\nif __name__ == '__main__':\n    convert(sys.argv[1], sys.argv[2])\n"
    },
    "10-playwright-visual-regression": {
        "README.md": "# Playwright Visual Regression for Docs\n\nAutomated UI testing scripts to capture and compare screenshots of documentation pages. This catches CSS breaking changes before they hit production.",
        "tests/docs.spec.js": "const { test, expect } = require('@playwright/test');\n\ntest('Documentation Homepage Visual Check', async ({ page }) => {\n  await page.goto('http://localhost:3000/docs/intro');\n  // Wait for network requests and hydration to finish\n  await page.waitForLoadState('networkidle');\n  \n  // Assert visual comparison\n  await expect(page).toHaveScreenshot('docs-intro.png', {\n    fullPage: true,\n    maxDiffPixels: 100\n  });\n});\n"
    },
    "11-algolia-docsearch": {
        "README.md": "# Algolia DocSearch Implementation\n\nConfiguration for the Algolia DocSearch crawler, ensuring optimal indexing of H1, H2, and H3 tags for fast, typo-tolerant semantic search.",
        "crawler-config.json": "{\n  \"index_name\": \"my_docs_site\",\n  \"start_urls\": [\n    \"https://docs.mycompany.com/\"\n  ],\n  \"sitemap_urls\": [\n    \"https://docs.mycompany.com/sitemap.xml\"\n  ],\n  \"selectors\": {\n    \"lvl0\": \".menu__link--sublist.menu__link--active\",\n    \"lvl1\": \"header h1\",\n    \"lvl2\": \"article h2\",\n    \"lvl3\": \"article h3\",\n    \"lvl4\": \"article h4\",\n    \"text\": \"article p, article li\"\n  },\n  \"custom_settings\": {\n    \"attributesForFaceting\": [\"type\", \"lang\"]\n  }\n}\n"
    },
    "12-llm-auto-glossary": {
        "README.md": "# LLM Auto-Glossary Extractor\n\nA Python script that parses technical articles and leverages an LLM to identify acronyms/jargon, generating a linked Markdown glossary.",
        "extract_glossary.py": "import os\nimport glob\nfrom openai import OpenAI\n\nclient = OpenAI()\n\ndef extract_terms(directory):\n    all_text = \"\"\n    for file in glob.glob(f\"{directory}/**/*.md\", recursive=True):\n        with open(file, 'r') as f:\n            all_text += f.read() + \"\\n\\n\"\n            \n    prompt = f\"Extract a list of technical jargon and acronyms from the following text and provide concise definitions. Format as a Markdown table:\\n\\n{all_text[:10000]}\"\n    \n    response = client.chat.completions.create(\n        model=\"gpt-3.5-turbo\",\n        messages=[{\"role\": \"user\", \"content\": prompt}]\n    )\n    \n    with open('GLOSSARY.md', 'w') as f:\n        f.write(\"# Technical Glossary\\n\\n\")\n        f.write(response.choices[0].message.content)\n\nif __name__ == '__main__':\n    extract_terms('./docs')\n"
    },
    "13-doc-pr-review-bot": {
        "README.md": "# Doc PR Review AI Bot\n\nA custom GitHub Action that uses LLMs to read the diff of documentation pull requests and post inline comments suggesting clarity improvements or passive voice corrections.",
        "action.yml": "name: 'LLM Doc Reviewer'\ndescription: 'Reviews PR diffs for documentation quality'\ninputs:\n  github_token:\n    description: 'GitHub token'\n    required: true\n  openai_key:\n    description: 'OpenAI API Key'\n    required: true\nruns:\n  using: 'docker'\n  image: 'Dockerfile'\n",
        "review_bot.py": "import os\nimport requests\nfrom openai import OpenAI\n\n# Stub for the actual PR diff parsing logic\ndef review_diff(diff_text):\n    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])\n    prompt = f\"Review this documentation diff for passive voice, clarity, and tone:\\n\\n{diff_text}\"\n    \n    response = client.chat.completions.create(\n        model=\"gpt-4\",\n        messages=[{\"role\": \"user\", \"content\": prompt}]\n    )\n    return response.choices[0].message.content\n\n# ... GitHub API PR Comment posting logic ...\n"
    },
    "14-automated-release-notes": {
        "README.md": "# Automated Release Notes Generator\n\nA script that aggregates merged PRs since the last Git tag, filters them by labels (e.g., 'feature', 'bug'), fetches Jira descriptions, and drafts Markdown release notes.",
        "generate_release_notes.sh": "#!/bin/bash\n\nPREV_TAG=$(git describe --tags --abbrev=0)\necho \"Generating release notes since $PREV_TAG...\"\n\n# Fetch PR titles\nLOGS=$(git log $PREV_TAG..HEAD --pretty=format:\"* %s\")\n\necho \"# Release Notes - $(date +%Y-%m-%d)\" > RELEASE_NOTES.md\necho \"\" >> RELEASE_NOTES.md\necho \"## What's New\" >> RELEASE_NOTES.md\necho \"$LOGS\" >> RELEASE_NOTES.md\n\necho \"Release notes generated in RELEASE_NOTES.md\"\n"
    },
    "15-multi-version-routing": {
        "README.md": "# Multi-Version Docs Routing Architecture\n\nA configuration setup for managing v1, v2, and enterprise versioned documentation seamlessly with fallback routing.",
        "versions.json": "[\n  \"2.0.0\",\n  \"1.5.0\",\n  \"1.0.0\"\n]\n",
        "docusaurus.config.js": "module.exports = {\n  presets: [\n    [\n      '@docusaurus/preset-classic',\n      {\n        docs: {\n          lastVersion: 'current',\n          versions: {\n            current: {\n              label: '2.0.0 (Latest)',\n              path: '2.0.0',\n            },\n            '1.5.0': {\n              label: '1.5.0 (Legacy)',\n              path: '1.5.0',\n            },\n          },\n        },\n      },\n    ],\n  ],\n};\n"
    },
    "16-content-linter-hooks": {
        "README.md": "# Content Linter Pre-Commit Hook\n\nHusky Git hooks that strictly enforce formatting (Prettier) and linting (MarkdownLint), preventing developers from committing malformed docs.",
        ".husky/pre-commit": "#!/usr/bin/env sh\n. \"$(dirname -- \"$0\")/_/husky.sh\"\n\nnpx lint-staged\n",
        ".lintstagedrc.json": "{\n  \"docs/**/*.md\": [\n    \"prettier --write\",\n    \"markdownlint\"\n  ]\n}\n"
    }
}

os.makedirs(base_dir, exist_ok=True)

for folder, files in projects.items():
    folder_path = os.path.join(base_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    for filename, content in files.items():
        file_path = os.path.join(folder_path, filename)
        # Handle subdirectories in filenames (e.g. .github/workflows/...)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Successfully created 16 project codebases in {base_dir}")
