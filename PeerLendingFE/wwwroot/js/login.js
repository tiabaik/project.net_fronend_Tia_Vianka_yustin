﻿async function submitLogin() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/ApiLogin/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        console.log(result);

        if (response.ok) {
            localStorage.setItem('jwtToken', result.data.token);
            var currUserRole = result.data.role;
            console.log(currUserRole);
            if (result.data.id) {
                localStorage.setItem('userId', result.data.id);
            } else {
                console.error("User ID is missing or undefined.");
            }
            if (currUserRole) {
                switch (currUserRole) {
                    case 'admin':
                        window.location.href = "MstUser/Index";
                        break;
                    case 'lender':
                        window.location.href = "Lender/Index";
                        break;
                    case 'borrower':
                        window.location.href = "Borrower/Index"
                }
            }
            else {
                alert('No role assigned. Redirecting to the default page.');
                window.location.href = 'Login/Index';
            }
        }
        else {
            alert(result.message || 'Login Failed. Please Try Again')
        }

    }

    catch (error) {
        alert('An error occurred while logging in: ' + error.message)
    }
}
