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

export const addSingleApp = (appId, success, error) => {
  $.ajax({
    method: "GET",
    url: `userapps/${appId}`,
    dataType: "json",
    success,
    error: () => {console.log('add user app error');}
  });
};
