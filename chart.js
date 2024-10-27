// Function to update the dashboard
function updateDashboard() {
    // Simulated data - replace with actual data from your backend
    const studentData = {
        'BSCS': 50,
        'BSHM': 40,
        'BSED': 30,
        'BEED': 20
    };
    const facultyData = {
        'Computing Studies': 5,
        'Hospitality Managemnet': 4,
        'BSED': 3,
        'BEED': 2
    };

    // Update count boxes
    const totalStudents = Object.values(studentData).reduce((a, b) => a + b, 0);
    const totalFaculty = Object.values(facultyData).reduce((a, b) => a + b, 0);
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalFaculty').textContent = totalFaculty;
    document.getElementById('totalUsers').textContent = totalStudents + totalFaculty;

    // Update student table
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';
    for (const [course, count] of Object.entries(studentData)) {
        const row = `<tr><td>${course}</td><td>${count}</td></tr>`;
        studentTableBody.innerHTML += row;
    }

    // Update faculty table
    const facultyTableBody = document.getElementById('facultyTableBody');
    facultyTableBody.innerHTML = '';
    for (const [course, count] of Object.entries(facultyData)) {
        const row = `<tr><td>${course}</td><td>${count}</td></tr>`;
        facultyTableBody.innerHTML += row;
    }

    // Create the chart
    const ctx = document.getElementById('accessChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(studentData),
            datasets: [
                {
                    label: 'Students',
                    data: Object.values(studentData),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Faculty',
                    data: Object.values(facultyData),
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Users'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Courses/Faculty'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Analytics'
                },
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Call updateDashboard when the page loads
document.addEventListener('DOMContentLoaded', updateDashboard);