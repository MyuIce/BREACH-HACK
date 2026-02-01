//mission2.js
//ゲーム：文字でパスワードを入力する
import { state } from "./state.js";
import { addLog, updateStatus } from "./ui.js";
import { addWarning } from "./main.js";

const ANSWER = "ACCESS";
let input = "";

//DOM
const puzzleButtons = document.querySelectorAll(".mission2 .puzzle button");
const verifyButton = document.getElementById("verify");
const mission2 = document.querySelector(".mission2");
const mission3 = document.querySelector(".mission3");

export function initMission2(onClear) {
    puzzleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (state.phase !== 2) return;

            input += btn.textContent;
            addLog(`入力: ${input}`);
        });

    });

    verifyButton.addEventListener("click", () => {
        if (state.phase !== 2) return;

        if (input === ANSWER) {
            addLog("復号成功");
            finish(onClear);
        }
        else {
            input = "";
            addLog("復号失敗", true);
            addWarning();
        }
    });
}

function finish(onClear) {
    mission2.classList.add("hidden");
    mission3.classList.remove("hidden");
    onClear();
}


