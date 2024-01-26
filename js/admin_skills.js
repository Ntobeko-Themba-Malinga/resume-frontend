document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = baseUrl + "/api/v1/skills";
    let requestType = "POST";
    let tableBody = document.getElementById("skills-table-body");
    let skillTitleInput = document.getElementById("skills-title-input");
    let skillLevelInput = document.getElementById("skills-level");
    let submitBtn = document.getElementById("skills-submit-btn");
    let token;
    let skillId;

    function addSkillToTable(tableBody, data) {
        let tr = document.createElement("tr");
        let id = data["id"];

        let skillTitleId = document.createElement("td");
        skillTitleId.innerText = data["title"];
        skillTitleId.id = "title-" + id;

        let skillLevelTd = document.createElement("td");
        skillLevelTd.innerText = data["level"] + "/5";
        skillLevelTd.id = "level-" + id;

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

        tr.appendChild(skillTitleId);
        tr.appendChild(skillLevelTd);
        tr.appendChild(updateBtnTd);
        tr.appendChild(deleteBtnTd);

        tableBody.prepend(tr);

        updateBtn.addEventListener("click", () => {
            requestType = "PUT";
            skillId = id;
            skillTitleInput.value = data["title"];
            skillLevelInput.value = data["level"];
        });

        deleteBtn.addEventListener("click", () => {
            skillId = id;
            deleteSkillsRequest();
        });
    }


    function updateSkill(skillId, data) {
        let title = document.getElementById("title-" + skillId);
        let level = document.getElementById("level-" + skillId);

        title.innerText = data["title"];
        level.innerText = data["level"];

        skillTitleInput.value = "";
        skillLevelInput.value = "";
        requestType = "POST";
    }


    function deleteSkill() {
        let skillDeleteBtn = document.getElementById("delete-" + skillId);

        skillDeleteBtn.parentElement.parentElement.remove();
        requestType = "POST";
    }


    function deleteSkillsRequest() {
        enableLoader();
        fetch(apiEndpoint + "/" + skillId, {
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
            deleteSkill();
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function putSkillsRequest(skillId, skill) {
        enableLoader();
        fetch(apiEndpoint + "/" + skillId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(skill)
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return res.json();
        }).then(data => {
            updateSkill(data["id"], data);
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function postSkillsRequest(tableBody, skill) {
        enableLoader();
        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(skill)
        }).then(res => {
            if (!res.ok) {
                return;
            }
            return res.json();
        }).then(data => {
            addSkillToTable(tableBody, data);
        }).catch(error => {
            return;
        });
        disableLoader();
    }


    function getSkillsRequest(tableBody) {
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
                addSkillToTable(tableBody, data[i]);
            }
        }).catch(error => {
            return;
        });
        disableLoader();
    }

    token = localStorage.getItem('user');

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
       
        title = skillTitleInput.value;
        try {
            level = Number(skillLevelInput.value);

            if (title.trim().length !== 0
                && level >= 1
                && level <= 5) {
                const skill = {
                    title: title,
                    level: level
                } 

                if (requestType === "POST") {
                    postSkillsRequest(tableBody, skill);
                } else {
                    putSkillsRequest(skillId, skill);
                }
            } else {
                alert("Make sure the title and skill level fields are not empty");
            }
        } catch(err) {
            alert("Enter only numbers between 1 and 5 for skill level");
        }
    });
    getSkillsRequest(tableBody);
});
