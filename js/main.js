// MAIN ENTRY - FULLY DYNAMIC DASHBOARD

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


// Normalize columns
function normalizeRow(row) {
    return {
        Date: row["Date"],
        "Campaign Name": row["Campaign Name"],
        Impressions: Number(row["Impressions"] || 0),
        Clicks: Number(row["Clicks"] || 0),
        Spend: Number(row["Spend"] || 0),
        Revenue: Number(row["Revenue"] || row["Total Revenue (Rs.)"] || 0),
        "Units Sold": Number(row["Units Sold"] || row["Total Units"] || 0)
    };
}


// GLOBAL STATE
let rawDaily = [];
let rawPlacement = [];
let currentFilter = "current";


// MAIN INIT
async function init() {

    const { daily, placement } = await loadAllData();

    rawDaily = daily.map(normalizeRow);
    rawPlacement = placement;

    setupChartSection([]); // init empty
    setupSearch();

    setupDateFilter();

    // First render
    updateDashboard();

}


// CORE UPDATE FUNCTION (VERY IMPORTANT)
function updateDashboard() {

    // Apply filter
    const filtered = applyDateFilter(rawDaily, currentFilter);

    // KPI
    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    // Reports
    const campaignData = buildCampaignReport(filtered);
    const dailyData = buildDailyReport(filtered);

    // Chart
    const chartData = buildChartData(dailyData);
    setupChartSection(chartData);

    // Data Store
    const dataStore = {
        render: (type) => {

            if (type === "campaign") {
                renderTable("campaign", campaignData);
            }

            if (type === "daily") {
                renderTable("daily", dailyData);
            }

            if (type === "placement") {

                // Placement only works for month filters
                if (currentFilter === "current" || currentFilter === "lastMonth") {
                    renderTable("placement", rawPlacement);
                } else {
                    renderTable("placement", []);
                }
            }
        }
    };

    // Default
    dataStore.render("campaign");

    // Tabs
    setupTabs(dataStore);

}


// DATE FILTER HANDLER
function setupDateFilter() {

    const filter = document.getElementById("dateFilter");

    filter.addEventListener("change", (e) => {

        currentFilter = e.target.value;

        updateDashboard();

    });

}


// START
init();