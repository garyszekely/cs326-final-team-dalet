window.addEventListener('load', async () => {
    const profileEmail = localStorage.getItem('profileEmail');

    const readClubRes = await fetch('/read-club?' + 'email=' + profileEmail);
    if (readClubRes.ok) {
        const club = await readClubRes.json();

        document.getElementById('name').innerHTML = club.name;
        document.getElementById('profile-bio').innerHTML = club.bio;
        document.getElementById('total-members').innerHTML = club.members.length;
        document.getElementById('total-posts').innerHTML = club.posts.length;
        document.getElementById('total-likes').innerHTML = club.totalLikes;
        document.getElementById('joined').innerHTML = club.joined;

        for (let member of club.members) {
            const li = document.createElement('li');
            li.innerHTML = member;
            document.getElementById('clubs').appendChild(li);
        }

        const readPostsRes = await fetch('/read-posts?' + 'email=' + profileEmail + '&type=student');
        if (readPostsRes.ok) {
            const posts = await readPostsRes.json();
            document.getElementById('posts').innerHTML = null;
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
        }
    } else {
        window.location.href = '/home-page';
    }

    document.getElementById('join-club-btn').addEventListener('click', () => {
        
    });

    document.getElementById('like-club-btn').addEventListener('click', () => {
        
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        await fetch('/logout');
        window.location.href = '/';
    });
});