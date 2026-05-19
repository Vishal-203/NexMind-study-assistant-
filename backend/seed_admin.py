from werkzeug.security import generate_password_hash
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/ai_study_assistant')
db = client.ai_study_assistant

# Change email and password to whatever you want
db.users.insert_one({
    'name': 'Admin',
    'email': 'admin@admin.com',
    'password': generate_password_hash('Admin@123'),
    'role': 'admin',
    'is_blocked': False,
    'ai_usage_limit': 9999,
    'ai_usage_count': 0,
    'created_at': datetime.utcnow(),
    'last_active': datetime.utcnow()
})
print('Admin user created successfully.')