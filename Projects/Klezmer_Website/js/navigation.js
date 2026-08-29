document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-links a");

    // Get the current page
    let currentPage = window.location.pathname;

    // Remove trailing slash
    currentPage = currentPage.replace(/\/$/, "");

    // Get just the filename
    currentPage = currentPage.split("/").pop();

    // If we're on the root/home page
    if (currentPage === "") {
        currentPage = "index.html";
    }

    navLinks.forEach(link => {

        let linkPage = link.getAttribute("href");

        // Remove any folders
        linkPage = linkPage.split("/").pop();

        // Remove #section if there is one
        linkPage = linkPage.split("#")[0];

        // Home link
        if (linkPage === "" || linkPage === "index.html") {
            linkPage = "index.html";
        }

        // Add active class
        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});

