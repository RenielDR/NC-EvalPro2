document.addEventListener('DOMContentLoaded', function () {
    // Get references to the button and table
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const criteriaSelect = document.getElementById('criteria');
    const questionInput = document.getElementById('question');
    const questionTable = document.getElementById('questionTable').querySelector('tbody');
    const submitBtn = document.querySelector('.submit-btn');

    const questionsArray = []; // Store added questions here

    // Add event listener to the Add Question button
addQuestionBtn.addEventListener('click', function () {
    const selectedCriteria = criteriaSelect.value;
    const questionText = questionInput.value;

    // Ensure both criteria and question are filled in
    if (selectedCriteria && questionText) {
        // Create a new row in the table
        const newRow = document.createElement('tr');
        newRow.dataset.criteria = selectedCriteria;  // Store criteria in a data attribute
        newRow.innerHTML = `
            <td class="wide-column">${questionText}</td>
            <td><input type="radio" name="rating-${questionText}" value="5"></td>
            <td><input type="radio" name="rating-${questionText}" value="4"></td>
            <td><input type="radio" name="rating-${questionText}" value="3"></td>
            <td><input type="radio" name="rating-${questionText}" value="2"></td>
            <td><input type="radio" name="rating-${questionText}" value="1"></td>
        `;

        // Append the new row to the table
        questionTable.appendChild(newRow);

        // Clear the inputs
        criteriaSelect.selectedIndex = 0; // Reset dropdown
        questionInput.value = ''; // Clear question input
    } else {
        alert('Please select a criteria and type a question.');
    }
});


    // Add event listener to the Submit button
    document.querySelector('.submit-btn').addEventListener('click', function() {
        const questions = [];
        
        // Loop through all the rows in the table and collect the data
        document.querySelectorAll('.container-blue table tbody tr').forEach(row => {
            const questionText = row.querySelector('td').textContent;  // Get the question text
            const criteria = row.dataset.criteria;  // Assume criteria is stored as a data attribute
    
            questions.push({
                question: questionText,
                criteria: criteria
            });
        });
    
        // Send the data via an AJAX request
        fetch('question_save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questions: questions })  // Send as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    
    
});

// Function to add a question to the table
function addQuestionToTable(questionText) {
    const questionTable = document.querySelector("#questionTable tbody");

    // Create a new row for the question
    const newRow = document.createElement("tr");

    // Set the innerHTML of the new row with the question text and radio buttons
    newRow.innerHTML = `
        <td class="wide-column">${questionText}</td>
        <td><input type="radio" name="rating-${questionText}" value="5"></td>
        <td><input type="radio" name="rating-${questionText}" value="4"></td>
        <td><input type="radio" name="rating-${questionText}" value="3"></td>
        <td><input type="radio" name="rating-${questionText}" value="2"></td>
        <td><input type="radio" name="rating-${questionText}" value="1"></td>
    `;

    // Append the new row to the table
    questionTable.appendChild(newRow);
}

// Fetch and display questions on page load
document.addEventListener('DOMContentLoaded', function() {
    fetch('get_question.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.container-blue table tbody');

            // Clear the table body before appending new data
            tableBody.innerHTML = '';

            // Add each question to the table using addQuestionToTable
            data.forEach(questionData => {
                addQuestionToTable(questionData.question);  // Use the reusable function
            });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
});




function fetchQuestions() {
    fetch('get_question.php')
        .then(response => response.json()) // Ensure the response is valid JSON
        .then(data => {
            // Clear the table body before appending new data
            const questionTable = document.querySelector("#questionTable tbody");
            questionTable.innerHTML = ''; // Clear existing table rows

            // Add each question to the table
            data.forEach(question => {
                addQuestionToTable(question);  // Render each question with radio buttons
            });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

