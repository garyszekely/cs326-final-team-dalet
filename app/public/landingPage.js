document.getElementById('student-confirm-password').addEventListener('keyup', () => {
    const studentPassword = document.getElementById('student-password');
    const studentConfirmPassword = document.getElementById('student-confirm-password');

    if (studentConfirmPassword.value == '') {
        studentConfirmPassword.style.backgroundColor = 'white';
    } else if (studentPassword.value == studentConfirmPassword.value) {
        studentConfirmPassword.style.backgroundColor = "green";
        studentConfirmPassword.style.color = 'black';
    } else {
        studentConfirmPassword.style.backgroundColor = 'red';
        studentConfirmPassword.style.color = 'black';
    }
});

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
})

async function onLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: username,
            password: password
        }
    });
}

async function onStudentSignup(event) {
    event.preventDefault();

    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;
    const type = 'student';
    const name = document.getElementById('student-first-name').value + " " + document.getElementById('student-last-name').value;
    const email = document.getElementById('student-email').value;
    const studentConfirmPassword = document.getElementById('student-confirm-password').value;

    if (password == studentConfirmPassword) {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'type': type,
                'name': name,
                'email': email
            })
        });
    }
}

async function onClubSignup(event) {
    event.preventDefault();

    const username = document.getElementById('club-username').value;
    const password = document.getElementById('club-password').value;
    const type = 'club';
    const name = document.getElementById('club-name').value;
    const clubType = document.getElementById('club-type').value;
    const email = document.getElementById('club-email').value;
    const clubConfirmPassword = document.getElementById('club-confirm-password').value;

    if (password == clubConfirmPassword) {
        const res = await fetch('/club-signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'type': type,
                'name': name,
                'clubType': clubType,
                'email': email
            })
        });
    }
}
