
import {writeFile} from 'fs';

let student_base = JSON.parse(readFileSync("./storage/students.json"));
let student_count = JSON.parse(readFileSync("./storage/student_count.json"));
let club_base = JSON.parse(readFileSync("./storage/clubs.json"));
let club_count = JSON.parse(readFileSync("./storage/club_count.json"));


function add_new_comment(comment, feed_id){
	feed[feed_id].push(comment);
}

function delete_comment(comment_id, feed_id){
	for(let i = 0; i < feed_id.length; ++i){
		if (feed[feed_id][i].id === comment_id){
			feed[feed_id].split(i, 1);
		}
	}
}

//should this appear after the page loads?
function view_comments(feed_id){
	
}

function add_new_student(req, res){
	student_base = JSON.parse(readFileSync("./storage/students.json"));
	student_count = JSON.parse(readFileSync("./storage/student_count.json"));
	student_count["count"] += 1;
	let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
        const data = JSON.parse(body);
        userbase.push({
            name: data.name,
            student_id: student_count["count"],
			friends: []
        });
            
        writeFile("./storage/students.json", JSON.stringify(student_base), err => {
            if (err) {
                console.err(err);
            } else res.end();
        });
		writeFile("./storage/student_count.json", JSON.stringify(student_count), err => {
            if (err) {
                console.err(err);
            } else res.end();
        });
    });
}

function add_friend(req, res){
	student_base = JSON.parse(readFileSync("./storage/students.json"));
	let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
		const data = JSON.parse(body);
		let student;
		for(const s of student_base){
			if (s.id === data.student_id){
				student = s;
			}
		}
        
        student.friends.push({
            name: data.friend_name,
            friend_id: data.friend_id
        });
            
        writeFile("./storage/students.json", JSON.stringify(student_base), err => {
            if (err) {
                console.err(err);
            } else res.end();
        });
    });
}

function delete_friend(req, res){
	student_base = JSON.parse(readFileSync("./storage/students.json"));
	let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
		const data = JSON.parse(body);
		let student;
		for(const s of student_base){
			if (s.id === data.student_id){
				student = s;
			}
		}
        for(const i = 0; i < student.friends.length; ++i){
			if (student.friends[i].id === data.friend_id){
				student.friends.splice(i, 1);
			}
		}
            
        writeFile("./storage/students.json", JSON.stringify(student_base), err => {
            if (err) {
                console.err(err);
            } else res.end();
        });
    });
}