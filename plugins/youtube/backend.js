const https = require('https');

class Backend {
  constructor(params) {
    this.nextPageToken;
    this.firstFetchedItem;
    this.params = JSON.parse(params);
  }

    getNewerData(queue) {
      let url, channelId;
      console.log("this.params.channelName");
      console.log(this.params.channelName);
      if (this.params.channelName) {

        https.get(`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&
          forUsername=${this.params.channelName}&part=id`, (res) => {
          console.log(res);
          channelId = res.items[0].id;
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&
          channelId=${channelId}&maxResults=50&type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
        });
      }
      else {
        // url = `https://www.googleapis.com/youtube/v3/videos?pageToken=${this.nextPageToken}&part=id,snippet&chart=mostPopular&regionCode=US&maxResults=50&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCK2ACorzpH-igxuHZ2ObCEA&maxResults=50
        &type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
      }

      https.get(url, (res) => {
        console.log(res);
        this.nextPageToken = res.nextPageToken;
        let videos = this.parseFetchedData(res);
        queue.push(videos);
      });

    }

  getOlderData(n, successCallback) {
    // let url, channelId;
    // console.log("this.params.channelName");
    // console.log(this.params.channelName);
    // if (this.params.channelName) {
    //
    //   https.get(`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&forUsername=${this.params.channelName}&part=id`, (res) => {
    //     console.log(res);
    //     channelId = res.items[0].id;
    //     url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
    //   }
    // }
    // else {
    //   url = `https://www.googleapis.com/youtube/v3/videos?pageToken=${this.nextPageToken}&part=id,snippet&chart=mostPopular&regionCode=US&maxResults=50&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
    // }
    //
    // https.get(url, (res) => {
    //   console.log(res);
    //   this.nextPageToken = res.nextPageToken;
    //   let videos = this.parseFetchedData(res);
    //   successCallback(videos);
    // }
  }

  parseFetchedData(res) {
    if (!this.nextPageToken) {
      return null;
    } else {
      return res.items.map((item, idx) => {

        const videoParams =
        JSON.stringify({
          title: item.snippet.title,
          description: item.snippet.description,
          videoId: item.id
        });

        return {
          subfeedName: this.params.subfeedName,
          title: item.snippet.title,
          image: item.snippet.thumbnails.medium.url,
          params: videoParams
        };
      });
    }

  }

  initAuth() {

  }

}

module.exports = Backend;
