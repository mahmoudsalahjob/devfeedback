# 🚀 DevFeedback & Roadmap Board

> A modern, full-stack micro-SaaS platform where product teams create public feedback boards for users to submit feature requests, vote on ideas, track progress via a Kanban roadmap, and participate in discussions.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.10-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)

---

## ✨ Key Features

- **🔐 GitHub OAuth Authentication:** Secure sign-in and sign-out integration via Auth.js (NextAuth v5) and Prisma adapter.
- **💡 Submitting New Ideas:** Intuitive form to submit suggestions with title, rich description, and category classification (*Feature*, *Bug*, *Improvement*).
- **📋 Feedback Board & Feed:** Responsive card feed displaying suggestions with category badges, author profiles, and real-time vote/comment counters.
- **🔍 Filtering & Sorting:** Instant category filtering and sorting by *Newest* or *Top Voted*.
- **⭐ Upvoting System:** One-vote-per-user system with optimistic UI updates and robust uniqueness enforcement.
- **🗺️ Public Roadmap Kanban Board:** Interactive multi-column board categorizing product items across *Planned*, *In-Progress*, and *Live*.
- **💬 Comments & Discussions:** Threaded comment system on individual feedback pages (`/feedback/[id]`) for community feedback and team updates.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Actions, Turbopack)
- **UI Library:** React 19
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL & Prisma ORM (`@prisma/client`, `@prisma/adapter-pg`)
- **Authentication:** Auth.js v5 (`next-auth`) with GitHub provider
- **Styling:** Tailwind CSS v4

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL database instance

### 1. Clone the repository
```bash
git clone https://github.com/mahmoudsalahjob/devfeedback.git
cd devfeedback
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/devfeedback?schema=public"
AUTH_SECRET="your-auth-secret-key-here"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

### 4. Push Prisma Schema to Database
```bash
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
