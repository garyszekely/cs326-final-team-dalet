'use strict';

import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authenticateStudent, authenticateClub, createStudent, readClub, createClub, readStudent } from './database.js';

const app = express();

passport.use(new LocalStrategy({
	usernameField: 'email',
	passReqToCallback: true
}, async (req, email, password, done) => {
	const type = req.body['type'];

	if (type === 'student') {
		if (await authenticateStudent(email, password)) {
			return done(null, {
				'email': email,
				'type': 'student'
			});
		}
	} else if (type === 'club') {
		if (await authenticateClub(email, password)) {
			return done(null, {
				'email': email,
				'type': 'club'
			});
		}
	} else {
	}
	return done(null, false, {message: 'Incorrect email and/or password.'});
}));

app.use(expressSession({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('app/public'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    done(null, id);
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

app.get('/', (req, res) => {
	res.sendFile('landing-page.html', {root: 'app/public/index/'});
});

app.get('/homepage', isLoggedIn, (req, res) => {
	const userType = req.user['type'];

	if (userType === 'student') {
		res.sendFile('student-homepage.html', {root: 'app/public/index/'});
	} else if (userType === 'club') {
		res.sendFile('club-homepage.html', {root: 'app/public/index/'});
	}
});

app.get('/personal-page', isLoggedIn, async (req, res) => {
	if (req.user['type'] === 'student') {
		res.sendFile('student-personal-page.html', {root: 'app/public/index/'});
	} else if (req.user['type'] === 'club') {
		res.sendFile('club-personal-page.html', {root: 'app/public/index/'});
	}
});

app.get('/profile-page', isLoggedIn, (req, res) => {
	const userType = req.user['type'];
	const profileType = req.query['type'];
	if (userType === 'student') {
		if (profileType === 'student') {
			res.sendFile('student-student-profile-page.html', {root: 'app/public/index/'})
		} else if (profileType === 'student') {
			res.sendFile('student-club-profile-page.html', {root: 'app/public/index/'})
		}
	} else if (userType === 'club') {
		if (profileType === 'student') {
			res.sendFile('club-student-profile-page.html', {root: 'app/public/index/'})
		}
	}
});

app.get('/find-clubs', isLoggedIn, (req, res) => {
	if (req.user['type'] === 'student') {
		res.sendFile('find-clubs.html', {root: 'app/public/index/'})
	} else {
		res.redirect('/homepage');
	}
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/homepage',
	failureRedirect: '/',
}));

app.post('/create-student', async (req, res) => {
	const email = req.body['email'];
	const password = req.body['password'];
	const name = req.body['name'];

	if (await createStudent(email, password, name)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/read-student', async (req, res) => {
	const email = req.query['email'];
	const student = await readStudent(email);

	if (student !== null) {
		res.send(JSON.stringify(student))
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.post('/create-club', async (req, res) => {
	const email = req.body['email'];
	const password = req.body['password'];
	const name = req.body['name'];

	if (await createClub(email, password, name)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/read-club', async (req, res) => {
	const email = req.query['email'];
	const club = await readClub(email);

	if (club !== null) {
		res.send(JSON.stringify(club))
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
