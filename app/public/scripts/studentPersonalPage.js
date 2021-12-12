window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');
    const res = await fetch('/read-student?email=' + email);
    const data = await res.json();

    document.getElementById('name').innerHTML = data.name;
    document.getElementById('club-list').innerHTML = '';
    for (let club of data.clubs) {
        const e = document.createElement('li');
        e.innerHTML = club;
        document.getElementById('club-list').appendChild(e);
    }

    document.getElementById('student-description').innerHTML = data.bio;

    document.getElementById('post-list').innerHTML = '';
    const posts = await fetch('/read-posts?email=' + email + '&type=student');
    for (let post of posts) {
        const e = document.createElement('li');
        e.innerHTML = post.text;
        document.getElementById('post-list').appendChild(e);
    }

    document.getElementById('friend-list').innerHTML = '';
    const arr_friends = ["Tom", "Tim"];
    for (let friend of arr_friends) {
        const e = document.createElement('li');
        e.innerHTML = friend;
        document.getElementById('friend-list').appendChild(e);
    }
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});