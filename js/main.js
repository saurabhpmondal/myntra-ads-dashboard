// MAIN ENTRY - FINAL FIX (ROBUST NORMALIZATION)

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


// 🔥 SMART NORMALIZATION (AUTO DETECT HEADERS)
function normalizeRow(row) {

    const keys = Object.keys(row);

    const get = (...names) => {
        for (let n of names) {
            if (row[n] !== undefined) return row[n];
        }
        return "";
    };

    return {
        Date: get("Date", "date"),

        "Campaign Name":
            get("Campaign Name", "campaign_name", "Campaign"),

        Impressions:
            Number(get("Impressions", "Views", "views", "impressions") || 0),

        Clicks:
            Number(get("Clicks", "clicks") || 0),

        Spend:
            Number(
                get("Spend", "Ad Spend", "Total Spends", "cost") || 0
            ),

        Revenue:
            Number(
                get("Revenue", "Total Revenue (Rs.)", "Revenue (Rs.)") || 0
            ),

        "Units Sold":
            Number(
                get("Units Sold", "Total Units", "Units") || 0
            ),

        campaign_id:
            get("Campaign ID", "campaign_id")
    };
}


// GLOBAL STATE
let rawDaily = [];
let rawPlacement = [];

let currentFilter = "all";

let campaignData = [];
let dailyData = [];


// INIT
async function init() {

    const { daily, placement } = await loadAllData();

    // 🔥 DEBUG SAMPLE
    alert("Sample Row: " + JSON.stringify(daily[0]));

    rawDaily = daily.map(normalizeRow);
    rawPlacement = placement;

    setupChartSection([]);
    setupDateFilter();

    updateDashboard();
}


// UPDATE
function updateDashboard() {

    const filtered = applyDateFilter(rawDaily, currentFilter);

    const kpi = calculateKPI(filtered);
    renderKPICards(kpi);

    campaignData = buildCampaignReport(filtered);
    dailyData = buildDailyReport(filtered);

    setSearchData(campaignData);

    const chartData = buildChartData(dailyData);
    setupChartSection(chartData);

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

                if (currentFilter === "current" || currentFilter === "lastMonth" || currentFilter === "all") {
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