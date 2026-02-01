//ui.js
//HTMLの書き換えと表示の担当
import { state } from "./state.js";

let logArea;
let statusBar;
let resultScreen;
let resultTitle;
let resultMessage;
let restartButton;

function ensureDom() {
    if (!logArea) logArea = document.getElementById("log");
    if (!statusBar) statusBar = document.getElementById("status");
    if (!resultScreen) resultScreen = document.getElementById("result-screen");
    if (!resultTitle) resultTitle = document.getElementById("result-title");
    if (!resultMessage) resultMessage = document.getElementById("result-massage");

    if (!restartButton) {
        restartButton = document.getElementById("restart");
        if (restartButton) {
            restartButton.addEventListener("click", () => {
                location.reload();
            });
        }
    }
}

export function addLog(text, alert = false) {
    ensureDom();
    if (!logArea) return;

    const p = document.createElement("p");
    p.textContent = `>${text}`;
    if (alert) p.classList.add("alert");
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;
}

export function updateStatus() {
    ensureDom();
    if (!statusBar) return;

    statusBar.innerHTML = `
        <span>進行度: ${state.progress}%</span>
        <span>警告: ${state.warnings} / 3 </span>
    `;
}

export function showResult(success) {
    ensureDom();
    if (!resultScreen || !resultTitle || !resultMessage) return;

    resultScreen.classList.remove("hidden");

    if (success) {
        resultTitle.textContent = "アクセス成功";
        resultMessage.textContent = "システム侵入成功";
    }
    else {
        resultTitle.textContent = "アクセス失敗";
        resultMessage.textContent = "侵入失敗";
    }
}
