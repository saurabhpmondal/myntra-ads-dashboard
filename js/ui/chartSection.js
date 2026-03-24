// CHART SECTION WITH BASIC RENDERING (NO LIBRARY)

let chartData = [];

export function setupChartSection(data = []) {

    chartData = data;

    const metric1 = document.getElementById("metric1");
    const metric2 = document.getElementById("metric2");

    const metrics = [
        "impressions",
        "clicks",
        "ctr",
        "units",
        "revenue",
        "spend",
        "roi"
    ];

    const labels = {
        impressions: "Impressions",
        clicks: "Clicks",
        ctr: "CTR",
        units: "Units Sold",
        revenue: "Revenue",
        spend: "Spend",
        roi: "ROI"
    };

    metric1.innerHTML = "";
    metric2.innerHTML = "";

    metrics.forEach(m => {
        const opt1 = new Option(labels[m], m);
        const opt2 = new Option(labels[m], m);

        metric1.appendChild(opt1);
        metric2.appendChild(opt2);
    });

    metric1.value = "revenue";
    metric2.value = "spend";

    metric1.addEventListener("change", renderChart);
    metric2.addEventListener("change", renderChart);

    renderChart();
}


function renderChart() {

    const m1 = document.getElementById("metric1").value;
    const m2 = document.getElementById("metric2").value;

    const container = document.querySelector(".chart-container");

    if (!chartData || chartData.length === 0) {
        container.innerHTML = "No chart data";
        return;
    }

    // Simple placeholder visualization
    container.innerHTML = `
        <div style="font-size:14px;">
            <b>Chart Preview</b><br><br>
            Metric 1: ${m1}<br>
            Metric 2: ${m2}<br><br>
            Data Points: ${chartData.length}
        </div>
    `;
}