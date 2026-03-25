// DATA LOADER - FIXED FOR GITHUB PAGES

function getBasePath() {
    // Example:
    // https://abhpmondal.github.io/myntra-ads-dashboard/
    const path = window.location.pathname.split("/");
    
    // repo name is first folder
    const repoName = path[1];

    return "/" + repoName;
}


export async function loadCSV(fileName) {

    try {

        const base = getBasePath();
        const url = `${base}/data/${fileName}`;

        const response = await fetch(url);

        if (!response.ok) {
            alert("File not found: " + url);
            return [];
        }

        const text = await response.text();

        return parseCSV(text);

    } catch (error) {
        alert("CSV Load Error");
        return [];
    }
}


// ROBUST CSV PARSER
function parseCSV(text) {

    const rows = text.trim().split("\n");

    if (rows.length < 2) return [];

    const headers = rows[0].split(",").map(h => h.trim());

    const data = [];

    for (let i = 1; i < rows.length; i++) {

        const values = rows[i].split(",");

        const obj = {};

        headers.forEach((header, index) => {
            obj[header] = (values[index] || "").trim();
        });

        data.push(obj);
    }

    return data;
}


// LOAD ALL DATA
export async function loadAllData() {

    const daily = await loadCSV("daily.csv");
    const placement = await loadCSV("placement.csv");
    const product = await loadCSV("product.csv");

    alert("Daily rows: " + daily.length); // MOBILE DEBUG

    return {
        daily,
        placement,
        product
    };
}