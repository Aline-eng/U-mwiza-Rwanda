# Database Schema - U'mwiza Rwanda

## Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Users     │────────>│ Communities  │<────────│  Families   │
│             │         │              │         │             │
│ - id        │         │ - id         │         │ - id        │
│ - email     │         │ - name       │         │ - community │
│ - role      │         │ - location   │         │ - status    │
│ - community │         │ - staff_id   │         └──────┬──────┘
└─────────────┘         └──────────────┘                │
                                                         │
                                                         v
                                                  ┌─────────────┐
                                                  │  Children   │
                                                  │             │
                                                  │ - id        │
                                                  │ - family_id │
                                                  │ - sponsor   │
                                                  └──────┬──────┘
                                                         │
                        ┌────────────────────────────────┼────────────────────────┐
                        │                                │                        │
                        v                                v                        v
                ┌───────────────┐              ┌──────────────────┐      ┌────────────────┐
                │ Health Records│              │ Education Records│      │  Transactions  │
                └───────────────┘              └──────────────────┘      └────────────────┘
```

## Complete Database Schema

### 1. users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff')),
  community_id UUID REFERENCES communities(id),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_community ON users(community_id);
```

### 2. refresh_tokens
```sql
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

### 3. communities
```sql
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  location VARCHAR(255) NOT NULL,
  district VARCHAR(100),
  sector VARCHAR(100),
  cell VARCHAR(100),
  village VARCHAR(100),
  description TEXT,
  staff_id UUID REFERENCES users(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  total_families INTEGER DEFAULT 0,
  total_children INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_communities_staff ON communities(staff_id);
CREATE INDEX idx_communities_location ON communities(district, sector);
```

### 4. families
```sql
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES communities(id),
  family_code VARCHAR(50) UNIQUE NOT NULL,
  father_name VARCHAR(100),
  father_age INTEGER,
  father_occupation VARCHAR(100),
  mother_name VARCHAR(100),
  mother_age INTEGER,
  mother_occupation VARCHAR(100),
  guardian_name VARCHAR(100),
  guardian_relationship VARCHAR(50),
  address TEXT,
  phone VARCHAR(20),
  total_children INTEGER DEFAULT 0,
  housing_type VARCHAR(50),
  income_level VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  enrollment_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_families_community ON families(community_id);
CREATE INDEX idx_families_code ON families(family_code);
CREATE INDEX idx_families_status ON families(status);
```

### 5. children
```sql
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  child_code VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
  photo_url TEXT,
  is_sponsored BOOLEAN DEFAULT false,
  sponsor_id UUID REFERENCES sponsors(id),
  sponsorship_start_date DATE,
  grade_level VARCHAR(50),
  school_name VARCHAR(200),
  interests TEXT,
  dreams TEXT,
  special_needs TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_children_family ON children(family_id);
CREATE INDEX idx_children_sponsor ON children(sponsor_id);
CREATE INDEX idx_children_code ON children(child_code);
CREATE INDEX idx_children_status ON children(status);
```

### 6. sponsors
```sql
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_code VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(100),
  address TEXT,
  sponsor_type VARCHAR(50) CHECK (sponsor_type IN ('individual', 'family', 'organization')),
  start_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sponsors_code ON sponsors(sponsor_code);
CREATE INDEX idx_sponsors_email ON sponsors(email);
```

### 7. health_records
```sql
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  record_date DATE NOT NULL,
  record_type VARCHAR(50) CHECK (record_type IN ('checkup', 'vaccination', 'illness', 'hospital_visit', 'chronic_condition')),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medications TEXT,
  hospital_name VARCHAR(200),
  doctor_name VARCHAR(100),
  follow_up_date DATE,
  document_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_health_child ON health_records(child_id);
CREATE INDEX idx_health_date ON health_records(record_date);
CREATE INDEX idx_health_type ON health_records(record_type);
```

### 8. education_records
```sql
CREATE TABLE education_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  academic_year VARCHAR(20) NOT NULL,
  term VARCHAR(20) NOT NULL,
  grade_level VARCHAR(50) NOT NULL,
  school_name VARCHAR(200) NOT NULL,
  attendance_percentage DECIMAL(5, 2),
  overall_grade VARCHAR(10),
  overall_percentage DECIMAL(5, 2),
  rank_in_class INTEGER,
  total_students INTEGER,
  teacher_name VARCHAR(100),
  teacher_comments TEXT,
  subjects JSONB,
  report_card_url TEXT,
  achievements TEXT,
  challenges TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_education_child ON education_records(child_id);
CREATE INDEX idx_education_year ON education_records(academic_year);
CREATE INDEX idx_education_term ON education_records(term);
```

### 9. transactions
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_code VARCHAR(50) UNIQUE NOT NULL,
  child_id UUID NOT NULL REFERENCES children(id),
  sponsor_id UUID NOT NULL REFERENCES sponsors(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RWF',
  transaction_date DATE NOT NULL,
  transaction_type VARCHAR(50) CHECK (transaction_type IN ('sponsorship', 'donation', 'scholarship', 'emergency')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'disbursed', 'cancelled')),
  payment_method VARCHAR(50),
  reference_number VARCHAR(100),
  notes TEXT,
  confirmed_by UUID REFERENCES users(id),
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_child ON transactions(child_id);
CREATE INDEX idx_transactions_sponsor ON transactions(sponsor_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_status ON transactions(status);
```

### 10. budgets
```sql
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id),
  child_id UUID REFERENCES children(id),
  budget_period VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RWF',
  categories JSONB NOT NULL,
  explanation TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected', 'disbursed')),
  submitted_by UUID REFERENCES users(id),
  submitted_at TIMESTAMP,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  review_comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_budgets_family ON budgets(family_id);
CREATE INDEX idx_budgets_child ON budgets(child_id);
CREATE INDEX idx_budgets_status ON budgets(status);
CREATE INDEX idx_budgets_period ON budgets(budget_period);
```

### 11. action_plans
```sql
CREATE TABLE action_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id),
  year INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  goals JSONB NOT NULL,
  housing_improvements TEXT,
  education_improvements TEXT,
  health_improvements TEXT,
  income_improvements TEXT,
  community_involvement TEXT,
  milestones JSONB,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  progress_percentage INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_action_plans_family ON action_plans(family_id);
CREATE INDEX idx_action_plans_year ON action_plans(year);
CREATE INDEX idx_action_plans_status ON action_plans(status);
```

### 12. letters
```sql
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id),
  sponsor_id UUID NOT NULL REFERENCES sponsors(id),
  direction VARCHAR(20) NOT NULL CHECK (direction IN ('to_child', 'from_child')),
  letter_type VARCHAR(20) CHECK (letter_type IN ('text', 'video', 'photo', 'audio')),
  content TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  language VARCHAR(50),
  translated_content TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'read', 'replied')),
  sent_date DATE NOT NULL,
  delivered_date DATE,
  read_date DATE,
  handled_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_letters_child ON letters(child_id);
CREATE INDEX idx_letters_sponsor ON letters(sponsor_id);
CREATE INDEX idx_letters_direction ON letters(direction);
CREATE INDEX idx_letters_status ON letters(status);
```

### 13. files
```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  file_type VARCHAR(50) CHECK (file_type IN ('photo', 'video', 'document', 'report', 'letter')),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  thumbnail_url TEXT,
  description TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_files_entity ON files(entity_type, entity_id);
CREATE INDEX idx_files_type ON files(file_type);
CREATE INDEX idx_files_uploaded ON files(uploaded_by);
```

### 14. events
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) CHECK (event_type IN ('community', 'training', 'celebration', 'visit', 'other')),
  event_date DATE NOT NULL,
  end_date DATE,
  location VARCHAR(255),
  community_id UUID REFERENCES communities(id),
  is_public BOOLEAN DEFAULT false,
  cover_image_url TEXT,
  gallery_urls JSONB,
  attendees INTEGER,
  summary TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_community ON events(community_id);
CREATE INDEX idx_events_public ON events(is_public);
CREATE INDEX idx_events_status ON events(status);
```

### 15. tasks
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  task_type VARCHAR(50) CHECK (task_type IN ('budget', 'report', 'education_record', 'health_record', 'letter_response', 'action_plan', 'other')),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'overdue')),
  assigned_to UUID NOT NULL REFERENCES users(id),
  assigned_by UUID REFERENCES users(id),
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  due_date DATE,
  completed_at TIMESTAMP,
  cancellation_reason TEXT,
  admin_comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due ON tasks(due_date);
CREATE INDEX idx_tasks_type ON tasks(task_type);
```

### 16. notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  notification_type VARCHAR(50) CHECK (notification_type IN ('task', 'letter', 'alert', 'approval', 'system')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

### 17. audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
```

### 18. system_settings
```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50),
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON system_settings(setting_key);
```

### 19. statistics
```sql
CREATE TABLE statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date DATE NOT NULL,
  total_families INTEGER DEFAULT 0,
  total_children INTEGER DEFAULT 0,
  total_sponsored INTEGER DEFAULT 0,
  total_communities INTEGER DEFAULT 0,
  total_volunteers INTEGER DEFAULT 0,
  total_donations DECIMAL(12, 2) DEFAULT 0,
  active_staff INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_statistics_date ON statistics(stat_date);
```

## Database Relationships Summary

1. **Users → Communities** (One-to-Many): Staff assigned to communities
2. **Communities → Families** (One-to-Many): Families belong to communities
3. **Families → Children** (One-to-Many): Children belong to families
4. **Children → Sponsors** (Many-to-One): Children sponsored by sponsors
5. **Children → Health Records** (One-to-Many): Health history tracking
6. **Children → Education Records** (One-to-Many): Academic progress tracking
7. **Children → Transactions** (One-to-Many): Financial transactions
8. **Families → Budgets** (One-to-Many): Budget planning
9. **Families → Action Plans** (One-to-Many): Yearly planning
10. **Children → Letters** (One-to-Many): Sponsor correspondence
11. **Users → Tasks** (One-to-Many): Task assignments
12. **Users → Notifications** (One-to-Many): User notifications

## Data Integrity Rules

1. Soft deletes for critical entities (families, children)
2. Cascade deletes for dependent records
3. Foreign key constraints enforced
4. Check constraints for enums
5. Unique constraints on codes
6. Not null constraints on required fields
7. Default values for status fields
8. Timestamp tracking (created_at, updated_at)

## Indexing Strategy

- Primary keys (automatic)
- Foreign keys (explicit indexes)
- Frequently queried fields (status, dates)
- Search fields (codes, names)
- Composite indexes for common queries

## Backup Strategy

- Daily automated backups
- Point-in-time recovery enabled
- Backup retention: 30 days
- Weekly full backups
- Transaction log backups every 15 minutes
