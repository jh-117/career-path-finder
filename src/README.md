# Career Path Finder - Full App UI

A modern, clean, interactive career development web app with User and Admin roles.

## 🎨 Design System

- **Colors**: White, soft grey, subtle purple/blue gradients
- **Style**: Soft, futuristic, minimal aesthetic
- **Layout**: Card-based (no tables), clean sections, dynamic visuals
- **Components**: Rounded corners (12-16px), soft shadows, lots of whitespace

## 🚀 Getting Started

The app starts at `/signup` by default. You can navigate between:
- **User Portal**: `/signup` or `/login`
- **Admin Portal**: `/admin/login`

## 👤 User Flow

1. **Sign Up** (`/signup`)
   - Enter name, department, current role, email, password
   - Link to login page or admin portal

2. **Onboarding** (`/onboarding`)
   - Confirmation page showing user info
   - Proceed to strength discovery

3. **Strength Discovery** (`/strength-discovery`)
   - 5 interactive sections:
     - Top 5 Technical Skills (multi-tag input)
     - Top 5 Soft Skills (multi-tag input)
     - Top 5 Future Career Interests (multi-tag input)
     - Work Style Preference (pill buttons)
     - Upload Supporting Documents (file upload)

4. **AI Analysis** (`/ai-analysis`)
   - AI disclosure notice (Big Five Personality Traits)
   - Dynamic visualizations:
     - Radar/Spider Chart (skills overview)
     - Branching Skill Map (skill connections)
   - AI Strength Summary (personality, advantages, tendencies)
   - Recommended Career Paths (3 role cards with match scores)

5. **Role Details** (`/role/:id`)
   - Full role information and match score
   - Key responsibilities
   - Required skills with match indicators
   - Career progression path
   - Supporting documents
   - "Apply for Role" button (confirmation dialog)

6. **Downloadable Report** (`/download-report`)
   - Mock PDF layout preview
   - All charts and analysis
   - 60-day action plan
   - Download button

## 🔧 Admin Flow

1. **Admin Login** (`/admin/login`)
   - Dedicated admin authentication
   - Link back to user portal

2. **Add Role** (`/admin/add-role`)
   - Role information form
   - Skills requirements (tag inputs)
   - Timeline settings (start, end, deadline)
   - Supporting documents upload
   - Automatic reminder notification (2 weeks before deadline)

3. **Manage Roles** (`/admin/manage-roles`)
   - Stats dashboard (total roles, applicants, urgent deadlines)
   - Role cards grid layout (no tables)
   - Spotlight indicator for approaching deadlines (≤14 days)
   - Each card shows:
     - Role title and department
     - Number of applicants
     - Deadline countdown
     - Timeline

4. **Role Detail** (`/admin/role/:id`)
   - Left sidebar: Role information, stats, skills, documents
   - Right panel: Applicant cards grid
   - Click applicant card to view details

5. **Applicant Detail** (`/admin/applicant/:id`)
   - Full applicant profile with contact info
   - Match score display
   - Uploaded documents (CV, portfolio, etc.)
   - Skill match breakdown (with indicators)
   - Visual analytics:
     - Skills Radar Chart
     - Strength Map
   - AI-Generated Insights:
     - Personality profile
     - Top advantage
     - Fit-to-role explanation
   - Action buttons:
     - "Connect With Applicant"
     - "Download Applicant Report"

## 🎯 Key Features

- **Dynamic Charts**: Radar charts and skill maps using Recharts and Canvas
- **Tag Inputs**: Multi-tag input with keyboard support (Enter/comma to add)
- **File Upload**: Drag & drop style upload with preview
- **Match Scoring**: Color-coded match scores (green >85%, blue >70%, purple <70%)
- **Deadline Alerts**: Spotlight indicator for urgent deadlines
- **Responsive Cards**: Hover effects and smooth transitions
- **Mock Data**: Fully functional with demonstration data

## 📱 Navigation Quick Links

From any page:
- User sign up → `/signup`
- User login → `/login`
- Admin login → `/admin/login`
- AI Analysis (demo) → `/ai-analysis`
- Manage Roles (admin) → `/admin/manage-roles`

## 💡 Interactive Elements

- Click role cards → View role details
- Click applicant cards → View applicant profile
- Apply button → Confirmation dialog
- File upload → Click or drag & drop
- Tag input → Type and press Enter
- Work style → Click to select
