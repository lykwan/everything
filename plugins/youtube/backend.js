class Backend {
  constructor(params) {
    this.nextPageToken = "";
    this.lastFetchedItem;
    this.params = JSON.parse(params);
  }

  getNewerData() {

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
        let result = this.parseFetchedData(res);
        this.nextPageToken = res.nextPageToken;
        successCallback(result);
      }
    });
  }

  parseFetchedData(data) {

    return {

    }
  }

  initAuth() {

  }

}

module.exports = Backend;
