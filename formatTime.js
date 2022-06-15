function formatTime(newestTime, oldTime, timeOffset) {
  let calcTime = newestTime - timeOffset - oldTime;
  let minutes = Math.floor(calcTime / 60000);
  let seconds = Math.floor(calcTime / 1000) % 60;
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
