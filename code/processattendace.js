const fs = require('fs');
const pdf = require('pdf-parse');
const csv = require('csv-parser');
const xlsx = require('xlsx');

// Function to process PDF files
function processPdf(filePath) {
    let dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then(data => {
        console.log(data.text);
        // Process the extracted text data
    }).catch(err => {
        console.error(err);
    });
}

// Function to process CSV files
function processCsv(filePath) {
    let students = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            students.push(row);
        })
        .on('end', () => {
            console.log(students);
            // Process the extracted data
        });
}

// Function to process Excel files
function processExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);
    // Process the extracted data
}

// Example Usage
processPdf('path/to/attendance.pdf');
processCsv('path/to/attendance.csv');
processExcel('path/to/attendance.xlsx');