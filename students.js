// Function to load students from the database
function loadStudents() {
    fetch('get_student.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const studentList = document.getElementById('students-list');
        studentList.innerHTML = ''; // Clear the current table content

        data.forEach(student => {
            const newRow = `
                <tr data-id="${student.student_id}">
                    <td contenteditable="false">${student.student_id}</td>
                    <td contenteditable="false">${student.name}</td>
                    <td contenteditable="false">${student.course}</td>
                    <td contenteditable="false">${student.section}</td>
                    <td contenteditable="false">${student.email}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" onclick="editStudent('${student.student_id}')" style="background-color: green; color: white;">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent('${student.student_id}')" style="background-color: red; color: white;">Delete</button>
                        <button class="save-btn" onclick="saveStudent('${student.student_id}')" style="background-color: blue; color: white;">Save</button>
                    </td>
                </tr>
            `;
            studentList.insertAdjacentHTML('beforeend', newRow);
        });
    })
    .catch(error => console.error('Error loading students:', error));
}

// Function to save a student entry
function saveStudent(student_id) {
    let row = document.querySelector(`#students-list tr[data-id="${student_id}"]`);
    let cells = row.querySelectorAll('td');

    const name = cells[1].innerText;
    const course = cells[2].innerText;
    const section = cells[3].innerText;
    const email = cells[4].innerText;

    fetch('get_student.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id, name, course, section, email }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cells.forEach((cell, index) => {
            if (index !== 0 && index !== 6) { // Exclude row number and action buttons
                cell.contentEditable = false;
                cell.style.backgroundColor = "";
            }
        });
    })
    .catch((error) => console.error('Error:', error));
}


// Function to delete a student entry
function deleteStudent(student_id) {
    fetch('get_student.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        let row = document.querySelector(`#students-list tr[data-id="${student_id}"]`);
        row.remove();
    })
    .catch((error) => console.error('Error deleting student:', error));
}



// Function to edit a student entry (makes the row editable)
function editStudent(student_id) {
    console.log(`Edit button clicked for student ID: ${student_id}`);
    let row = document.querySelector(`#students-list tr[data-id="${student_id}"]`);
    console.log(row); // Check if row is found
    if (row) {
        let cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            if (index !== 0 && index !== 5) { // Exclude student ID and action buttons
                cell.contentEditable = true;
                cell.style.backgroundColor = "#f9f9f9";
                cell.focus();
            }
        });
    } else {
        console.error(`Row with student ID ${student_id} not found.`);
    }
}



// Function to search students
function searchStudents() {
    const searchValue = document.getElementById('search-students').value.toLowerCase();
    const rows = document.querySelectorAll('#students-list tr');

    rows.forEach(row => {
        const studentId = row.cells[1].innerText.toLowerCase();
        const name = row.cells[2].innerText.toLowerCase();
        const course = row.cells[3].innerText.toLowerCase();
        const section = row.cells[4].innerText.toLowerCase();
        const email = row.cells[5].innerText.toLowerCase();

        if (studentId.includes(searchValue) || name.includes(searchValue) || course.includes(searchValue) || section.includes(searchValue) || email.includes(searchValue)) {
            row.style.display = ''; // Show row if it matches the search
        } else {
            row.style.display = 'none'; // Hide row if it doesn't match
        }
    });
}



// Function to add a new student with a password
// Function to add a new student with a password
// function addStudent() {
//     const name = prompt("Enter student name:");
//     const email = prompt("Enter email:");
//     const course = prompt("Enter course:");
//     const section = prompt("Enter section:");
//     const password = prompt("Enter password:");

//     if (name && email && course && section && password) {
//         fetch('get_student.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ 
//                 action: 'add', 
//                 name: name, 
//                 email: email, 
//                 course: course, 
//                 section: section, 
//                 password: password // Include password in the request
//             }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.message);
//             loadStudents(); // Reload students after adding
//         })
//         .catch((error) => console.error('Error:', error));
//     } else {
//         alert("Please fill in all fields.");
//     }
// }



// Call loadStudents when the page loads
document.addEventListener('DOMContentLoaded', loadStudents);
