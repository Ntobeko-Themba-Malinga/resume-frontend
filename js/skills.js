const apiEndpoint = baseUrl + "/api/v1/skills";

function addToSkills(skills, data) {
    let li = document.createElement("li");

    let pSkill = document.createElement("p");
    pSkill.classList.add("skill");
    pSkill.innerText = data["title"]
    
    let pLevel = document.createElement("p"); 
    pLevel.classList.add("level");
    pLevel.innerText = data["level"] + "/5";

    li.appendChild(pSkill);
    li.appendChild(pLevel);

    skills.appendChild(li);
}

function getSkillsRequest(skills) {
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
            addToSkills(skills, data[i]);
        }
    }).catch(error => {
        return;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let skills = document.getElementById("skills");
    getSkillsRequest(skills);
});