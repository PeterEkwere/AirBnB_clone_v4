// script listens for changes in the <input> checkbox tag
$(document).ready(() => {
  let amenities = {};
  const checkbox = $('input[type="checkbox"]');

  checkbox.change((event) => {
    const target = $(event.target);

    if (target.is(":checked")) {
      amenities[target.data('id')] = target.data('name');
    } else {
      delete amenities[target.data('id')];
    }

    let amenityList = Object.values(amenities);

    if (amenityList.length > 0) {
      $('div.amenities h4').text(amenityList.join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });
});
$(document).ready(function () {
  function ApiStatus() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:5001/api/v1/status",
      success: function (data) {
        if (data.status === "OK") {
          console.log("status is OK")
          $("#api_status").addClass("available");
        } else {
          console.log("Status is not OK")
          $("#api_status").removeClass("available");
        }
      },
      error: function (error) {
        $("#api_status").removeClass("available");
        console.error("Error:", error);
      }
    });
  }
  // Call the function initially to check the status
  ApiStatus();

  // set up a timer to periodically check the status
  setInterval(ApiStatus, 5000);
});
