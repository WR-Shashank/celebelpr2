# Celebal-Assignment-2

A functional To-Do List application built with React and TypeScript.

👉 **[Live Demo](#)** (Replace `#` with your actual deployed link if applicable)

---

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Validate task input (min. 3 characters, max. 120)
- Filter tasks (All, Completed, Incomplete)
- Sort tasks by:
  - Date (Newest/Oldest)
  - Importance
  - Alphabetically
- Data persists in `localStorage`

---

## Installation

```bash
git clone https://github.com/WR-Shashank/celebelpr2.git
cd project
npm install
npm run dev

  Usage
	1.Add Task: Type a task and click Add
	2.Complete Task: Click the checkbox to toggle completion
	3.Delete Task: Click the 🗑️ icon to remove a task
	4.Filter & Sort: Use dropdowns to filter by status or sort by priority/date
  Testing Guidance
	•	Try adding short/blank tasks → It should show validation error
	•	Add multiple tasks with different importance levels
	•	Mark some as completed
	•	Refresh page → The tasks should persist (via localStorage)
	•	Try different filters and sorting options
  Technologies Used
	•	React
	•	TypeScript
	•	Tailwind CSS
	•	localStorage
