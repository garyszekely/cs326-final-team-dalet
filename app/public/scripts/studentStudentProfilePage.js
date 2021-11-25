window.addEventListener('load', async () => {
    const profileEmail = localStorage.getItem('profileEmail');

    const readStudentRes = await fetch('/read-student?' + 'email=' + profileEmail);
    if (readStudentRes.ok) {
        const student = await readStudentRes.json();

        document.getElementById('name').innerHTML = student.name;
        document.getElementById('profile-bio').innerHTML = student.bio;
        document.getElementById('total-clubs').innerHTML = student.clubs.length;
        document.getElementById('total-posts').innerHTML = student.posts.length;
        document.getElementById('joined').innerHTML = student.joined;

        for (let club of student.clubs) {
            const li = document.createElement('li');
            li.innerHTML = club;
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
    
    document.getElementById('add-friends-btn').addEventListener('click', () => {
        
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        await fetch('/logout');
        window.location.href = '/';
    });
});