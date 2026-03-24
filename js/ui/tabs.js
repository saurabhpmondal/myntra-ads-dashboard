// TABS HANDLER (CONNECTED WITH DATA)

export function setupTabs(dataStore) {

    const tabs = document.querySelectorAll(".tab");
    const searchBar = document.getElementById("searchBar");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            // Active state
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedTab = tab.dataset.tab;

            // Search visibility
            if (selectedTab === "campaign") {
                searchBar.style.display = "block";
            } else {
                searchBar.style.display = "none";
            }

            // Render correct table
            if (selectedTab === "campaign") {
                dataStore.render("campaign");
            }

            if (selectedTab === "daily") {
                dataStore.render("daily");
            }

            if (selectedTab === "placement") {
                dataStore.render("placement");
            }

        });

    });

}