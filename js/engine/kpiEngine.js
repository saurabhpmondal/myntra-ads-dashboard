// KPI ENGINE

export function calculateKPI(data) {

    let impressions = 0;
    let clicks = 0;
    let spend = 0;
    let revenue = 0;
    let units = 0;

    data.forEach(row => {

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
        ctr,
        units,
        revenue,
        spend,
        roi
    };
}