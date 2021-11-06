const studentConfirmPassword = document.getElementById('student-confirm-password');
studentConfirmPassword.addEventListener('keyup', () => {
    const studentPassword = document.getElementById('student-password');
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

const clubConfirmPassword = document.getElementById('club-confirm-password');
clubConfirmPassword.addEventListener('keyup', () => {
    const clubPassword = document.getElementById('club-password')
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
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    if (res.status === 200) {
        window.location.href = '/index/student-home-page.html';
    }
}

async function onStudentSignup(event) {
    event.preventDefault()
    const firstName = document.getElementById('student-first-name');
    const lastName = document.getElementById('student-last-name');
    const email = document.getElementById('student-email');
    const username = document.getElementById('student-username');
    const password = document.getElementById('student-password');
    if (password.value == studentConfirmPassword.value) {
        const res = await fetch('/student-signup', {
            method: "POST",
            headers: {
                'Content-Type': 'appliction/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password
            })
        })
        if (res.status === 200) {
            window.location.href = '/index/student-home-page.html';
        }
    }
}

async function onClubSignup(event) {
    event.preventDefault()
    const name = document.getElementById('club-name');
    const type = document.getElementById('club-type');
    const email = document.getElementById('club-email');
    const username = document.getElementById('club-username');
    const password = document.getElementById('club-password');
    if (password.value == clubConfirmPassword.value) {
        const res = await fetch('/club-signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                type: type,
                email: email,
                username: username,
                password: password
            })
        })
        if (res.status === 200) {
            window.location.href = '/index/club-home-page.html';
        }
    }
}
