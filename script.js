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
          startTimer();
        }, 1000); // Delay alert by 1 second to allow alarm to play
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
        startTimer();
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
  const taskText = taskInput.value.trim();

  if (taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Selesai";
    completeBtn.onclick = () => {
      li.classList.toggle("completed");
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    document.getElementById("task-list").appendChild(li);
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
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Selesai";
    completeBtn.onclick = () => {
      li.classList.toggle("completed");
      saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    document.getElementById("task-list").appendChild(li);
  });
}

window.onload = () => {
  loadTasks();
  updateDisplay();
};
