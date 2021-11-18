'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:pwd@teamdaletcluster.3ramk.mongodb.net?retryWrites=true&w=majority';
const client = new MongoClient(uri);

(async () => {
	await client.connect();
	const database = client.db('club_connect');

	async function validateUser(username, password) {
		const user = await readUser(username);
		if (user == null) {
			return false;
		} else {
			if (user['password'] != password) {
				return false;
			} else {
				return true;
			}
		}
	}

	async function createUser(username, password, type, name, email) {
		if (await readUser(username) != null) {
			return false;
		} else {
			const users = database.collection('users');

			const query = {
				'username': username,
				'password': password,
				'name': name,
				'email': email
			};
			if (type === "student") {
				query['friends'] = [];
				query['clubs'] = [];
				query['posts'] = [];
			} else if (type === "club") {
				query['likes'] = 0;
				query['members'] = [];
				query['posts'] = []
			}
			await users.insertOne(query);

			return true;
		}
	}

	async function readUser(username) {
		const users = database.collection('users');

		const query = {'username': username};
		const user = await users.findOne(query);

		return user;
	}

	async function updateUser(username, user) {

	}

	async function createPost(username, text, timestamp) {
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

	async function updatePost(postID, text, timestamp) {
		const posts = database.collection('posts');
		
		const query = {'_id': postID};
		const update = {
			'text': text,
			'timestamp': timestamp
		}
		await posts.updateOne(query, update);
	}

	async function deletePost(username, postID) {

	}

	module.exports.validateUser = validateUser;
	module.exports.createUser = createUser;
	module.exports.readUser = readUser;
	module.exports.updateUser = updateUser;
	module.exports.createPost = createPost;
	module.exports.updatePost = updatePost;
	module.exports.deletePost = deletePost;
})();
