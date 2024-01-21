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
        console.log(data);
        for (let i=0; i < data.length; i++) {
            addSkillToTable(tableBody, data[i]);
        }
        console.log(data);
    }).catch(error => {
        return;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.getElementById("skills-table-body");

    token = localStorage.getItem('user');
    getSkillsRequest(tableBody);
});