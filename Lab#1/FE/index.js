function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  createEmployee();
})

// TODO
// add event listener to delete button
lastEvent = null;
document.getElementById("dataTable").addEventListener("click", function(e) {
  if (e.target && e.target.matches('button.btn-danger.btn-sm')) {
    lastEvent = e;
    deleteEmployee();
  }
})

// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
    const employeeName = document.getElementById("name").value;
    const employeeID = document.getElementById("id").value;
    const newEmployee = { id: employeeID, name: employeeName };
    
    fetch('http://localhost:3000/api/v1/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    })
    .then(response => {
      if (!response.ok) 
        return response.json().then(err => { throw new Error(err.message); });
    })
    .then(() => {
      fetchEmployees();
    })
    .catch(error => {
      alert(`Error: ${error.message}`);
    });
  }

// TODO
function deleteEmployee (){
  // get id
  // send id to BE
  // call fetchEmployees
  const deleteBtn = lastEvent.target;
  const row = deleteBtn.closest('tr');
  const employeeId = row.querySelector('td').textContent;
  fetch(`http://localhost:3000/api/v1/employee/${employeeId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) 
      return response.json().then(err => { throw new Error(err.message); });
  })
  .then(() => {
    fetchEmployees();
  })
  .catch(error => {
    alert(`Error: ${error.message}`);
  });
}

fetchEmployees()
