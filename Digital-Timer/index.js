let hours = 0, minutes = 0, seconds = 0, miliseconds =0;
let timer = null;

function updateDisplay(){
    const formatted =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}:` +
        `${String(miliseconds).padStart(2, '0')}`;
    document.getElementById("display").textContent = formatted;
}
function startTimer(){
    if (timer !== null) return;

    timer = setInterval(() => {
        miliseconds++;

        if (miliseconds === 100){
            miliseconds = 0;
            seconds++;
        }

        if (seconds === 60){
            seconds = 0;
            minutes++;
        }
         if (minutes === 60){
            minutes =0;
            hours++;
        }

        updateDisplay();   
    }, 10);
}
function stopTimer(){
    clearInterval(timer);
    timer = null;
}

function resetTimer(){
    stopTimer();
    hours = minutes = seconds = miliseconds = 0;
    updateDisplay();
}
