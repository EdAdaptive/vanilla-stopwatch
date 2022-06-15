let startTime = 0;
let pausedTime = 0;
let lapStartTime = 0;
let lapPausedTime = 0;
let isTiming = false;
let totalLaps = 0;
let bestLap = {
  time: 0,
  key: 0,
};
let worstLap = {
  time: 0,
  key: 0,
};

const $stopwatchElement = document.getElementById("stopwatch");
const $stopStartButton = document.getElementById("stop-start");
const $resetLapButton = document.getElementById("reset-lap");
const $lapContainer = document.getElementsByClassName("laps-container")[0];

setInterval(function () {
  runStopwatch();
}, 50);

function resetStopwatch() {
  stopStopwatch();
  startTime = 0;
  pausedTime = 0;
  totalLaps = 0;
  lapStartTime = 0;
  $lapContainer.innerHTML = "";
  $stopwatchElement.innerText = "00:00.00";
}

function lapStopwatch() {
  let currentTime = Date.now();
  let currentLapsedTime = currentTime - lapPausedTime - lapStartTime;

  //The best and worst laps aren't displayed till 2 laps have elapsed
  if (totalLaps > 2) {
    if (currentLapsedTime > worstLap.time) {
      $lapContainer
        .querySelector(`div[data-key="${worstLap.key}"]`)
        .classList.remove("worst-lap");

      worstLap.time = currentLapsedTime;
      worstLap.key = totalLaps;

      $lapContainer
        .querySelector(`div[data-key="${worstLap.key}"]`)
        .classList.add("worst-lap");
    } else if (currentLapsedTime < bestLap.time) {
      $lapContainer
        .querySelector(`div[data-key="${bestLap.key}"]`)
        .classList.remove("highest-lap");

      bestLap.time = currentLapsedTime;
      bestLap.key = totalLaps;

      $lapContainer
        .querySelector(`div[data-key="${bestLap.key}"]`)
        .classList.add("highest-lap");
    }
  } else {
    if (totalLaps === 1) {
      bestLap.time = currentLapsedTime;
      bestLap.key = totalLaps;
    } else if (totalLaps === 2) {
      if (bestLap.time < currentLapsedTime) {
        worstLap.time = currentLapsedTime;
        worstLap.key = totalLaps;
      } else {
        worstLap.time = bestLap.time;
        worstLap.key = bestLap.key;

        bestLap.time = currentLapsedTime;
        bestLap.key = totalLaps;
      }

      $lapContainer
        .querySelector(`div[data-key="${worstLap.key}"]`)
        .classList.add("worst-lap");

      bestLap.time = currentLapsedTime;
      $lapContainer
        .querySelector(`div[data-key="${bestLap.key}"]`)
        .classList.add("highest-lap");
    }
  }

  totalLaps++;
  lapPausedTime = 0;
  lapStartTime = currentTime;

  let $tableRow = document.createElement("div");
  $tableRow.dataset.key = totalLaps;
  let $entryKey = document.createElement("span");
  let $entryTime = document.createElement("span");

  $entryKey.innerText = `Lap ${totalLaps}`;
  $entryTime.innerText = formatTime(currentTime, lapStartTime, lapPausedTime);

  $tableRow.appendChild($entryKey);
  $tableRow.appendChild($entryTime);
  $lapContainer.insertBefore($tableRow, $lapContainer.firstChild);
}

//TODO:  Fix jittery number changes
function startStopwatch() {
  if (startTime == 0) {
    startTime = Date.now();
  } else {
    pausedTime = Date.now() - pausedTime;
    lapPausedTime = Date.now() - lapPausedTime;
  }

  isTiming = true;
  if (totalLaps == 0) {
    lapStopwatch();
  }

  $stopStartButton.innerText = "Stop";
  $stopStartButton.classList.remove("start");
  $stopStartButton.classList.add("stop");
  $stopStartButton.onclick = stopStopwatch;

  $resetLapButton.innerText = "Lap";
  $resetLapButton.onclick = lapStopwatch;
}

function runStopwatch() {
  if (isTiming) {
    let currentMillisecondTotal = Date.now();
    let currentTime = formatTime(
      currentMillisecondTotal,
      startTime,
      pausedTime
    );

    $stopwatchElement.innerText = currentTime;

    //Updates the time of the most recent lap to match current time
    $lapContainer.firstChild.lastChild.innerText = formatTime(
      currentMillisecondTotal,
      lapStartTime,
      lapPausedTime
    );
  }
}

function stopStopwatch() {
  isTiming = false;
  pausedTime = Date.now() - pausedTime;
  lapPausedTime = Date.now();

  $resetLapButton.onclick = resetStopwatch;
  $resetLapButton.innerText = "Reset";

  $stopStartButton.onclick = startStopwatch;
  $stopStartButton.innerText = "Start";
  $stopStartButton.classList.remove("stop");
  $stopStartButton.classList.add("start");
}
