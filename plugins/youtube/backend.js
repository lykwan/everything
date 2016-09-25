class Backend {
  constructor(params) {
    this.feeds;
    this.nextPageToken;
    this.lastFetchedItem;
  }

  getNewerData() {

  }

  getOlderData(n) {
    ajax
    GET

    https://www.googleapis.com/youtube/v3/videos?part=contentDetails,id,snippet&chart=mostPopular&regionCode=US&maxResults=25&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date
    return this.fetchedData;
  }

  parseFetchedData(data) {

  }

  initAuth() {

  }

}

module.exports = Backend;
