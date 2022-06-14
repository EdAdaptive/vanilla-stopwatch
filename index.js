let startTime = 0;
let pausedTime = 0;
let lapStartTime = 0;
let lapPausedTime = 0;
let isTiming = false;
let totalLaps = 0;

const stopwatchElement = document.getElementById("stopwatch");
const stopStartButton = document.getElementById("stop-start");
const resetLapButton = document.getElementById("reset-lap");
const lapContainer = document.getElementsByClassName("laps-container")[0];

setInterval(function () {
  stopwatchRun();
}, 50);

function stopwatchReset() {
  stopwatchStop();
  startTime = 0;
  pausedTime = 0;
  totalLaps = 0;
  lapStartTime = 0;
  lapContainer.innerHTML = "";
  stopwatchElement.innerText = "00:00.00";
}

//TODO:  Add and remove lowest / highest lap indicator
function stopwatchLap() {
  totalLaps++;
  lapPausedTime = 0;

  let currentTime = Date.now();
  lapStartTime = currentTime;

  let tableRow = document.createElement("div");
  let entryKey = document.createElement("span");
  let entryTime = document.createElement("span");

  entryKey.innerText = `Lap ${totalLaps}`;
  entryTime.innerText = formatTime(currentTime, lapStartTime, lapPausedTime);

  tableRow.appendChild(entryKey);
  tableRow.appendChild(entryTime);
  lapContainer.insertBefore(tableRow, lapContainer.firstChild);
}

//TODO:  Fix jittery number changes
function stopwatchStart() {
  if (startTime == 0) {
    startTime = Date.now();
  } else {
    pausedTime = Date.now() - pausedTime;
    lapPausedTime = Date.now() - lapPausedTime;
  }

  isTiming = true;
  if (totalLaps == 0) {
    stopwatchLap();
  }

  stopStartButton.innerText = "Stop";
  stopStartButton.classList.remove("start");
  stopStartButton.classList.add("stop");
  stopStartButton.onclick = stopwatchStop;

  resetLapButton.innerText = "Lap";
  resetLapButton.onclick = stopwatchLap;
}

function stopwatchRun() {
  if (isTiming) {
    let currentMillisecondTotal = Date.now();
    let currentTime = formatTime(
      currentMillisecondTotal,
      startTime,
      pausedTime
    );

    stopwatchElement.innerText = currentTime;

    //Updates the time of the most recent lap to match current time
    lapContainer.firstChild.lastChild.innerText = formatTime(
      currentMillisecondTotal,
      lapStartTime,
      lapPausedTime
    );
  }
}

function stopwatchStop() {
  isTiming = false;
  pausedTime = Date.now() - pausedTime;
  lapPausedTime = Date.now();

  resetLapButton.onclick = stopwatchReset;
  resetLapButton.innerText = "Reset";

  stopStartButton.onclick = stopwatchStart;
  stopStartButton.innerText = "Start";
  stopStartButton.classList.remove("stop");
  stopStartButton.classList.add("start");
}

//TODO:  Fix issue where seconds can become 3 digits
function formatTime(newestTime, oldTime, timeOffset) {
  let calcTime = newestTime - timeOffset - oldTime;
  let minutes = Math.floor(calcTime / 60000);
  let seconds = Math.floor(calcTime / 1000);
  let milliseconds = Math.floor(calcTime % 100);

  //Keep each time segment 2 digits to be consistent with Apple Stopwatch
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (milliseconds < 10) {
    milliseconds = "0" + milliseconds;
  }

  return `${minutes}:${seconds}.${milliseconds}`;
}
