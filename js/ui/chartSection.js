// CHART SECTION - FULL (Chart.js Dual Axis)

let chartData = [];
let chartInstance = null;


// Format date: 20260323 → 23 Mar
function formatDate(dateStr) {
    if (!dateStr) return "";

    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6) - 1;
    const day = dateStr.substring(6, 8);

    const date = new Date(year, month, day);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });
}


// Format large numbers (for tooltip)
function formatValue(value, metric) {
    if (metric === "ctr") return value.toFixed(2) + "%";
    if (metric === "roi") return value.toFixed(2);
    if (metric === "revenue" || metric === "spend") {
        return "₹" + Number(value).toLocaleString("en-IN");
    }
    return Number(value).toLocaleString("en-IN");
}


// Setup dropdown + chart
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

    const labelsMap = {
        impressions: "Impressions",
        clicks: "Clicks",
        ctr: "CTR",
        units: "Units Sold",
        revenue: "Revenue",
        spend: "Spend",
        roi: "ROI"
    };

    // Reset dropdowns
    metric1.innerHTML = "";
    metric2.innerHTML = "";

    metrics.forEach(m => {
        metric1.appendChild(new Option(labelsMap[m], m));
        metric2.appendChild(new Option(labelsMap[m], m));
    });

    // Default selection
    metric1.value = "revenue";
    metric2.value = "spend";

    // Events
    metric1.addEventListener("change", renderChart);
    metric2.addEventListener("change", renderChart);

    renderChart();
}


// Render chart
function renderChart() {

    const m1 = document.getElementById("metric1").value;
    const m2 = document.getElementById("metric2").value;

    const canvas = document.getElementById("chartCanvas");

    if (!canvas || !chartData || chartData.length === 0) {
        return;
    }

    const ctx = canvas.getContext("2d");

    const labels = chartData.map(d => formatDate(d.date));

    const dataset1 = chartData.map(d => Number(d[m1] || 0));
    const dataset2 = chartData.map(d => Number(d[m2] || 0));

    // Destroy old chart
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: m1.toUpperCase(),
                    data: dataset1,
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: "y1"
                },
                {
                    label: m2.toUpperCase(),
                    data: dataset2,
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: "y2"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const metric = context.dataset.label.toLowerCase();
                            return context.dataset.label + ": " + formatValue(context.raw, metric);
                        }
                    }
                },
                legend: {
                    position: "top"
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y1: {
                    type: "linear",
                    position: "left",
                    grid: {
                        color: "#eee"
                    }
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