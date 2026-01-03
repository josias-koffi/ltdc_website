# Repository Guidelines

## Project Structure & Module Organization
`app/` hosts the App Router layouts, SEO files, and shared styles; keep components server-side unless a hook forces `"use client"`. Compose views with pieces in `components/`, then bind data inside `container/` pages. Utilities, DTOs, and formatters belong in `libs/`, while `services/` wraps every Directus or form integration. Store public assets in `public/`, environment presets in `config/`, and infra scripts in `Dockerfile` plus the `docker-compose*.yml` files.

## Build, Test, and Development Commands
Use `npm run dev` for hot reload on `http://localhost:3000`. `npm run build` performs the production compile and strict type-check, so run it before any PR. `npm run start` serves the compiled bundle for smoke tests, and `npm run lint` applies the repository ESLint rules. When dependencies are needed, run `docker compose up --build` to mirror the stack defined for staging.

## Coding Style & Naming Conventions
TypeScript strict mode is enabled; annotate props (`ActualitiesEntity`, etc.) and avoid `any`. Follow the existing two-space indentation, keep component filenames PascalCase, and export widgets as arrow functions assigned to `const`. Prefer the `@/*` alias for imports, keep Material UI `sx` objects tidy, and hoist repeated styles into helpers.

## Testing Guidelines
Automated tests are not yet committed, so validate every change with `npm run lint`, `npm run build`, and manual walkthroughs of the touched routes. If you introduce a test suite, use Jest + React Testing Library, colocate specs as `*.test.tsx` next to the implementation, and mock Directus calls via `services/`. Document manual steps or screenshots inside the PR until automation lands.

## Commit & Pull Request Guidelines
Recent commits favor short present-tense statements such as `Control de la presence de ITV`; keep that tone and scope each commit narrowly. Branches follow `feature/<topic>` or `fix/<issue>` conventions, so continue the pattern and cross-link an issue when possible. Every PR should outline the change, flag environment or Docker edits, attach UI screenshots, and confirm lint/build status plus any `.env.local` updates like `NEXT_PUBLIC_BO_URL`.

## Security & Configuration Tips
Secrets stay in `.env.local`; only expose values with the `NEXT_PUBLIC_*` prefix when they are safe for the browser bundle. Keep privileged logic in server components or API routes so tokens never sit in React clients, and sanitize payloads inside `services/`. Coordinate any changes to `config/` or the compose files with DevOps to maintain parity across environments.
