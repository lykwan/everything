export const requestUserFeeds = (success, error) => {
  $.ajax({
    method: "GET",
    url: "user/feed",
    dataType: "json",
    success,
    error: () => {console.log('fb login error');}
  });
};
