// Pomodoro Timer
let timer;
let isRunning = false;
let isStudyTime = true;
let studyTime = 25 * 60; // default 25 minutes
let breakTime = 5 * 60; // default 5 minutes
let timeLeft = studyTime;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isStudyTime = true;
  studyTime = document.getElementById("study-time").value * 60;
  breakTime = document.getElementById("break-time").value * 60;
  timeLeft = studyTime;
  updateDisplay();
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;

    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.play().catch((error) => {
      console.error("Error playing sound:", error);
    });

    setTimeout(() => {
      alert(
        isStudyTime
          ? "Waktu belajar selesai! Istirahat sebentar."
          : "Waktu istirahat selesai! Kembali belajar."
      );
      isStudyTime = !isStudyTime;
      timeLeft = isStudyTime ? studyTime : breakTime;
      updateDisplay();
    }, 1000);
  }
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

// To-Do List
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
      <span>${taskText}</span>
      <div class="flex space-x-2 mt-2">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onclick="toggleTaskCompleted(this)">Selesai</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteTask(this)">Hapus</button>
      </div>
    `;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
  }
}

function toggleTaskCompleted(button) {
  const li = button.closest("li");
  li.classList.toggle("completed");
  const span = li.querySelector("span");
  if (li.classList.contains("completed")) {
    span.style.color = "green";
  } else {
    span.style.color = "";
  }
  saveTasks();
}

function deleteTask(button) {
  const li = button.closest("li");
  li.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list .task-item").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks to avoid duplication
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="flex space-x-2 mt-2">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onclick="toggleTaskCompleted(this)">Selesai</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteTask(this)">Hapus</button>
      </div>
    `;
    if (task.completed) {
      li.classList.add("completed");
      li.querySelector("span").style.color = "green";
    }
    taskList.appendChild(li);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", loadTasks);
