window.addEventListener('load', async () => {
    const res = await fetch('/read-student');
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
    for (let post of data.posts) {
        const e = document.createElement('li');
        e.innerHTML = post;
        document.getElementById('post-list').appendChild(e);
    }

    document.getElementById('friend-list').innerHTML = '';
    for (let friend of data.friends) {
        const e = document.createElement('li');
        e.innerHTML = friend;
        document.getElementById('friend-list').appendChild(e);
    }
});