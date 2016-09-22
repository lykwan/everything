import $ from "jquery";

export const requestUserFeeds = (success, error) => {
  $.ajax({
    method: "GET",
    url: "user/feed",
    dataType: "json",
    success,
    error: () => {console.log('all feeds error');}
  });
};
