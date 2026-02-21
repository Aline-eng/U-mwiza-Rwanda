# API Documentation - U'mwiza Rwanda

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.umwizarwanda.org/api/v1
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## API Endpoints

### 1. Authentication

#### POST /auth/login
Login with email and password
```json
Request:
{
  "email": "staff@umwiza.org",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "staff@umwiza.org",
      "firstName": "John",
      "lastName": "Doe",
      "role": "staff",
      "communityId": "uuid"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST /auth/refresh
Refresh access token
```json
Request:
{
  "refreshToken": "refresh_token"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

#### POST /auth/logout
Logout and invalidate refresh token
```json
Request:
{
  "refreshToken": "refresh_token"
}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### POST /auth/change-password
Change user password
```json
Request:
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}

Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 2. Users (Admin Only)

#### GET /users
Get all users with pagination
```
Query Params:
- page: number (default: 1)
- limit: number (default: 10)
- role: 'staff' | 'admin'
- search: string
- communityId: uuid
```

#### POST /users
Create new user
```json
Request:
{
  "email": "newstaff@umwiza.org",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "staff",
  "communityId": "uuid",
  "phone": "+250788123456"
}
```

#### GET /users/:id
Get user by ID

#### PUT /users/:id
Update user
```json
Request:
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+250788123456",
  "communityId": "uuid"
}
```

#### DELETE /users/:id
Deactivate user

#### POST /users/:id/reset-password
Reset user password (Admin only)
```json
Request:
{
  "newPassword": "temporary_password"
}
```

---

### 3. Communities

#### GET /communities
Get all communities
```
Query Params:
- page: number
- limit: number
- search: string
- district: string
- isActive: boolean
```

#### POST /communities (Admin)
Create new community
```json
Request:
{
  "name": "Kigali Community Center",
  "location": "Kigali, Gasabo",
  "district": "Gasabo",
  "sector": "Remera",
  "cell": "Rukiri",
  "village": "Amahoro",
  "description": "Community description",
  "staffId": "uuid",
  "latitude": -1.9536,
  "longitude": 30.0606
}
```

#### GET /communities/:id
Get community details

#### PUT /communities/:id (Admin)
Update community

#### GET /communities/:id/statistics
Get community statistics
```json
Response:
{
  "totalFamilies": 45,
  "totalChildren": 120,
  "sponsoredChildren": 95,
  "activeStaff": 2,
  "recentActivities": [...]
}
```

---

### 4. Families

#### GET /families
Get families (filtered by staff's community)
```
Query Params:
- page: number
- limit: number
- search: string
- status: 'active' | 'inactive' | 'graduated'
- communityId: uuid (admin only)
```

#### POST /families
Create new family
```json
Request:
{
  "communityId": "uuid",
  "familyCode": "FAM-2024-001",
  "fatherName": "John Doe",
  "fatherAge": 45,
  "fatherOccupation": "Farmer",
  "motherName": "Jane Doe",
  "motherAge": 40,
  "motherOccupation": "Teacher",
  "address": "Kigali, Gasabo",
  "phone": "+250788123456",
  "housingType": "Permanent",
  "incomeLevel": "Low",
  "enrollmentDate": "2024-01-15"
}
```

#### GET /families/:id
Get family details with children

#### PUT /families/:id
Update family information

#### GET /families/:id/history
Get family activity history

---

### 5. Children

#### GET /children
Get children (filtered by staff's community)
```
Query Params:
- page: number
- limit: number
- search: string
- familyId: uuid
- isSponsored: boolean
- status: 'active' | 'inactive' | 'graduated'
- gradeLevel: string
```

#### POST /children
Create new child record
```json
Request:
{
  "familyId": "uuid",
  "childCode": "CHD-2024-001",
  "firstName": "Alice",
  "lastName": "Doe",
  "dateOfBirth": "2015-05-20",
  "gender": "female",
  "gradeLevel": "Primary 3",
  "schoolName": "Kigali Primary School",
  "interests": "Reading, Drawing",
  "dreams": "To become a doctor",
  "specialNeeds": "None"
}
```

#### GET /children/:id
Get child details

#### PUT /children/:id
Update child information

#### POST /children/:id/photo
Upload child photo
```
Content-Type: multipart/form-data
Field: photo (file)
```

#### GET /children/:id/timeline
Get child's complete timeline (health, education, letters, etc.)

---

### 6. Health Records

#### GET /health-records
Get health records
```
Query Params:
- childId: uuid (required)
- recordType: string
- startDate: date
- endDate: date
```

#### POST /health-records
Create health record
```json
Request:
{
  "childId": "uuid",
  "recordDate": "2024-01-15",
  "recordType": "checkup",
  "title": "Annual Health Checkup",
  "description": "Regular health examination",
  "diagnosis": "Healthy",
  "treatment": "None required",
  "hospitalName": "Kigali Hospital",
  "doctorName": "Dr. Smith"
}
```

#### GET /health-records/:id
Get health record details

#### PUT /health-records/:id
Update health record

#### POST /health-records/:id/document
Upload health document

---

### 7. Education Records

#### GET /education-records
Get education records
```
Query Params:
- childId: uuid (required)
- academicYear: string
- term: string
```

#### POST /education-records
Create education record
```json
Request:
{
  "childId": "uuid",
  "academicYear": "2024",
  "term": "Term 1",
  "gradeLevel": "Primary 3",
  "schoolName": "Kigali Primary School",
  "attendancePercentage": 95.5,
  "overallGrade": "A",
  "overallPercentage": 87.5,
  "rankInClass": 5,
  "totalStudents": 40,
  "teacherName": "Mrs. Johnson",
  "teacherComments": "Excellent student",
  "subjects": [
    {
      "name": "Mathematics",
      "grade": "A",
      "percentage": 90,
      "comments": "Very good"
    }
  ],
  "achievements": "Best in Mathematics",
  "challenges": "None"
}
```

#### GET /education-records/:id
Get education record details

#### PUT /education-records/:id
Update education record

#### POST /education-records/:id/report-card
Upload report card PDF

---

### 8. Transactions

#### GET /transactions
Get transactions
```
Query Params:
- childId: uuid
- sponsorId: uuid
- status: string
- startDate: date
- endDate: date
- page: number
- limit: number
```

#### POST /transactions (Admin)
Create transaction
```json
Request:
{
  "transactionCode": "TXN-2024-001",
  "childId": "uuid",
  "sponsorId": "uuid",
  "amount": 50000,
  "currency": "RWF",
  "transactionDate": "2024-01-15",
  "transactionType": "sponsorship",
  "paymentMethod": "Bank Transfer",
  "referenceNumber": "REF123456"
}
```

#### GET /transactions/:id
Get transaction details

#### PUT /transactions/:id/confirm (Admin)
Confirm transaction
```json
Request:
{
  "status": "confirmed",
  "notes": "Payment verified"
}
```

#### GET /transactions/export (Admin)
Export transactions to Excel/CSV

---

### 9. Budgets

#### GET /budgets
Get budgets
```
Query Params:
- familyId: uuid
- childId: uuid
- status: string
- budgetPeriod: string
```

#### POST /budgets
Create budget
```json
Request:
{
  "familyId": "uuid",
  "childId": "uuid",
  "budgetPeriod": "2024-Q1",
  "totalAmount": 150000,
  "currency": "RWF",
  "categories": [
    {
      "name": "Education",
      "amount": 80000,
      "description": "School fees and supplies"
    },
    {
      "name": "Health",
      "amount": 40000,
      "description": "Medical checkup"
    },
    {
      "name": "Housing",
      "amount": 30000,
      "description": "Roof repair"
    }
  ],
  "explanation": "Detailed budget explanation"
}
```

#### GET /budgets/:id
Get budget details

#### PUT /budgets/:id
Update budget (draft only)

#### POST /budgets/:id/submit
Submit budget for approval

#### POST /budgets/:id/review (Admin)
Approve or reject budget
```json
Request:
{
  "status": "approved",
  "reviewComments": "Budget approved"
}
```

#### GET /budgets/:id/history
Get budget revision history

---

### 10. Action Plans

#### GET /action-plans
Get action plans
```
Query Params:
- familyId: uuid
- year: number
- status: string
```

#### POST /action-plans
Create action plan
```json
Request:
{
  "familyId": "uuid",
  "year": 2024,
  "title": "Family Development Plan 2024",
  "goals": [
    {
      "category": "Housing",
      "goal": "Improve roof",
      "target": "Complete by June"
    }
  ],
  "housingImprovements": "Repair roof and paint walls",
  "educationImprovements": "Enroll children in extra classes",
  "healthImprovements": "Regular health checkups",
  "incomeImprovements": "Start small business",
  "communityInvolvement": "Participate in community events",
  "milestones": [
    {
      "title": "Roof repair",
      "targetDate": "2024-06-30",
      "status": "pending"
    }
  ]
}
```

#### GET /action-plans/:id
Get action plan details

#### PUT /action-plans/:id
Update action plan

#### POST /action-plans/:id/approve (Admin)
Approve action plan

#### PUT /action-plans/:id/progress
Update progress
```json
Request:
{
  "progressPercentage": 45,
  "milestones": [
    {
      "id": "milestone_id",
      "status": "completed",
      "completedDate": "2024-03-15"
    }
  ]
}
```

---

### 11. Letters

#### GET /letters
Get letters
```
Query Params:
- childId: uuid
- sponsorId: uuid
- direction: 'to_child' | 'from_child'
- status: string
- page: number
- limit: number
```

#### POST /letters
Create letter (from child)
```json
Request:
{
  "childId": "uuid",
  "sponsorId": "uuid",
  "direction": "from_child",
  "letterType": "text",
  "content": "Dear sponsor, thank you...",
  "language": "English",
  "sentDate": "2024-01-15"
}
```

#### GET /letters/:id
Get letter details

#### POST /letters/:id/file
Upload letter file (photo/video)

#### PUT /letters/:id/status
Update letter status
```json
Request:
{
  "status": "delivered",
  "notes": "Letter sent to sponsor"
}
```

#### GET /letters/pending
Get pending letters requiring response

---

### 12. Files

#### POST /files/upload
Upload file
```
Content-Type: multipart/form-data
Fields:
- file: file
- entityType: string
- entityId: uuid
- fileType: string
- description: string
```

#### GET /files
Get files
```
Query Params:
- entityType: string
- entityId: uuid
- fileType: string
```

#### GET /files/:id
Get file details

#### DELETE /files/:id
Delete file

#### GET /files/:id/download
Download file

---

### 13. Events

#### GET /events
Get events
```
Query Params:
- isPublic: boolean
- communityId: uuid
- status: string
- startDate: date
- endDate: date
```

#### POST /events (Admin/Staff)
Create event
```json
Request:
{
  "title": "Community Gathering",
  "description": "Monthly community meeting",
  "eventType": "community",
  "eventDate": "2024-02-15",
  "endDate": "2024-02-15",
  "location": "Community Center",
  "communityId": "uuid",
  "isPublic": true
}
```

#### GET /events/:id
Get event details

#### PUT /events/:id
Update event

#### POST /events/:id/cover-image
Upload event cover image

#### POST /events/:id/gallery
Upload event gallery images

#### PUT /events/:id/summary
Add event summary after completion

---

### 14. Tasks

#### GET /tasks
Get tasks
```
Query Params:
- assignedTo: uuid
- status: string
- taskType: string
- priority: string
- dueDate: date
```

#### POST /tasks (Admin)
Create task
```json
Request:
{
  "title": "Submit Q1 Budget",
  "description": "Prepare and submit budget for Q1",
  "taskType": "budget",
  "priority": "high",
  "assignedTo": "uuid",
  "relatedEntityType": "family",
  "relatedEntityId": "uuid",
  "dueDate": "2024-01-31"
}
```

#### GET /tasks/:id
Get task details

#### PUT /tasks/:id/status
Update task status
```json
Request:
{
  "status": "completed"
}
```

#### POST /tasks/:id/cancel (Admin)
Cancel task
```json
Request:
{
  "cancellationReason": "No longer needed",
  "adminComments": "Budget already submitted"
}
```

#### GET /tasks/overdue
Get overdue tasks

---

### 15. Notifications

#### GET /notifications
Get user notifications
```
Query Params:
- isRead: boolean
- notificationType: string
- page: number
- limit: number
```

#### GET /notifications/unread-count
Get unread notification count

#### PUT /notifications/:id/read
Mark notification as read

#### PUT /notifications/read-all
Mark all notifications as read

#### DELETE /notifications/:id
Delete notification

---

### 16. Dashboard & Analytics

#### GET /dashboard/staff
Get staff dashboard data
```json
Response:
{
  "totalFamilies": 25,
  "totalChildren": 68,
  "sponsoredChildren": 52,
  "pendingTasks": 5,
  "overdueReports": 2,
  "recentActivities": [...],
  "upcomingEvents": [...],
  "pendingLetters": 3
}
```

#### GET /dashboard/admin
Get admin dashboard data
```json
Response:
{
  "totalCommunities": 12,
  "totalFamilies": 450,
  "totalChildren": 1200,
  "totalSponsored": 980,
  "totalStaff": 25,
  "pendingApprovals": 15,
  "systemAlerts": [...],
  "recentActivities": [...],
  "monthlyStatistics": {...}
}
```

#### GET /analytics/community/:id
Get community analytics

#### GET /analytics/staff/:id
Get staff performance analytics

#### GET /reports/export
Export various reports (Admin)
```
Query Params:
- reportType: string
- format: 'pdf' | 'excel' | 'csv'
- startDate: date
- endDate: date
- filters: json
```

---

### 17. Public API (No Auth Required)

#### GET /public/statistics
Get public statistics
```json
Response:
{
  "totalFamiliesSupported": 450,
  "totalChildrenSponsored": 980,
  "communitiesReached": 12,
  "activeVolunteers": 45
}
```

#### GET /public/events
Get public events

#### GET /public/success-stories
Get success stories

#### POST /public/contact
Submit contact form
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I would like to know more..."
}
```

---

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes
- Authenticated endpoints: 1000 requests per 15 minutes
- File uploads: 50 requests per hour

## Error Codes

- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Unauthorized access
- `VAL_001`: Validation error
- `NOT_FOUND`: Resource not found
- `FORBIDDEN`: Access forbidden
- `SERVER_ERROR`: Internal server error
- `RATE_LIMIT`: Rate limit exceeded

## WebSocket Events (Real-time Notifications)

Connect to: `ws://localhost:5000`

### Events:
- `notification:new` - New notification received
- `task:assigned` - New task assigned
- `letter:received` - New letter from sponsor
- `budget:reviewed` - Budget reviewed by admin
- `task:cancelled` - Task cancelled by admin

### Client Events:
- `notification:read` - Mark notification as read
- `typing` - User typing indicator
