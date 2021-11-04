

//very basic & untested

function add_new_comment(comment, feed_id){
	feed[feed_id].push(comment);
}

function delete_comment(comment_id, feed_id){
	for(let i = 0; i < feed_id.length; ++i){
		if (feed[feed_id][i].id === comment_id){
			feed[feed_id].split(i, 1);
		}
	}
}

//should this appear after the page loads?
function view_comments(feed_id){
	
}

function add_new_user(){
	
	
}