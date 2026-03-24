// SEARCH HANDLER (UI ONLY - PREP FOR FUTURE LOGIC)

export function setupSearch() {

    const input = document.querySelector(".search-bar input");

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase();

        // NOTE:
        // Actual filtering logic will be added later
        // when we connect real data

        console.log("Search:", value);

    });

}