/* 전체 프로젝트 목록 */
window.allProjects = [
    {
        name: "Window Brush — Shake Color",
        desc: "창 움직임으로 색상을 바꾸며 그리는 캔버스",
        folder: "Brush/canvas",
        tag: "brush / canvas"
    },
    {
        name: "Window Brush — Spray",
        desc: "창 위치 기반 스프레이 브러시 시뮬레이션",
        folder: "Brush/particles",
        tag: "spray / particles"
    },
    {
        name: "Window Alchemy",
        desc: "네 가지 요소의 상호작용 시뮬레이션",
        folder: "Alchemy",
        tag: "alchemy / physics"
    }
];

/* 프로젝트 경로 생성 */
window.getProjectPath = function (folder) {
    return `projects/${folder}/index.html`;
};