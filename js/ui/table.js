// TABLE RENDERER (UI ONLY - DUMMY DATA)

export function renderTable(type = "campaign") {

    const container = document.getElementById("tableContainer");

    let tableHTML = "";

    if (type === "campaign") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Campaign</th>
                        <th>Status</th>
                        <th>Budget</th>
                        <th>Spend</th>
                        <th>Impressions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Campaign A</td>
                        <td><span class="badge success">Active</span></td>
                        <td>₹20,000</td>
                        <td>₹10,000</td>
                        <td>200,000</td>
                    </tr>
                </tbody>
            </table>
        `;

    }

    if (type === "daily") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Spend</th>
                        <th>Revenue</th>
                        <th>Clicks</th>
                        <th>Impressions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>23 Mar</td>
                        <td>₹5,000</td>
                        <td>₹20,000</td>
                        <td>1,200</td>
                        <td>50,000</td>
                    </tr>
                </tbody>
            </table>
        `;

    }

    if (type === "placement") {

        tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Placement</th>
                        <th>Spend</th>
                        <th>Revenue</th>
                        <th>Clicks</th>
                        <th>Impressions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Search</td>
                        <td>₹15,000</td>
                        <td>₹60,000</td>
                        <td>3,500</td>
                        <td>120,000</td>
                    </tr>
                </tbody>
            </table>
        `;

    }

    container.innerHTML = tableHTML;

}