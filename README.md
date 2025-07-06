# 🚀 NuLog- Productivity Dashboard

**NuLog** is a sleek, responsive productivity dashboard built with pure **HTML, CSS, and JavaScript** — designed to help you focus better, plan smarter, and stay motivated.

> "Your all-in-one daily productivity sidekick."

---

## 🧠 Features

### ✅ To-Do List + Daily Planner
- Add and delete tasks
- Assign tasks to specific dates 📅
- Stores everything using `localStorage`

### 🍅 Pomodoro Timer
- 25-minute Pomodoro session timer
- **Pause, Resume, Reset** support
- Plays a **custom alarm sound** when session completes 🔔
- Sends a **browser notification** if permission is granted

### 🌦️ Weather Widget
- Uses **Visual Crossing Weather API**
- Automatically fetches your location
- Shows:
  - 🌡️ Temperature (and *Feels like*)
  - 🌬️ Wind speed
  - 💧 Humidity
  - 📍 Location
  - ☀️ Emoji icon based on weather condition

### 💬 Quote of the Day
- Fetches a new motivational quote every time you open the dashboard
- Powered by [Quotable API](https://api.quotable.io)

---

## 🛠 Tech Stack

- **HTML5**
- **CSS3** (Flexbox + Responsive)
- **JavaScript (ES6+)**
- APIs:
  - [Visual Crossing Weather](https://www.visualcrossing.com/)
  - [Quotable.io](https://api.quotable.io)

---

## 📂 Folder Structure
```
📁 NuLog/
├── index.html
├── styles.css
├── script.js
├── ding.mp3 # Alarm for Pomodoro
└── README.md
```

## 🔧 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/AnimeshhXD/NuLog.git
   cd NuLog
   
Replace the YOUR_API_KEY in script.js with your actual Visual Crossing API key

Run the project using Live Server or any static file server:
npx live-server
Grant browser permission for
Location (for weather)
Notifications (for Pomodoro)

## 👨‍💻 Author
[Animesh Sharma](github.com/AnimeshhXD)
Made with ❤️ for focus and flow.

## 📸 Preview
![image](https://github.com/user-attachments/assets/61e943a5-7fe2-42c8-9bc7-7ae3c106c568)


## 📄 License
MIT © 2025 Animesh Sharma
