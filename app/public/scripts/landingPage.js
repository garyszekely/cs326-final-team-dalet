// On student-confirm-password input keyup
document.getElementById('student-confirm-password').addEventListener('keyup', () => {
    const studentPassword = document.getElementById('student-password');
    const studentConfirmPassword = document.getElementById('student-confirm-password');

    if (studentConfirmPassword.value === '') {
        studentConfirmPassword.style.backgroundColor = 'white';
    } else if (studentPassword.value === studentConfirmPassword.value) {
        studentConfirmPassword.style.backgroundColor = "green";
        studentConfirmPassword.style.color = 'black';
    } else {
        studentConfirmPassword.style.backgroundColor = 'red';
        studentConfirmPassword.style.color = 'black';
    }
});

// On club-confirm-password input keyup
document.getElementById('club-confirm-password').addEventListener('keyup', () => {
    const clubPassword = document.getElementById('club-password');
    const clubConfirmPassword = document.getElementById('club-confirm-password');

    if (clubConfirmPassword.value == '') {
        clubConfirmPassword.style.backgroundColor = 'white';
    } else if (clubPassword.value == clubConfirmPassword.value) {
        clubConfirmPassword.style.backgroundColor = 'green';
        clubConfirmPassword.style.color = 'black';
    } else {
        clubConfirmPassword.style.backgroundColor = 'red';
        clubConfirmPassword.style.color = 'black';
    }
});

// On student-signup form submit
document.getElementById('student-signup').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('student-email').value;
    const password = document.getElementById('student-password').value;
    const name = document.getElementById('student-name').value;
    const confirmPassword = document.getElementById('student-confirm-password').value;

    if (password === confirmPassword) {
        const res = await fetch('/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name,
            })
        });

        if (res.ok) {
            $('#student-signup-modal').modal('hide');
            alert('Signup successful! Please log in to continue.');
        } else {
            alert('Signup failed! Please try again...');
        }
    } else {
        alert('Passwords do not match! Please try again...');
    }
});

// On club-signup form submit
document.getElementById('club-signup').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('club-email').value;
    const password = document.getElementById('club-password').value;
    const name = document.getElementById('club-name').value;
    const confirmPassword = document.getElementById('club-confirm-password').value;

    if (password === confirmPassword) {
        const res = await fetch('/create-club', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name
            })
        });

        if (res.ok) {
            $('#club-signup-modal').modal('hide');
            alert('Signup successful! Please log in to continue.');
        } else {
            alert('Signup failed! Please try again...');
        }
    } else {
        alert('Passwords do not match! Please try again...');
    }
});
