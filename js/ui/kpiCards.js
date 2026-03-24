// KPI CARDS RENDERER (DYNAMIC DATA)

function formatNumber(num) {
    return Number(num || 0).toLocaleString("en-IN");
}

function formatCurrency(num) {
    return "₹" + formatNumber(num);
}

function formatPercent(num) {
    return (num || 0).toFixed(2) + "%";
}

export function renderKPICards(kpi = {}) {

    const container = document.getElementById("kpiContainer");

    const data = [
        { title: "Impressions", value: formatNumber(kpi.impressions) },
        { title: "Clicks", value: formatNumber(kpi.clicks) },
        { title: "CTR", value: formatPercent(kpi.ctr) },
        { title: "Units Sold", value: formatNumber(kpi.units) },
        { title: "Revenue", value: formatCurrency(kpi.revenue) },
        { title: "Spend", value: formatCurrency(kpi.spend) },
        { title: "ROI", value: (kpi.roi || 0).toFixed(2) }
    ];

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "kpi-card";

        card.innerHTML = `
            <div class="kpi-title">${item.title}</div>
            <div class="kpi-value">${item.value}</div>
        `;

        container.appendChild(card);

    });

}