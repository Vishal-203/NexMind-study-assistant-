CLEANUP SUMMARY
================

Date: 2026-08-12

Action: Archived temporary, draft, and TODO files into the `archive/` folder to reduce repository noise and clarify the active codebase.

Files moved into `archive/` at commit `chore: archive temporary, draft, and TODO files`:

- `TEMP_frontend_notebook.html`
- `TEMP_MOVE_FILES_PLAN.txt`
- `TEMP_frontend_notebook_exportpdf.js`
- `PROGRESS.md`
- `TODO_CLEAN_STRUCTURE.md`
- `TODO_ADMIN_PROFILE_FIX.md`
- `TODO_ADMIN.md`
- `TODO.md`
- `admin/TODO_ADMIN_STEPS.md`
- `admin/TODO_ADMIN.md`
- `frontend/drafts/` -> `archive/frontend_drafts/`
- `backend/routes/drafts/` -> `archive/backend_routes_drafts/`

Recommendation:
- Keep `archive/` as a read-only snapshot of prior work and plans. If items become relevant again, restore them from `archive/` rather than keeping them in active directories.
- Use `/.env.example` for templates and keep real secrets out of the repo and in your deployment/CI secret store.

If you want more files archived or removed, list them here and I'll move them.
