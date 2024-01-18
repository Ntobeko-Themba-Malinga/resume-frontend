document.addEventListener('DOMContentLoaded', function() {
    let menuIcon = document.getElementById("menu-icon");
    let navbar = document.getElementById("navbar");
    let toggle = true  

    menuIcon.addEventListener("click", (e) => {
        if (toggle) {
            toggle = false;
            navbar.style.left = "0%";
        } else {
            toggle = true;
            navbar.style.left = "-50%";
        }
    });
});