<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection (update with your actual credentials)
$host = "localhost";
$user = "root";  // Default user in XAMPP
$pass = "";  // Default password in XAMPP
$db = "NC_EvalPro";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch questions from the database
$sql = "SELECT criteria, question FROM questions"; // Adjust the SQL as necessary
$result = $conn->query($sql);

$questions = [];

if ($result->num_rows > 0) {
    // Fetch all questions
    while($row = $result->fetch_assoc()) {
        $questions[] = $row; // Add each question to the array
    }
}

// Return questions as JSON
header('Content-Type: application/json');
echo json_encode($questions);

// Close the database connection
$conn->close();
?>
