// DATA LOADER - CSV FETCH & PARSE

export async function loadCSV(path) {
    try {
        const response = await fetch(path);
        const text = await response.text();

        return parseCSV(text);

    } catch (error) {
        console.error("Error loading CSV:", path, error);
        return [];
    }
}


// SIMPLE CSV PARSER
function parseCSV(text) {

    const rows = text.trim().split("\n");
    const headers = rows[0].split(",");

    const data = [];

    for (let i = 1; i < rows.length; i++) {

        const values = rows[i].split(",");
        const obj = {};

        headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
        });

        data.push(obj);
    }

    return data;
}


// LOAD ALL DATA FILES
export async function loadAllData() {

    const daily = await loadCSV("data/daily.csv");
    const placement = await loadCSV("data/placement.csv");
    const product = await loadCSV("data/product.csv");

    return {
        daily,
        placement,
        product
    };
}