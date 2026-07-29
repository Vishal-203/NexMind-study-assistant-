# TODO: Fix Admin Profile Page

- [ ] Implement fixes in `frontend/admin/admin-profile.html`:
  - [ ] Load identity from backend `/admin-profile` first; fallback to `localStorage.adminUser` only.
  - [ ] Remove/avoid any reliance on non-existent DOM nodes / inconsistent localStorage keys.
  - [ ] Improve password change UX (field validation, clear error/success, handle failed responses robustly).
  - [ ] Update logout redirect to `frontend/admin/admin-login.html`.
- [ ] Manual verification:
  - [ ] Admin profile loads without JS errors.
  - [ ] Admin ID/Email/Username/Role fields populate.
  - [ ] Password update either succeeds or shows correct backend error.
  - [ ] Logout sends user to admin login.

