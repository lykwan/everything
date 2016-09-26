class Backend {
  constructor(params) {
    this.nextPageToken = "";
    this.lastFetchedItem;
    this.params = JSON.parse(params);
  }

  getNewerData(n, successCallback) {
    //get new data every day at 12AM
    let url, channelId;
    if (this.params.channelName) {
      $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/channels?key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&forUsername=${this.params.channelName}&part=id`,
        success: (res) => {
          channelId = res.items[0].id;
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${n}&type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
        }
      });
    } else {
      url = `https://www.googleapis.com/youtube/v3/videos?pageToken=${this.nextPageToken}&part=id,snippet&chart=mostPopular&regionCode=US&maxResults=${n}&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
    }
    $.ajax({
      method: "GET",
      url: url,
      success: (res) => {
        let videos = this.parseFetchedData(res);
        successCallback(videos);
      }
    });
  }

  getOlderData(n, successCallback) {
    let url, channelId;
    if (this.params.channelName) {
      $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/channels?key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&forUsername=${this.params.channelName}&part=id`,
        success: (res) => {
          channelId = res.items[0].id;
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${n}&type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
        }
      });
    } else {
      url = `https://www.googleapis.com/youtube/v3/videos?pageToken=${this.nextPageToken}&part=id,snippet&chart=mostPopular&regionCode=US&maxResults=${n}&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;
    }
    $.ajax({
      method: "GET",
      url: url,
      success: (res) => {
        let videos = this.parseFetchedData(res);
        this.nextPageToken = res.nextPageToken;
        successCallback(videos);
      }
    });
  }

  parseFetchedData(res) {
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

  initAuth() {

  }

}

module.exports = Backend;
