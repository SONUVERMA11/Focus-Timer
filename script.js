let timerInterval;
let isPaused = false;
let cycleCount = 1;
const defaultFocusTime = 25;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const cycleDisplay = document.getElementById('cycle');
const focusTimeInput = document.getElementById('focus-time');

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const progressRing = document.querySelector('.ring-progress');
const ringCircumference = 2 * Math.PI * 100; // Circumference (2 * π * r)

progressRing.style.strokeDasharray = ringCircumference;

function setProgress(progress) {
  const offset = ringCircumference - progress * ringCircumference;
  progressRing.style.strokeDashoffset = offset;
}

function startTimer() {
  if (timerInterval) return;

  const focusTime = parseInt(focusTimeInput.value) || defaultFocusTime;
  let totalSeconds = focusTime * 60;
  const initialSeconds = totalSeconds;

  timerInterval = setInterval(() => {
    if (!isPaused) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      minutesDisplay.textContent = minutes.toString().padStart(2, '0');
      secondsDisplay.textContent = seconds.toString().padStart(2, '0');

      setProgress((initialSeconds - totalSeconds) / initialSeconds); // Update progress ring

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        cycleCount++;
        cycleDisplay.textContent = cycleCount;
        alert('Focus session complete! Take a break.');
        resetTimer();
      } else {
        totalSeconds--;
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;
  pauseButton.textContent = 'Pause';
  const focusTime = parseInt(focusTimeInput.value) || defaultFocusTime;
  minutesDisplay.textContent = focusTime.toString().padStart(2, '0');
  secondsDisplay.textContent = '00';
  setProgress(0);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
