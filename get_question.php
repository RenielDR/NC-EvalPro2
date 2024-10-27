<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Suppress warnings and notices to avoid invalid JSON output
error_reporting(E_ERROR | E_PARSE);  // This will show only errors and suppress notices or warnings

// Database connection
$conn = new mysqli('localhost', 'root', '', 'NC_EvalPro');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT criteria, question FROM questions";
$result = $conn->query($sql);

$questions = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

// Set the header to tell the browser we're returning JSON
header('Content-Type: application/json');
echo json_encode($questions);

$conn->close();
?>