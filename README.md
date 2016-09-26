# #Everything

[Everything][app_link]

[app_link]: http://everything.lilykwan.me:3000

Everyone on the internet is inundated with new information and updates. Wouldn’t it be great if you can just check on place for all new updates that you care about, and have it be highly customizable? This application replaces the need to check all the applications and websites that you follow as it centralizes all the information in one place.

Our application will provide a list of sources that users can add to their feed, such as youtube, news, etc. Our application will also provide a framework api that a user can add different plugins to personalize their feed further. If a user would like to create a specific source for their own feed, a user can implement their own plugins that can be used with our framework api.

Development of the features in this application will be guided by different apis for the plugins, such as youtube api or Hacker news RSS feed. Redis cache would be also used to store temporary aggregated data.

Backend is done with node.js, and frontend is done with react.js.

## Features & Implementation

# Add feed updates from some popular websites

A user can use this webapp to follow some of his favorite websites, such as youtube, twitter, etc. The feeds that he/she follows will show up on the sidebar, and he/she can read the feeds she wants in one place.

# Add customized feed to his collections of feeds

If a user wants to follow feed updates to a website that doesn't exist in our list, we provide them a framework that he/she can write a plugin to follow his/her customized link. The user can submit a PR request and we will review it, and will add it to our list of feeds to follow if we approve. The user can also start his/her own server by cloning our repo, and put his/her plugin inside the plugins folder of this repo.

The structure of the plugin follows:
- The plugin must be in its own folder with two files: backend.js, and frontend.js

- frontend.js:
It should be in a class, with the following methods:

  * getSubfeedForm(callback)
This method is where you can put the JSX for your specific subfeed form. For example, if you were to make a RSS Feed aggregator and wants the user to put an url for every subfeed, this method is where you would put the JSX for that form. The user input of the params you specified will be stored in the database, and you can pass the params back in the callback we provide.

  * getDisplayHTML(params)
The method is where you can put what the user will see when they click on a specific subfeed item. For example, for a RSS Feed aggregator, it would be the news content for that specific article. The params that you specify when you send the data over to the framework is passed in for you to use.

  * getAuthForm()
This method is where you can put the auth form needed for your subfeed. For example, if you are connecting the user to youtube, and you need their auth, this method is for you to write the JSX for that form.

- backend.js:
It should be in a class, with the following methods:

  * initAuth(cb)
This method is for you to initialize the auth that you would need for your feed. The credentials (ex. access token) will be stored in the database, and you can pass the auth object back in the callback we provide.

  * getOlderData(n, cb)
This method is where you can write your fetching of older data. n represents the number of feed items we are showing and the callback is for you to send to the framework back the array of feed items you want to show on the website.
Each feed item has to be in the form of an object, with the following keys:
    - title: the title of the specific feed item
    - img: the image of the feed item
    - params: the params that you would need to show the content of a specific feed item, in JSON format. ex for a youtube video, you might want to specific videoId, etc.

  * getNewerData(cb)
  This method is where you can write your fetching of newer data. When you receive new items, use the callback provided to send us back new feed items.
