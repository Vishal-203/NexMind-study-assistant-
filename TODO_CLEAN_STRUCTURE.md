# TODO: Clean file structure

## Plan summary
Make the repository layout clearer by moving TEMP/draft/debug artifacts out of active code paths, and clarifying documentation-vs-runtime locations.

## Steps
- [ ] Create target folder conventions (drafts/temp/debug, docs/admin, etc.) in docs (STRUCTURE.md update)
- [x] Move non-runtime artifacts:
  - [x] `frontend/TEMP_flashcards_patch_note.txt` -> `frontend/drafts/TEMP_flashcards_patch_note.txt`
  - [ ] `TEMP_frontend_notebook.html` -> `frontend/drafts/TEMP_frontend_notebook.html` (if used only for export/debug)
  - [ ] `TEMP_frontend_notebook_exportpdf.js` -> `frontend/drafts/TEMP_frontend_notebook_exportpdf.js`
- [x] Move debug backend route away from runtime imports:
  - [x] `backend/routes/_password_reset_debug_patch.py` -> `backend/routes/drafts/_password_reset_debug_patch.py`
  - [ ] Ensure `backend/app.py` does NOT import it (verify via grep)
- [ ] Normalize frontend naming (only if safe after link audit):
  - [ ] Decide canonical for AI page: `ai_assistant.html` vs `ai-chat.html`
  - [ ] Update sidebar/navbar links accordingly
- [x] Run quick verification:
  - [x] Backend imports pass (`compileall`)
  - [ ] Start Flask and verify `/` and `/admin` static pages resolve
  - [ ] Open main frontend pages to ensure navigation works (no missing file links)


