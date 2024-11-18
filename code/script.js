document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    // Process attendance here and update the report section
    const reportContent = document.getElementById('reportContent');
    const newEntry = document.createElement('p');
    newEntry.textContent = `${studentName} (${rollNumber}) is ${attendance}`;
    reportContent.appendChild(newEntry);

    // Reset form
    document.getElementById('attendanceForm').reset();
});

document.getElementById('fileUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = e.target.result;

        if (file.name.endsWith('.pdf')) {
            // Call the processPdf function from processAttendance.js
            processPdf(file.path);
        } else if (file.name.endsWith('.csv')) {
            // Call the processCsv function from processAttendance.js
            processCsv(file.path);
        } else if (file.name.endsWith('.xlsx')) {
            // Call the processExcel function from processAttendance.js
            processExcel(file.path);
        }
    };

    if (file) {
        reader.readAsArrayBuffer(file);
    }
});
