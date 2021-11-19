'use strict';

import { MongoClient } from 'mongodb';

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

	if (student !== null) {
		return true;
	} else {
		return false;
	}
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

	if (club !== null) {
		return true;
	} else {
		return false;
	}
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
		'totalClubs': 0,
		'totalPosts': 0,
		'joined': new Date(),
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

export async function updateClub(email) {

}

// CRUD Operations for Posts
export async function createPost(username, text, timestamp) {
	const database = client.db('club_connect');

	const users = database.collection('users');
	const posts = database.collection('posts');

	const create = {
		'text': text,
		'timestamp': timestamp
	};
	const post = await posts.insertOne(create);

	const query = {
		'username': username
	};
	await users.updateOne(query, update);
}

export async function updatePost(postID, text, timestamp) {
	const database = client.db('club_connect');

	const posts = database.collection('posts');

	const query = {'_id': postID};
	const update = {
		'text': text,
		'timestamp': timestamp
	}
	await posts.updateOne(query, update);
}

export async function deletePost(username, postID) {

}
