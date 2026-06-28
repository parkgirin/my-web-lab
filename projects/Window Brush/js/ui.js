/* UI 초기화 */
function initUI(){
    return {
        speedToggle: document.getElementById("speedToggle"),
        widthToggle: document.getElementById("widthToggle"),
        shakeToggle: document.getElementById("shakeToggle"),
        
        speedPower: document.getElementById("speedPower"),
        widthPower: document.getElementById("widthPower"),
        shakePower: document.getElementById("shakePower"),
        
        colorPicker: document.getElementById("colorPicker")
    };
}

/* UI 이벤트 바인딩 */
function bindUIEvents(ui, state){
    ui.colorPicker.addEventListener("input", (e) => {
        state.brushColor = e.target.value;
    });
}

/* 버튼 이벤트 바인딩 */
function bindButtonEvents(state, canvas, ctx, ui){
    document.getElementById("reset").onclick = () => {
        state.trail.length = 0;
    };

    document.getElementById("save").onclick = () => {
        render(canvas, ctx, state, ui, false);
        const link = document.createElement("a");
        link.download = "window_brush.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        render(canvas, ctx, state, ui);
    };
}
