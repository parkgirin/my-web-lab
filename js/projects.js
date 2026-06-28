/* 전체 프로젝트 목록 */
const allProjects = [
    {
        name: "Window Brush — Shake Color",
        desc: "창 움직임으로 색상을 바꾸며 그리는 캔버스",
        path: "./Window%20Brush/canvas.html",
        tag: "brush / canvas"
    },
    {
        name: "Window Brush — Spray",
        desc: "창 위치 기반 스프레이 브러시 시뮬레이션",
        path: "./Window%20Brush/particles.html",
        tag: "spray / particles"
    },
    {
        name: "Window Alchemy",
        desc: "네 가지 요소의 상호작용 시뮬레이션",
        path: "./Window%20Alchemy/index.html",
        tag: "alchemy / physics"
    }
];

/* 현재 페이지 프로젝트명 가져오기 */
function getCurrentProjectName() {
    const path = window.location.pathname;
    if (path.includes('canvas.html')) return "Window Brush — Shake Color";
    if (path.includes('particles.html')) return "Window Brush — Spray";
    if (path.includes('Window%20Alchemy') || path.includes('Window Alchemy')) return "Window Alchemy";
    return null;
}

/* 현재 프로젝트 제외한 나머지 프로젝트 가져오기 */
function getOtherProjects() {
    const current = getCurrentProjectName();
    return allProjects.filter(p => p.name !== current);
}

/* 랜덤 프로젝트 선택 */
function getRandomProject() {
    const others = getOtherProjects();
    if (others.length === 0) return allProjects[0];
    return others[Math.floor(Math.random() * others.length)];
}

/* 랜덤 프로젝트로 이동 */
function navigateToRandomProject() {
    const project = getRandomProject();
    const basePath = window.location.pathname.includes('Window%20Alchemy') || 
                     window.location.pathname.includes('Window Alchemy')
        ? '../../'
        : '../';
    window.location.href = basePath + project.path;
}
