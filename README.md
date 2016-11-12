# #Everything

Everyone on the internet is inundated with new information and updates. Wouldn’t it be great if you can just check one place for only the updates that you care about, and have it be highly customizable? This application replaces the need to check all the feeds, social media, and websites that you follow as it centralizes all the information in one place.

Everything will provide a list of sources that users can add to their feed, such as youtube, RSS feed, etc. It also provides a framework API with which users can add different plugins to personalize their feed further if they do not see their application (source of feed) listed on Everything.

### Technologies

- Backend: Node.js
- Frontend: React.js/Redux
- Cache: Redis
- DB: SQLite3

## Features & Implementation

### Logging in with Facebook

Instead of creating a new account on yet another app, we allow users to use our app by logging in with their Facebook account.

### Adding feeds to "All" reading list

Users can follow feeds of built-in plugins, such as youtube, twitter, and RSS feed. The feeds of a user will be shown on the sidebar, with all the feeds that a user is following aggregated to the "All" list. (All feeds in one place)
The available feeds of a specific plugin is dependent on the plugin; for instance for the Youtube plugin, the feeds would be Youtube channels, and for RSS feed, news sites/blog.

### Adding customized plugin (instructions included)

If users would like to follow feed updates to an application or source that is not included on our list, we provide a framework API for users to write their own plugin. The user can submit a PR request to us, and it will be added it to our list of feeds upon approval. Users can also start their own server by cloning our git repo, and add to the `plugins` folder. User will need to work with the API of the source of the feed to pull the updates into Everything.

#### Instructions to write a custom plugin as follows:
- The plugin must be in its own folder with the snake-cased name of the plugin. It should include at least the two following files: backend.js, and frontend.js. Users can also add css files to customize the look of their plugin feeds.

##### `frontend.js`:
Instantiate a new class `Frontend`, with the following methods that structures the layout of your plugin:
(** Note: ** Some of the following methods require React syntax. If you are not familiar with React, you can write your plugin layout in HTML and translate it to React with this resource: [Magic React][link])
[link]: http://magic.reactjs.net/htmltojsx.htm

  * `getSubfeedForm(callback, closeModal)`
In this method, return the JSX components for your subfeed form. For example, if you were to make a RSS Feed plugin and it allows the user of the plugin to input a url, your form would have a field for a url. The params that you specify for this plugin will be stored in the database; make sure to pass the params back in the `callback` that is provided.
Note that the subfeed name is a required field.
You may want to write a onSumbit callback for the form in order to pass the data to the backend.
Make sure to stringify the params and call `closeModal()` at the end

    - Example code:
       ```js
        return (
            <form className="add-subfeed-form" onSubmit={this.handleSubfeedAdd.bind(this, cb, closeModal)}>
              <input type="text" className="subfeed-name"/>
              //...form content
            </form>
        ```

        ```js
          handleSubfeedAdd(cb, closeModal, e) {
            e.preventDefault();
            const subfeedParams =
            JSON.stringify({
              //...params
            });
            const data = {subfeedName: $('.subfeed-name').val(),
                          subfeedParams: subfeedParams
                        };
            cb(data);
            closeModal();
          }

        ```

  * `getDisplayComponent(params)`
In this method, return the JSX components for how your plugin's articles will be displayed. For example, for a RSS Feed plugin, the display would have the title, author, and body of a news article. The `params` input here will be from the and is passed in for you to use.
    - Example code:
      ```js
      let params = JSON.parse(params);
      return (
        <div>
          <div className="feed-item-title">{params.title}</div>
          <div className="feed-item-body">{params.body}</div>  
        </div>
      );
      ```

  * `getAuthForm()`
This method is only needed if the plugin you are writing requires user to sign in to view user specific contents.
In this method, return the JSX components for your plugin's authentication form. For example, users are required to sign in to Twitter to view their twitter follows.

##### `backend.js`:
Instantiate a new class `Backend`, with the following methods:

  * initAuth(callback)
In this method, initialize the authentication needed for your plugin and pass the auth object back in the `callback` we provide. The credentials (ex. access token) will be stored in the database.

  * `getOlderData(num, callback)`
In this method, write the code to fetch data from the API of your plugin. `num` represents the number of feed items we are storing in the cache each time this method is called. Pass the result to the `callback` after you have customized the return of the API into feed items.
Each feed item has to be in the form of an object, with the following keys:
    - title: the title of the specific feed item
    - image: the image of the feed item
    - params: the params that you would need for content of a specific feed item. ex for a youtube video, you might want to include videoId. Make sure to stringify the params before pasing it to `callback`.
    - Example code:
      ```js

      const videoParams =
      JSON.stringify({
        title,
        description,
        videoId
      });

      const videoItem =
      {
        title,
        image,
        params: videoParams
      }

      callback(videoItem)
      ```

  * `getNewerData(callback)`
  In this method, fetch new data from your plugin's API when they are available. When you receive new items, use the callback provided to send us back new feed items. (similar to `getOlderData`)
  

Contributors: Valerie Lu, Lily Kwan
