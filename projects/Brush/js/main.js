/* Canvas 초기화 */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* 상태 관리 */
const state = {
    trail: [],
    prev: getCamera(),
    brushColor: "#ffffff"
};

/* UI 초기화 */
const ui = initUI();
state.brushColor = ui.colorPicker.value;

/* 이벤트 바인딩 */
bindUIEvents(ui, state);
bindButtonEvents(state, canvas, ctx, ui);

/* 메인 루프 */
function loop(){
    update(canvas, ctx, state);
    render(canvas, ctx, state, ui);
    requestAnimationFrame(loop);
}

loop();
