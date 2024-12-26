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
    alarmSound
      .play()
      .then(() => {
        setTimeout(() => {
          alert(
            isStudyTime
              ? "Waktu belajar selesai! Istirahat sebentar."
              : "Waktu istirahat selesai! Kembali belajar."
          );
          isStudyTime = !isStudyTime;
          timeLeft = isStudyTime ? studyTime : breakTime;
          startTimer(); // Mulai timer lagi setelah waktu habis
        }, 1000); // Tunda alert 1 detik untuk memungkinkan alarm berbunyi
      })
      .catch((error) => {
        console.error("Error playing sound:", error);
        alert(
          isStudyTime
            ? "Waktu belajar selesai! Istirahat sebentar."
            : "Waktu istirahat selesai! Kembali belajar."
        );
        isStudyTime = !isStudyTime;
        timeLeft = isStudyTime ? studyTime : breakTime;
        startTimer(); // Mulai timer lagi setelah waktu habis
      });
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
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    const selesaiButton = document.createElement("button");
    selesaiButton.textContent = "Selesai";
    selesaiButton.className =
      "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600";
    selesaiButton.onclick = function () {
      li.classList.toggle("completed");
      saveTasks();
    };
    li.appendChild(selesaiButton);

    const hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.className =
      "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600";
    hapusButton.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };
    li.appendChild(hapusButton);

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    if (task.completed) li.classList.add("completed");

    const selesaiButton = document.createElement("button");
    selesaiButton.textContent = "Selesai";
    selesaiButton.className =
      "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600";
    selesaiButton.onclick = function () {
      li.classList.toggle("completed");
      saveTasks();
    };
    li.appendChild(selesaiButton);

    const hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.className =
      "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600";
    hapusButton.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };
    li.appendChild(hapusButton);

    taskList.appendChild(li);
  });
}

window.onload = () => {
  loadTasks();
};
