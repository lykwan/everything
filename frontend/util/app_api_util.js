import $ from "jquery";

export const requestUserApps = (success, error) => {
  $.ajax({
    method: "GET",
    url: "feeds",
    dataType: "json",
    success,
    error: () => {console.log('user apps error');}
  });
};

export const addSingleUserSubfeed = (pluginId, subfeedData, success, error) => {
  $.ajax({
    method: "POST",
    url: `subfeeds`,
    data: {
      pluginId: pluginId,
      subfeedName: subfeedData.subfeedName,
      subfeedParams: subfeedData.subfeedParams
    },
    success,
    error: () => {console.log('add user app error');}
  });
};

export const requestAllApps = (success, error) => {
  $.ajax({
    method: "GET",
    url: "plugins",
    dataType: "json",
    success,
    error: () => {console.log('all apps error');}
  });
};

export const requestSingleApp = (appId, success, error) => {
  $.ajax({
    method: "GET",
    url: `apps/${appId}`,
    dataType: "json",
    success,
    error: () => {console.log('show one app details (feeds) error');}
  });
};
