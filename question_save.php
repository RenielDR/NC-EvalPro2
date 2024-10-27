<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Database connection
$conn = new mysqli('localhost', 'root', '', 'NC_EvalPro');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the raw POST data and decode the JSON
$data = json_decode(file_get_contents("php://input"), true);

// Check if the 'questions' key exists in the decoded data
if (isset($data['questions'])) {
    $stmt = $conn->prepare("INSERT INTO questions (criteria, question) VALUES (?, ?)");

    foreach ($data['questions'] as $questionData) {
        $criteria = $questionData['criteria'];
        $questionText = $questionData['question'];

        // Bind the parameters and execute the query
        $stmt->bind_param("ss", $criteria, $questionText);
        $stmt->execute();
    }

    $stmt->close();
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No questions found']);
}

$conn->close();
?>