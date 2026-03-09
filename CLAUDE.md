# CLAUDE.md — Arkangel

## Project Overview

Arkangel is a pre-launch landing page for a family emotional communication app targeting Ecuadorian families. Children (5-12) express emotions visually; parents receive real-time notifications and guidance.

- **Stage:** MVP (pre-launch landing page)
- **Live URL:** https://arkangel-app.github.io
- **Repo:** https://github.com/SedaoAwana/arkangel-app

## Tech Stack

- **Frontend:** Static HTML5, CSS3, vanilla JavaScript
- **Framework:** Bootstrap 3
- **Hosting:** GitHub Pages (auto-deploys from `master`)
- **Integrations:** Mailchimp (waitlist signup), WhatsApp Share API (viral sharing)
- **No build step** — edit files directly, push to deploy

## Project Structure

```
index.html          # Main landing page (6 sections)
css/                # Bootstrap + base styles
styles/             # Theme variants (funtime.css = active theme)
js/                 # jQuery, Bootstrap, plugins, main.js
img/                # All image assets
fonts/              # Font Awesome, Flaticons, Glyphicons
domain-config.yaml  # Single source of truth: product, users, features, business
team-config.yaml    # Agent roles, skills, workflows, escalation rules
```

## Key Configuration Files

- **domain-config.yaml** — Read this before any product/feature/copy work. Contains product identity, target personas, MVP features, tech stack, business model, go-to-market strategy, and constraints.
- **team-config.yaml** — Defines agent roles (CEO, CTO, COO, CMO), skills, workflows, communication protocol, and escalation rules.

## Design System

- **Colors:** Deep blue `#34327C`, orange `#FF9400`, cream `#F3F0CF`
- **Typography:** Google Fonts — Lato (body), Alegreya Sans (headings)
- **Approach:** Warm, child-friendly, family-oriented. Mobile-first.

## Language & Cultural Rules

- **All user-facing copy must be in Spanish** (Ecuadorian Spanish)
- **NEVER use:** "trastorno mental", "diagnóstico", "terapia" in user-facing text
- **USE instead:** "bienestar emocional", "conexión familiar", "comunicación emocional"
- Frame everything as **family connection**, not mental health treatment
- Respect familismo — family bond is the core value

## Performance Requirements

- Page load < 3 seconds on 4G
- Total page weight < 1MB
- 44px minimum touch targets (mobile-first)
- Android-first (75.9% market share in Ecuador)

## Agent Team

This project uses Claude Code agent teams (experimental) for coordinated parallel work. The team is defined by subagent files in `.claude/agents/` and orchestrated via `team-config.yaml`.

| Agent | Role | Model | Isolation |
|-------|------|-------|-----------|
| **cto-agent** | Technical architecture, implementation, debugging | inherit (Opus) | worktree |
| **coo-agent** | QA, financial modeling, release readiness | Sonnet | — |
| **cmo-agent** | Go-to-market, copy, growth, WhatsApp virality | Sonnet | — |
| **code-reviewer** | Post-implementation code review | inherit | — |
| **debugger** | Error diagnosis and fix | inherit | — |

### Using Agent Teams

Ask Claude to create an agent team for parallel work:
```
Create an agent team: CTO implements the new section, COO runs QA checks,
CMO reviews the copy. Use worktrees for isolation.
```

### Using Git Worktrees

Feature work runs in isolated worktrees so parallel sessions don't collide:

**From CLI:**
```bash
# Start Claude in a named worktree (creates .claude/worktrees/feature-auth/)
claude --worktree feature-auth

# Auto-generate worktree name
claude --worktree
```

**From inside a session:**
- Say "start a worktree for [feature]" or "work in a worktree"
- CTO agent uses `isolation: worktree` by default in its subagent config

**How it works:**
- Worktrees are created at `.claude/worktrees/<name>/` with branch `worktree-<name>`
- Each worktree has its own files and branch, sharing repo history
- On exit: auto-cleaned if no changes; prompted to keep/remove if changes exist
- Subagents with `isolation: worktree` get auto-cleanup when they finish without changes

### Escalation Rules
- One-way-door decisions (pricing, launches, pivots) → user (Sedao)
- Cultural sensitivity decisions → user (Sedao)
- Children's data or privacy → user (Sedao)
- Messaging/positioning changes → CEO (user)
- Technical architecture → CTO agent
- Quality gate failures → COO agent

## Development Workflow

1. Read `domain-config.yaml` before any product work
2. Read `team-config.yaml` for agent role boundaries
3. All changes deploy automatically on push to `master`
4. No build tools, no package manager — edit and push
5. Test on mobile viewport first
6. Use worktrees for feature branches to avoid conflicts
7. Agent teams for parallel work (research, multi-module features, code review)

## Git Conventions

- Branch: `master` (main branch, auto-deploys)
- Feature branches via worktrees: `.claude/worktrees/`
- Commit messages: English, imperative mood, concise
- Prefix: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

## Common Tasks

| Task | How |
|------|-----|
| Edit landing page | Modify `index.html` |
| Change theme colors | Edit `styles/funtime.css` |
| Update base styles | Edit `css/style.css` |
| Add JavaScript | Edit `js/main.js` |
| Update copy/messaging | Check `domain-config.yaml` first for approved language |

## Constraints

- **Budget:** $0-20/month infrastructure
- **Timeline:** Landing page done. MVP app: 8-12 weeks
- **Geographic focus:** Ecuador
- **Accessibility:** WCAG AA compliance target
- **One-way-door decisions** (pricing, launches, pivots, children's data) → always escalate to user (Sedao)
