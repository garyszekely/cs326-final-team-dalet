'use strict';

window.addEventListener('load', async () => {

    const email = localStorage.getItem('profileEmail');

    const studentRes = await fetch('/read-student?email=' + email);
    if (studentRes.ok) {
        const student = await studentRes.json();

        document.getElementById('name').innerHTML = student.name;
        document.getElementById('bio').innerHTML = student.bio;
        document.getElementById('total-clubs').innerHTML = student.clubs.length;
        document.getElementById('total-posts').innerHTML = student.posts.length;
        document.getElementById('joined').innerHTML = student.joined;

        document.getElementById('clubs').innerHTML = null;
        document.getElementById('posts').innerHTML = null;

        if (student.clubs.length) {
            for (let club of student.clubs) {
                const li = document.createElement('li');
                li.innerHTML = club;
                document.getElementById('clubs').appendChild(li);
            }
        } else {
            document.getElementById('clubs-members-container').innerHTML = null;
            document.getElementById('clubs-members-container').innerHTML = 'No clubs';
        }

        const postsRes = await fetch('/read-posts?email=' + email + '&type=student');
        if (postsRes.ok) {
            const posts = await postsRes.json();
            if (posts.length) {
                for (let post of posts){
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardHeader = document.createElement('div');
                    cardHeader.classList.add('card-header');

                    const cardTitle = document.createElement('div');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerHTML = post.name;

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.innerHTML = post.text;

                    const cardFooter = document.createElement('div');
                    cardFooter.classList.add('card-footer');
                    cardFooter.classList.add('text-muted');
                    cardFooter.innerHTML = post.timestamp;

                    cardHeader.appendChild(cardTitle);
                    cardBody.appendChild(cardText);
                    card.appendChild(cardHeader);
                    card.appendChild(cardBody);
                    card.appendChild(cardFooter);
                    document.getElementById('posts').appendChild(card);
                }
            } else {
                document.getElementById('posts').innerHTML = 'No posts';
            }
        } else {
            document.getElementById('posts').innerHTML = 'Error loading posts...';
        }

        const isFriendRes = await fetch('/is-friend?email=' + email);
        if (isFriendRes.ok) {
            const isFriend = (await isFriendRes.json())['is_friend'];
            const controlsContainer = document.getElementById('controls-container');
            controlsContainer.innerHTML = null;
            if (isFriend) {
                const removeFriendBtn = document.createElement('button');
                removeFriendBtn.innerHTML = 'Remove Friend';
                removeFriendBtn.id = 'controls-btn';
                removeFriendBtn.classList.add('btn');
                removeFriendBtn.classList.add('btn-primary');

                removeFriendBtn.addEventListener('click', async () => {
                    await fetch('/remove-friend?email=' + email);
                    window.location.reload();
                })

                controlsContainer.appendChild(removeFriendBtn);
            } else {
                const addFriendBtn = document.createElement('button');
                addFriendBtn.innerHTML = 'Add Friend';
                addFriendBtn.id = 'controls-btn';
                addFriendBtn.classList.add('btn');
                addFriendBtn.classList.add('btn-primary');

                addFriendBtn.addEventListener('click', async () => {
                    await fetch('/add-friend?email=' + email);
                    window.location.reload();
                })

                controlsContainer.appendChild(addFriendBtn);
            }
        }
    } else {
        window.location.href = '/home-page';
    }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});