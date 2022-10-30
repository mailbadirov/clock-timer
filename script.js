const options = {
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const startStopButton = document.querySelector('.start-stop-button');
const roundButton = document.querySelector('.round-button');
const clearButton = document.querySelector('.clear-button');

const timerLine = document.querySelector('.timer');
const timeLine = document.querySelector('.time');
const roundHistory = document.querySelector('.round-history');

let timerID;
let [timerMinutes, timerSeconds, timerMilliseconds, roundCount] = [0, 0, 0, 0];

const addZeros = (value) => {
  return value < 10 ? '0' + value : value;
};

const startStopTimer = (event) => {
  roundButton.disabled = !roundButton.disabled;
  event.target.textContent = 'Stop';

  if (timerID) {
    event.target.textContent = 'Start';
    clearInterval(timerID);
    timerID = null;
    return;
  }

  timerID = setInterval(() => {
    timerMilliseconds += 1;

    if (timerMilliseconds === 100) {
      timerMilliseconds = 0;
      timerSeconds++;
    }

    if (timerSeconds === 60) {
      timerSeconds = 0;
      timerMinutes++;
    }

    if (timerMinutes === 60) {
      timerMinutes = 0;
    }

    timerLine.textContent = `${addZeros(timerMinutes)} : ${addZeros(
      timerSeconds
    )}.${addZeros(timerMilliseconds)}`;
  }, 10);
};

startStopButton.addEventListener('click', startStopTimer);

clearButton.addEventListener('click', () => {
  [roundCount, timerMinutes, timerSeconds, timerMilliseconds] = [0, 0, 0, 0];
  [timerLine.textContent, roundHistory.textContent] = ['00 : 00.00', ''];
  roundHistory.style.opacity = roundCount;
});

roundButton.addEventListener('click', () => {
  if (timerID) {
    roundHistory.innerHTML =
      `#${++roundCount} ------ ${timerLine.textContent}<br>` +
      roundHistory.innerHTML;

    roundHistory.style.opacity = roundCount;
  }
});

const getTime = () => {
  const myDate = new Date();
  timeLine.textContent = myDate.toLocaleTimeString('en-us', options);
};

setInterval(getTime, 1000);
