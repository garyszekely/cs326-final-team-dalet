'use strict';

import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import { 
	authenticateStudent, authenticateClub, 
	createStudent, readStudent, readStudents, readMembers, isFriend, addFriend, removeFriend, isMember, joinClub, leaveClub, likeClub,
	createClub, readClub, readClubs, removeMember,
	createPost, readPosts, updatePost,  
} from './database.js';

/**
 * Initialization
 */

// Create app with Express
const app = express();

// Use LocalStrategy with Passport
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

// App configuration
app.use(expressSession({
	secret: process.env.SECRET || 'SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('app/public'));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
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

// Environment configuration
dotenv.config();

/**
 * Routing
 */

// Landing Page
app.get('/', (req, res) => {
	res.sendFile('landing-page.html', {root: 'app/public/index/'});
});

// Home Page
// Login Required
app.get('/home-page', isLoggedIn, (req, res) => {
	const userType = req.user['type'];

	if (userType === 'student') {
		res.sendFile('student-home-page.html', {root: 'app/public/index/'});
	} else if (userType === 'club') {
		res.sendFile('club-home-page.html', {root: 'app/public/index/'});
	}
});

// Personal Page
// Login Required
app.get('/personal-page', isLoggedIn, async (req, res) => {
	const userType = req.user['type']

	if (userType === 'student') {
		res.sendFile('student-personal-page.html', {root: 'app/public/index/'});
	} else if (userType === 'club') {
		res.sendFile('club-personal-page.html', {root: 'app/public/index/'});
	}
});

// Profile Page
// Login Required
// Query: {type: string}
app.get('/profile-page', isLoggedIn, (req, res) => {
	const userType = req.user['type'];
	const profileType = req.query['type'];

	if (userType === 'student') {
		if (profileType === 'student') {
			res.sendFile('student-student-profile-page.html', {root: 'app/public/index/'})
		} else if (profileType === 'club') {
			res.sendFile('club-profile-page.html', {root: 'app/public/index/'})
		}
	} else if (userType === 'club') {
		if (profileType === 'student') {
			res.sendFile('club-student-profile-page.html', {root: 'app/public/index/'})
		}
	}
});

// Find Friends/Clubs Page
// Login Required
app.get('/find-friends-clubs', isLoggedIn, (req, res) => {
	const userType = req.user['type'];

	if (userType === 'student') {
		res.sendFile('find-friends-clubs.html', {root: 'app/public/index/'})
	} else {
		res.redirect('/home-page');
	}
});

// Find Members Page
// Login Required
app.get('/find-members', isLoggedIn, (req, res) => {
	const userType = req.user['type'];

	if (userType === 'club') {
		res.sendFile('find-members.html', {root: 'app/public/index'});
	} else {
		res.redirect('/home-page');
	}
});

/**
 * API
 */

app.post('/login', passport.authenticate('local', {
	successRedirect: '/home-page',
	failureRedirect: '/',
}));

app.get('/logout', (req, res) => {
	req.logout();
	res.end();
});

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

app.get('/read-student', isLoggedIn, async (req, res) => {
	const email = req.query['email'];
	const student = await readStudent(email);

	if (student !== null) {
		res.send(JSON.stringify(student))
	} else {
		res.sendStatus(400);
	}

	res.end();
});

app.get('/read-students', isLoggedIn, async (req, res) => {
	const searchFor = req.query['searchFor'];
	const students = await readStudents(searchFor);

	res.send(JSON.stringify(students));
	res.end();
});

app.get('/read-members', isLoggedIn, async (req, res) => {
	const email = req.user['email'];
	const searchFor = req.query['searchFor'];
	const members = await readMembers(email, searchFor);

	res.send(JSON.stringify(members));
	res.end();
});

app.get('/is-friend', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	res.send(JSON.stringify({'is_friend': await isFriend(userEmail, profileEmail)}));
	res.end();
});

app.get('/add-friend', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	if (await addFriend(userEmail, profileEmail)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/remove-friend', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	if (await removeFriend(userEmail, profileEmail)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/is-member', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	res.send(JSON.stringify({'is_member': await isMember(userEmail, profileEmail)}));
	res.end();
});

app.get('/join-club', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	if (await joinClub(userEmail, profileEmail)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/leave-club', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	if (await leaveClub(userEmail, profileEmail)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/like-club', isLoggedIn, async (req, res) => {
	const email = req.query['email'];

	if (await likeClub(email)) {
		res.sendStatus(200);
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

app.get('/read-club', isLoggedIn, async (req, res) => {
	const email = req.query['email'];
	const club = await readClub(email);

	if (club !== null) {
		res.send(JSON.stringify(club))
	} else {
		res.sendStatus(400);
	}

	res.end();
});

app.get('/read-clubs', isLoggedIn, async (req, res) => {
	const searchFor = req.query['searchFor'];
	const clubs = await readClubs(searchFor);

	res.send(JSON.stringify(clubs));
	res.end();
});

app.get('/remove-member', isLoggedIn, async (req, res) => {
	const userEmail = req.user['email'];
	const profileEmail = req.query['email'];

	if (await removeMember(userEmail, profileEmail)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.post('/create-post', isLoggedIn, async (req, res) => {
	const email = req.user['email'];
	const type = req.user['type'];
	const text = req.body['text'];
	const timestamp = new Date().toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short', year: 'numeric'});

	if (await createPost(email, type, text, timestamp)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	res.end();
});

app.get('/read-posts', isLoggedIn, async (req, res) => {
	const email = req.query['email'];
	const type = req.query['type'];

	const posts = await readPosts(email, type);
	res.send(JSON.stringify(posts));
	res.end();
});

app.post('/update-post', isLoggedIn, async (req, res) => {
	const postID = req.body['postID'];
	const text = req.body['text'];
	const timestamp = new Date().toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short', year: 'numeric'});

	if (await updatePost(postID, text, timestamp)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
	
	res.end();
});

app.listen(process.env.PORT || 3000);
