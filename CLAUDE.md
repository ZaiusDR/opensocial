# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenSocial is a humanitarian open-source projects aggregator (https://www.open-social.net). It scrapes GitHub for repositories tagged with social-impact topics and serves them through a searchable web interface.

## Repository Structure

Three independent codebases live in this repo:

- **`open-social/`** — Python 3.12 backend (AWS SAM/Lambda). Contains the scraper, REST API, and shared core library.
- **`open-social-front-v2/`** — Next.js 15 frontend (React 18, Tailwind CSS, daisyUI).
- **`infrastructure/`** — Terraform IaC for AWS (eu-west-1).

## Build & Test Commands

### Backend (Python)

```bash
# Install test dependencies (from repo root)
pip install -r open-social/tests/test_requirements.txt

# Run all backend tests
cd open-social && AWS_DEFAULT_REGION=eu-central-1 pytest

# Run a single test file
cd open-social && AWS_DEFAULT_REGION=eu-central-1 pytest tests/open_social_core_unit/test_github_gateway.py

# Run a single test
cd open-social && AWS_DEFAULT_REGION=eu-central-1 pytest tests/open_social_core_unit/test_github_gateway.py::test_name
```

`AWS_DEFAULT_REGION` is required because tests mock AWS services (via moto/mongomock).

### Frontend (JavaScript)

```bash
cd open-social-front-v2

npm install          # Install dependencies
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run test         # Jest in watch mode
npm run test-ci      # Jest single run (used in CI)
```

### Infrastructure (Terraform)

```bash
cd infrastructure
terraform init
terraform validate
terraform fmt -check -diff
```

## Backend Architecture

```
open-social/
├── open_social_core/          # Shared Lambda Layer
│   ├── domain/
│   │   └── github_project.py  # GithubProjectDTO frozen dataclass
│   ├── infrastructure/
│   │   ├── github_gateway.py  # GitHub GraphQL API client
│   │   ├── github_queries.py  # GraphQL query strings
│   │   └── github_project_parser.py
│   └── repository/
│       ├── repository.py      # MongoDB operations (Atlas Search, autocomplete)
│       └── creds_manager.py   # AWS Secrets Manager + STS credential handling
├── project_scrapper/
│   └── app.py                 # Scheduled Lambda — scrapes GitHub by topic
├── open_social_crud/
│   └── app.py                 # API Gateway Lambda — REST endpoints
└── template.yaml              # SAM template defining all resources
```

**Data flow:** GitHub GraphQL API → `project_scrapper` → MongoDB → `open_social_crud` → Frontend

**REST API endpoints** (defined in `template.yaml`, implemented in `open_social_crud/app.py`):
- `GET /projects` — List with pagination/filtering by topic and language
- `GET /topics` — Available topics
- `GET /languages` — Available languages
- `GET /search` — Full-text search (MongoDB Atlas Search)
- `GET /autocomplete` — Autocomplete suggestions

**Scraper topics** (each runs on its own cron schedule starting 4:00 AM UTC):
humanitarian, non-profit, social justice, social change, climate change, poverty, participatory democracy, feminism

**Credential management:** GitHub token via SSM Parameter Store; MongoDB URI and STS credentials via AWS Secrets Manager with Lambda Secrets Extension caching.

## Frontend Architecture

Next.js Pages Router with SWR for data fetching. Styling via Tailwind CSS + daisyUI. Path alias `@/` maps to project root (via jsconfig.json). Tests use Jest + React Testing Library with jsdom environment.

## CI/CD

Push to `main` triggers the full pipeline (`.github/workflows/open-social.yml`):
1. Build & push SAM Docker image
2. Terraform validate + apply
3. Frontend tests (`npm run test-ci`)
4. Backend tests (`pytest`) → SAM validate → build → deploy

All three first jobs must pass before SAM deployment runs.

## Key Conventions

- Domain model uses frozen Python dataclasses (`GithubProjectDTO`) with auto-calculated TTL (7 days)
- API responses are gzip-compressed and base64-encoded for API Gateway binary passthrough
- Backend tests use mongomock for MongoDB and moto for AWS services
- Node 20 for frontend, Python 3.12 for backend, Terraform 1.1.4 for infrastructure
