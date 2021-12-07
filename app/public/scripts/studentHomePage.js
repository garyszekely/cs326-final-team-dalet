window.addEventListener('load', async () => {
    const res = await fetch('/read-student');
    const data = await res.json();
    
    document.getElementById('schedule').innerHTML = '';
    for (let club of data.clubs) {
        const e = document.createElement('li');
        e.innerHTML = club.name + ' ' + club.meeting;
        document.getElementById('schedule').appendChild(e);
    }
    
});