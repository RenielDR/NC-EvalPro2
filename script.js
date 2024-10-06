// Function to toggle sidebar collapse
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('main-content');

    if (window.innerWidth <= 600) {
        // Handle mobile view
        sidebar.classList.toggle('open');

    } else {
        // Handle larger screens
        sidebar.classList.toggle('collapsed');
    }
}

function showContent(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show the selected section
    document.getElementById(section).classList.add('active');

    // Hide the sidebar on mobile after clicking an item
    if (window.innerWidth <= 600) {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open'); // Hide the sidebar
    }
}

// Function for logout (placeholder function)
function logout() {
    alert("You have been logged out.");
    // Logic for logging out can be added here
}

// Function to add a new class
function addClass() {
    let classList = document.getElementById('class-list');
    let newRow = document.createElement('tr');
    let rowCount = classList.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="false">New Class</td>
        <td class="action-buttons">
            <select onchange="classAction(this, ${rowCount})">
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="save">Save</option>
            </select>
        </td>
    `;
    classList.appendChild(newRow);
}

// Function to handle class actions based on dropdown selection
function classAction(selectElement, id) {
    const action = selectElement.value;

    if (action === "edit") {
        editClass(id);
    } else if (action === "delete") {
        deleteClass(id);
    } else if (action === "save") {
        saveClass(id);
    }
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
}

// Function to delete a class entry
function deleteClass(id) {
    let row = document.querySelector(`#class-list tr:nth-child(${id})`);
    row.remove();
}

// Function to add a new subject row
function addSubject() {
    let subjectList = document.getElementById('subject-list');
    let newRow = document.createElement('tr');
    let rowCount = subjectList.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="false">New Code</td>
        <td contenteditable="false">New Subject</td>
        <td contenteditable="false">Description</td>
        <td class="action-buttons">
            <select onchange="subjectAction(this, ${rowCount})">
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="save">Save</option>
            </select>
        </td>
    `;
    subjectList.appendChild(newRow);
}

// Function to handle subject actions based on dropdown selection
function subjectAction(selectElement, id) {
    const action = selectElement.value;

    if (action === "edit") {
        editSubject(id);
    } else if (action === "delete") {
        deleteSubject(id);
    } else if (action === "save") {
        saveSubject(id);
    }
}

// Function to edit a subject entry (makes the row editable)
function editSubject(id) {
    let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 4) { // Exclude first (row number) and last (action buttons)
            cell.contentEditable = true;
            cell.focus();
        }
    });
}

// Function to save a subject entry
function saveSubject(id) {
    let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 4) { // Exclude first (row number) and last (action buttons)
            cell.contentEditable = false;
        }
    });
}

// Function to delete a subject entry
function deleteSubject(id) {
    let row = document.querySelector(`#subject-list tr:nth-child(${id})`);
    row.remove();
}

// Function to add a new academic year with a dropdown for actions
function addNewAcademicYear() {
    let academicYearList = document.getElementById('academic-list');  // Assuming a tbody with id 'academic-list'
    let newRow = document.createElement('tr');
    let rowCount = academicYearList.rows.length + 1;

    newRow.innerHTML = `
        <td data-label="No.">${rowCount}</td>
        <td data-label="Year" contenteditable="false">New Year</td>
        <td data-label="Semester" contenteditable="false">1</td>
        <td data-label="System Default"><button class="status-btn yes">Yes</button></td>
        <td data-label="Evaluation Status"><button class="status-btn starting">Starting</button></td>
        <td data-label="Action" class="action-buttons">
            <select onchange="academicYearAction(this, ${rowCount})">
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="save">Save</option>
            </select>
        </td>
    `;
    academicYearList.appendChild(newRow);
}

// Function to handle academic year actions based on dropdown selection
function academicYearAction(selectElement, id) {
    const action = selectElement.value;

    if (action === "edit") {
        editAcademicYear(id);
    } else if (action === "delete") {
        deleteAcademicYear(id);
    } else if (action === "save") {
        saveAcademicYear(id);
    }
}

// Function to edit an academic year entry (makes the row editable)
function editAcademicYear(id) {
    let row = document.querySelector(`#academic-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');

    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 3 && index !== 4) { // Exclude first (row number), System Default, and Evaluation Status columns
            cell.contentEditable = true;
            cell.focus();
            // Remove focus from the dropdown
            let dropdown = row.querySelector('select');
            if (dropdown) {
                dropdown.blur(); // Remove focus from the dropdown
            }
        }
    });
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
}

// Function to delete an academic year entry
function deleteAcademicYear(id) {
    let row = document.querySelector(`#academic-list tr:nth-child(${id})`);
    row.remove();
}




let totalQuestionCount = 0;  // Tracks total number of questions
let criteriaCount = 0;       // Tracks the number of criteria

// Function to add a new criteria in a separate container
function addCriteria() {
    criteriaCount++;  // Increment the criteria count

    const questionnaireList = document.getElementById("questionnaire-list");

    // Create a container div for each new criteria
    const criteriaContainer = document.createElement("div");
    criteriaContainer.classList.add("criteria-container");  // Class for styling each criteria container
    criteriaContainer.setAttribute("id", `criteria-container-${criteriaCount}`);

    // Create a div to hold the new criteria and its questions
    const criteriaDiv = document.createElement("div");
    criteriaDiv.classList.add("criteria-item");
    criteriaDiv.setAttribute("id", `criteria-${criteriaCount}`);
    criteriaDiv.innerHTML = `
        <h3>Criteria ${criteriaCount}:</h3>
        <select id="criteria-select-${criteriaCount}" name="criteria${criteriaCount}" required>
            <option value="">Select Criteria</option>
            <option value="Teaching Skills">Teaching Skills</option>
            <option value="Class Management">Class Management</option>
            <option value="Subject Knowledge">Subject Knowledge</option>
            <option value="Student Engagement">Student Engagement</option>
        </select>
        <div id="questions-for-criteria-${criteriaCount}"></div>
    `;

    // Append the new criteria div to the container
    criteriaContainer.appendChild(criteriaDiv);

    // Append the criteria container to the questionnaire list
    questionnaireList.appendChild(criteriaContainer);
}

// Function to add a new question under the last added criteria
function addQuestion() {
    if (criteriaCount === 0) {
        alert("Please add a criteria first!");
        return;
    }

    totalQuestionCount++;  // Increment the total question count for numbering

    const lastCriteriaDiv = document.getElementById(`questions-for-criteria-${criteriaCount}`);

    // Create a div to hold the new question and its radio buttons
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    questionDiv.innerHTML = `
        <label for="question${totalQuestionCount}">Question ${totalQuestionCount}:</label>
        <input type="text" id="question${totalQuestionCount}" name="question${totalQuestionCount}" placeholder="Enter your question here" required>

        <!-- Radio buttons for ratings -->
        <div class="radio-group">
            <label>
                <input type="radio" name="rating${totalQuestionCount}" value="5" required> 5 - Outstanding
            </label>
            <label>
                <input type="radio" name="rating${totalQuestionCount}" value="4"> 4 - Highly Satisfactory
            </label>
            <label>
                <input type="radio" name="rating${totalQuestionCount}" value="3"> 3 - Satisfactory
            </label>
            <label>
                <input type="radio" name="rating${totalQuestionCount}" value="2"> 2 - Needs Improvement
            </label>
            <label>
                <input type="radio" name="rating${totalQuestionCount}" value="1"> 1 - Poor
            </label>
        </div>
    `;

    // Append the new question to the last criteria
    lastCriteriaDiv.appendChild(questionDiv);
}

// Function to handle form submission
document.getElementById("questionnaireForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(this);
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`); // Log each form entry (criteria, question, and rating)
    }

    // You can process or send this data to your server as needed
    alert("Questionnaire submitted successfully!");
});








// Function to add a new faculty with a dropdown for actions
function addNewFaculty() {
    let facultyList = document.getElementById('faculty-list');  // Assuming a table with id 'faculty-list'
    let newRow = document.createElement('tr');
    let rowCount = facultyList.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="false">New Faculty Name</td>
        <td contenteditable="false">Department</td>
        <td contenteditable="false">Email</td>
        <td>
            <select onchange="facultyAction(this, ${rowCount})">
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
            </select>
        </td>
    `;
    facultyList.appendChild(newRow);
}

// Function to handle faculty actions based on dropdown selection
function facultyAction(selectElement, id) {
    const action = selectElement.value;
    
    if (action === "edit") {
        editFaculty(id);
    } else if (action === "delete") {
        deleteFaculty(id);
    }
}

// Function to edit a faculty entry (makes the row editable)
function editFaculty(id) {
    let row = document.querySelector(`#faculty-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');
    
    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 4) { // Exclude first (row number) and last (dropdown)
            cell.contentEditable = true;
            cell.focus();
        }
    });
}

// Function to delete a faculty entry
function deleteFaculty(id) {
    let row = document.querySelector(`#faculty-list tr:nth-child(${id})`);
    row.remove();
}






// Function to add a new student with a dropdown for actions
function addNewStudent() {
    let studentList = document.getElementById('student-list');  // Assuming a table with id 'student-list'
    let newRow = document.createElement('tr');
    let rowCount = studentList.rows.length + 1;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="false">New Student Name</td>
        <td contenteditable="false">Course</td>
        <td contenteditable="false">Year</td>
        <td>
            <select onchange="studentAction(this, ${rowCount})">
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
            </select>
        </td>
    `;
    studentList.appendChild(newRow);
}

// Function to handle student actions based on dropdown selection
function studentAction(selectElement, id) {
    const action = selectElement.value;
    
    if (action === "edit") {
        editStudent(id);
    } else if (action === "delete") {
        deleteStudent(id);
    }
}

// Function to edit a student entry (makes the row editable)
function editStudent(id) {
    let row = document.querySelector(`#student-list tr:nth-child(${id})`);
    let cells = row.querySelectorAll('td');
    
    cells.forEach((cell, index) => {
        if (index !== 0 && index !== 4) { // Exclude first (row number) and last (dropdown)
            cell.contentEditable = true;
            cell.focus();
        }
    });
}

// Function to delete a student entry
function deleteStudent(id) {
    let row = document.querySelector(`#student-list tr:nth-child(${id})`);
    row.remove();
}

