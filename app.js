document.getElementById("fileInput").addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            loadTable(jsonData);
        };
        reader.readAsArrayBuffer(file);
    }
}

// Custom formatter for the progress bar
function progressBarFormatter(cell, formatterParams) {
    const value = parseInt(cell.getValue()) || 0;
    const color = value >= 30 ? "green" : value >= 15 ? "orange" : "red";

    const bar = document.createElement("div");
    bar.style.width = `${value}%`;
    bar.style.height = "100%";
    bar.style.backgroundColor = color;
    bar.style.position = "relative";

    const icon = document.createElement("span");
    icon.innerHTML = "🚀";
    icon.style.position = "absolute";
    icon.style.left = `${value - 10}%`;
    icon.style.color = "black";

    bar.appendChild(icon);

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "20px";
    container.style.backgroundColor = "#e0e0e0";
    container.style.position = "relative";
    container.appendChild(bar);

    return container;
}

// Initialize and load data into Tabulator
function loadTable(data) {
    new Tabulator("#tableContainer", {
        data: data,
        layout: "fitColumns",
        columns: [
            {title: "Name", field: "Name", width: 50},
            {title: "Emp ID", field: "Emp ID", width: 50},
            {title: "Gender", field: "Gender", width: 50},
            {title: "Education Qualification", field: "Education Qualification", width: 50},
            {title: "Date of Join", field: "Date of Join", width: 50},
            {title: "Job Title", field: "Job Title", width: 50},
            {title: "Salary", field: "Salary", width: 50},
            {title: "Age", field: "Age", width: 50},
            {
                title: "Leave Balance",
                field: "Leave Balance", // Change this to match your CSV header
                formatter: progressBarFormatter,
                hozAlign: "left"
            }
        ]
    });
}