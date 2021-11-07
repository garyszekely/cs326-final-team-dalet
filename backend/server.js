const express = require('express');
import * as utils from "database.js";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const app = express();
app.use(express.static('../frontend'));

app.get('/login', (req, res) => {
	res.redirect('/index/login.html');
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

app.post('/club/member/new', (req, res) => {
	res.sendStatus(200);
	res.end;
});

app.post('/club/member/delete', (req, res) => {
	res.sendStatus(200);
	res.end;
});

app.get('/club/like/new', (req, res) => {
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


app.get('/user/view/club_id', (req, res) => {
	res.end;
});

app.get('/club/view', (req, res) => {
	res.end;
});

app.get('/user/comment/new?comment_id=', (req, res) => {
	res.end;
});

app.get('/user/comment/delete?comment_id=', (req, res) => {
	res.end;
});

app.listen(process.env.PORT || 3000);