//mission3.js
//ゲーム：制限時間内に表示されているキーを押す
import { state } from "./state.js";
import { addLog, updateStatus } from "./ui.js";
import { gameOver } from "./main.js";

const REQUIRED_KEYS = ["Q", "E", "F", "J"];
let remainingKeys = new Set();
let timeLeft = 5.0;
let timerId = null;

//DOM
const timerText = document.querySelector(".mission3 .timer");

export function initMission3(onClear) {
    startTimer(onClear);

    document.addEventListener("keydown", (e) => {
        if (state.phase !== 3) return;

        const key = e.key.toUpperCase();
        if (remainingKeys.has(key)) {
            remainingKeys.delete(key);
            addLog(`キー受け付け: ${key}`);

            if (remainingKeys.size === 0) {
                clearInterval(timerId);
                finish(onClear);
            }
        }
    });
}



function startTimer(onClear) {
    remainingKeys = new Set(REQUIRED_KEYS);
    timeLeft = 5.0;

    timerText.textContent = `TIME LEFT:${timeLeft.toFixed(1)}s`;

    timerId = setInterval(() => {
        timeLeft -= 0.1;
        timerText.textContent =
            `TIME LEFT: ${Math.max(timeLeft, 0).toFixed(1)}s`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            addLog("TIME OUT", true);
            gameOver(false);
        }
    }, 100);
}

function finish(onClear) {
    addLog("承認完了");
    onClear();
}

export function stopMission3Timer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}