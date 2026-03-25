// CHART SECTION WITH CHART.JS

let chartData = [];
let chartInstance = null;

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
        metric1.appendChild(new Option(labels[m], m));
        metric2.appendChild(new Option(labels[m], m));
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

    const ctx = document.getElementById("chartCanvas").getContext("2d");

    const labels = chartData.map(d => d.date);

    const dataset1 = chartData.map(d => d[m1]);
    const dataset2 = chartData.map(d => d[m2]);

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: m1,
                    data: dataset1,
                    borderWidth: 2,
                    yAxisID: "y1"
                },
                {
                    label: m2,
                    data: dataset2,
                    borderWidth: 2,
                    yAxisID: "y2"
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false
            },
            stacked: false,
            scales: {
                y1: {
                    type: "linear",
                    position: "left"
                },
                y2: {
                    type: "linear",
                    position: "right",
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}