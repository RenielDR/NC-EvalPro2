<?php
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

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("SELECT password FROM students WHERE student_id = ?");
    $stmt->bind_param("s", $student_id);

    // Execute the SQL statement
    $stmt->execute();
    $stmt->store_result();

    // Check if student_id exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Password is correct, proceed with login
            echo "<script>alert('Login successful!'); window.location.href='dashboard.html';</script>";
        } else {
            echo "<script>alert('Invalid password!'); window.location.href='loginform.html';</script>";
        }
    } else {
        echo "<script>alert('Student ID not found!'); window.location.href='loginform.html';</script>";
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
