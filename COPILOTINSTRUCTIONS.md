# 🤖 Copilot Instructions — The PlayerLobby

You are assisting in developing **The PlayerLobby**, a React-based social planning app that helps users organize hangouts, track attendees, and manage shared budgets.  
The focus is on clean design, modular structure, and AI-assisted budgeting logic.

---

🧩 Core Purpose (Your Final Version)

When generating or completing code:

Prioritize clarity, scalability, and readability.

Use React functional components and hooks.

Use React Router for navigation between pages (Home, Lobbies, Events, Budget, Profile).

Use standard CSS for styling — no Tailwind, no UI frameworks.

Theme: black background, white text, neon pink and lavender accents.

Keep animations and effects basic (CSS hover transitions, glows, fades).

Use Lucide React for icons.

Use Vite as the build setup.

# Stack Summary (Accurate to Your Usage)
Category	Tool	Purpose
Framework	React + Vite	Development and build
Routing	React Router DOM	Page navigation
Icons	Lucide React	Simple, modern icons
Styling	Regular CSS	Custom visuals and themes
Theme	Neon Cyber (Black / White / Pink / Lavender)	Aesthetic style

---

## 🧠 AI Assistant Logic
When creating components or features involving the AI assistant:
- The AI acts as a **friendly planning companion**.
- It estimates and splits costs for events (e.g., tickets, food, travel).
- Suggests **budget-friendly alternatives**.
- Saves data to a **spreadsheet** (via Google Sheets API or local JSON file).
- Keeps track of **upcoming events, attendees, and budgets**.
- Communicates in a **casual but helpful tone**.

---

## 🎨 Design Guidelines
When generating CSS or Tailwind classes:
- Base theme: `#000000` background, white text, neon pink (`#FF007A`) accents, and lavender (`#B57CFF`) highlights.
- Buttons: Rounded edges with glowing hover effects.
- Layout: Use flexbox or grid with even spacing.
- Typography: “Poppins” or “Inter”.
- Include smooth animations and hover states with Framer Motion.
- Ensure full **responsiveness** (desktop + mobile).

---

## ⚙️ Development Rules
- Organize files under:
  - `/components` — reusable UI elements  
  - `/pages` — major views (Home, Lobby, Events, Budget, Profile)  
  - `/hooks` — custom React logic  
  - `/assets` — images, icons, fonts  
- Use **clear, descriptive variable and function names**.
- Comment key logic blocks (especially AI cost calculations and spreadsheet updates).
- Avoid unnecessary dependencies or overcomplicated logic.

---

## 🧭 Copilot Guidance Examples
When user requests:
- “Create a lobby component” → Generate a responsive React component with Tailwind styling and animated join/create buttons.  
- “Add budgeting feature” → Include form inputs for expenses, attendee list, and AI-based cost calculation logic.  
- “Make this look cleaner” → Improve layout and spacing using Tailwind classes and Framer Motion transitions.  
- “Add navigation” → Use React Router to connect pages with a styled nav bar.  
- “Animate modal” → Apply Framer Motion for smooth fade or slide transitions.  

---

## 🎯 Goal
Build a visually striking, responsive, and AI-assisted event planning app that combines **style**, **functionality**, and **user-friendly interaction** — reflecting The PlayerLobby’s focus on connection, collaboration, and fun.