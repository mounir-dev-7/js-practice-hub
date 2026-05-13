// let CSV = document.getElementById("csv");
// let button = document.getElementById("btn");

// CSV.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();

//   reader.onload = (e) => {
//     const content = e.target.result;
//     const rows = content.split("\n").map((row) => row.split(","));
//     const table = document.getElementById("table");
//     table.innerHTML = "";

//     for (let i = 0; i < rows.length; i++) {
//       let tr = document.createElement("tr");
//       for (let j = 0; j < rows[i].length; j++) {
//         let td = document.createElement("td");
//         td.textContent = rows[i][j];
//         tr.appendChild(td);
//       }
//       table.appendChild(tr);
//     }
//     CSV.style.display = "none";
//     button.style.display = "block";
//   };

//   reader.readAsText(file);
// });

// button.addEventListener('click' , () => {
//     const rows = document.querySelectorAll('#table tr')
//     let csvContent = '';

//     for (let i = 0; i < rows.length; i++) {
//         let row = rows[i]
//         let cols = row.querySelectorAll('td')
//         let rowContent = '';

//         for (let j = 0; j < cols.length; j++) {
//             let col = cols[j]
//             rowContent += col.textContent + ','            
//         }
        
//         csvContent += rowContent.slice(0 , -1) + '\n'
//     }

//     const blob = new Blob([csvContent] , { type : 'text/csv' })
//     const url = window.URL.createObjectURL(blob)
    
//     const a = document.createElement('a')
//     a.href = url
//     a.download = 'data.csv'
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     window.URL.revokeObjectURL(url)
// })

const csvInput = document.getElementById('csv');
const exportBtn = document.getElementById('btn');
const table = document.getElementById('table');

csvInput.addEventListener('change' , async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
        const text = await file.text()

        const data = text.trim().split('\n').map(row => row.split(','))
        
        table.innerHTML = data.map(row => `
            <tr>
                ${row.map(cell => `<td>${cell}</td>`).join('')}
            </tr>
        `).join('')

        csvInput.hidden = true;
        exportBtn.style.display = 'block';
        
    } catch (err) {
        console.error("Error reading file:", err)
    }
})

exportBtn.addEventListener('click' , () => {
    const rows = Array.from(document.querySelectorAll('tr'))
    
    const csvContent = rows.map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'))
        return cells.map(tr => tr.textContent).join(',')
    }).join('\n')

    const blob = new Blob([csvContent] , { type : 'text/csv' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url;
    link.download = 'modern_export.csv';
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
})