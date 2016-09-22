export const requestUserApps = (success, error) => {
  $.ajax({
    method: "GET",
    url: "apps/user",
    dataType: "json",
    success,
    error: () => {console.log('fb login error');}
  });
};
