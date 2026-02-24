let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsBody = document.getElementById("lapsBody");

function formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0")
    );
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = "Stop";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    running = false;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    lapsBody.innerHTML = "";
}

function addLap() {
    if (!running) return;

    lapCount++;

    let lapTime = elapsedTime - lastLapTime;
    lastLapTime = elapsedTime;

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${lapCount}</td>
        <td>${formatTime(lapTime)}</td>
        <td>${formatTime(elapsedTime)}</td>
    `;

    lapsBody.prepend(row);
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
