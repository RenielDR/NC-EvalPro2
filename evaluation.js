function printTable() {
        // Get the content of the table
        const tableContent = document.getElementById("table-container").innerHTML;

        // Open a new window
        const printWindow = window.open("", "", "width=800, height=600");

        // Write the table content to the new window and print
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Table</title>
                <style>
                    /* Add styles here if needed for printed content */
                    table { width: 100%; border-collapse: collapse; }
                    table, td, th { border: 1px solid black; padding: 8px; }
                    .bold-text { font-weight: bold; }
                </style>
            </head>
            <body>
                ${tableContent}
                <script>window.print(); window.close();<\/script>
            </body>
            </html>
        `);

        printWindow.document.close();
    }


    function exportToExcel() {
            const wb = XLSX.utils.book_new();
            const tables = document.querySelectorAll("#table-container table");

            tables.forEach((table, index) => {
                const ws = XLSX.utils.table_to_sheet(table);
                XLSX.utils.book_append_sheet(wb, ws, `Sheet ${index + 1}`);
            });

            XLSX.writeFile(wb, 'evaluation.xlsx');
        }