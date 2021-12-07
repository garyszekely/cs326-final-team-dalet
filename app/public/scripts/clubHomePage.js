window.addEventListener('load', async () => {
    const res = await fetch('/read-club');
    const data = await res.json();

    document.getElementById('likes').innerHTML = 'Likes:' + data.totalLikes;
    document.getElementById('club-name').innerHTML = 'Name: ' + data.clubName;
    document.getElementById('meeting').innerHTML = 'Meeting:' + data.meeting;
    document.getElementById('contact-info').innerHTML = 'Contact' + data.contact;
    document.getElementById('location').innerHTML = 'Location' + data.location;
    document.getElementById('club-description').innerHTML = data.bio;
    


});
