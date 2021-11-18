let otherUserName = ''

async function getStudentInfo() {
    const res = await fetch('/student/info')
    const data = await res.json();
    otherUserName = data.name;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('profile-bio').innerHTML = data.bio;
    document.getElementById('total-clubs').innerHTML = data.totalClubs;
    document.getElementById('total-posts').innerHTML = data.totalPosts;
    document.getElementById('joined').innerHTML = data.joined;
    document.getElementById('clubs').innerHTML = '';
    for (let club of data.clubs) {
        const e = document.createElement('li');
        e.innerHTML = club;
        document.getElementById('clubs').appendChild(e);
    }
    for (let post of data.posts){
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardHeaderElement = document.createElement('div');
        cardHeaderElement.classList.add('card-header');
        const cardTitleElement = document.createElement('div');
        cardTitleElement.classList.add('card-title');
        cardTitleElement.innerHTML = post.name;
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

async function removeMember() {
    const res = await fetch('/club/member/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            memberName: otherUserName
        })
    });
}

window.onload = () => {
    getStudentInfo();
    document.getElementById('remove-member-btn').addEventListener('click', removeMember);
}