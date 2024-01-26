const apiEndpoint = baseUrl + "/api/v1/contact";
let contactIds = [];
let token;

function contactIdExist(contactId) {
    for (let i=0; i < contactIds.length; i++) {
        if (contactIds[i] === contactId) {
            return true;
        }
    }
    return false;
}

function addContactToTable(tableBody, data) {
    let tr = document.createElement("tr");
    let id = data["id"];

    let add = !contactIdExist(id);

    if (add) {
        contactIds.push(id);
        let dateTd = document.createElement("td");
        dateTd.innerText = data["date"];

        let nameTd = document.createElement("td");
        nameTd.innerText = data["name"];

        let emailTd = document.createElement("td");
        emailTd.innerText = data["email"];

        let messageTd = document.createElement("td");
        messageTd.innerText = data["message"];

        tr.appendChild(dateTd);
        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(messageTd);

        tableBody.prepend(tr);
    }
}

function getContactRequest(tableBody) {
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
        disableLoader();
        return res.json();
    }).then(data => {
        for (let i=0; i < data.length; i++) {
            addContactToTable(tableBody, data[i]);
        }
    }).catch(error => {
        disableLoader();
        return;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.getElementById("contacts-table-body");

    token = localStorage.getItem('user');
    enableLoader();
    getContactRequest(tableBody);

    setInterval(() => {
        getContactRequest(tableBody);
    }, 2000);
});