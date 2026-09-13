# CV Refresh Design — sync CVs with website

**Date:** 2026-09-13
**Status:** proposed (written without user Q&A; assumptions marked [A])

## Goal

Update the files in `public/cv/` (`CV.docx`, `CV.pdf`, `CV_English.docx`,
`CV_English.pdf`) so they tell the same story as the website, plus 2 extra
designs per language (see Deliverables). The CVs are stale (GPA 3.25, no
internships, vague projects paragraph); the site is the source of truth.

## Assumptions [A]

- Target: junior software roles and internships, same as the site's "open to work" line.
- Both languages stay in sync: TR CV mirrors `tr.json`, EN CV mirrors `en.json`.
- Keep the existing .docx visual design for the originals; content-only refresh.
- Extra designs are new looks, same content; originals stay at same filenames.
- Thesis stays private: one bullet, "details available on request", same as site.

## Content gaps (site vs CVs)

| # | Fix | Source |
|---|-----|--------|
| 1 | GPA 3.25 → 3.32 | `en.json` about.gpa |
| 2 | Add ADM internship, 20 Jul–28 Aug 2026, Denizli: PostgreSQL inventory/asset system, React CRM prototype, SAP/enterprise IT exposure, MASSGuard AI ideathon concept | `experienceData.ts` + `en/tr.json` experience.adm |
| 3 | Add TNC IT program, Term 23 2026: Python CLI (JSON), Excel dashboard, AutoCAD room plan, Blender isometric room | `en/tr.json` experience.tnc |
| 4 | Projects: replace vague "Next.js + Shadcn app" paragraph with thesis only (Adrenal Anomaly Detection: NestJS + PostgreSQL + JWT, React Native MRI/AI app, details on request). No homelab on the CV. | `en/tr.json` projects.thesis |
| 5 | Skills: drop Bootstrap, Shadcn, AWS, C; add NestJS, React Native, Expo, REST API, Linux, Docker | `SkillsSection.tsx` skillData |
| 6 | EN CV heading bug: `YETENEKLER` → `SKILLS` | cv_en.txt line 46 |
| 7 | TR CV: OpenGL mention → align with site (C++ OOP + Blender 3D course at Maribor) | `en/tr.json` about.erasmusDesc |
| 8 | Objective/summary: backend-heavy NestJS + PostgreSQL + React, final-year student seeking junior/internship roles | `en/tr.json` hero/about |
| 9 | Add `msarac.me` to contact lines | site is live at msarac.me |

## Approaches

**A. Script-edit .docx in place (recommended for the original design).** Install
`python-docx` via `uv` (no sudo, no pip needed), patch paragraphs/tables in
the two .docx files, export PDFs with headless LibreOffice
(`soffice --headless --convert-to pdf`). Preserves the existing design;
smallest diff; both tools verified present (`uv`, `soffice`). Risk: .docx may
use textboxes/tables that need per-paragraph handling; mitigated by dumping
paragraph text first.

Allowed extra tools: `pandoc` (md/HTML → .docx for the extra designs) and
`ocrmypdf --optimize` on the final PDFs. Both verified present
(pandoc 3.10.2, ocrmypdf). Note: ocrmypdf was evaluated and skipped, all
outputs are born-digital tagged PDFs (LibreOffice/Chromium) with nothing to
OCR; force-OCR would only discard structure.

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

## Deliverables

- Original design, refreshed content: `CV.docx`, `CV.pdf`, `CV_English.docx`,
  `CV_English.pdf` (same filenames, same look).
- 2 extra designs per language, same refreshed content, new filenames so the
  originals stay untouched:
  - `CV-modern.pdf` / `CV-modern.docx` and English variants
    (`CV_English-modern.pdf` / `.docx`)
  - `CV-minimal.pdf` / `CV-minimal.docx` and English variants
- Extra designs are built from HTML rendered with headless Chromium (full
  layout control); .docx versions via `pandoc`; all PDFs finished with
  `ocrmypdf --optimize`.

## Non-goals

- No changes to the original .docx visual design beyond content swaps.
- No new toolchain or dependency in `package.json`.
- No changes to site content; site is read-only source of truth here.

## Verification

- `pdftotext` on both original PDFs contains: `3.32`, `ADM`, `TNC`, `NestJS`,
  `Adrenal`, and EN PDF has `SKILLS` with no `YETENEKLER`; no `homelab`,
  no `2890`, no `Raspberry`.
- Same content checks pass on the 4 extra-design PDFs.
- `git status` shows the CV files (2 modified PDFs + 2 newly added docx +
  8 new extra-design files).
