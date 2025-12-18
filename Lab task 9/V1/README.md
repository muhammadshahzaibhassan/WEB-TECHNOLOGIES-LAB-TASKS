# To-Do List Web App

A simple, dynamic to-do list application built with **HTML, CSS, and JavaScript** using **DOM manipulation** and **localStorage** for persistence.

## 🚀 Features

* Add new tasks
* Edit tasks inline (contentEditable)
* Delete tasks
* Mark tasks as complete (checkbox)
* Persistent storage via `localStorage`
* Keyboard accessibility (`Enter` to add tasks)
* Clean, minimal UI

## 📂 Project Structure

```
index.html   # Main application file
```

## ▶️ How to Run

1. Open the project folder in **VS Code**.
2. Right‑click `index.html` → **"Open with Live Server"**.
3. The app will launch in your browser.

## 💡 How It Works

* All tasks are stored in a JavaScript array.
* The array is synced to `localStorage` using `JSON.stringify()`.
* On page load, tasks are restored using `JSON.parse()`.
* DOM elements are dynamically created for each task.

## 📸 Screenshots (optional)

Add screenshots of your app here.

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (DOM API, localStorage)
* VS Code + Live Server

## 📜 License

You may use, modify, or extend this project freely.
