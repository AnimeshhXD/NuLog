// --- LOCALSTORAGE HELPERS ---
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodos() {
  const td = JSON.parse(localStorage.getItem("todos"));
  return Array.isArray(td) ? td : [];
}
function savePomodoro() {
  localStorage.setItem("pomodoro", JSON.stringify({ time, isPaused }));
}
function loadPomodoro() {
  const pd = JSON.parse(localStorage.getItem("pomodoro"));
  if (pd?.time !== undefined) {
    time = pd.time;
    isPaused = pd.isPaused;
  }
}

// --- TO-DO & DATE-PLANNER ---
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const listEl = document.getElementById("todo-list");
let todos = loadTodos();

function renderTodos() {
  listEl.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.text} <small>(${t.date || "No date"})</small>`;
    const del = document.createElement("span");
    del.textContent = " ❌";
    del.style.cursor = "pointer";
    del.onclick = () => {
      todos.splice(i,1);
      saveTodos(); renderTodos();
    };
    li.appendChild(del);
    listEl.appendChild(li);
  });
}
input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim()) {
    todos.push({ text: input.value.trim(), date: dateInput.value });
    saveTodos(); renderTodos();
    input.value = ""; dateInput.value = "";
  }
});
renderTodos();

// --- POMODORO WITH SOUND & NOTIFICATION ---
let time = 25 * 60;
let interval = null;
let isPaused = false;
const alarm = document.getElementById("alarm");

function formatTime(sec) {
  const m = Math.floor(sec/60), s = sec%60;
  return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}
function updateDisplay() {
  document.getElementById("timer").textContent = formatTime(time);
}
function notifyUser() {
  if (Notification.permission === "granted") {
    new Notification("Pomodoro Done!", { body: "Take a break 😊" });
  }
}

function startTimer() {
  if (interval || time === 0) return;
  interval = setInterval(() => {
    if (--time <= 0) {
      clearInterval(interval); interval = null;
      alarm.play(); notifyUser();
    }
    updateDisplay(); savePomodoro();
  }, 1000);
}

function pauseTimer() {
  if (interval) {
    clearInterval(interval); interval = null; isPaused = true;
    document.querySelector(".pause").textContent = "Resume";
  } else if (isPaused) {
    startTimer(); isPaused = false;
    document.querySelector(".pause").textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(interval); interval = null;
  time = 25 * 60; isPaused = false; updateDisplay();
  document.querySelector(".pause").textContent = "Pause";
  savePomodoro();
}
updateDisplay();
loadPomodoro();
updateDisplay();
if (isPaused) document.querySelector(".pause").textContent = "Resume";
Notification.requestPermission();
savePomodoro();

// weather
 async function getWeather() {
  const apiKey = "AJTWBE6ACRJWX8CHACXTWDPVB";

  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = pos.coords;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/today?unitGroup=metric&key=${apiKey}&contentType=json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();
    const weather = data.days[0];

    const icons = {
      "Clear": "☀️",
      "Rain": "🌧️",
      "Cloudy": "☁️",
      "Partially cloudy": "⛅",
      "Overcast": "☁️",
      "Snow": "❄️",
      "Thunderstorm": "⛈️",
      "Fog": "🌫️"
    };
    const emoji = icons[weather.conditions] || "🌤️";

    document.getElementById("weather-info").innerHTML = `
      📍 <strong>${data.resolvedAddress}</strong><br>
      ${emoji} <strong>${weather.temp}°C</strong> (Feels like ${weather.feelslike}°C)<br>
      🌬️ Wind: ${weather.windspeed} km/h<br>
      💧 Humidity: ${weather.humidity}%
    `;
  } catch (err) {
    console.error("Weather Error:", err);
    document.getElementById("weather-info").textContent = "❌ Unable to load weather.";
  }
}
getWeather();



// --- QUOTE OF THE DAY ---
async function getQuote() {
  try {
    const r = await fetch("https://api.quotable.io/random");
    const d = await r.json();
    document.getElementById("quote").textContent = `"${d.content}"`;
    document.getElementById("author").textContent = `— ${d.author}`;
  } catch {
    document.getElementById("quote").textContent = "Could not fetch quote.";
  }
}
getQuote();
