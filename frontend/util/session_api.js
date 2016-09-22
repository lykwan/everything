export const login = (token, success, error) => {
  $.ajax({
    method: "POST",
    url: `login`,
    data: {accessToken: token},
    dataType: "json",
    success,
    error: () => {console.log('fb login error');}
  });
};
