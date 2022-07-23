require('dotenv').config();
const fs = require('fs');
const Snoowrap = require('snoowrap');
const schedule = require('node-schedule');
const r = new Snoowrap({
    userAgent: 'tagbot public.v.1.0 with snoowrap',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
let data = [];
var timeRange='6 hours';
var postLimit=3;

function archiveData(json){
	let jsonImport = fs.readFileSync('datadumpARCHIVES.json');
	newData = JSON.parse(jsonImport);
	newData.push(json);
	let jsonData = JSON.stringify(newData,null,2);
	fs.writeFileSync('datadumpARCHIVES.json',jsonData);
}

async function scrapeSubreddit(sub) {
	data = [];
	const subreddit = await r.getSubreddit(sub);
	const topPosts = await subreddit.getTop({time: timeRange, limit: postLimit});
	topPosts.forEach((post) => {
		data.push({
			thumbnail: post.thumbnail,
			text: post.title,
			score: post.score,
			link: post.url,
			URL: post.id,
			content: post.selftext.split(' ').slice(0,30).join(' ')+".."
		})
	archiveData(data);
	let json = JSON.stringify(data,null,2)
	fs.writeFileSync('datadump-'+sub+'.json',json);
	});
};

async function multiSub (){
	await scrapeSubreddit('technology');
	await scrapeSubreddit('futurology');
	await scrapeSubreddit('tech');
	timeRange='12 hours';
	postLimit=5;
	await scrapeSubreddit('all');
	timeRange='6 hours';
	postLimit=3;
};

schedule.scheduleJob('0 */4 * * *',function(triggerEvent){
	console.log('job ran at ' + triggerEvent);
	multiSub();
});
multiSub();
console.log('app started, running on every 4th hour.');
