// Function to add a new academic year with buttons for actions
function addNewAcademicYear() {
    let academicYearList = document.getElementById('academic-list');
    let newRow = document.createElement('tr');
    let rowCount = academicYearList.rows.length + 1;

    newRow.innerHTML = `
        <td data-label="No.">${rowCount}</td>
        <td data-label="Year" contenteditable="false">New Year</td>
        <td data-label="Semester" contenteditable="false">1</td>
        <td data-label="System Default"><button class="status-btn yes">Yes</button></td>
        <td data-label="Evaluation Status"><button class="status-btn starting">Starting</button></td>
        <td data-label="Action" class="action-buttons">
            <button class="edit-btn" onclick="editAcademicYear(${rowCount})" style="background-color: green; color: white;">Edit</button>
            <button class="delete-btn" onclick="deleteAcademicYear(${rowCount})" style="background-color: red; color: white;">Delete</button>
            <button class="save-btn" onclick="saveAcademicYear(${rowCount})" style="background-color: blue; color: white;" disabled>Save</button>
        </td>
    `;
    academicYearList.appendChild(newRow);
}

// Function to edit an academic year entry (makes the row editable)
function editAcademicYear(id) {
    let row = document.querySelector(`#academic-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 3 && index !== 4) { // Exclude first (row number), System Default, and Evaluation Status columns
            cell.contentEditable = true;
            cell.focus();
        }
    });

    // Enable the Save button
    let saveBtn = row.querySelector('.save-btn');
    saveBtn.disabled = false;
}

// Function to save an academic year entry
function saveAcademicYear(id) {
    let row = document.querySelector(`#academic-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 3 && index !== 4) { // Exclude first (row number), System Default, and Evaluation Status columns
            cell.contentEditable = false;
        }
    });

    // Disable the Save button after saving
    let saveBtn = row.querySelector('.save-btn');
    saveBtn.disabled = true;
}

// Function to delete an academic year entry
function deleteAcademicYear(id) {
    let row = document.querySelector(`#academic-list tr:nth-child(${id})`);
    row.remove();
}
