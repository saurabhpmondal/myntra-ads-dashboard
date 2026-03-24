// MAIN ENTRY - WITH CHART DATA

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";
import { renderTable } from "./ui/table.js";
import { setupSearch } from "./ui/search.js";

import { loadAllData } from "./core/dataLoader.js";
import { applyDateFilter } from "./core/filterEngine.js";

import { calculateKPI } from "./engine/kpiEngine.js";
import { buildCampaignReport, buildDailyReport } from "./engine/aggregationEngine.js";
import { buildChartData } from "./engine/chartEngine.js";


// Normalize
function normalizeRow(row) {
    return {
        Date: row["Date"],
        "Campaign Name": row["Campaign Name"],
        Impressions: row["Impressions"],
        Clicks: row["Clicks"],
        Spend: row["Spend"],
        Revenue: row["Revenue"] || row["Total Revenue (Rs.)"],
        "Units Sold": row["Units Sold"] || row["Total Units"]
    };
}


async function init() {

    const { daily, placement } = await loadAllData();

    const normalized = daily.map(normalizeRow);

    const filtered = applyDateFilter(normalized, "current");

    // KPI
    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    // Reports
    const campaignData = buildCampaignReport(filtered);
    const dailyData = buildDailyReport(filtered);

    // Chart data
    const chartData = buildChartData(dailyData);
    setupChartSection(chartData);

    const dataStore = {
        render: (type) => {

            if (type === "campaign") {
                renderTable("campaign", campaignData);
            }

            if (type === "daily") {
                renderTable("daily", dailyData);
            }

            if (type === "placement") {
                renderTable("placement", placement);
            }

        }
    };

    dataStore.render("campaign");

    setupTabs(dataStore);
    setupSearch();

}

init();