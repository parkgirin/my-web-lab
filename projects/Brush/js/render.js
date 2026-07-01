/* 속도 */
function getSpeed(cam, prev){
    const dx = cam.x - prev.x;
    const dy = cam.y - prev.y;
    return Math.sqrt(dx*dx + dy*dy);
}

/* 업데이트 */
function update(canvas, ctx, state){
    const cam = getCamera();
    const speed = getSpeed(cam, state.prev);

    if(speed > 0.5){
        state.trail.push({
            x: cam.x,
            y: cam.y,
            speed: speed,
            width: cam.w,
            baseColor: state.brushColor,
            t: performance.now() * 0.01
        });
        state.prev = cam;
    }
}

/* 렌더 */
function render(canvas, ctx, state, ui, showBrush = true){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(state.trail.length < 2) return;

    const speedEnabled = ui.speedToggle.checked;
    const widthEnabled = ui.widthToggle.checked;
    const shakeEnabled = ui.shakeToggle.checked;

    const sp = parseFloat(ui.speedPower.value);
    const wp = parseFloat(ui.widthPower.value);
    const sh = parseFloat(ui.shakePower.value);

    const cam = getCamera();

    for(let i=1;i<state.trail.length;i++){

        const p1 = state.trail[i-1];
        const p2 = state.trail[i];

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
        ctx.fillStyle = state.brushColor;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 4, 0, Math.PI*2);
        ctx.fill();
    }
}
