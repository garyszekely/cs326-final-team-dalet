'use strict';

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const database = require('./database.js');

const app = express();
app.use(expressSession({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

passport.use(new LocalStrategy(async (username, password, done) => {
	if (await database.validateUser(username, password)) {
		return done(null, username);
	} else {
		return done(null, false, {message: 'Incorrect username and/or password.'});
	}
}));

app.get('/', (req, res) => {
	res.sendFile('landing-page.html', {'root': __dirname + '/public/index/'});
});

app.get('/homepage', (req, res) => {
	res.sendFile('', {'root': __dirname + '/public/index/'})
});

app.get('/personal-page', (req, res) => {
	res.sendFile('', {'root': __dirname + '/public/index/'})
});

app.get('/profile-page', (req, res) => {
	res.sendFile('', {'root': __dirname + '/public/index/'})
});

app.get('/find-clubs', (req, res) => {
	res.sendFile('find-clubs.html', {'root': __dirname + '/public/index/'})
});

app.post('/login', async (req, res) => {
	const username = req.body['username'];
	const password = req.body['password'];

	if (await database.validateUser(username, password)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}

	res.end();
});

app.post('/create-user', async (req, res) => {
	const username = req.body['username'];
	const password = req.body['password'];
	const type = req.body['type'];
	const name = req.body['name'];
	const email = req.body['email'];

	if (await database.createUser(username, password, type, name, email)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}

	res.end();
});

app.get('/read-user', async (req, res) => {
	const username = req.body['username'];

	const user = await database.readUser(username);
	if (user != null) {
		res.send(JSON.stringify(user));
	} else {
		res.sendStatus(400);
	}

	res.end();
});

app.post('/create-post', async (req, res) => {
	const username = req.body['username'];
	const text = req.body['text'];
	const timestamp = req.body['timestamp'];

	await database.createPost(username, text, timestamp);

	res.end();
});

app.post('/update-post', async (req, res) => {
	const username = req.body['username'];
	
	res.end();
});

app.post('/delete-post', async (req, res) => {
	res.end();
});


app.get('/page', (req, res) => {
	utils.redirect(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/student/new', (req, res) => {
	utils.add_new_student(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/student/friend/add', (req, res) => {
	utils.add_friend(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/student/friend/delete', (req, res) => {
	utils.delete_friend(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/club/new', (req, res) => {
	res.sendStatus(200)
	res.end;
});

app.get('/club/types', (req, res) => {
	res.send([
		"Finance",
		"Engineering",
		"Athletic"
	])
	res.end;
});

app.get('/clubs', (req, res) => {
	res.send([
		{
			clubName: 'The Gary & Dang Club',
			clubDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.'
		}
	])
});

app.post('/club/member/add', (req, res) => {
	res.sendStatus(200);
	res.end;
});

app.post('/club/member/delete', (req, res) => {
	res.sendStatus(200);
	res.end;
});

app.post('/club/like/update', (req, res) => {
	utils.update_like(req, res);
	res.sendStatus(200);
	res.end;
});

app.get('/club/like/get', (req, res) => {
	utils.get_like(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/club/info/update', (req, res) => {
	utils.update_club_info(req, res);
	res.sendStatus(200);
	res.end;
});

app.post('/club/description/update', (req, res) => {
	utils.update_club_description(req, res);
	res.sendStatus(200);
	res.end;
});

app.get('/student/info', (req, res) => {
	res.send(JSON.stringify({
		name: 'Gary Szekely',
		bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
		totalClubs: 2,
		totalPosts: 2,
		joined: 'Oct 2021',
		clubs: [
			"The Gary & Dang Club"
		],
		friends: [],
		posts: [
			{
				name: 'Gary Szekely',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
				timestamp: 'October 21, 2021 at 10:03 AM',
				comments: []
			},
			{
				name: 'Gary Szekely',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
				timestamp: 'October 20, 2021 at 7:54 PM',
				comments: []
			}
		]
	}))
	res.end;
});

app.get('/club/info', (req, res) => {
	res.send(JSON.stringify({
		clubName: 'The Gary & Dang Club',
		clubDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
		totalMembers: 2,
		totalPosts: 2,
		totalLikes: 100,
		created: 'Oct 2021',
		joined: 'Oct 2021',
		posts: [
			{
				clubName: 'The Gary & Dang Club',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
				timestamp: 'October 21, 2021 at 10:03 AM',
				comments: []
			},
			{
				clubName: 'The Gary & Dang Club',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget ultrices nibh. Proin sit amet velit cursus, bibendum mi congue, lacinia ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porta quam eu enim vestibulum, eu posuere dui imperdiet.',
				timestamp: 'October 20, 2021 at 7:54 PM',
				comments: []
			}
		],
		members: [
			"Gary Szekely", 
			"Dang Le Nguyen"
		],
	}))
	res.end;
});

app.listen(3000);
