const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeButton.textContent = "☀";
    } else {
        themeButton.textContent = "☾";
    }
});