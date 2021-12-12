window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');
    const res = await fetch('/read-student?email=' + email);
    const data = await res.json();
    
    document.getElementById('schedule').innerHTML = '';
    for (let club of data.clubs) {
        const e = document.createElement('li');
        e.innerHTML = club;
        document.getElementById('schedule').appendChild(e);
    }
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});