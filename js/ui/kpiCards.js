// KPI CARDS RENDERER (UI ONLY - DUMMY DATA)

export function renderKPICards() {

    const container = document.getElementById("kpiContainer");

    const kpis = [
        { title: "Impressions", value: "1,20,000" },
        { title: "Clicks", value: "8,500" },
        { title: "CTR", value: "7.08%" },
        { title: "Units Sold", value: "1,200" },
        { title: "Revenue", value: "₹4,50,000" },
        { title: "Spend", value: "₹1,20,000" },
        { title: "ROI", value: "3.75" }
    ];

    container.innerHTML = "";

    kpis.forEach(kpi => {

        const card = document.createElement("div");
        card.className = "kpi-card";

        card.innerHTML = `
            <div class="kpi-title">${kpi.title}</div>
            <div class="kpi-value">${kpi.value}</div>
        `;

        container.appendChild(card);

    });

}