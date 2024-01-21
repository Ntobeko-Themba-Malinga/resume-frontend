const apiEndpoint = baseUrl + "/api/v1/skills";
let token;

function addSkillToTable(tableBody, data) {
    let tr = document.createElement("tr");
    let id = data["id"];

    let skillTitleId = document.createElement("td");
    skillTitleId.innerText = data["title"];

    let skillLevelTd = document.createElement("td");
    skillLevelTd.innerText = data["level"] + "/5";

    let updateBtnTd = document.createElement("td");
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("update-btn");
    updateBtn.id = "update" + id;
    updateBtn.innerText = "UPDATE";
    updateBtnTd.appendChild(updateBtn);

    let deleteBtnTd = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.id = "delete" + id;
    deleteBtn.innerText = "DELETE";
    deleteBtnTd.appendChild(deleteBtn);

    tr.appendChild(skillTitleId);
    tr.appendChild(skillLevelTd);
    tr.appendChild(updateBtnTd);
    tr.appendChild(deleteBtnTd);

    tableBody.prepend(tr);
}

function postSkillsRequest(tableBody, skill) {
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
    })
}

function getSkillsRequest(tableBody) {
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
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.getElementById("skills-table-body");
    let skillTitleInput = document.getElementById("skills-title-input");
    let skillLevelInput = document.getElementById("skills-level");
    let submitBtn = document.getElementById("skills-submit-btn");
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
                postSkillsRequest(tableBody, skill);
            } else {
                alert("Make sure the title and skill level fields are not empty");
            }
        } catch(err) {
            alert("Enter only numbers between 1 and 5 for skill level");
        }
    });
    getSkillsRequest(tableBody);
});