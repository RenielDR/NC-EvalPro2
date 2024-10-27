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
    case 'POST':
        addFaculty($conn);
        break;
    case 'PUT':
        updateFaculty($conn);
        break;
    case 'DELETE':
        deleteFaculty($conn);
        break;
    case 'GET':
        loadFaculty($conn); // Load faculty on GET request
        break;
    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function loadFaculty($conn) {
    $query = "SELECT faculty_id, name, department, email FROM faculty";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $faculty = [];
        while ($row = $result->fetch_assoc()) {
            $faculty[] = $row; // Add each row to the faculty array
        }
        echo json_encode($faculty); // Return the faculty as JSON
    } else {
        echo json_encode([]); // Return an empty array if no faculty found
    }
}

function updateFaculty($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE faculty SET name = ?, department = ?, email = ? WHERE faculty_id = ?");
    $stmt->bind_param("sssi", $data['name'], $data['department'], $data['email'], $data['faculty_id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Faculty updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating Faculty: " . $stmt->error]);
    }
    $stmt->close();
}

function deleteFaculty($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("DELETE FROM faculty WHERE faculty_id = ?");
    $stmt->bind_param("i", $data['faculty_id']);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Faculty deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting faculty: " . $stmt->error]);
    }
    $stmt->close();
}



$conn->close();
?>
