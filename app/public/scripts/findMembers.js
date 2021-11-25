const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const results = document.getElementById('results');
    results.innerHTML = null;

    const searchFor = searchForm.elements['search-for'].value;
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
});

document.getElementById('logout=btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});