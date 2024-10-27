document.addEventListener("DOMContentLoaded", function() {
    fetchQuestionsFromDB(); // Call the function to fetch questions
});

function fetchQuestionsFromDB() {
    // Fetch questions from the database
    fetch('studentpage_getQ.php') // URL to the PHP file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data for debugging
            if (data.error) {
                // If there's an error message in the response
                document.getElementById('questions-table').innerHTML = "<tr><td colspan='6'>" + data.error + "</td></tr>";
            } else {
                // Append questions to the table
                data.forEach(function(question) {
                    document.getElementById('questions-table').innerHTML +=
                        `<tr>
                            <td><strong>${question.question}</strong></td>
                            <td><input type="radio" name="question${question.id}" value="5"></td>
                            <td><input type="radio" name="question${question.id}" value="4"></td>
                            <td><input type="radio" name="question${question.id}" value="3"></td>
                            <td><input type="radio" name="question${question.id}" value="2"></td>
                            <td><input type="radio" name="question${question.id}" value="1"></td>
                        </tr>`;
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
