// FILTER ENGINE - FIXED

function parseDate(dateStr) {

    if (!dateStr) return null;

    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6) - 1;
    const day = dateStr.substring(6, 8);

    return new Date(year, month, day);
}


// APPLY FILTER
export function applyDateFilter(data, filterType) {

    // 🔥 DEFAULT → NO FILTER
    if (filterType === "all") {
        return data;
    }

    const today = new Date();

    return data.filter(row => {

        const rowDate = parseDate(row["Date"]);

        if (!rowDate) return false;

        // CURRENT MONTH
        if (filterType === "current") {
            return (
                rowDate.getMonth() === today.getMonth() &&
                rowDate.getFullYear() === today.getFullYear()
            );
        }

        // LAST MONTH
        if (filterType === "lastMonth") {

            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);

            return (
                rowDate.getMonth() === lastMonth.getMonth() &&
                rowDate.getFullYear() === lastMonth.getFullYear()
            );
        }

        // LAST 7 DAYS
        if (filterType === "last7days") {

            const last7 = new Date();
            last7.setDate(today.getDate() - 7);

            return rowDate >= last7 && rowDate <= today;
        }

        return true;
    });

}