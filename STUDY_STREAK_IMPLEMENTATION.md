# Study Streak Implementation Guide

## How Study Streak Works

A **study streak** is a continuous count of consecutive days where a user has been active on the platform. It represents consistency and daily engagement with learning materials.

### Current Status
- **Frontend**: Shows placeholder value "12 days"
- **Backend**: Streak calculation not yet implemented in `/user/stats` endpoint

---

## Implementation Plan

### Backend Changes Required

**File**: `backend/controllers/user_controller.py`

Update `get_user_stats()` function to include streak calculation:

```python
from datetime import datetime, timedelta

def get_user_stats(app):
    """Get user statistics including study streak"""
    user_id = get_jwt_identity()
    
    # Existing stats
    notes_count = app.mongo.db.notes.count_documents({'user_id': user_id})
    tasks_count = app.mongo.db.tasks.count_documents({'user_id': user_id})
    completed_tasks = app.mongo.db.tasks.count_documents({'user_id': user_id, 'status': 'completed'})
    pending_tasks = tasks_count - completed_tasks
    
    # Calculate study streak
    user = app.mongo.db.users.find_one({'_id': user_id})
    streak = calculate_streak(app, user_id, user)
    
    stats = {
        'notes': notes_count,
        'total_tasks': tasks_count,
        'completed_tasks': completed_tasks,
        'pending_tasks': pending_tasks,
        'study_streak': streak  # NEW
    }
    
    return resp(True, 'Stats fetched', stats)


def calculate_streak(app, user_id, user_doc):
    """
    Calculate consecutive days of activity.
    Activity = any note creation, task completion, or AI interaction.
    """
    today = datetime.utcnow().date()
    streak = 0
    
    # Check last 365 days for activity
    for days_back in range(365):
        check_date = today - timedelta(days=days_back)
        start_time = datetime.combine(check_date, datetime.min.time())
        end_time = datetime.combine(check_date, datetime.max.time())
        
        # Check for any activity on this day
        note_activity = app.mongo.db.notes.find_one({
            'user_id': user_id,
            'created_at': {'$gte': start_time, '$lte': end_time}
        })
        
        task_activity = app.mongo.db.tasks.find_one({
            'user_id': user_id,
            'updated_at': {'$gte': start_time, '$lte': end_time}
        })
        
        # If activity found, increment streak
        if note_activity or task_activity:
            streak += 1
        else:
            # Break streak if no activity found
            if days_back > 0:  # Allow today to be skipped (in progress)
                break
    
    return streak
```

---

## Database Schema Changes

### Add to User Document

Track streak metadata in MongoDB `users` collection:

```javascript
{
  "_id": ObjectId("..."),
  "username": "vishal",
  "email": "vishal@example.com",
  "name": "Vishal",
  // ... other fields
  "streak": {
    "current": 12,           // Current consecutive days
    "longest": 47,           // All-time longest streak
    "last_activity": "2026-06-10T14:30:00Z"  // Last activity timestamp
  }
}
```

### Alternative: Activity Log Collection

Create a dedicated activity tracking collection for better performance:

```javascript
// Collection: user_activity
{
  "_id": ObjectId("..."),
  "user_id": "user_id_string",
  "date": "2026-06-10",  // ISO date string
  "activity_type": "note_created",  // or "task_completed", "ai_query"
  "timestamp": ISODate("2026-06-10T14:30:00Z")
}
```

---

## Streak Rules

1. **Streak Starts**: When user creates first note or completes first task
2. **Streak Continues**: If user has ANY activity (notes, tasks, AI interactions) on consecutive days
3. **Streak Breaks**: If user has NO activity for an entire day
4. **Timezone**: Use UTC or user's local timezone (currently UTC)
5. **Reset**: Manually reset via admin panel or user settings

---

## Frontend Integration

### Update Dashboard HTML

The frontend already has the placeholder. Update the data loading function in `app.js`:

```javascript
async function loadDashboardData() {
  const statsRes = await apiFetch('/user/stats');
  if (statsRes.success) {
    const s = statsRes.data;
    
    // Update stats displays
    document.querySelectorAll('.stat-value')[0].textContent = s.notes || 0;
    document.querySelectorAll('.stat-value')[1].textContent = s.completed_tasks || 0;
    document.querySelectorAll('.stat-value')[2].textContent = s.pending_tasks || 0;
    document.querySelectorAll('.stat-value')[3].textContent = s.study_streak + 'd' || '0d';
    
    // Update hero streak badge
    const streakBadge = document.querySelector('[data-icon="flame"]').parentElement.parentElement.querySelector('.stat-badge__value');
    if (streakBadge) {
      streakBadge.textContent = s.study_streak + ' days';
    }
  }
}
```

---

## Testing Checklist

- [ ] Calculate streak correctly for new users (0 days)
- [ ] Increment streak when user creates a note
- [ ] Increment streak when user completes a task
- [ ] Maintain streak on consecutive days
- [ ] Reset streak after 1 day of inactivity
- [ ] Handle timezone differences
- [ ] Test all-time longest streak tracking
- [ ] Verify streak persists across sessions

---

## Performance Considerations

### Current Approach (Activity Search)
- ✅ Simple to implement
- ✅ Works with existing database structure
- ❌ Slow for large activity datasets (O(n) per user per request)

### Optimized Approach (Activity Log + Cache)
- ✅ Fast queries (indexed by user_id + date)
- ✅ Supports gamification features
- ✅ Easy to export analytics
- ❌ Requires migration script

### Recommended
Use **Activity Log** approach for production. Create migration:

```python
# backend/migrations/migrate_activity_log.py
def create_activity_log_collection(app):
    """Migrate historical activity to activity_log collection"""
    users = app.mongo.db.users.find()
    for user in users:
        # Find all notes and tasks
        notes = app.mongo.db.notes.find({'user_id': user['_id']})
        tasks = app.mongo.db.tasks.find({'user_id': user['_id']})
        
        for note in notes:
            app.mongo.db.user_activity.insert_one({
                'user_id': user['_id'],
                'date': note['created_at'].date().isoformat(),
                'activity_type': 'note_created',
                'timestamp': note['created_at']
            })
```

---

## Next Steps

1. **Implement** streak calculation in `user_controller.py`
2. **Test** with sample users
3. **Update** frontend to display real streak value
4. **Monitor** performance with larger datasets
5. **Migrate** to Activity Log collection if needed

---

## API Response Example

```json
{
  "success": true,
  "message": "Stats fetched",
  "data": {
    "notes": 9,
    "total_tasks": 15,
    "completed_tasks": 42,
    "pending_tasks": 3,
    "study_streak": 12
  }
}
```
