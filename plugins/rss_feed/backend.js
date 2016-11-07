const RssFeedEmitter = require('rss-feed-emitter');

class Backend {
  constructor(params) {
    this.params = JSON.parse(params);
  }

  getNewerData(queue) {
    let feeder = new RssFeedEmitter();
    feeder.add({
      url: rssfeedLink,
      refresh: 10000
    });
    feeder.on('new-item', function(item) {
      queue.push(item);
      console.log(queue);
    });
  }

  getOlderData() {

  }

  initAuth() {

  }

}

module.exports = Backend;
