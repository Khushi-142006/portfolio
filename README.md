# Premium Full-Stack Portfolio: Khushi Gadyal

This is a production-ready, highly professional full-stack personal portfolio website designed for recruiters and hiring managers. It features a minimalist modern user interface inspired by Linear, Stripe, and Vercel, paired with a clean Model-View-Controller (MVC) inspired backend architecture.

## 🚀 Key Features
- **Modern UI/UX:** Clean, elegant dark-theme design utilizing Inter/Geist typography, generous padding based on an 8px grid system, rounded corners, subtle glows, and glassmorphic navigation header.
- **Micro-interactions:** Restrained, smooth animations powered by Framer Motion, and a custom typewriter role animation in the Hero section.
- **MVC Architecture:** Structured backend using routes, controllers, middleware, and data layers to isolate application concerns.
- **Fail-safe API client:** Reusable frontend API client that consumes Node.js/Express REST endpoints, complete with localized offline fallbacks if the server is offline.
- **MongoDB Ready:** Built to facilitate seamless database integration later; transitioning from hardcoded files to database queries requires edits ONLY in the backend model/controllers.
- **Mono-repo Dev Tooling:** Root-level scripts allowing concurrent client/server execution using `concurrently`.

---

## 🛠 Tech Stack
- **Frontend:** React.js (Vite template), Framer Motion, Lucide React icons, CSS3 variables.
- **Backend:** Node.js, Express.js router & controllers, Morgan (HTTP request logger), CORS middleware, Dotenv config.

---

## 📂 Project Structure

```text
khushi-gadyal-portfolio/
├── backend/                  # Node.js + Express backend app
│   ├── src/
│   │   ├── controllers/      # MVC request controllers
│   │   │   ├── portfolio.controller.js
│   │   │   └── contact.controller.js
│   │   ├── data/             # Hardcoded mock database files
│   │   │   ├── profile.js
│   │   │   ├── projects.js
│   │   │   ├── skills.js
│   │   │   ├── experience.js
│   │   │   ├── certifications.js
│   │   │   └── socialLinks.js
│   │   ├── routes/           # Express endpoint router mappings
│   │   │   └── api.routes.js
│   │   ├── app.js            # Middleware configs & routing grouping
│   │   └── server.js         # HTTP server entry point
│   ├── .env                  # Backend port & env configurations
│   └── package.json
│
├── frontend/                 # Vite + React.js SPA frontend
│   ├── src/
│   │   ├── components/       # High fidelity modular parts
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/         # Native fetch API integrations
│   │   │   └── api.js
│   │   ├── App.jsx           # Section layouts, loading states, trackers
│   │   ├── App.css           # Styling styles
│   │   ├── index.css         # Reset directives, theme variables, fonts
│   │   └── main.jsx
│   ├── .env                  # Client API environment variables
│   └── package.json
│
├── package.json              # Monorepo configuration scripts
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (Node Package Manager)

### Step 1: Install Dependencies
From the root directory, run the helper command to install dependencies for the root, frontend, and backend packages:
```bash
npm run install:all
```

### Step 2: Configure Environment Variables
Verify that the `.env` configuration files exist in their respective directories.

**Backend (`backend/.env`):**
```ini
PORT=5000
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```ini
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run the Application
Run the root-level development script, which starts the Express backend and Vite frontend concurrently:
```bash
npm run dev
```

- **Frontend client:** [http://localhost:5173](http://localhost:5173)
- **Backend server:** [http://localhost:5000](http://localhost:5000)
- **API Health endpoint:** [http://localhost:5000/health](http://localhost:5000/health)

---

## 🛰 REST API Documentation

All request URLs are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile` | Retrieves main bio details, summary achievements, and statistics. |
| `GET` | `/projects` | Retrieves list of 8+ core software case studies. |
| `GET` | `/skills` | Retrieves sorted capabilities and competencies. |
| `GET` | `/experience` | Retrieves work experience and academic timelines. |
| `GET` | `/certifications` | Retrieves professional qualifications (AWS, GCP, etc.). |
| `GET` | `/social-links` | Retrieves contact links (email, phone, socials). |
| `POST` | `/contact` | Submits validation details, logs information, returns HTTP 201. |

**Example POST Payload to `/api/contact`:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "We would love to interview you for a Senior Full Stack Engineer role!"
}
```

---

## 💾 Migration to MongoDB & Mongoose

To migrate this mock ledger to a live MongoDB instance in the future, follow this path:

1. **Install Mongoose:**
   ```bash
   cd backend
   npm install mongoose
   ```
2. **Define Schemas:**
   Create a folder `backend/src/models/` and build standard schemas:
   ```javascript
   // backend/src/models/Project.js
   import mongoose from 'mongoose';
   
   const projectSchema = new mongoose.Schema({
     title: { type: String, required: true },
     description: { type: String, required: true },
     image: String,
     technologies: [String],
     githubUrl: String,
     liveUrl: String,
     status: String,
     architecture: [String],
     category: String
   });
   
   export default mongoose.model('Project', projectSchema);
   ```
3. **Connect to Database:**
   Update `backend/src/server.js` or `app.js` to establish connection with MongoDB URI stored in `backend/.env`.
4. **Update Controllers:**
   Modify retrieval logic inside `backend/src/controllers/portfolio.controller.js` to query MongoDB:
   ```javascript
   // OLD: import projectsData from "../data/projects.js";
   // NEW:
   import Project from "../models/Project.js";
   
   export const getProjects = async (req, res, next) => {
     try {
       const projects = await Project.find();
       res.json(projects);
     } catch (error) {
       next(error);
     }
   };
   ```
   *No modifications are required in the frontend application because the endpoint schema and return properties match exactly.*
