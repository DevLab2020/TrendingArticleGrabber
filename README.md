# TrendingArticleGrabber
Scrape Reddit for top articles in r/all r/technology r/tech and r/futurology and dump into local json files.

Every 4th hour of the day, this app scrapes the Top rated posts in 3 subreddits and in r/all.
For the 3 subreddits, it searches for the 3 top posts in the last 6 hours.
For r/all, it switches to the top 5 posts in the last 12 hours.

After scraping data(thumbnail url, post text, score, post url, comments url, and selftext), the app then replaces the data inside each respective datadump-sub.json file. Additionally, it appends all posts to an archive json (datadumpARCHIVES.json). 

# Requirements

You must have a Reddit account and a developer app created already with a clientId, clientSecret, username, and password available.

You will have to have NPM installed, or manually install required packages( node-schedule & snoowrap ) found in package.lock

# Installation

Download this repository.

Inside downloaded directory, run npm install command: npm -i

Edit the .env file with your Reddit API app information (client_id, client_secret, username, password)

run the app with the command: node app.js

# Future implementations

1. Organize datadumps into datadump directory.

2. Add a function to check whether or not the post has been captured before, and if so, do not add it to the archive post.

  1. if this is the case, possibly add a rescrape function to decrease the timerange and/or method(top to rising) in order to for sure capture new content.

3. Scrape top comment
