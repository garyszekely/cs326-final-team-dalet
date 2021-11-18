async function getClubs() {
    const res = await fetch('/clubs');
    const data = await res.json();
    for (let club of data) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardHeaderElement = document.createElement('div');
        cardHeaderElement.classList.add('card-header');
        cardHeaderElement.innerHTML = club.clubName;
        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');
        cardBodyElement.innerHTML = club.clubDescription
        cardElement.appendChild(cardHeaderElement);
        cardElement.appendChild(cardBodyElement);
        document.getElementById('clubs').appendChild(cardElement);
    }
}

async function getClubTypes() {
    const res = await fetch('/club/types');
    const data = await res.json();
    for (let type of data) {
        const div = document.createElement('div');
        div.classList.add('form-check');
        const input = document.createElement('input');
        input.classList.add('form-check-input');
        input.type = 'checkbox';
        input.id = 'clubType'
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.for = 'clubType';
        label.innerHTML = type;
        div.appendChild(input);
        div.appendChild(label);
        document.getElementById('club-types-filter').appendChild(div);
    }
}

window.onload = () => {
    getClubs();
    getClubTypes();
}