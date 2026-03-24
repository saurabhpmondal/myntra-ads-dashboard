// FILTER ENGINE

// Convert YYYYMMDD → JS Date
function parseDate(dateStr) {

    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6) - 1;
    const day = dateStr.substring(6, 8);

    return new Date(year, month, day);
}


// Get today's date (system)
function getToday() {
    return new Date();
}


// Apply filter
export function applyDateFilter(data, filterType, customRange = {}) {

    const today = getToday();

    return data.filter(row => {

        const rowDate = parseDate(row["Date"]);

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

        // CUSTOM RANGE
        if (filterType === "custom") {

            const { start, end } = customRange;

            if (!start || !end) return true;

            const startDate = new Date(start);
            const endDate = new Date(end);

            return rowDate >= startDate && rowDate <= endDate;
        }

        return true;

    });

}