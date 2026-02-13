# QueueFlow Pro

A modern, frontend-first queue management application built with **React + Vite** and styled with **Tailwind CSS**.

QueueFlow Pro helps teams track customer flow in real time with a clean, dashboard-like interface for adding customers, updating service status, and monitoring queue health.

---

## ✨ Features

- **Live queue tracking** with status transitions:
  - `waiting` → `serving` → `completed`
- **Quick customer intake** form with service selection
- **Operational stats cards** (total, waiting, serving)
- **Instant actions**:
  - Start serving
  - Mark complete
  - Remove customer
- **Modern UI** with gradient glassmorphism and responsive layout

---

## 🧱 Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS 4**
- **React Icons**
- **ESLint 9**

---

## 🌐 Live Demo

Live URL: https://queue-management-five.vercel.app/

---

## 📦 Repository

- **GitHub**: [`https://github.com/Dadir-Dev/queue-management`](https://github.com/Dadir-Dev/queue-management)

---

## 🖼️ Screenshots

Desktop layout:

![QueueFlow Pro – Desktop](src/assets/Screenshot%20Desktop%20Design%202026-02-12.png)

Mobile layout:

![QueueFlow Pro – Mobile](src/assets/Screenshot%20Mobile%20Design%202026-02-12.png)

---

## 📬 Contact

For questions, feedback, or bug reports:

🧱 [Frontend Mentor](https://www.frontendmentor.io/profile/Dadir-Dev)

🌐 [GitHub](https://github.com/Dadir-Dev)

💼 [LinkedIn](https://www.linkedin.com/in/abdikadir-mohammed-54717318b/)

---

## 🙏 Acknowledgements

- **React**, **Vite**, **Tailwind CSS**, and **React Icons** for the amazing tooling ecosystem.
- The broader **React community** and documentation for best practices and inspiration.
- Created as part of a **frontend learning journey** focused on modern React and UI design.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** 9+

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the local URL shown in your terminal (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```text
.
├── src/
│   ├── components/
│   │   ├── QueueForm.jsx       # Customer intake form
│   │   └── QueueDisplay.jsx    # Queue list + status/action controls
│   ├── App.jsx                 # Main app state and layout
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔄 Queue Workflow

1. Add a customer and choose a service.
2. Customer enters the queue with `waiting` status.
3. Move to `serving` when service starts.
4. Mark as `completed` when done.
5. Remove entries from the list when no longer needed.

---

## 🛠️ Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start local development server   |
| `npm run build`   | Create production build          |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint checks                |

---

## 📌 Current Scope

This project is currently a **client-side application** (no backend persistence).

Potential next steps:

- Add API + database persistence
- Add authentication/roles (admin, staff)
- Add estimated wait times and analytics
- Add tests (unit + integration + E2E)

---

## 🤝 Contributing

Contributions are welcome.

If you plan to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear summary and screenshots (for UI changes)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
