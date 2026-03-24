// CHART ENGINE - PREPARES DATA FOR GRAPH

export function buildChartData(dailyData) {

    return dailyData.map(row => ({
        date: row.date,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        units: row.units,
        revenue: row.revenue,
        spend: row.spend,
        roi: row.roi
    }));

}