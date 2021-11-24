async function getClubHomePage() {
    const res = await fetch('/read-club');
    const data = await res.json();

    document.getElementById('likes').innerHTML = 'Likes:' + data.totalLikes;
    document.getElementById('club-name').innerHTML = data.clubName;
    //document.getElementById('meeting').innerHTML = data.meeting;
    //document.getElementById('contact-info').innerHTML = data.contact_info;
    //document.getElementById('location').innerHTML = data.location;
    //document.getElementById('club-description').innerHTML = data.description;
    
    for (let member of data.members) {
        const e = document.createElement('li');
        e.innerHTML = member;
        document.getElementById('members').appendChild(e);
    }
}