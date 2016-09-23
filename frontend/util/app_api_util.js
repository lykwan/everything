import $ from "jquery";

export const requestUserApps = (success, error) => {
  $.ajax({
    method: "GET",
    url: "apps/user",
    dataType: "json",
    success,
    error: () => {console.log('user apps error');}
  });
};

export const addSingleUserApp = (appId, success, error) => {
  $.ajax({
    method: "GET",
    url: `userapps/${appId}`,
    dataType: "json",
    success,
    error: () => {console.log('add user app error');}
  });
};

export const requestAllApps = (success, error) => {
  $.ajax({
    method: "GET",
    url: "apps",
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
