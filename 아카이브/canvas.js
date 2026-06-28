const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* 카메라 */
function getCamera(){
    return {
        x: window.screenX + window.outerWidth / 2,
        y: window.screenY + window.outerHeight / 2,
        w: window.outerWidth
    };
}

/* UI */
const speedToggle = document.getElementById("speedToggle");
const widthToggle = document.getElementById("widthToggle");
const shakeToggle = document.getElementById("shakeToggle");

const speedPower = document.getElementById("speedPower");
const widthPower = document.getElementById("widthPower");
const shakePower = document.getElementById("shakePower");

const colorPicker = document.getElementById("colorPicker");

let brushColor = colorPicker.value;

colorPicker.addEventListener("input", (e) => {
    brushColor = e.target.value;
});

/* 상태 */
let prev = getCamera();
const trail = [];

/* 속도 */
function getSpeed(cam){
    const dx = cam.x - prev.x;
    const dy = cam.y - prev.y;
    return Math.sqrt(dx*dx + dy*dy);
}

/* HEX → RGB */
function hexToRgb(hex){
    const h = hex.replace("#","");
    return {
        r: parseInt(h.substring(0,2),16),
        g: parseInt(h.substring(2,4),16),
        b: parseInt(h.substring(4,6),16)
    };
}

/* RGB → HEX */
function rgbToHex(r,g,b){
    const clamp = v => Math.round(Math.min(255, Math.max(0, v)));
    return "#" + [r,g,b]
        .map(clamp)
        .map(v => v.toString(16).padStart(2,"0"))
        .join("");
}

/* 색 흔들림 */
function shakeColor(base, intensity, t){
    const rgb = hexToRgb(base);

    const dr = Math.sin(t * 1.1) * 64 * intensity;
    const dg = Math.sin(t * 1.3 + 2.1) * 64 * intensity;
    const db = Math.sin(t * 1.7 + 4.3) * 64 * intensity;

    const r = rgb.r + dr;
    const g = rgb.g + dg;
    const b = rgb.b + db;

    return rgbToHex(r,g,b);
}

/* 업데이트 */
function update(){
    const cam = getCamera();
    const speed = getSpeed(cam);

    if(speed > 0.5){
        trail.push({
            x: cam.x,
            y: cam.y,
            speed: speed,
            width: cam.w,
            baseColor: brushColor,
            t: performance.now() * 0.01
        });
        prev = cam;
    }
}

/* 렌더 */
function render(showBrush = true){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(trail.length < 2) return;

    const speedEnabled = speedToggle.checked;
    const widthEnabled = widthToggle.checked;
    const shakeEnabled = shakeToggle.checked;

    const sp = parseFloat(speedPower.value);
    const wp = parseFloat(widthPower.value);
    const sh = parseFloat(shakePower.value);

    const cam = getCamera();

    for(let i=1;i<trail.length;i++){

        const p1 = trail[i-1];
        const p2 = trail[i];

        const x1 = p1.x - cam.x + canvas.width/2;
        const y1 = p1.y - cam.y + canvas.height/2;

        const x2 = p2.x - cam.x + canvas.width/2;
        const y2 = p2.y - cam.y + canvas.height/2;

        let thickness = 2;

        if(speedEnabled){
            thickness += p2.speed * 0.05 * sp;
        }

        let alpha = 1;

        if(widthEnabled){
            alpha = Math.min(1, (p2.width / 2000) * wp);
        }

        let color = p2.baseColor;
        const shakeSpeedThreshold = 1;

        if(shakeEnabled && p2.speed > shakeSpeedThreshold){
            color = shakeColor(p2.baseColor, sh, p2.t);
        }

        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = thickness;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    if(showBrush){
        ctx.fillStyle = brushColor;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 4, 0, Math.PI*2);
        ctx.fill();
    }
}

/* 루프 */
function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();

/* 초기화 */
document.getElementById("reset").onclick = () => {
    trail.length = 0;
};

/* 저장 */
document.getElementById("save").onclick = () => {
    render(false);
    const link = document.createElement("a");
    link.download = "window_brush.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    render();
};
