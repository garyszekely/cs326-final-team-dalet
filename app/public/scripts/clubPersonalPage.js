window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');
    const res = await fetch('/read-club?email=' + email);
    const data = await res.json();

    document.getElementById('club-name').innerHTML = data.clubName;
    document.getElementById('meeting').innerHTML = data.meeting;
    document.getElementById('contact').innerHTML = data.contact;
    document.getElementById('location').innerHTML = data.location;
    document.getElementById('desc').innerHTML = data.bio;

    document.getElementById('members-list').innerHTML = '';
    for (let member of data.members) {
        const e = document.createElement('li');
        e.innerHTML = member;
        document.getElementById('members-list').appendChild(e);
    }
});

document.getElementById('club-info-edit').addEventListener('click', () => {
    updateClubInfo(localStorage.getItem('profileEmail'), 
    document.getElementById('club-name').innerHTML,
    document.getElementById('meeting').innerHTML,
    document.getElementById('contact').innerHTML,
    document.getElementById('location').innerHTML);
    window.location.href = '/personal-page';
});

document.getElementById('club-desc-edit').addEventListener('click', () => {
    updateClubDesc(localStorage.getItem('profileEmail'), 
    document.getElementById('desc').innerHTML)
    window.location.href = '/personal-page';
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});