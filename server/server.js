import express from 'express';

const app = express();
app.use(express.static('./frontend'));


app.get('/user/new', (req, res) => {
	
	res.end;
});

app.get('/login', (req, res) => {
	
	res.end;
});

app.get('/user/view/club_id', (req, res) => {
	
	res.end;
});

app.get('/club/view', (req, res) => {
	
	res.end;
});

app.get('/user/new', (req, res) => {
	
	res.end;
});

app.get('/user/comment/new?comment_id=', (req, res) => {
	
	res.end;
});

app.get('/user/comment/delete?comment_id=', (req, res) => {
	
	res.end;
});

app.listen(process.env.PORT || 3000);