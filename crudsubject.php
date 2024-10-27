<?php

header('Content-Type: application/json'); // Set the content type to JSON

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection and setup
$servername = "localhost";
$username = "root";  // Default user in XAMPP
$password = "";  // Default password in XAMPP
$dbname = "NC_EvalPro";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Select the database
$conn->select_db($dbname);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Handle request
switch ($requestMethod) {
    case 'POST':
        addSubject($conn);
        break;
    case 'PUT':
        updateSubject($conn);
        break;
    case 'DELETE':
        deleteSubject($conn);
        break;
    case 'GET':
        loadSubjects($conn); // Load subjects on GET request
        break;
    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function loadSubjects($conn) {
    $query = "SELECT * FROM subjects";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $subjects = [];
        while ($row = $result->fetch_assoc()) {
            $subjects[] = $row; // Add each row to the subjects array
        }
        echo json_encode($subjects); // Return the subjects as JSON
    } else {
        echo json_encode([]); // Return an empty array if no subjects found
    }
}

function addSubject($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $code = $data['code'];
    $subject = $data['subject'];
    $description = $data['description'];

    $stmt = $conn->prepare("INSERT INTO subjects (code, subject, description) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $code, $subject, $description);
    $stmt->execute();
    
    echo json_encode(["message" => "Subject added successfully"]);
    $stmt->close();
}

function updateSubject($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE subjects SET code = ?, subject = ?, description = ? WHERE id = ?");
    $stmt->bind_param("sssi", $data['code'], $data['subject'], $data['description'], $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Subject updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating subject: " . $stmt->error]);
    }
    $stmt->close();
}

function deleteSubject($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM subjects WHERE id = ?");
    $stmt->bind_param("i", $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Subject deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting subject: " . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>
