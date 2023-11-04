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

$(document).ready(() => {
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: (response) => {
      for (let i = 0; i < response.length; i++) {
        let titleBox = $('<div></div>').addClass('title_box');
        let priceByNight = $('<div></div>').addClass('price_by_night');
        let h2 = $('<h2></h2>');
        h2.text(response[i].name);
        priceByNight.text("$" + response[i].price_by_night);
        titleBox.append(h2, priceByNight);

        let information = $('<div></div>').addClass('information');
        let maxGuest = $('<div></div>').addClass('max_guest');
        maxGuest.text(response[i].max_guest + " Guests");
        let numberRooms = $('<div></div>').addClass('number_rooms');
        numberRooms.text(response[i].number_rooms + " Rooms");
        let numberBathrooms = $('<div></div>').addClass('number_bathrooms');
        numberBathrooms.text(response[i].number_bathrooms + " Bathrooms");
        information.append(maxGuest, numberRooms, numberBathrooms);

        let description = $('<div></div>').addClass('description');
        description.html(response[i].description);
        let article = $('<article></article>');
        article.append(titleBox, information, description);

        $('section.places').append(article);
      }
    },
    error: () => {}
  });
});
