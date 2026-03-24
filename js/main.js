// MAIN ENTRY - FULL DATA FLOW

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";
import { renderTable } from "./ui/table.js";
import { setupSearch } from "./ui/search.js";

import { loadAllData } from "./core/dataLoader.js";
import { applyDateFilter } from "./core/filterEngine.js";

import { calculateKPI } from "./engine/kpiEngine.js";
import { buildCampaignReport, buildDailyReport } from "./engine/aggregationEngine.js";


// Normalize columns
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

    // Load data
    const { daily, placement } = await loadAllData();

    const normalized = daily.map(normalizeRow);

    // Default filter
    const filtered = applyDateFilter(normalized, "current");

    // KPI
    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    // Chart UI
    setupChartSection();

    // Reports
    const campaignData = buildCampaignReport(filtered);
    const dailyData = buildDailyReport(filtered);

    // Placement (no filter logic yet)
    const placementData = placement;

    // 🔥 DATA STORE (IMPORTANT)
    const dataStore = {
        render: (type) => {

            if (type === "campaign") {
                renderTable("campaign", campaignData);
            }

            if (type === "daily") {
                renderTable("daily", dailyData);
            }

            if (type === "placement") {
                if (!placementData || placementData.length === 0) {
                    renderTable("placement", []);
                } else {
                    renderTable("placement", placementData);
                }
            }

        }
    };

    // Default table
    dataStore.render("campaign");

    // Tabs connected
    setupTabs(dataStore);

    // Search UI
    setupSearch();

}

init();