/* Canvas 초기화 */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* UI 초기화 */
function initParticlesUI() {
    return {
        colorPicker: document.getElementById("colorPicker"),
        sprayPower: document.getElementById("sprayPower"),
        resetBtn: document.getElementById("reset"),
        saveBtn: document.getElementById("save")
    };
}

/* 상태 관리 */
const ui = initParticlesUI();
const state = {
    particles: [],
    prev: getCamera(),
    brushColor: ui.colorPicker.value,
    ui: ui
};

/* 이벤트 바인딩 */
ui.colorPicker.addEventListener("input", (e) => {
    state.brushColor = e.target.value;
});

ui.resetBtn.onclick = () => {
    state.particles.length = 0;
};

ui.saveBtn.onclick = () => {
    const link = document.createElement("a");
    link.download = "window_spray.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
};

/* 메인 루프 */
function loop() {
    updateParticles(state);
    renderParticles(canvas, ctx, state);
    requestAnimationFrame(loop);
}

loop();
