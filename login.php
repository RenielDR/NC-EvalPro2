<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Database connection setup
$servername = "localhost";
$username = "root";  // Default user in XAMPP
$password = "";  // Default password in XAMPP
$dbname = "NC_EvalPro";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection to database failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $student_id = $_POST['student_id'];
    $password = $_POST['password'];
    $user_type = $_POST['user_type'];

    // Prepare variables for SQL statement
    $hashed_password = null;

    // Prepare and bind the SQL statement based on user type
    if ($user_type == "student") {
        $stmt = $conn->prepare("SELECT password FROM students WHERE student_id = ?");
    } elseif ($user_type == "faculty") {
        $stmt = $conn->prepare("SELECT password FROM faculty WHERE faculty_id = ?");
    } elseif ($user_type == "admin") {
        $stmt = $conn->prepare("SELECT password FROM students WHERE student_id = ?"); // Assuming there's a column to differentiate admins
    }

    $stmt->bind_param("s", $student_id);

    // Execute the SQL statement
    $stmt->execute();
    $stmt->store_result();

    // Check if user_id exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Password is correct, proceed with login
            if ($user_type == "student") {
                echo "<script>alert('Login successful!'); window.location.href='studentpage.html';</script>";
            } elseif ($user_type == "admin") {
                echo "<script>alert('Login successful!'); window.location.href='dashboard.html';</script>";
            } elseif ($user_type == "faculty") {
                echo "<script>alert('Login successful!'); window.location.href='faculty.html';</script>";
            }
        } else {
            echo "<script>alert('Invalid password!'); window.location.href='loginform.html';</script>";
        }
    } else {
        echo "<script>alert('User ID not found!'); window.location.href='loginform.html';</script>";
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
