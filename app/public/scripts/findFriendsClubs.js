const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const results = document.getElementById('results');
    results.innerHTML = null;

    const searchType = searchForm.elements['type'].value;
    const searchFor = searchForm.elements['search-for'].value;
    if (searchType === 'students') {
        const students = await (await fetch('/read-students?' + 'searchFor=' + searchFor)).json();
        if (students.length) {
            for (let student of students) {
                const card = document.createElement('div');
                card.classList.add('card');

                const cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header');
                cardHeader.innerHTML = student.name;

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML = student.bio;

                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                results.appendChild(card);

                card.addEventListener('click', async () => {
                    localStorage.setItem('profileEmail', student.email);
                    window.location.href = '/profile-page?type=student';
                });
            }
        } else {
            results.innerHTML = 'No Results'
        }
    } else {
        const clubs = await (await fetch('/read-clubs?' + 'searchFor=' + searchFor)).json();
        for (let club of clubs) {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.innerHTML = club.name;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.innerHTML = club.bio;

            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            results.appendChild(card);

            card.addEventListener('click', async () => {
                localStorage.setItem('profileEmail', club.email);
                window.location.href = '/profile-page?type=club';
            });
        }
    } 
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});
