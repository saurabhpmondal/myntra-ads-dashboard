// MAIN ENTRY - FINAL FIX (NUMBERS + DATE FIXED)

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


// 🔥 CLEAN NUMBER FUNCTION
function cleanNumber(value) {
    if (!value) return 0;

    return Number(
        value
            .toString()
            .replace(/₹/g, "")
            .replace(/,/g, "")
            .trim()
    ) || 0;
}


// 🔥 NORMALIZATION (FINAL)
function normalizeRow(row) {

    const get = (...names) => {
        for (let n of names) {
            if (row[n] !== undefined) return row[n];
        }
        return "";
    };

    return {
        Date: get("Date", "date"),

        "Campaign Name":
            get("Campaign Name", "campaign_name", "Campaign") || "Unknown",

        Impressions:
            cleanNumber(get("Impressions", "Views", "views")),

        Clicks:
            cleanNumber(get("Clicks")),

        Spend:
            cleanNumber(get("Spend", "Ad Spend", "Total Spends")),

        Revenue:
            cleanNumber(get("Revenue", "Total Revenue (Rs.)")),

        "Units Sold":
            cleanNumber(get("Units Sold", "Total Units")),

        campaign_id:
            get("Campaign ID", "campaign_id") || ""
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

    rawDaily = daily.map(normalizeRow);
    rawPlacement = placement;

    setupChartSection([]);
    setupDateFilter();

    updateDashboard();
}


// UPDATE DASHBOARD
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