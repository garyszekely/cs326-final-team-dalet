async function getClubPersonalPage() {
    const res = await fetch('/read-club');
    const data = await res.json();

    document.getElementById('club-name').innerHTML = data.clubName;
    document.getElementById('meeting').innerHTML = data.meeting;
    document.getElementById('contact-info').innerHTML = data.contact;
    document.getElementById('location').innerHTML = data.location;
    document.getElementById('club-description').innerHTML = data.bio;

    document.getElementById('members-list').innerHTML = '';
    for (let member of data.members) {
        const e = document.createElement('li');
        e.innerHTML = member;
        document.getElementById('members-list').appendChild(e);
    }
}