// Function to add a new subject row
function addSubject() {
    const code = prompt("Enter subject code:");
    const subject = prompt("Enter subject name:");
    const description = prompt("Enter subject description:");

    if (code && subject && description) {
        fetch('crudsubject.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, subject, description }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadSubjects(); // Reload subjects after adding
        })
        .catch((error) => console.error('Error:', error));
    }
}

// Function to save a subject entry
function saveSubject(id) {
    let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    const code = cells[1].innerText;
    const subject = cells[2].innerText;
    const description = cells[3].innerText;

    fetch('crudsubject.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, code, subject, description }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cells.forEach((cell, index) => {
            if (index !== 0 && index !== 4) { // Exclude row number and action buttons
                cell.contentEditable = false;
            }
        });
    })
    .catch((error) => console.error('Error:', error));
}

// Function to delete a subject entry
function deleteSubject(id) {
    fetch('crudsubject.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
        row.remove();
    })
    .catch((error) => console.error('Error:', error));
}

// Function to load subjects from the database
function loadSubjects() {
    fetch('crudsubject.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const subjectList = document.getElementById('subject-list');
        subjectList.innerHTML = ''; // Clear the current table content

        data.forEach((subject, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td contenteditable="false">${subject.code}</td>
                <td contenteditable="false">${subject.subject}</td>
                <td contenteditable="false">${subject.description}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editSubject(${subject.id})" style="background-color: green; color: white;">Edit</button>
                    <button class="delete-btn" onclick="deleteSubject(${subject.id})" style="background-color: red; color: white;">Delete</button>
                    <button class="save-btn" onclick="saveSubject(${subject.id})" style="background-color: blue; color: white;">Save</button>
                </td>
            `;
            subjectList.appendChild(newRow);
        });
    })
    .catch(error => console.error('Error loading subjects:', error));
}

// Function to edit a subject entry (makes the row editable)
function editSubject(id) {
    let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    for (let i = 1; i < cells.length - 1; i++) { // Skip first (row number) and last (action buttons)
        cells[i].contentEditable = true;
        cells[i].focus();
    }
}


function searchSubjects() {
        const searchValue = document.getElementById('search-subjects').value.toLowerCase();
        const rows = document.querySelectorAll('#subject-list tr');

        rows.forEach(row => {
            const code = row.cells[1].innerText.toLowerCase();
            const subject = row.cells[2].innerText.toLowerCase();
            const description = row.cells[3].innerText.toLowerCase();

            if (code.includes(searchValue) || subject.includes(searchValue) || description.includes(searchValue)) {
                row.style.display = ''; // Show row if it matches the search
            } else {
                row.style.display = 'none'; // Hide row if it doesn't match
            }
        });
    }
// Call loadSubjects when the page loads
document.addEventListener('DOMContentLoaded', loadSubjects);
