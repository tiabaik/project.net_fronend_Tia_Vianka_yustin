async function fetchUser() {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('/ApiMstUser/GetAllUsers', {
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
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = "";
    let number = 1

    users.forEach(user => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${number++}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.balance}</td>
            <td>
                <button class="btn btn-primary btn-sm"  onClick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });


}

fetchUser();

function editUser(id) {
    const token = localStorage.getItem('token');

    fetch(`/ApiMstUser/GetUserById?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
                
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                const user = data.data;
                document.getElementById('userName').value = user.name;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userBalance').value = user.balance;
                document.getElementById('userId').value = user.userId;

                $('#editUserModal').modal('show');
            }
            else {
                alert('User not found.');
            }
        })
        .catch(error => {
            alert('Error fetching user data : ' + error.message);
        })
}

function updateUser() {
    const token = localStorage.getItem('jwtToken');

    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const role = document.getElementById('userRole').value;
    const balance = document.getElementById('userBalance').value;

    const reqMstUserDto = {
        id: id,
        name: name,
        role: role,
        balance: parseFloat(balance)
    };

     fetch(`/ApiMstUser/UpdateUser/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqMstUserDto)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
        })
        .then(data => {
            alert('User updated successfully');
            $('#editUserModal').modal('hide');
            fetchUser();
        })
        .catch(error => {
            alert('Error updating user data : ' + error.message);
        }) 
}

function deleteUser(id) {
    const confirmation = confirm("Are you sure you want to delete this user?");

    if (!confirmation) {
        return;
    }

    const token = localStorage.getItem('jwtToken');

    fetch(`/ApiMstUser/DeleteUser/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.text();
     })
     .then(message => {
            alert(message);
            window.location.reload();
            fetchUsers();
      })
     .catch(error => {
            alert('Error deleting user: ' + error.message);
      });
}

async function addUser() {
    try {
        const name = document.getElementById('useraddName').value;
        const email = document.getElementById('useraddEmail').value;
        const role = document.getElementById('useraddRole').value;

        // Ambil token dari localStorage
        const token = localStorage.getItem('jwtToken');

        const response = await fetch('/ApiMstUser/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Sertakan token di header
            },
            body: JSON.stringify({ Name: name, Email: email, Role: role })
        });

        const result = await response.json();

        if (response.ok) {
            alert('User added successfully');
            $('#addUserModal').modal('hide'); // Menutup modal
            fetchUser(); // Memanggil fungsi untuk memperbarui daftar pengguna
        } else {
            alert(result.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while adding the user: ' + error.message);
    }
}




