// AGGREGATION ENGINE


// COMMON AGGREGATOR
function aggregate(rows) {

    let impressions = 0;
    let clicks = 0;
    let spend = 0;
    let revenue = 0;
    let units = 0;

    rows.forEach(row => {
        impressions += Number(row["Impressions"] || 0);
        clicks += Number(row["Clicks"] || 0);
        spend += Number(row["Spend"] || 0);
        revenue += Number(row["Revenue"] || 0);
        units += Number(row["Units Sold"] || 0);
    });

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const roi = spend > 0 ? (revenue / spend) : 0;

    return {
        impressions,
        clicks,
        spend,
        revenue,
        units,
        ctr,
        roi
    };
}


// GROUP BY KEY
function groupBy(data, key) {

    const grouped = {};

    data.forEach(row => {

        const value = row[key] || "Unknown";

        if (!grouped[value]) {
            grouped[value] = [];
        }

        grouped[value].push(row);
    });

    return grouped;
}


// CAMPAIGN REPORT
export function buildCampaignReport(data) {

    const grouped = groupBy(data, "Campaign Name");

    const result = [];

    for (let campaign in grouped) {

        const agg = aggregate(grouped[campaign]);

        result.push({
            campaign,
            ...agg
        });
    }

    return result;
}


// DAILY REPORT (CHART + TABLE)
export function buildDailyReport(data) {

    const grouped = groupBy(data, "Date");

    const result = [];

    for (let date in grouped) {

        const agg = aggregate(grouped[date]);

        result.push({
            date,
            ...agg
        });
    }

    // Sort by date
    result.sort((a, b) => a.date.localeCompare(b.date));

    return result;
}


// PLACEMENT REPORT (FROM PLACEMENT SHEET)
export function buildPlacementReport(data) {

    const grouped = groupBy(data, "Placement Type");

    const result = [];

    for (let placement in grouped) {

        const agg = aggregate(grouped[placement]);

        result.push({
            placement,
            ...agg
        });
    }

    return result;
}