const apiEndpoint = baseUrl + "/api/v1/projects";


function addToProjects(projects, data) {
    let a = document.createElement("a");
    a.href = data["url"];
    a.target = "_blank";

    let project = document.createElement("article");
    project.classList.add("project");

    let img = document.createElement("img")
    img.src = data["image"];

    let h3 = document.createElement("h3");
    h3.innerText = data["title"];

    project.appendChild(img);
    project.appendChild(h3);

    a.appendChild(project);

    projects.appendChild(a);
}


function getProjectsRequest(projects) {
    enableLoader();
    fetch(apiEndpoint, {
        method: "GET",
        headers: {
            Accept: 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            return;
        }
        disableLoader();
        return res.json();
    }).then(data => {
        for (let i=0; i < data.length; i++) {
            addToProjects(projects, data[i]);
        }
    }).catch(error => {
        disableLoader();
        return;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let projects = document.getElementById("projects-body");

    getProjectsRequest(projects);
});