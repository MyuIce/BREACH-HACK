//mission1.js
//ゲーム：　ボタンを正しい順序で押す
import { state } from "./state.js";
import { addLog, updateStatus } from "./ui.js";
import { addWarning } from "./main.js";

const ORDER = ["cmd-open", "cmd-sudo", "cmd-inject"];
let index = 0;

let buttons = [];
let mission1 = null;
let mission2 = null;

export function initMission1(onClear) {
    buttons = ORDER.map(id => document.getElementById(id));
    mission1 = document.querySelector(".mission1");
    mission2 = document.querySelector(".mission2");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (state.phase !== 1) return;
            if (btn.id === ORDER[index]) {
                addLog(`コマンド受け付け: ${btn.id}`);
                index++;

                if (index === ORDER.length) {
                    finish(onClear);
                }
            }
            else {
                index = 0;
                addWarning();
            }
        });
    });
}

function finish(onClear) {
    buttons.forEach(b => b.disabled = true);
    mission1.classList.add("hidden");
    mission2.classList.remove("hidden");
    onClear();
}

