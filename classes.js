// Function to add a new class
function addClass() {
    let classList = document.getElementById('class-list');
    let newRow = document.createElement('tr');
    let rowCount = classList.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="false">New Class</td>
        <td class="action-buttons">
            <button class="edit-btn" onclick="editClass(${rowCount})" style="background-color: green; color: white;">Edit</button>
            <button class="delete-btn" onclick="deleteClass(${rowCount})" style="background-color: red; color: white;">Delete</button>
            <button class="save-btn" onclick="saveClass(${rowCount})" style="background-color: blue; color: white;">Save</button>
        </td>
    `;
    classList.appendChild(newRow);
}

// Function to edit a class entry (makes the row editable)
function editClass(id) {
    let row = document.querySelector(`#class-list tr:nth-child(${id}) td:nth-child(2)`);
    row.contentEditable = true;
    row.focus();
}

// Function to save a class entry
function saveClass(id) {
    let row = document.querySelector(`#class-list tr:nth-child(${id}) td:nth-child(2)`);
    row.contentEditable = false;

    // Here, you could add logic to send the updated class data to the server if needed.
}

// Function to delete a class entry
function deleteClass(id) {
    let row = document.querySelector(`#class-list tr:nth-child(${id})`);
    row.remove();
}

// Call addClass when you need to add a new class
// For example, attach this function to a button's onclick event:
// <button onclick="addClass()">Add Class</button>
