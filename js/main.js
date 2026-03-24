// MAIN ENTRY - UI INIT ONLY

import { renderKPICards } from "./ui/kpiCards.js";
import { setupChartSection } from "./ui/chartSection.js";
import { setupTabs } from "./ui/tabs.js";

function init() {

    // Render KPI Cards (dummy for now)
    renderKPICards();

    // Setup chart dropdowns
    setupChartSection();

    // Setup tabs
    setupTabs();

}

init();