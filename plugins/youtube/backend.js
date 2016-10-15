const https = require('https');

class Backend {
  constructor(params) {
    this.nextPageToken = "";
    this.firstItem;
    this.params = JSON.parse(params);
    this.isDone = false;
  }

  getNewerData(queue) {
    let url, channelId;
    if (!this.isDone) {
      console.log(this.params.channelName);
      const req1 = https.get(`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&forUsername=${this.params.channelName}&part=id`, (res) => {
        res.on('data', (data) => {
          const channelIdData = JSON.parse(data);
          console.log(channelIdData);
          if (channelIdData.items.length === 0) {
            channelId = "UCoookXUzPciGrEZEXmh4Jjg";
          } else {
            channelId = channelIdData.items[0].id;
          }
          url = `https://www.googleapis.com/youtube/v3/search?pageToken=${this.nextPageToken}&part=snippet&channelId=${channelId}&maxResults=50&type=video&key=AIzaSyB3SiawekvPegKNcefPRoYlbgVl9vaxQr0&order=date`;

          const req2 = https.get(url, (res2) => {
            let dataArr = [];
            res2.on('data', (data2) => {
              dataArr.push(data2);
            }).on('end', () => {
              var buffer = Buffer.concat(dataArr);
              const videoData = JSON.parse(buffer.toString());
              this.nextPageToken = videoData.nextPageToken;
              let videos = this.parseFetchedData(videoData);
              console.log(videos);
              console.log("num vids");
              console.log(videos.length);
              for (var i = videos.length - 1; i >= 0; i--) {
                queue.push(videos[i]);
              }
            });
          });

          req2.end();
        });

        req1.end();
      });
    }
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
    if (this.nextPageToken === undefined) {
      this.isDone = true;
    }

    return res.items.map((item, idx) => {

      const videoParams =
      JSON.stringify({
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId
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
