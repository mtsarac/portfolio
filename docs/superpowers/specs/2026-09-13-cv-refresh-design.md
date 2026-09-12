# CV Refresh Design — sync CVs with website

**Date:** 2026-09-13
**Status:** proposed (written without user Q&A; assumptions marked [A])

## Goal

Update the four files in `public/cv/` (`CV.docx`, `CV.pdf`, `CV_English.docx`,
`CV_English.pdf`) so they tell the same story as the website. The CVs are
stale (GPA 3.25, no internships, vague projects paragraph); the site is the
source of truth.

## Assumptions [A]

- Target: junior software roles and internships, same as the site's "open to work" line.
- Both languages stay in sync: TR CV mirrors `tr.json`, EN CV mirrors `en.json`.
- Keep the existing .docx visual design; content-only refresh, no redesign.
- Thesis stays private: one bullet, "details available on request", same as site.

## Content gaps (site vs CVs)

| # | Fix | Source |
|---|-----|--------|
| 1 | GPA 3.25 → 3.32 | `en.json` about.gpa |
| 2 | Add ADM internship, 20 Jul–28 Aug 2026, Denizli: PostgreSQL inventory/asset system, React CRM prototype, SAP/enterprise IT exposure, MASSGuard AI ideathon concept | `experienceData.ts` + `en/tr.json` experience.adm |
| 3 | Add TNC IT program, Term 23 2026: Python CLI (JSON), ~2890-row Excel dashboard, AutoCAD room plan, Blender isometric room | `en/tr.json` experience.tnc |
| 4 | Projects: replace vague "Next.js + Shadcn app" paragraph with thesis (Adrenal Anomaly Detection: NestJS + PostgreSQL + JWT, React Native MRI/AI app) and homelab (Raspberry Pi 5, DietPi, Traefik + Cloudflare Tunnel, media stack, Gitea, Vaultwarden, SearXNG, Uptime Kuma) | `en/tr.json` projects |
| 5 | Skills: drop Bootstrap, Shadcn, AWS, C; add NestJS, React Native, Expo, REST API, Linux, Docker | `SkillsSection.tsx` skillData |
| 6 | EN CV heading bug: `YETENEKLER` → `SKILLS` | cv_en.txt line 46 |
| 7 | TR CV: OpenGL mention → align with site (C++ OOP + Blender 3D course at Maribor) | `en/tr.json` about.erasmusDesc |
| 8 | Objective/summary: backend-heavy NestJS + PostgreSQL + React, final-year student seeking junior/internship roles | `en/tr.json` hero/about |
| 9 | Add `msarac.me` to contact lines | site is live at msarac.me |

## Approaches

**A. Script-edit .docx in place (recommended).** Install `python-docx` via `uv`
(no sudo, no pip needed), patch paragraphs/tables in the two .docx files,
export PDFs with headless LibreOffice (`soffice --headless --convert-to pdf`).
Preserves the existing design; smallest diff; both tools verified present
(`uv`, `soffice`). Risk: .docx may use textboxes/tables that need
per-paragraph handling; mitigated by dumping paragraph text first.

**B. Rebuild from HTML + Chromium PDF.** Clean output and full layout control,
but a from-scratch design plus a new HTML-to-PDF toolchain for a content sync.
Overkill; rejected unless A proves unworkable.

**C. Hand-patch .docx XML.** Fragile against Word XML namespaces; rejected.

## Implementation outline

1. `uvx --with python-docx` one-off script (no repo dependency added): dump
   paragraph/table text of both .docx files to confirm structure.
2. Patch script per gap table rows 1–9; keep fonts, sizes, layout untouched.
3. `soffice --headless --convert-to pdf` both .docx files into `public/cv/`.
4. Verify: `pdftotext` both PDFs, diff key strings (GPA, ADM, TNC, NestJS,
   SKILLS heading); `git add` the two .docx sources (currently untracked) so
   `git status` shows exactly the four CV files (2 modified PDFs + 2 added docx).
5. Commit `docs: refresh CVs to match website` (content commit for binaries is
   separate from this spec commit).

## Non-goals

- No visual redesign of the CVs.
- No new toolchain or dependency in `package.json`.
- No changes to site content; site is read-only source of truth here.

## Verification

- `pdftotext` on both PDFs contains: `3.32`, `ADM`, `TNC`, `NestJS`,
  `Adrenal`, `Raspberry`, and EN PDF has `SKILLS` with no `YETENEKLER`.
- `git status` shows the four CV files (2 modified PDFs + 2 newly added docx).
