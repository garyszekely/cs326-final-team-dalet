'use strict';

window.addEventListener('load', async () => {
    const email = localStorage.getItem('profileEmail');

    const clubRes = await fetch('/read-club?email=' + email);
    if (clubRes.ok) {
        const club = await clubRes.json();

        document.getElementById('name').innerHTML = club.name;
        document.getElementById('bio').innerHTML = club.bio;
        document.getElementById('total-members').innerHTML = club.members.length;
        document.getElementById('total-posts').innerHTML = club.posts.length;
        document.getElementById('total-likes').innerHTML = club.totalLikes;
        document.getElementById('joined').innerHTML = club.joined;

        document.getElementById('posts').innerHTML = null;

        if (club.members.length) {
            for (let member of club.members) {
                const li = document.createElement('li');
                li.innerHTML = member;
                document.getElementById('members').appendChild(li);
            }
        } else {
            document.getElementById('clubs-members-container').innerHTML = 'No Members';
        }

        const postsRes = await fetch('/read-posts?email=' + email + '&type=club');
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

    const isMemberRes = await fetch('/is-member?email=' + email);
    if (isMemberRes.ok) {
        const isMember = (await isMemberRes.json())['is_member'];
        const controlsContainer = document.getElementById('controls-container');
        controlsContainer.innerHTML = null;
        if (isMember) {
            const leaveClubBtn = document.createElement('button');
            leaveClubBtn.innerHTML = 'Leave Club';
            leaveClubBtn.id = 'controls-btn';
            leaveClubBtn.classList.add('btn');
            leaveClubBtn.classList.add('btn-primary');

            leaveClubBtn.addEventListener('click', async () => {
                await fetch('/leave-club?email=' + email);
                window.location.reload();
            })

            controlsContainer.appendChild(leaveClubBtn);
        } else {
            const joinClubBtn = document.createElement('button');
            joinClubBtn.innerHTML = 'Join Club';
            joinClubBtn.id = 'controls-btn';
            joinClubBtn.classList.add('btn');
            joinClubBtn.classList.add('btn-primary');

            joinClubBtn.addEventListener('click', async () => {
                await fetch('/join-club?email=' + email);
                window.location.reload();
            })

            controlsContainer.appendChild(joinClubBtn);
        }
    }

    const controlsContainer = document.getElementById('controls-container');
    const likeClubBtn = document.createElement('button');
    likeClubBtn.innerHTML = 'Like Club';
    likeClubBtn.id = 'controls-btn';
    likeClubBtn.classList.add('btn');
    likeClubBtn.classList.add('btn-primary');

    likeClubBtn.addEventListener('click', async () => {
        await fetch('/like-club?email=' + email);
        window.location.reload();
    })

    controlsContainer.appendChild(likeClubBtn);

    document.getElementById('logout-btn').addEventListener('click', async () => {
        await fetch('/logout');
        window.location.href = '/';
    });
});