// MAIN ENTRY - CONNECT DATA + UI

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";
import { renderTable } from "./ui/table.js";
import { setupSearch } from "./ui/search.js";

import { loadAllData } from "./core/dataLoader.js";
import { applyDateFilter } from "./core/filterEngine.js";

import { calculateKPI } from "./engine/kpiEngine.js";
import { buildCampaignReport, buildDailyReport } from "./engine/aggregationEngine.js";


// 🔹 Normalize column names (VERY IMPORTANT)
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
    const { daily } = await loadAllData();

    // Normalize
    const normalized = daily.map(normalizeRow);

    // Apply filter (default: current month)
    const filtered = applyDateFilter(normalized, "current");

    // KPI
    const kpi = calculateKPI(filtered);

    // Render KPI
    renderKPICards(kpi);

    // Chart setup
    setupChartSection();

    // Reports
    const campaignData = buildCampaignReport(filtered);
    const dailyData = buildDailyReport(filtered);

    // Default table
    renderTable("campaign", campaignData);

    // Tabs
    setupTabs();

    // Search
    setupSearch();

}

init();