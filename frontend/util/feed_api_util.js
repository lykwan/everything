import $ from "jquery";

export const requestUserFeeds = (lastItemIds, success, error) => {

  $.ajax({
    method: "GET",
    url: "subfeeds/all",
    data: {lastItemIds: lastItemIds},
    dataType: "json",
    success,
    error: () => {console.log('all feeds error');}
  });
};

export const requestSubfeeds = (subfeedId, lastItemId, success, error) => {
  console.log("in api");
  console.log(subfeedId);
  $.ajax({
    method: "GET",
    url: `subfeeds/${subfeedId}`,
    dataType: "json",
    data: {lastItemId: lastItemId},
    success,
    error: () => {console.log('show one app details (feeds) error');}
  });
};
