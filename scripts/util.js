function padSingleDigit(time) {
  return time.toString().padStart(2, "0");
}

export function formatTime(newestTime, oldTime, timeOffset) {
  let calcTime = newestTime - timeOffset - oldTime;
  let minutes = Math.floor(calcTime / 60000);
  let seconds = Math.floor(calcTime / 1000) % 60;
  let centiseconds = Math.floor(calcTime % 100);

  return `${padSingleDigit(minutes)}:${padSingleDigit(
    seconds
  )}.${padSingleDigit(centiseconds)}`;
}
