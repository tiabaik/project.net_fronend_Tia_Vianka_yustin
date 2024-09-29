async function fetchUser() {
    const token = localStorage.getItem('jwtToken');
    console.log(token);

    const response = await fetch('/ApiMstUser/GetUserBorrowerById', {
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
    console.log(jsonData);
    if (jsonData.success) {
        populateUserTable(jsonData.data)

    } else {
        alert('No users found.')
    }
}
function populateUserTable(users) {
    const userTableBody = document.querySelector('#userTableListLoan tbody');
    userTableBody.innerHTML = "";
    let number = 1

    users.forEach(user => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${number++}</td>
            <td>${user.amount}</td>
            <td>${user.interestRate}</td>
            <td>${user.duration}</td>
            <td>${user.status}</td>
            <td>${user.createdAt}</td>
        `;
        userTableBody.appendChild(row);
    });


}

async function addLoan() {
    try {
        const amount = document.getElementById('loanaddAmount').value;
        const interestRate = document.getElementById('loanaddInterest').value;

        // Ambil token dari localStorage
        const token = localStorage.getItem('jwtToken');

        const response = await fetch('/ApiMstUser/CreateLoan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Sertakan token di header
            },
            body: JSON.stringify({ Amount: amount, InterestRate: interestRate })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Loan added successfully');
            $('#addLoanModal').modal('hide'); // Menutup modal
            fetchUser(); // Memanggil fungsi untuk memperbarui daftar pengguna
        } else {
            alert(result.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while adding the user: ' + error.message);
    }


}




fetchUser();