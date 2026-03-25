// MAIN ENTRY - FULLY DYNAMIC WITH SEARCH

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";
import { renderTable } from "./ui/table.js";
import { setupSearch, setSearchData } from "./ui/search.js";

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
        Impressions: Number(row["Impressions"] || 0),
        Clicks: Number(row["Clicks"] || 0),
        Spend: Number(row["Spend"] || 0),
        Revenue: Number(row["Revenue"] || row["Total Revenue (Rs.)"] || 0),
        "Units Sold": Number(row["Units Sold"] || row["Total Units"] || 0),
        campaign_id: row["Campaign ID"] || ""
    };
}


// GLOBAL STATE
let rawDaily = [];
let rawPlacement = [];
let currentFilter = "current";

let campaignData = [];
let dailyData = [];


// INIT
async function init() {

    const { daily, placement } = await loadAllData();

    rawDaily = daily.map(normalizeRow);
    rawPlacement = placement;

    setupChartSection([]);
    setupDateFilter();

    updateDashboard();

}


// MAIN UPDATE FUNCTION
function updateDashboard() {

    const filtered = applyDateFilter(rawDaily, currentFilter);

    // KPI
    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    // Reports
    campaignData = buildCampaignReport(filtered);
    dailyData = buildDailyReport(filtered);

    // Provide search data
    setSearchData(campaignData);

    // Chart
    const chartData = buildChartData(dailyData);
    setupChartSection(chartData);

    // DATA STORE
    const dataStore = {
        render: (type) => {

            if (type === "campaign") {
                renderTable("campaign", campaignData);

                // Attach search
                setupSearch((filteredData) => {
                    renderTable("campaign", filteredData);
                });
            }

            if (type === "daily") {
                renderTable("daily", dailyData);
            }

            if (type === "placement") {

                if (currentFilter === "current" || currentFilter === "lastMonth") {
                    renderTable("placement", rawPlacement);
                } else {
                    renderTable("placement", []);
                }
            }
        }
    };

    dataStore.render("campaign");
    setupTabs(dataStore);

}


// DATE FILTER
function setupDateFilter() {

    const filter = document.getElementById("dateFilter");

    filter.addEventListener("change", (e) => {

        currentFilter = e.target.value;
        updateDashboard();

    });

}


// START
init();