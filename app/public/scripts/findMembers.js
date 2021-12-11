// Get search-form form element
const searchForm = document.getElementById('search-form');

// On searchForm submit
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get results div element
    const results = document.getElementById('results');
    results.innerHTML = null;

    const searchFor = searchForm.elements['search-for'].value;
    const students = await (await fetch('/read-members?' + 'searchFor=' + searchFor)).json();
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

            // On card click
            card.addEventListener('click', async () => {
                localStorage.setItem('profileEmail', student.email);
                window.location.href = '/profile-page?type=student';
            });

            // On card mouse over
            card.addEventListener('mouseover', () => {
                card.style.cursor = 'pointer';
            });
        }
    } else {
        results.innerHTML = 'No Results';
    }
});

// On logout-btn button click
document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/logout');
    window.location.href = '/';
});