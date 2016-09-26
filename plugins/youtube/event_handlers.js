module.exports = function () {
  $('.add_subfeed_form').submit((e) => {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "subfeeds/youtube", //need to send with the plugin name
      data: {subfeedName: $('.subfeed-name').val(), params:
        {
          channel: $('.subfeed-link').val()
        }
      },
      dataType: 'json',
      success: () => {
        //somehow add the plugin and subfeed to user
      }
    });
  });
};
