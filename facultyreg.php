<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


// Database connection variables
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (usually empty)
$dbname = "nc_evalpro";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT); // Hash the password
    $faculty_id = $conn->real_escape_string(trim($_POST['faculty_id'])); // Assuming 'student_id' is the faculty ID
    $department = $conn->real_escape_string(trim($_POST['department']));

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO faculty (faculty_id, name, email, password, department) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $faculty_id, $name, $email, $password, $department);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Registration successful!'); window.location.href='login.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
