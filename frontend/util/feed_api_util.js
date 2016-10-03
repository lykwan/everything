import $ from "jquery";

export const requestUserFeeds = (success, error) => {
  $.ajax({
    method: "GET",
    url: "all",
    dataType: "json",
    success,
    error: () => {console.log('all feeds error');}
  });
};

export const requestSubfeeds = (subfeedId, success, error) => {
  $.ajax({
    method: "GET",
    url: `subfeeds/${subfeedId}`,
    dataType: "json",
    success,
    error: () => {console.log('show one app details (feeds) error');}
  });
};
