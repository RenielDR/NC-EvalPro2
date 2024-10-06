<?php
// Database connection and setup
$servername = "localhost";
$username = "root";  // Default user in XAMPP
$password = "";  // Default password in XAMPP
$dbname = "NC_EvalPro";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database exists or created successfully.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Now connect to the created database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection to the new database
if ($conn->connect_error) {
    die("Connection to database failed: " . $conn->connect_error);
}

// Create the students table with student_id as primary key if it doesn't exist
$table_sql = "CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    course VARCHAR(10) NOT NULL,
    section VARCHAR(5) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($conn->query($table_sql) === TRUE) {
    echo "Table 'students' exists or created successfully.<br>";
} else {
    die("Error creating table: " . $conn->error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);  // Hash the password
    $student_id = $_POST['student_id'];
    $course = $_POST['course'];
    $section = $_POST['section'];

    // Check if student_id or email already exists
    $check_stmt = $conn->prepare("SELECT * FROM students WHERE student_id = ? OR email = ?");
    $check_stmt->bind_param("ss", $student_id, $email);
    $check_stmt->execute();
    $result = $check_stmt->get_result();

    if ($result->num_rows > 0) {
        // Account already exists
        echo "<script>alert('Account already registered with this Student ID or Email!'); window.location.href='registration.html';</script>";
    } else {
        // Prepare and bind the SQL statement for inserting new data
        $stmt = $conn->prepare("INSERT INTO students (student_id, name, email, password, course, section) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $student_id, $name, $email, $password, $course, $section);

        // Execute the SQL statement
        if ($stmt->execute()) {
            // Success: Show JavaScript alert and redirect to login form
            echo "<script>alert('Registration successful!'); window.location.href='index.html';</script>";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }

    // Close the check statement
    $check_stmt->close();
}

// Close the database connection
$conn->close();
?>
