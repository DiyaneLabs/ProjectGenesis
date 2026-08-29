const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const industryData = {

    government: {

        number: "01",

        title: "Government & Public Sector",

        description:
            "Secure connectivity, infrastructure modernisation, managed services, digital platforms and reporting designed around public-service environments, distributed sites and accountable delivery."

    },

    small_med_business: {

        number: "02",

        title: "Small & Medium-Sized Businesses",

        description:
            "Practical IT capability that helps growing organisations improve security, user support, cloud adoption and technology planning without unnecessary complexity."

    },

    education: {

        number: "03",

        title: "Education & Training",

        description:
            "Connectivity, user access, digital learning platforms, device support and secure infrastructure for institutions serving students, educators and administrators."

    },

    professional: {

        number: "04",

        title: "Professional Services",

        description:
            "Secure collaboration, cloud, communications, continuity and user support for organisations whose reputation depends on availability and information protection."

    },

    retail: {

        number: "05",

        title: "Retail & Multi-Site Operations",

        description:
            "Resilient connectivity, central visibility, endpoint support and communication services across branches, outlets and distributed teams."

    },

};

const industryButtons =
    document.querySelectorAll(".industry-item");

const industryNumber =
    document.getElementById("industryNumber");

const industryTitle =
    document.getElementById("industryTitle");

const industryDescription =
    document.getElementById("industryDescription");


industryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const industry =
            industryData[button.dataset.industry];

        if (!industry) return;


        /* Remove active state */

        industryButtons.forEach(item => {

            item.classList.remove("active");

        });


        /* Activate selected industry */

        button.classList.add("active");


        /* Fade content out */

        const feature =
            document.querySelector(".industry-feature-content");

        feature.classList.add("changing");


        setTimeout(() => {

            industryNumber.textContent =
                industry.number;

            industryTitle.textContent =
                industry.title;

            industryDescription.textContent =
                industry.description;


            feature.classList.remove("changing");

        }, 180);

    });

});

