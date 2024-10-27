// Function to toggle sidebar collapse
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('main-content');

    if (window.innerWidth <= 600) {
        // Handle mobile view
        sidebar.classList.toggle('open');
    } else {
        // Handle larger screens
        sidebar.classList.toggle('collapsed');
    }
}

function showContent(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show the selected section
    document.getElementById(section).classList.add('active');

    // Hide the sidebar on mobile after clicking an item
    if (window.innerWidth <= 600) {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open'); // Hide the sidebar
    }
}

// Function for logout (placeholder function)
function logout() {
    alert("You have been logged out.");
    // Logic for logging out can be added here
}