// DATA LOADER - ROBUST CSV PARSER

export async function loadCSV(path) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            console.error("File not found:", path);
            return [];
        }

        const text = await response.text();

        return parseCSV(text);

    } catch (error) {
        console.error("CSV Load Error:", error);
        return [];
    }
}


// ✅ BETTER CSV PARSER (HANDLES QUOTES)
function parseCSV(text) {

    const rows = text.trim().split("\n");

    if (rows.length < 2) return [];

    const headers = rows[0].split(",").map(h => h.trim());

    const data = [];

    for (let i = 1; i < rows.length; i++) {

        const row = rows[i];

        // Handle quoted values
        const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

        if (!values) continue;

        const obj = {};

        headers.forEach((header, index) => {
            let value = values[index] || "";

            value = value.replace(/^"|"$/g, "").trim();

            obj[header] = value;
        });

        data.push(obj);
    }

    return data;
}


// LOAD ALL FILES
export async function loadAllData() {

    const daily = await loadCSV("./data/daily.csv");
    const placement = await loadCSV("./data/placement.csv");
    const product = await loadCSV("./data/product.csv");

    console.log("Daily Rows:", daily.length);
    console.log("Placement Rows:", placement.length);

    return {
        daily,
        placement,
        product
    };
}