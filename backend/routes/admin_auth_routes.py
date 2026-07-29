from flask import Blueprint
from controllers.admin_auth_controller import admin_login, admin_profile
from controllers.admin_controller import (
    get_admin_stats,
    list_users,
    get_user_details,
    delete_user,
    block_user,
    analytics_new_users,
    analytics_note_activity,
    analytics_task_progress
)


admin_auth_bp = Blueprint('admin_auth_routes', __name__)

# Authentication Endpoints
admin_auth_bp.route('/admin-login', methods=['GET', 'POST'])(admin_login)
admin_auth_bp.route('/admin-profile', methods=['GET'])(admin_profile)

# Administration & Dashboard Metrics
admin_auth_bp.route('/admin-stats', methods=['GET'])(get_admin_stats)
admin_auth_bp.route('/analytics/new-users', methods=['GET'])(analytics_new_users)
admin_auth_bp.route('/analytics/note-activity', methods=['GET'])(analytics_note_activity)
admin_auth_bp.route('/analytics/task-progress', methods=['GET'])(analytics_task_progress)


# User Management Endpoints
admin_auth_bp.route('/admin-users', methods=['GET'])(list_users)
admin_auth_bp.route('/admin-users/<user_id>', methods=['GET'])(get_user_details)
admin_auth_bp.route('/admin-users/<user_id>', methods=['DELETE'])(delete_user)
admin_auth_bp.route('/admin-users/<user_id>/block', methods=['POST'])(block_user)


