window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');
    const res = await fetch('/read-club?email=' + email);
    if (res.ok) {
        const data = await res.json();
        document.getElementById('likes').innerHTML = 'Likes: ' + data.totalLikes;
        document.getElementById('club-name').innerHTML = 'Name: ' + data.clubName;
        document.getElementById('meeting').innerHTML = 'Meeting: ' + data.meeting;
        document.getElementById('contact-info').innerHTML = 'Contact: ' + data.contact;
        document.getElementById('location').innerHTML = 'Location: ' + data.location;
        document.getElementById('club-description').innerHTML = data.bio;
    }
    else{
        document.getElementById('likes').innerHTML = 'Likes: ' + 'N/A';
        document.getElementById('club-name').innerHTML = 'Name: ' + 'N/A';
        document.getElementById('meeting').innerHTML = 'Meeting: ' + 'N/A';
        document.getElementById('contact-info').innerHTML = 'Contact: ' + 'N/A';
        document.getElementById('location').innerHTML = 'Location: ' + 'N/A';
        document.getElementById('club-description').innerHTML ='N/A';
    }
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});
