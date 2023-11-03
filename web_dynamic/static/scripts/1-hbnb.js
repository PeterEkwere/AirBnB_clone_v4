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
