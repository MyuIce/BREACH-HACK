//main.js
//全体の進行、結果の表示と警告の処理、ゲームオーバー時の処理
import { state } from "./state.js";
import { addLog, updateStatus, showResult } from "./ui.js";
import { initMission1 } from "./mission1.js";
import { initMission2 } from "./mission2.js";
import { initMission3, stopMission3Timer } from "./mission3.js";

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing game...");

    addLog("システム起動");
    updateStatus();

    try {
        initMission1(() => {
            addLog("ミッション1 完了");
            state.phase = 2;
            state.progress = 33;
            updateStatus();

            initMission2(() => {
                addLog("ミッション2 完了");
                state.phase = 3;
                state.progress = 66;
                updateStatus();

                initMission3(() => {
                    // Mission 3 クリア時
                    addLog("ミッション3 完了");
                    gameOver(true);
                });
            });

        });
    } catch (e) {
        console.error("Initialization error:", e);
        addLog("システム起動失敗");
    }
});

export function addWarning() {
    if (state.phase === 4) return;

    state.warnings++;
    addLog("入力エラー", true);
    updateStatus();

    if (state.warnings >= 3) {
        gameOver(false);
    }
}

export function gameOver(success) {
    if (state.phase === 4) return;

    state.phase = 4;
    // 成功時は警告リセットしない、失敗時は警告3にする仕様のようなので
    if (!success) {
        state.warnings = 3;
        addLog("ゲームオーバー");
    } else {
        addLog("ゲームクリア");
    }

    updateStatus();
    stopMission3Timer();
    showResult(success);
}