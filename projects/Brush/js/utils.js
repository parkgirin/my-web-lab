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
