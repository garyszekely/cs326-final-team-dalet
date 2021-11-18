async function getClubInfo() {
    const res = await fetch('/club/info')
    const data = await res.json();
    document.getElementById('club-name').innerHTML = data.clubName;
    document.getElementById('profile-bio').innerHTML = data.clubDescription;
    document.getElementById('total-members').innerHTML = data.totalMembers;
    document.getElementById('total-posts').innerHTML = data.totalPosts;
    document.getElementById('total-likes').innerHTML = data.totalLikes;
    document.getElementById('created').innerHTML = data.created;
    document.getElementById('joined').innerHTML = data.joined;
    document.getElementById('members').innerHTML = '';
    for (let member of data.members) {
        const e = document.createElement('li');
        e.innerHTML = member
        document.getElementById('members').appendChild(e);
    }
    for (let post of data.posts){
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardHeaderElement = document.createElement('div');
        cardHeaderElement.classList.add('card-header');
        const cardTitleElement = document.createElement('div');
        cardTitleElement.classList.add('card-title');
        cardTitleElement.innerHTML = post.clubName;
        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body')
        const cardTextElement = document.createElement('p');
        cardTextElement.classList.add('card-text');
        cardTextElement.innerHTML = post.text;
        const cardFooterElement = document.createElement('div');
        cardFooterElement.classList.add('card-footer');
        cardFooterElement.classList.add('text-muted');
        cardFooterElement.innerHTML = post.timestamp;
        cardHeaderElement.appendChild(cardTitleElement);
        cardBodyElement.appendChild(cardTextElement);
        cardElement.appendChild(cardHeaderElement);
        cardElement.appendChild(cardBodyElement);
        cardElement.appendChild(cardFooterElement);
        document.getElementById('posts').appendChild(cardElement);
    }
}

async function addClubMember() {
    const res = await fetch('/club/member/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({member: localStorage.getItem('studentName')})
    });
}

async function addClubLike() {
    const res = await fetch('/club/like/new');
}

window.onload = () => {
    getClubInfo();
    document.getElementById('join-club-btn').addEventListener('click', addClubMember);
    document.getElementById('like-club-btn').addEventListener('click', addClubLike);
}