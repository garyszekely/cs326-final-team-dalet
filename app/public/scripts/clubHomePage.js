window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');
    const res = await fetch('/read-club?email=' + email);
    const data = await res.json();

    document.getElementById('likes').innerHTML = 'Likes:' + data.totalLikes;
    document.getElementById('club-name').innerHTML = 'Name: ' + data.clubName;
    document.getElementById('meeting').innerHTML = 'Meeting:' + data.meeting;
    document.getElementById('contact-info').innerHTML = 'Contact' + data.contact;
    document.getElementById('location').innerHTML = 'Location' + data.location;
    document.getElementById('club-description').innerHTML = data.bio;
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});
