// Function to load Faculty mem. from the database
function loadFaculties() {
    fetch('faculty.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const facultyList = document.getElementById('faculty-list');
        facultyList.innerHTML = ''; // Clear current content

        // Loop through each faculty and append rows
        data.forEach(faculty => {
            const newRow = `
                <tr data-id="${faculty.faculty_id}">
                    <td contenteditable="false">${faculty.faculty_id}</td>
                    <td contenteditable="false">${faculty.name}</td>
                    <td contenteditable="false">${faculty.department}</td>
                    <td contenteditable="false">${faculty.email}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" onclick="editFaculty('${faculty.faculty_id}')" style="background-color: green; color: white;">Edit</button>
                        <button class="delete-btn" onclick="deleteFaculty('${faculty.faculty_id}')" style="background-color: red; color: white;">Delete</button>
                        <button class="save-btn" onclick="saveFaculty('${faculty.faculty_id}')" style="background-color: blue; color: white;">Save</button>
                    </td>
                </tr>
            `;
            facultyList.insertAdjacentHTML('beforeend', newRow);
        });
    })  
    .catch(error => console.error('Error loading faculties:', error));
}




// Function to save a faculty entry
function saveFaculty(faculty_id) {
    let row = document.querySelector(`#faculty-list tr[data-id="${faculty_id}"]`);
    let cells = row.querySelectorAll('td');

    // Retrieve the edited values
    const name = cells[1].innerText;       // Name
    const department = cells[2].innerText; // Department
    const email = cells[3].innerText;      // Email

    // Send the updated data to the server
    fetch('faculty.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faculty_id, name, department, email }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cells.forEach((cell, index) => {
            if (index !== 0 && index !== 4) { // Exclude faculty ID and action buttons
                cell.contentEditable = false; // Make the cells non-editable after saving
                cell.style.backgroundColor = ""; // Reset background color
            }
        });
    })
    .catch(error => console.error('Error saving faculty:', error));
}



// Function to delete a faculty entry
function deleteFaculty(faculty_id) {
    fetch('faculty.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faculty_id }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        const row = document.querySelector(`#faculty-list tr[data-id="${faculty_id}"]`);
        row.remove();
    })
    .catch(error => console.error('Error deleting faculty:', error));
}


function editFaculty(faculty_id) {
    let row = document.querySelector(`#faculty-list tr[data-id="${faculty_id}"]`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 4) { // Exclude faculty ID and action buttons
            cell.contentEditable = true; // Make the cell editable
            cell.style.backgroundColor = "#f9f9f9"; // Optional: Change background color to indicate editing
            cell.focus(); // Focus on the cell to start editing
        }
    });
}



// Function to search faculties
function searchFaculties() {
    const searchValue = document.getElementById('search-faculties').value.toLowerCase();
    const rows = document.querySelectorAll('#faculty-list tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const matches = Array.from(cells).some(cell => cell.innerText.toLowerCase().includes(searchValue));

        row.style.display = matches ? '' : 'none'; // Show or hide row based on match
    });
}


// Call loadFaculties when the page loads
document.addEventListener('DOMContentLoaded', loadFaculties);
