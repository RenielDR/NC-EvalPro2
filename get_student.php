<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$servername = "localhost";
$username = "root";  // Default for XAMPP
$password = "";
$dbname = "nc_evalpro";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}


// Select the database
$conn->select_db($dbname);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Handle request
switch ($requestMethod) {
    // case 'POST':
    //     addStudent($conn);
    //     break;
    case 'PUT':
        updateStudent($conn);
        break;
    case 'DELETE':
        deleteStudent($conn);
        break;
    case 'GET':
        loadStudent($conn); // Load faculty on GET request
        break;
    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function loadStudent($conn) {
    $query = "SELECT student_id, name, course, section, email FROM students";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $students = [];
        while ($row = $result->fetch_assoc()) {
            $students[] = $row; // Add each row to the faculty array
        }
        echo json_encode($students); // Return the faculty as JSON
    } else {
        echo json_encode([]); // Return an empty array if no faculty found
    }
}

function updateStudent($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE students SET name = ?, course = ?, section = ?, email = ? WHERE student_id = ?");
    $stmt->bind_param("ssssi", $data['name'], $data['course'], $data['section'], $data['email'], $data['student_id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Student List updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating Student: " . $stmt->error]);
    }
    $stmt->close();
}

function deleteStudent($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM students WHERE student_id = ?");
    $stmt->bind_param("i", $data['student_id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Student deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting student: " . $stmt->error]);
    }
    $stmt->close();
}



$conn->close();
?>
