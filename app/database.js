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
 * 
 * Overview:
 * 	authenticateStudent(email: string, password: string): boolean
 * 	authenticateClub(email: string, password: string): boolean
 */

// authenticateStudent(email: string, password: string): boolean
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

// authenticateClub(email: string, password: string): boolean
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
 * 
 * Overview:
 * 	createStudent(email: string, password: string, name: string): boolean
 * 	readStudent(email: string): Student
 * 	readStudents(searchFor: string): Student[]
 * 	updateStudent(email: string):
 */ 

// createStudent(email: string, password: string, name: string): boolean
export async function createStudent(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');

	if ((await students.findOne({'email': email})) !== null) {
		return false;
	}

	const [salt, hash] = mc.hash(password);

	const student = {
		'email': email,
		'salt': salt,
		'hash': hash,
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

// readStudent(email: string): Student
export async function readStudent(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	const student = await students.findOne({'email': email});

	await client.close();
	return student;
}

// readStudents(searchFor: string): Student[]
export async function readStudents(searchFor) {
	await client.connect();
	const database = client.db('club_connect_db');

	const students = database.collection('students');
	students.createIndex({'name': 'text'});
	const searchedStudents = await students.find({$text: {$search: searchFor}}).toArray();
	
	await client.close();
	return searchedStudents;
}

// updateStudent(email: string):
export async function updateStudent(email) {

}

/**
 * CRUD Operations for Clubs
 * 
 * Overview:
 * 	createClub(email: string, password: string, name: string): boolean
 * 	readClub(email: string): Student
 * 	readClubs(searchFor: string): Student[]
 * 	updateClub(email: string):
 */ 

// createClub(email: string, password: string, name: string): boolean
export async function createClub(email, password, name) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');

	if ((await clubs.findOne({'email': email})) !== null) {
		return false;
	}

	const [salt, hash] = mc.hash(password);

	const club = {
		'email': email,
		'salt': salt,
		'hash': hash,
		'name': name,
		'bio': 'No Bio',
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

// readClub(email: string): Club
export async function readClub(email) {
	await client.connect();
	const database = client.db('club_connect_db');

	const clubs = database.collection('clubs');
	const club = await clubs.findOne({'email': email});

	await client.close();
	return club;
}

// readClubs(searchFor: string): Club[]
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

/**
 * CRUD Operations for Posts
 * 
 * Overview:
 * 	createPost(email: string, name: string. type: string, text: string, timestamp: Date): boolean
 * 	readPosts(email: string, type: string): Post[]
 * 	updatePost(postID: string, text: string, timestamp: Date): boolean
 */

// createPost(email: string, name: string. type: string, text: string, timestamp: Date): boolean
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

// readPosts(email: string, type: string): Post[]
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

// updatePost(postID: string, text: string, timestamp: Date): boolean
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
