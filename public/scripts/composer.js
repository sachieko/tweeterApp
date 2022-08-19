/* eslint-disable no-undef */
// Jquery functions for navigating to new-tweet area.
$(() => {

  $('.nav-bar .tweet-menu').on('click', function(event) {
    event.preventDefault();
    $('#new-tweet').slideToggle('slow');
    $('#new-tweet textarea').focus();
  });

  // Adds event listening on whether the user has scrolled at least 500px away from the top of the screen
  // then adds a scroll css class to the scroll up button if so.
  $(window).scroll(function() {
    $('main.container .btn-up').toggle($(this).scrollTop() > 500);
  });

  // On click, focuses the compose tweet box.
  $('main.container .btn-up').on('click', () => {
    $('#new-tweet').slideDown('slow');
    $('#new-tweet textarea').focus();
  });
});




