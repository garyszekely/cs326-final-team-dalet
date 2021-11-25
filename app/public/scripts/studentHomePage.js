async function getClubHomePage() {
    const res = await fetch('/read-student');
    const data = await res.json();
    
    document.getElementById('schedule').innerHTML = '';
    /*
    for (let time of data.schedule) {
        const e = document.createElement('li');
        e.innerHTML = time;
        document.getElementById('schedule').appendChild(e);
    }
    */

}