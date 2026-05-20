# Admin Control Center - Analytics Visualization

## Plan
- Add backend time-series endpoints for:
  - New users (signups per day for last 7 days)
  - Note activity (created+updated per day for last 7 days)
  - Task progress (completion % per day for last 7 days)
- Add frontend data visualization in `frontend/admin/admin-dashboard.html`.

## Backend steps
- [ ] Implement endpoints in `backend/controllers/admin_controller.py`.
- [ ] Wire routes in `backend/routes/admin_auth_routes.py`.

## Frontend steps
- [ ] Add chart UI sections (simple SVG/canvas) in `frontend/admin/admin-dashboard.html`.
- [ ] Fetch chart data and render charts in the dashboard script.

## Testing
- [ ] Load admin dashboard and verify charts render and update on refresh.

