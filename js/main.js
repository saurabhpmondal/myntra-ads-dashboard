// MAIN ENTRY - UI INIT ONLY

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";
import { renderTable } from "./ui/table.js";
import { setupSearch } from "./ui/search.js";

function init() {

    // KPI Cards
    renderKPICards();

    // Chart dropdowns
    setupChartSection();

    // Tabs
    setupTabs();

    // Default table
    renderTable("campaign");

    // Search UI
    setupSearch();

}

init();