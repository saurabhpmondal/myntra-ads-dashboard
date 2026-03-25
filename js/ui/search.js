// SEARCH HANDLER - FULLY FUNCTIONAL

let originalCampaignData = [];


// Store original data
export function setSearchData(data) {
    originalCampaignData = data || [];
}


// Setup search input
export function setupSearch(onSearch) {

    const input = document.querySelector(".search-bar input");

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase().trim();

        if (!value) {
            onSearch(originalCampaignData);
            return;
        }

        const filtered = originalCampaignData.filter(row => {

            const name = (row.campaign || "").toLowerCase();
            const id = (row.campaign_id || "").toLowerCase();

            return name.includes(value) || id.includes(value);
        });

        onSearch(filtered);

    });

}