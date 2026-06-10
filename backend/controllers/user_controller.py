from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from utils.helpers import check_password, hash_password, parse_object_id, resp


@jwt_required()
def get_profile(app):
    user_id = get_jwt_identity()
    user_obj_id = parse_object_id(user_id, 'user_id')
    if user_obj_id is None:
        return resp(False, 'Invalid user ID', status=400)

    user = app.mongo.db.users.find_one({'_id': user_obj_id}, {'password': False})
    if not user:
        return resp(False, 'User not found', status=404)
    user['id'] = str(user['_id'])
    del user['_id']
    return resp(True, 'Profile fetched', user)


@jwt_required()
def update_profile(app):
    user_id = get_jwt_identity()
    user_obj_id = parse_object_id(user_id, 'user_id')
    if user_obj_id is None:
        return resp(False, 'Invalid user ID', status=400)

    data = request.get_json() or {}
    name = data.get('name', '').strip()
    
    if not name:
        return resp(False, 'Name is required', status=400)
    
    result = app.mongo.db.users.update_one(
        {'_id': user_obj_id},
        {'$set': {'name': name}}
    )
    
    if result.matched_count == 0:
        return resp(False, 'User not found', status=404)
    
    return resp(True, 'Profile updated')


@jwt_required()
def change_password(app):
    user_id = get_jwt_identity()
    user_obj_id = parse_object_id(user_id, 'user_id')
    if user_obj_id is None:
        return resp(False, 'Invalid user ID', status=400)

    data = request.get_json() or {}
    old_password = data.get('old_password', '')
    new_password = data.get('new_password', '')
    
    if not old_password or not new_password:
        return resp(False, 'Old and new password are required', status=400)
    
    user = app.mongo.db.users.find_one({'_id': user_obj_id})
    if not user or not check_password(old_password, user['password']):
        return resp(False, 'Old password is incorrect', status=401)
    
    if len(new_password) < 6:
        return resp(False, 'New password must be at least 6 characters', status=400)
    
    app.mongo.db.users.update_one(
        {'_id': user_obj_id},
        {'$set': {'password': hash_password(new_password)}}
    )
    
    return resp(True, 'Password changed successfully')


@jwt_required()
def get_user_stats(app):
    """Get user statistics (notes count, tasks count, etc)"""
    user_id = get_jwt_identity()
    
    notes_count = app.mongo.db.notes.count_documents({'user_id': user_id})
    tasks_count = app.mongo.db.tasks.count_documents({'user_id': user_id})
    completed_tasks = app.mongo.db.tasks.count_documents({'user_id': user_id, 'status': 'completed'})
    pending_tasks = tasks_count - completed_tasks

    completed_dates = set()
    for task in app.mongo.db.tasks.find({'user_id': user_id, 'status': 'completed'}, {'created_at': 1}):
        created_at = task.get('created_at')
        if isinstance(created_at, datetime):
            completed_dates.add(created_at.date())

    streak = 0
    today = datetime.utcnow().date()
    while today in completed_dates:
        streak += 1
        today -= timedelta(days=1)

    stats = {
        'notes': notes_count,
        'total_tasks': tasks_count,
        'completed_tasks': completed_tasks,
        'pending_tasks': pending_tasks,
        'focus_streak': streak
    }
    
    return resp(True, 'Stats fetched', stats)
