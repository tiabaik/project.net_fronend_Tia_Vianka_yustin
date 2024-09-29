async function fetchUser() {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('/ApiMstUser/HistoryLender', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    if (!response.ok) {
        alert('An error occured while fetching users: ' + response.statusText);
        return;
    }
    const jsonData = await response.json();
    if (jsonData.success) {
        populateUserTable(jsonData.data)

    } else {
        alert('No users found.')
    }
}
function populateUserTable(users) {
    const userTableBody = document.querySelector('#userTableListBorrower tbody');
    userTableBody.innerHTML = "";
    let number = 1

    users.forEach(user => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${number++}</td>
            <td>${user.borrowerName}</td>
            <td>${user.amount}</td>
            <td>${user.repaidAmount}</td>
            <td>${user.balanceAmount}</td>
            <td>${user.repaidStatus}</td>
        `;
        userTableBody.appendChild(row);
    });


}

window.onload(fetchUser());