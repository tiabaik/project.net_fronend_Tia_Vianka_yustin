async function tampilSaldo() {
    const token = localStorage.getItem('jwtToken');
    const id = localStorage.getItem('userId');

    try {
        const response = await fetch(`/ApiMstUser/GetUserById?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

        if (!response.ok) {
            alert('Failed to fetch saldo');
            return;
        }

        const jsonData = await response.json();
        console.log(jsonData.data); // Akses ke data saldo

        if (jsonData.success) {
            const name = jsonData.data.name;
            document.getElementById('userName').textContent = `Nama lender : ${name}`;
            const saldo = jsonData.data.balance;
            document.getElementById('userSaldo').textContent = `Saldo Rp ${saldo}`;
        } else {
            alert('No users');
        }
    } catch (error) {
        console.error('Error fetching saldo:', error);
        alert('An error occurred while fetching saldo.');
    }
}

async function updateBalance() {
    const token = localStorage.getItem('jwtToken');
    const id = localStorage.getItem('userId');
    const balanceText = document.getElementById('addBalanceBalance').value;
    //const pastBalanceText = document.getElementById('lenderBalance').innerText;
    //const pastBalance = parseFloat(pastBalanceText)
    const balance = parseFloat(balanceText);
    var userBalance = 0;

    const res = await fetch(`/ApiMstUser/GetUserById?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch user data');
    }

    const jsonData = await res.json();

    if (jsonData.success) {
        userBalance = jsonData.data.balance
    } else {
        alert('user not found or null');
    }

    const ReqUpdateBalanceDto = {
        balance: balance + userBalance
    }

    console.log(ReqUpdateBalanceDto);

    fetch(`/ApiMstUser/UpdateBalance/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ReqUpdateBalanceDto)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user balance')
            }
            return response.json();
        })
        .then(data => {
            alert('User balance updated successfully')
            $('#addBalanceModal').modal('hide');
            getBalance()
        })
        .catch(error => {
            alert('Error fetching used data: ' + error.message);
        });
}





tampilSaldo();

