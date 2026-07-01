/* 카메라 상태 */
let cameraPos = { x: 0, y: 0 };
const cameraDamping = 0.12; // 0-1 사이, 낮을수록 더 부드러움

/* 카메라 = 창 중심 (damping 적용) */
function getCamera(){
    const actual = {
        x: window.screenX + window.outerWidth / 2,
        y: window.screenY + window.outerHeight / 2,
        w: window.outerWidth
    };
    
    // 현재 위치로 부드럽게 따라가기
    cameraPos.x += (actual.x - cameraPos.x) * cameraDamping;
    cameraPos.y += (actual.y - cameraPos.y) * cameraDamping;
    
    return {
        x: cameraPos.x,
        y: cameraPos.y,
        w: actual.w
    };
}
