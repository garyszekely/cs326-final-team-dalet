'use strict';

import { MongoClient, ObjectId } from 'mongodb';
import { MiniCrypt } from './miniCrypt.js';

// MongoDB configuration
const uri = 'mongodb+srv://admin:pwd@teamdaletcluster.3ramk.mongodb.net?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// MiniCrypt configuration
const mc = new MiniCrypt();

/**
 * Authentication
 */

// authenticateStudent(email: String, password: String): boolean
export async function authenticateStudent(email, password) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const student = await students.findOne({
		'email': email
	});

	await client.close();

	if (student === null) {
		return false;
	}

	return mc.check(password, student['salt'], student['hash']);
}

// authenticateClub(email: String, password: String): boolean
export async function authenticateClub(email, password) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const club = await clubs.findOne({
		'email': email
	});

	await client.close();

	if (club === null) {
		return false;
	}

	return mc.check(password, club['salt'], club['hash']);
}

/**
 * CRUD Operations for Students
 */ 

// createStudent(email: String, password: String, name: String): boolean
export async function createStudent(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');

	if ((await students.findOne({'email': email})) !== null) {
		return false;
	}

	const [ salt, hash ] = mc.hash(password);

	const student = {
		'email': email,
		'salt': salt,
		'hash': hash,
		'name': name,
		'bio': 'No bio',
		'joined': new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
		'friends': [],
		'clubs': [],
		'posts': []
	};
	await students.insertOne(student);

	await client.close();
	return true;
}

// readStudent(email: String): Student
export async function readStudent(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const student = await students.findOne({'email': email});

	await client.close();
	return student;
}

// readStudents(searchFor: String): Student[]
export async function readStudents(searchFor) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	students.createIndex({'name': 'text'});
	const searchedStudents = await students.find({$text: {$search: searchFor}}).toArray();
	
	await client.close();
	return searchedStudents;
}

// readMembers(email: String, searchFor: String): Student[]
export async function readMembers(email, searchFor) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const students = database.collection('students');

	const club = await clubs.findOne({'email': email});
	const searchedMembers = [];
	console.log(club['members'])
	for(let member of club['members']) {
		console.log(member)
		console.log(searchFor)
		console.log(member.includes(searchFor))
		if (member.includes(searchFor)) {
			searchedMembers.push(await students.findOne({'name': member}));
		}
	}
	console.log(searchedMembers)
	return searchedMembers;
}

export async function updateStudent(email) {

}

// isFriend(userEmail: String, profileEmail: String) => boolean
export async function isFriend(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const user = await students.findOne({'email': userEmail});
	const profile = await students.findOne({'email': profileEmail});
	
	return user['friends'].some((friend) => {
		return friend.equals(profile['_id']);
	});
}

// addFriend(userEmail: String, profileEmail: String) => boolean
export async function addFriend(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const user = await students.findOne({'email': userEmail});
	const profile = await students.findOne({'email': profileEmail});

	await students.updateOne({'email': userEmail}, {$push: {'friends': profile['_id']}});
	await students.updateOne({'email': profileEmail}, {$push: {'friends': user['_id']}});

	return true;
}

// removeFriend(userEmail: String, profileEmail: String) => boolean
export async function removeFriend(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const user = await students.findOne({'email': userEmail});
	const profile = await students.findOne({'email': profileEmail});

	await students.updateOne({'email': userEmail}, {$pull: {'friends': profile['_id']}});
	await students.updateOne({'email': profileEmail}, {$pull: {'friends': user['_id']}});

	return true;
}

// isMember(userEmail: String, profileEmail: String) => boolean
export async function isMember(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const clubs = database.collection('clubs');

	const user = await students.findOne({'email': userEmail});
	const profile = await clubs.findOne({'email': profileEmail});
	
	return profile['members'].some((member) => {
		return member == user['name'];
	});
}

// joinClub(userEmail: String, profileEmail: String) => boolean
export async function joinClub(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const clubs = database.collection('clubs');

	const user = await students.findOne({'email': userEmail});
	const profile = await clubs.findOne({'email': profileEmail});

	students.updateOne({'email': userEmail}, {$push: {'clubs': profile['name']}});
	clubs.updateOne({'email': profileEmail}, {$push: {'members': user['name']}});

	return true;
}

// leaveClub(userEmail: String, profileEmail: String) => boolean
export async function leaveClub(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const clubs = database.collection('clubs');

	const user = await students.findOne({'email': userEmail});
	const profile = await clubs.findOne({'email': profileEmail});

	students.updateOne({'email': userEmail}, {$pull: {'clubs': profile['name']}});
	clubs.updateOne({'email': profileEmail}, {$pull: {'members': user['name']}});
	
	return true;
}

// likeClub(email: String) => boolean
export async function likeClub(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	await clubs.updateOne({'email': email}, {$inc: {'totalLikes': 1}});

	return true;
}

/**
 * CRUD Operations for Clubs
 */ 

// createClub(email: String, password: String, name: String): boolean
export async function createClub(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');

	if ((await clubs.findOne({'email': email})) !== null) {
		return false;
	}

	const [ salt, hash ] = mc.hash(password);

	const club = {
		'email': email,
		'salt': salt,
		'hash': hash,
		'name': name,
		'bio': 'No bio',
		'totalLikes': 0,
		'joined': new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
		'members': [],
		'posts': [],
		'meeting': '',
		'contact': '',
		'location': ''
	};
	await clubs.insertOne(club);

	await client.close();
	return true;
}

// readClub(email: String): Club
export async function readClub(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const club = await clubs.findOne({'email': email});

	await client.close();
	return club;
}

// readClubs(searchFor: String): Club[]
export async function readClubs(searchFor) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	clubs.createIndex({'name': 'text'});
	const searchedClubs = await clubs.find({$text: {$search: searchFor}}).toArray();

	await client.close();
	return searchedClubs;
}

export async function updateClub(email) {

}

// removeMember(userEmail: String, profileEmail: String): boolean
export async function removeMember(userEmail, profileEmail) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const students = database.collection('students');
	const user = await clubs.findOne({'email': userEmail});
	const profile = await students.findOne({'email': profileEmail});

	await clubs.updateOne({'email': userEmail}, {$pull: {'members': profile['name']}});
	await students.updateOne({'email': profileEmail}, {$pull: {'clubs': user['name']}});

	return true;
}

export async function updateClubInfo(email, name, meet, contac, place) {
	await client.connect();
	const database = client.db('club_connect_db');
	const clubs = database.collection('clubs');

	clubs.update(
		{"email": email},
		{
		  $set: {
			"name": name,
			"meeting": meet,
			"contact": contac,
			"location": place
		  }
		}
	  );

	await client.close();
}

export async function updateClubDesc(email, desc) {
	await client.connect();
	const database = client.db('club_connect_db');
	const clubs = database.collection('clubs');

	clubs.update(
		{"email": email},
		{
		  $set: {
			"bio": desc
		  }
		}
	  );

	await client.close();
}

/**
 * CRUD Operations for Posts
 * 
 * Overview:
 * 	createPost(email: String, name: String. type: String, text: String, timestamp: Date): boolean
 * 	readPosts(email: String, type: String): Post[]
 * 	updatePost(postID: String, text: String, timestamp: Date): boolean
 */

// createPost(email: String, name: String. type: String, text: String, timestamp: Date): boolean
export async function createPost(email, name, type, text, timestamp) {
	await client.connect();
	const database = client.db('club_connect_db');

	const posts = database.collection('posts');
	const create = {
		'name': name,
		'text': text,
		'timestamp': timestamp
	};
	const post = await posts.insertOne(create);

	if (type === 'student') {
		const students = database.collection('students');
		students.updateOne({'email': email}, {$push: {'posts': post['_id']}});
		return true;
	} else if (type === 'club') {
		const clubs = database.collection('clubs');
		clubs.updateOne({'email': email}, {$push: {'posts': post['_id']}});
		return true;
	} else {

	}
	return false;
}

// readPosts(email: String, type: String): Post[]
export async function readPosts(email, type) {
	await client.connect();
	const database = client.db('club_connect_db');
	
	const posts = database.collection('posts')

	if (type === 'student') {
		const students = database.collection('students');
		const student = await students.findOne({'email': email});
		const studentPosts = [];
		for (let postID of student['posts']) {
			const post = await posts.findOne({'_id': ObjectId(postID)});
			studentPosts.push(post);
		}
		return studentPosts;
	} else if (type === 'club') {
		const clubs = database.collection('clubs');
		const club = await clubs.findOne({'email': email});
		const clubPosts = [];
		for (let postID of club['posts']) {
			const post = await posts.findOne({'_id': postID});
			studentPosts.push(post);
		}
		return clubPosts;
	} else {

	}
	return [];
}

// updatePost(postID: String, text: String, timestamp: Date): boolean
export async function updatePost(postID, text, timestamp) {
	await client.connect();
	const database = client.db('club_connect_db');

	const posts = database.collection('posts');
	await posts.updateOne({'_id': postID}, {
		'text': text,
		'timestamp': timestamp
	});
	return true;
}

//collection is "students" or "clubs"
export async function deleteClubPost(email, timestamp, collection) {
	await client.connect();
	const database = client.db('club_connect_db');

	const colls = database.collection(collection);
	const coll = await colls.findOne({'email': email});

	let index;
	for (let i = 0; i < coll.posts.length; ++i) {
        if(post.timestamp == timestamp){
			index = i;
		}
    }
	coll.posts.splice(index, 1);

	await colls.updateOne({'email': email},{ $set: {posts: coll.posts}});

	await client.close();
}
