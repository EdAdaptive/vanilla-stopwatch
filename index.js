let startTime = 0;
let isTiming = false;
let totalLaps = 0;

const stopwatchElement = document.getElementById("stopwatch");
const stopStartButton = document.getElementById("stop-start");
const resetLapButton = document.getElementById("reset-lap");
const lapContainer = document.getElementsByClassName("laps-container")[0];

//TODO:  Take into consideration lap number increasing such as lap 1 in example

setInterval(function () {
  stopwatchRun();
}, 100);

function stopwatchReset() {
  stopwatchStop();
  startTime = 0;
  lapContainer.innerHTML = "";
  stopwatchElement.innerText = "00:00.00";
}

//TODO:  Add and remove lowest / highest lap indicator
//TODO:  Change outputted times to display time since last lap, not total time
function stopwatchLap() {
  totalLaps++;
  //TODO:  Change to be consistent with other variables
  let tableRow = document.createElement("tr");
  let entryKey = document.createElement("td");
  let entryTime = document.createElement("td");

  entryKey.innerText = `Lap ${totalLaps}`;
  entryTime.innerText = formatTime(Date.now(), startTime);

  tableRow.appendChild(entryKey);
  tableRow.appendChild(entryTime);
  lapContainer.insertBefore(tableRow, lapContainer.firstChild);
}

//TODO:  Fix jittery number changes
//TODO:  Fix issue where after unpausing the timer includes time spent paused
function stopwatchStart() {
  if (startTime == 0) {
    startTime = Date.now();
  }

  isTiming = true;
  stopStartButton.innerText = "Stop";
  stopStartButton.classList.remove("start");
  stopStartButton.classList.add("stop");
  stopStartButton.onclick = stopwatchStop;

  resetLapButton.innerText = "Lap";
  resetLapButton.onclick = stopwatchLap;
}

function stopwatchRun() {
  if (isTiming) {
    stopwatchElement.innerText = formatTime(Date.now(), startTime);
  }
}

function stopwatchStop() {
  isTiming = false;

  resetLapButton.onclick = stopwatchReset;
  resetLapButton.innerText = "Reset";

  stopStartButton.onclick = stopwatchStart;
  stopStartButton.innerText = "Start";
  stopStartButton.classList.remove("stop");
  stopStartButton.classList.add("start");
}

function formatTime(newestTime, oldTime) {
  let calcTime = newestTime - oldTime;
  let minutes = Math.floor(calcTime / 60000);
  let seconds = Math.floor(calcTime / 1000);
  let milliseconds = calcTime % 100;

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
