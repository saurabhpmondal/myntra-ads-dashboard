// TABLE RENDERER (DYNAMIC DATA)

function formatNumber(num) {
    return Number(num || 0).toLocaleString("en-IN");
}

function formatCurrency(num) {
    return "₹" + formatNumber(num);
}

function formatPercent(num) {
    return (num || 0).toFixed(2) + "%";
}


// MAIN RENDER FUNCTION
export function renderTable(type = "campaign", data = []) {

    const container = document.getElementById("tableContainer");

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No data available</p>";
        return;
    }

    let tableHTML = "";

    // ========================
    // CAMPAIGN TABLE
    // ========================
    if (type === "campaign") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Campaign</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Spend</th>
                        <th>Revenue</th>
                        <th>CTR</th>
                        <th>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td>${row.campaign}</td>
                            <td>${formatNumber(row.impressions)}</td>
                            <td>${formatNumber(row.clicks)}</td>
                            <td>${formatCurrency(row.spend)}</td>
                            <td>${formatCurrency(row.revenue)}</td>
                            <td>${formatPercent(row.ctr)}</td>
                            <td>${row.roi.toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    // ========================
    // DAILY TABLE
    // ========================
    if (type === "daily") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Spend</th>
                        <th>Revenue</th>
                        <th>CTR</th>
                        <th>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td>${row.date}</td>
                            <td>${formatNumber(row.impressions)}</td>
                            <td>${formatNumber(row.clicks)}</td>
                            <td>${formatCurrency(row.spend)}</td>
                            <td>${formatCurrency(row.revenue)}</td>
                            <td>${formatPercent(row.ctr)}</td>
                            <td>${row.roi.toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    // ========================
    // PLACEMENT TABLE
    // ========================
    if (type === "placement") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Placement</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Spend</th>
                        <th>Revenue</th>
                        <th>CTR</th>
                        <th>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td>${row.placement}</td>
                            <td>${formatNumber(row.impressions)}</td>
                            <td>${formatNumber(row.clicks)}</td>
                            <td>${formatCurrency(row.spend)}</td>
                            <td>${formatCurrency(row.revenue)}</td>
                            <td>${formatPercent(row.ctr)}</td>
                            <td>${row.roi.toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    container.innerHTML = tableHTML;

}