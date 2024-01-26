document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = baseUrl + "/api/v1/projects";
    let requestType = "POST";
    let tableBody = document.getElementById("projects-table-body");
    let projectTitleInput = document.getElementById("projects-title-input");
    let projectGitRepoInput = document.getElementById("projects-git-url");
    let projectImageInput = document.getElementById("projects-image-url");
    let submitBtn = document.getElementById("projects-submit-btn");
    let token;
    let ProjectId;

    function addProjectToTable(tableBody, data) {
        let tr = document.createElement("tr");
        let id = data["id"];

        let ProjectTitleId = document.createElement("td");
        ProjectTitleId.innerText = data["title"];
        ProjectTitleId.id = "title-" + id;

        let ProjectLevelTd = document.createElement("td");
        ProjectLevelTd.innerText = data["url"];
        ProjectLevelTd.id = "git-repo-" + id;

        let ProjectImageTd = document.createElement("td");
        ProjectImageTd.innerText = data["image"];
        ProjectImageTd.id = "git-image-" + id;

        let updateBtnTd = document.createElement("td");
        let updateBtn = document.createElement("button");
        updateBtn.classList.add("update-btn");
        updateBtn.id = "update-" + id;
        updateBtn.innerText = "UPDATE";
        updateBtnTd.appendChild(updateBtn);

        let deleteBtnTd = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.id = "delete-" + id;
        deleteBtn.innerText = "DELETE";
        deleteBtnTd.appendChild(deleteBtn);

        tr.appendChild(ProjectTitleId);
        tr.appendChild(ProjectLevelTd);
        tr.appendChild(ProjectImageTd);
        tr.appendChild(updateBtnTd);
        tr.appendChild(deleteBtnTd);

        tableBody.prepend(tr);

        updateBtn.addEventListener("click", () => {
            requestType = "PUT";
            ProjectId = id;
            projectTitleInput.value = data["title"];
            projectGitRepoInput.value = data["url"];
            projectImageInput.value = data["image"];
        });

        deleteBtn.addEventListener("click", () => {
            ProjectId = id;
            deleteProjectsRequest();
        });
    }


    function updateProject(ProjectId, data) {
        let title = document.getElementById("title-" + ProjectId);
        let git = document.getElementById("git-repo-" + ProjectId);
        let image = document.getElementById("git-image-" + ProjectId);

        title.innerText = data["title"];
        git.innerText = data["url"];
        image.innerText = data["image"];

        projectTitleInput.value = "";
        projectGitRepoInput.value = "";
        projectImageInput.value = "";
        requestType = "POST";
    }


    function deleteProject() {
        let ProjectDeleteBtn = document.getElementById("delete-" + ProjectId);

        ProjectDeleteBtn.parentElement.parentElement.remove();
        requestType = "POST";
    }


    function deleteProjectsRequest() {
        enableLoader();
        fetch(apiEndpoint + "/" + ProjectId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return;
        }).then(data => {
            console.log("-1");
            deleteProject();
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function putProjectsRequest(ProjectId, Project) {
        enableLoader();
        fetch(apiEndpoint + "/" + ProjectId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(Project)
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return res.json();
        }).then(data => {
            updateProject(data["id"], data);
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function postProjectsRequest(tableBody, Project) {
        enableLoader();
        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(Project)
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return res.json();
        }).then(data => {
            addProjectToTable(tableBody, data);
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function getProjectsRequest(tableBody) {
        enableLoader();
        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return res.json();
        }).then(data => {
            for (let i=0; i < data.length; i++) {
                addProjectToTable(tableBody, data[i]);
            }
        }).catch(error => {
            return;
        });
        disableLoader();
    }

    token = localStorage.getItem('user');

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
       
        let title = projectTitleInput.value;
        let url = projectGitRepoInput.value;
        let image = projectImageInput.value;

        if (title.trim().length !== 0
            && url.trim().length !== 0
            && image.trim().length !== 0) {
            const Project = {
                title: title,
                url: url,
                image: image
            } 

            if (requestType === "POST") {
                postProjectsRequest(tableBody, Project);
            } else {
                putProjectsRequest(ProjectId, Project);
            }
        } else {
            alert("Make sure the title and Project level fields are not empty");
        }
    });
    getProjectsRequest(tableBody);
});
