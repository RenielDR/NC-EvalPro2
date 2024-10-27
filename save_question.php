<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection details
$host = "localhost";
$user = "root";  // Default user in XAMPP
$pass = "";  // Default password in XAMPP
$db = "NC_EvalPro";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . $conn->connect_error]));
}

// Create table if not exists
$create_table_sql = "CREATE TABLE IF NOT EXISTS questions (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    criteria VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    rating INT(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($create_table_sql) === FALSE) {
    die(json_encode(['success' => false, 'message' => "Error creating table: " . $conn->error]));
}

// Get JSON data from the request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['questions']) && is_array($data['questions'])) {
    $stmt = $conn->prepare("INSERT INTO questions (criteria, question, rating) VALUES (?, ?, ?)");
    
    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => "Prepare failed: " . $conn->error]));
    }
    
    $stmt->bind_param("ssi", $criteria, $question, $rating);

    foreach ($data['questions'] as $q) {
        $criteria = $q['criteria'];
        $question = $q['question'];
        $rating = $q['rating'];
        if (!$stmt->execute()) {
            die(json_encode(['success' => false, 'message' => "Execute failed: " . $stmt->error]));
        }
    }

    $stmt->close();
    echo json_encode(['success' => true, 'message' => 'Questions saved successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data format']);
}

$conn->close();
