document.addEventListener('DOMContentLoaded', function() {
    let nameInput = document.getElementById("name-input");
    let emailInput = document.getElementById("email-input");
    let messageInput = document.getElementById("message-input");
    let submitInput = document.getElementById("submit-input");

    const clearInput = () => {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }

    submitInput.addEventListener("click", (env) => {
        env.preventDefault();
        let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        let name = nameInput.value;
        let email = emailInput.value;
        let message = messageInput.value;

        if (name.trim().length !== 0 
            && email.trim().length !== 0
            && email.match(validEmailRegex)) {
                const apiEndpoint = "https://ntobeko-malinga-backend.onrender.com/api/v1/contact";
                
                const contact = {
                    name: name,
                    email: email,
                    message: message
                };

                fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify(contact)
                }).then(res => {
                    if (!res.ok) {
                        alert("Something went wrong!");
                        return null;
                    } else {
                        clearInput();
                        alert("Contact successfully sent!");
                    }
                }).catch(error => {
                    alert("Something went wrong!");
                })
        } else {
            alert("Make sure your email is correct and you entered your name");
        }
    });
});