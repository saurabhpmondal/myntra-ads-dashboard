// TABS HANDLER (UI ONLY)

export function setupTabs() {

    const tabs = document.querySelectorAll(".tab");
    const searchBar = document.getElementById("searchBar");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            // Remove active from all
            tabs.forEach(t => t.classList.remove("active"));

            // Add active to clicked
            tab.classList.add("active");

            const selectedTab = tab.dataset.tab;

            // Show search only for Campaign tab
            if (selectedTab === "campaign") {
                searchBar.style.display = "block";
            } else {
                searchBar.style.display = "none";
            }

            // NOTE: Table switching logic will come later (data phase)

        });

    });

}