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
            document.getElementById('clubs-members-container').innerHTML = 'No Clubs';
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
                document.getElementById('posts').innerHTML = 'No Posts';
            }
        } else {
            document.getElementById('posts').innerHTML = 'Error loading posts...';
        }
    } else {
        window.location.href = '/home-page';
    }
});

document.getElementById('add-friends-btn').addEventListener('click', () => {
        
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});