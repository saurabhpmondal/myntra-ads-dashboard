// CHART SECTION SETUP (UI ONLY)

export function setupChartSection() {

    const metric1 = document.getElementById("metric1");
    const metric2 = document.getElementById("metric2");

    const metrics = [
        "Impressions",
        "Clicks",
        "CTR",
        "Units Sold",
        "Revenue",
        "Spend",
        "ROI"
    ];

    // Populate dropdowns
    metrics.forEach(metric => {

        const option1 = document.createElement("option");
        option1.value = metric;
        option1.textContent = metric;

        const option2 = option1.cloneNode(true);

        metric1.appendChild(option1);
        metric2.appendChild(option2);

    });

    // Default selection
    metric1.value = "Revenue";
    metric2.value = "Spend";

}