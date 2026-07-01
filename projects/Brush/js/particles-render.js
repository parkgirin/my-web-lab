/* 입자 렌더 로직 */

/* 속도 계산 */
function getSpeed(cam, prev) {
    const dx = cam.x - prev.x;
    const dy = cam.y - prev.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function updateParticles(state) {
    const cam = getCamera();
    const speed = getSpeed(cam, state.prev);

    if (speed > 0.5) {
        spawnParticles(cam, speed, state);
        state.prev = cam;
    }

    /* 입자 업데이트 */
    for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
    }

    /* 제거 */
    for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].life <= 0) {
            state.particles.splice(i, 1);
        }
    }
}

function spawnParticles(cam, speed, state) {
    const ui = state.ui;
    const count = Math.floor(speed * 0.3 * ui.sprayPower.value);

    for (let i = 0; i < count; i++) {
        state.particles.push({
            x: cam.x + (Math.random() - 0.5) * 20,
            y: cam.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * speed * 0.2,
            vy: (Math.random() - 0.5) * speed * 0.2,
            life: 1,
            color: state.brushColor,
            size: 1 + Math.random() * 2
        });
    }
}

function renderParticles(canvas, ctx, state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cam = getCamera();

    /* 입자 */
    for (const p of state.particles) {
        const sx = p.x - cam.x + canvas.width / 2;
        const sy = p.y - cam.y + canvas.height / 2;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;

        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    /* 붓 */
    ctx.fillStyle = state.brushColor;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.fill();
}
