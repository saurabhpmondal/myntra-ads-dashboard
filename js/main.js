// MAIN ENTRY - FIXED COLUMN MAPPING

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


// ✅ REAL NORMALIZATION (Myntra Format)
function normalizeRow(row) {

    return {
        Date: row["Date"],

        "Campaign Name":
            row["Campaign Name"] ||
            row["campaign_name"] ||
            "",

        Impressions:
            Number(row["Impressions"] ||
            row["Views"] ||
            0),

        Clicks:
            Number(row["Clicks"] || 0),

        Spend:
            Number(row["Spend"] ||
            row["Total Spends"] ||
            row["Ad Spend"] ||
            0),

        Revenue:
            Number(row["Revenue"] ||
            row["Total Revenue (Rs.)"] ||
            0),

        "Units Sold":
            Number(row["Units Sold"] ||
            row["Total Units"] ||
            0),

        campaign_id:
            row["Campaign ID"] ||
            row["campaign_id"] ||
            ""
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


// UPDATE DASHBOARD
function updateDashboard() {

    const filtered = applyDateFilter(rawDaily, currentFilter);

    // KPI
    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    // REPORTS
    campaignData = buildCampaignReport(filtered);
    dailyData = buildDailyReport(filtered);

    setSearchData(campaignData);

    // CHART
    const chartData = buildChartData(dailyData);
    setupChartSection(chartData);

    // DATA STORE
    const dataStore = {
        render: (type) => {

            if (type === "campaign") {
                renderTable("campaign", campaignData);

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