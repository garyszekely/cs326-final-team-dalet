'use strict';

import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://admin:pwd@teamdaletcluster.3ramk.mongodb.net?retryWrites=true&w=majority';
const client = new MongoClient(uri);

export async function authenticateStudent(email, password) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const student = await students.findOne({
		'email': email,
		'password': password
	});

	await client.close();

	if (student === null) {
		return false;
	}

	return true;
}

export async function authenticateClub(email, password) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const club = await clubs.findOne({
		'email': email,
		'password': password
	});

	await client.close();

	if (club === null) {
		return false;
	}

	return true;
}

// CRUD Operations for Students
export async function createStudent(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');

	if ((await students.findOne({'email': email})) !== null) {
		return false;
	}

	const student = {
		'email': email,
		'password': password,
		'name': name,
		'bio': 'No Bio',
		'joined': new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
		'friends': [],
		'clubs': [],
		'posts': []
	};
	await students.insertOne(student);

	await client.close();
	return true;
}

export async function readStudent(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const student = await students.findOne({'email': email});

	await client.close();
	return student;
}

export async function readStudents(searchFor) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	students.createIndex({'name': 'text'});
	const searchedStudents = await students.find({$text: {$search: searchFor}}).toArray();
	
	await client.close();
	return searchedStudents;
}

export async function updateStudent(email) {

}

// CRUD Operations for Clubs
export async function createClub(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');

	if ((await clubs.findOne({'email': email})) !== null) {
		return false;
	}

	const club = {
		'email': email,
		'password': password,
		'name': name,
		'bio': 'No Bio',
		'totalLikes': 0,
		'joined': new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
		'likes': 0,
		'members': [],
		'posts': []
	};
	await clubs.insertOne(club);

	await client.close();
	return true;
}

export async function readClub(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const club = await clubs.findOne({'email': email});

	await client.close();
	return club;
}

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

// CRUD Operations for Posts
export async function createPost(email, name, type, text, timestamp) {
	await client.connect();
	const database = client.db('club_connect_db');

	const posts = database.collection('posts');
	const create = {
		'name': name,
		'text': text,
		'timestamp': timestamp,
		'id': posts.length
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

/*
export async function deletePost(username, postID) {

}
*/

//collection is "students" or "clubs"
export async function deleteClubPost(email, postID, collection) {
	await client.connect();
	const database = client.db('club_connect_db');

	const colls = database.collection(collection);
	const coll = await colls.findOne({'email': email});

	const index;
	for (const i = 0; i < coll.posts.length; ++i) {
        if(post.id == postID){
			index = i;
		}
    }
	coll.posts.splice(index, 1);

	await colls.updateOne({'email': email},{ $set: {posts: coll.posts}});

	await client.close();
}