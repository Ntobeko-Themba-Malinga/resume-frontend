const apiEndpoint = baseUrl + "/api/v1/hobbies";


function addToProjects(projects, data) {
    let a = document.createElement("a");

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
    fetch(apiEndpoint, {
        method: "GET",
        headers: {
            Accept: 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            return;
        }
        return res.json();
    }).then(data => {
        for (let i=0; i < data.length; i++) {
            addToProjects(projects, data[i]);
        }
    }).catch(error => {
        return;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let projects = document.getElementById("projects-body");

    enableLoader();
    getProjectsRequest(projects);
    disableLoader();
});