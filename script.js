const options = {
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const ELEMENT_CLASSES = {
  START_STOP_BUTTON: '.start-stop-button',
  ROUND_BUTTON: '.round-button',
  CLEAR_BUTTON: '.clear-button',
  TIMER: '.timer',
  TIME: '.time',
  ROUND_HISTORY: '.round-history',
};

const STRINGS = {
  START_BUTTON: 'Start',
  STOP_BUTTON: 'Stop',
};

const NUMBERS = {
  MIL_IN_SEC: 100,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
};

const startStopButton = document.querySelector(
  ELEMENT_CLASSES.START_STOP_BUTTON
);
const roundButton = document.querySelector(ELEMENT_CLASSES.ROUND_BUTTON);
const clearButton = document.querySelector(ELEMENT_CLASSES.CLEAR_BUTTON);

const timerLine = document.querySelector(ELEMENT_CLASSES.TIMER);
const timeLine = document.querySelector(ELEMENT_CLASSES.TIME);
const roundHistory = document.querySelector(ELEMENT_CLASSES.ROUND_HISTORY);

let timerId;
let [timerMinutes, timerSeconds, timerMilliseconds, roundCount] = [0, 0, 0, 0];

const addZeros = (value) => {
  return value < 10 ? '0' + value : value;
};

const startStopTimer = (event) => {
  roundButton.disabled = !roundButton.disabled;

  event.target.textContent = STRINGS.STOP_BUTTON;

  if (timerId) {
    event.target.textContent = STRINGS.START_BUTTON;

    clearInterval(timerId);

    timerId = null;

    return;
  }

  timerId = setInterval(() => {
    timerMilliseconds++;

    if (timerMilliseconds === NUMBERS.MIL_IN_SEC) {
      timerMilliseconds = 0;
      timerSeconds++;
    }

    if (timerSeconds === NUMBERS.SEC_IN_MIN) {
      timerSeconds = 0;
      timerMinutes++;
    }

    if (timerMinutes === NUMBERS.MIN_IN_HOUR) {
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
  if (timerId) {
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
