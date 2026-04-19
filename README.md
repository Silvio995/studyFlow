# StudyFlow

StudyFlow is a frontend-only study planner built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. It helps students manage tasks and subjects in a clean, beginner-friendly interface. The app has **no backend** and uses browser `localStorage` for persistence.

## Screenshots

![StudyFlow Home](public/screenshots/home.png)
![StudyFlow Tasks](public/screenshots/tasks.png)
![StudyFlow Subjects](public/screenshots/subjects.png)
![StudyFlow About](public/screenshots/about.png)

## Features

- Add, edit, complete, and delete tasks
- Add custom study subjects
- Select a subject when creating or editing a task
- Delete subjects only when they have no tasks
- Filter tasks by subject and status
- Sort tasks by due date, priority, or newest
- View task statistics
- View progress by subject
- Toggle between Light and Dark theme
- Persist tasks, subjects, and theme in `localStorage`

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React
- Browser localStorage (no backend)

## Pages Overview

- `/` (Home): Minimal overview and quick navigation
- `/tasks`: Main dashboard for task management (form, filters, stats, list)
- `/subjects`: Subject management and subject progress cards
- `/about`: Project purpose, stack, and learning outcomes

## Data Persistence

StudyFlow stores data in the browser:

- Tasks: `studyflow.tasks`
- Subjects: `studyflow.subjects`
- Theme: `studyflow.theme`

Notes:

- The app has no backend and no database.
- `task.subject` remains a **string** for simplicity.
- Subjects are merged from saved subjects and existing task subjects, so demo/legacy tasks still work.

## Subject Management

- Users can add custom subjects from the Subjects page.
- Task forms use a subject dropdown based on available subjects.
- A subject can be deleted **only if it has zero tasks**.
- Subjects with existing tasks cannot be deleted to avoid orphan task data.
- If a subject has linked tasks, the app shows a clear blocking message.

## Theme Toggle

- A Light/Dark theme toggle is available in the navigation bar.
- Theme preference is saved in `localStorage` under `studyflow.theme`.
- The selected theme is applied on reload.

## How to Run Locally

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
```

Then open `http://localhost:3000`.

## Project Structure

```text
studyflow/
├─ public/
│  └─ screenshots/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ tasks/page.tsx
│  │  ├─ subjects/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ layout.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ TaskForm.tsx
│  │  ├─ TaskFilters.tsx
│  │  ├─ TaskStats.tsx
│  │  ├─ TaskList.tsx
│  │  ├─ TaskCard.tsx
│  │  └─ layout/
│  │     ├─ SiteNav.tsx
│  │     └─ SiteFooter.tsx
│  ├─ lib/
│  │  └─ storage.ts
│  └─ types/
│     └─ task.ts
└─ package.json
```

## What I Learned

- How to structure a small Next.js App Router project
- How to build reusable React components for CRUD flows
- How to persist app state with `localStorage`
- How to keep UI simple and presentation-friendly
- How to add safe feature constraints (for example, protected subject deletion)

## Future Improvements

- Add due-date reminders (frontend notifications)
- Add optional task notes
- Add subject color tags
- Add export/import of local data (JSON)
- Add basic test coverage for storage and UI behavior
