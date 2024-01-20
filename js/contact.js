const apiEndpoint = baseUrl + "/api/v1/contact";

function contactDisplayMesg(msg, status) {
    let loginMsg = document.getElementById("contact-message");

    setTimeout(() => {
        loginMsg.classList.remove(status);
        loginMsg.style.display = "none";
        loginMsg.innerHTML = "";
    }, 3000);
    loginMsg.classList.add(status);
    loginMsg.style.display = "block";
    loginMsg.innerHTML = `<p>${msg}</p>`;
}

function clearInputs(nameInput, emailInput, messageInput) {
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}

function sendContactRequest(contactDetails) {
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(contactDetails)
    }).then(res => {
        if (!res.ok) {
            let msg =  "Something went wrong; please try logging in again."
            let status = "failure";
            contactDisplayMesg(msg, status)
            return null;
        } else {
            let msg =  "Successfully sent."
            let status = "success";
            contactDisplayMesg(msg, status)
        }
    }).catch(error => {
        let msg =  "Something went wrong; please try logging in again."
        let status = "failure";
        contactDisplayMesg(msg, status)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    let nameInput = document.getElementById("name-input");
    let emailInput = document.getElementById("email-input");
    let messageInput = document.getElementById("message-input");
    let submitInput = document.getElementById("submit-input");

    submitInput.addEventListener("click", (env) => {
        env.preventDefault();
        submitInput.disabled = true;
        submitInput.style.cursor = "default";
        let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        let name = nameInput.value;
        let email = emailInput.value;
        let message = messageInput.value;

        if (name.trim().length !== 0 
            && email.trim().length !== 0
            && email.match(validEmailRegex)) {  
            const contact = {
                name: name,
                email: email,
                message: message
            };
            sendContactRequest(contact)
        } else {
            let msg = "Make sure your email is correct, and you have entered your name."
            let status = "failure";
            contactDisplayMesg(msg, status)
        }
        submitInput.disabled = false;
        submitInput.style.cursor = "pointer";
    });
});