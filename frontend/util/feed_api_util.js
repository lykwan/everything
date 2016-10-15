import $ from "jquery";

export const requestUserFeeds = (success, error) => {

  $.ajax({
    method: "GET",
    url: "subfeeds/all",
    dataType: "json",
    success,
    error: () => {console.log('all feeds error');}
  });
};

export const requestMoreUserFeeds = (lastItemIds, success, error) => {

  $.ajax({
    method: "GET",
    url: "subfeeds/all",
    data: {lastItemIds: JSON.stringify(lastItemIds)},
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

export const requestMoreSubfeeds = (subfeedId, lastItemId, success, error) => {

  $.ajax({
    method: "GET",
    url: `subfeeds/${subfeedId}`,
    dataType: "json",
    data: {lastItemId: lastItemId},
    success,
    error: () => {console.log('show one app details (feeds) error');}
  });
};
