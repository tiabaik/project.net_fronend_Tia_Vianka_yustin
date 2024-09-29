async function fetchUser() {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('/ApiMstUser/GetAllBorrower', {
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
            <td>${user.interestRate}</td>
            <td>${user.duration}</td>
            <td>${user.status}</td>
            <td>
             <button class="btn btn-primary btn-sm"  onClick="approveModal('${user.loanId}')">Approve</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });


}

function approveModal(id_Loan) {
    $('#fundingApprovedId').val(id_Loan);
    $('#confirmLoanModal').modal('show');

}

async function approveFunding() {
    try {
        const loanId = $('#fundingApprovedId').val();
        console.log(loanId)
        const token = localStorage.getItem('jwtToken');
        console.log('Loan ID:', loanId); // Menampilkan loanId di konsol
        console.log('Token:', token);

        const response = await fetch('/ApiMstUser/ApproveFunding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Sertakan token di header
            },
            body: JSON.stringify({ LoanId: loanId })
        });

        const result = await response.json();

        if (response.ok) {
            alert(' Give Loan added successfully');
            $('#confirmLoanModal').modal('hide'); // Menutup modal
            fetchUser(); // Memanggil fungsi untuk memperbarui daftar pengguna
        } else {
            alert(result.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while adding the user: ' + error.message);
    }


}

fetchUser();