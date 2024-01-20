const apiEndpoint = "http://localhost:8080/api/v1/auth";
let token;

function loginDisplayMesg(msg, status) {
    let loginMsg = document.getElementById("login-message");

    setTimeout(() => {
        loginMsg.classList.remove(status);
        loginMsg.style.display = "none";
        loginMsg.innerHTML = "";
    }, 3000);
    loginMsg.classList.add(status);
    loginMsg.style.display = "block";
    loginMsg.innerHTML = `<p>${msg}</p>`;
}

function sendLoginRequest(loginDetails) {
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails)
    }).then(res => {
        if (!res.ok) {
            let msg = "Something went wrong; please try logging in again."
            loginDisplayMesg(msg, "failure");
            return;
        }
        return res.json();
    }).then(data => {
        token = data["token"];
        console.log(token);
    }).catch(error => {
        let msg = "Something went wrong; please try logging in again."
        loginDisplayMesg(msg, "failure");
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let emailInput = document.getElementById("email-input");
    let passwordInput = document.getElementById("password-input");
    let loginBtn = document.getElementById("login-submit");

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let email = emailInput.value;
        let password = passwordInput.value;
        let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.trim().length !== 0
            && password.trim().length !== 0
            && email.match(validEmailRegex)) {
                const login = {
                    email: email,
                    password: password
                };
                sendLoginRequest(login);
        } else {
            let msg = "Please make sure you have entered a valid email and password.";
            loginDisplayMesg(msg, "failure");
        }
    })
});