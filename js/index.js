/* 현재 프로젝트 폴더 */
const currentFolder = (() => {
    const path = window.location.pathname;
    const marker = "/projects/";

    const index = path.indexOf(marker);

    if (index === -1) return null;

    return path
        .substring(index + marker.length)
        .replace(/\/index\.html$/, "");
})();

/* 저장소 루트(URL) */
function getRootUrl() {
    const href = window.location.href;
    const marker = "/projects/";

    const index = href.indexOf(marker);

    if (index !== -1) {
        return href.substring(0, index + 1);
    }

    return href.substring(0, href.lastIndexOf("/") + 1);
}

/* 현재 프로젝트 제외 */
function getOtherProjects() {
    if (!currentFolder) return allProjects;

    return allProjects.filter(project =>
        project.folder !== currentFolder
    );
}

/* 랜덤 프로젝트 선택 */
function getRandomProject() {
    const others = getOtherProjects();

    if (others.length === 0) {
        return allProjects[0];
    }

    return others[Math.floor(Math.random() * others.length)];
}

/* 프로젝트 이동 */
function navigateToProject(folder) {
    window.location.href =
        getRootUrl() +
        `projects/${folder}/index.html`;
}

/* 랜덤 프로젝트 이동 */
function navigateToRandomProject() {
    const project = getRandomProject();

    if (!project) return;

    navigateToProject(project.folder);
}