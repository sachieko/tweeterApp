/* eslint-disable no-undef */
//
//This function uses jquery to put a listener on the input, and gets the length of the text in the input textarea, and
//if that length - char limit is negative the counter element associated with that input turns red.
$(function() {
  const textLimit = function() {
    const $counter = $(this).parent().next().children('.counter');
    const length = 140 - this.value.length;
    length >= 0 ? $counter.css('color', '#545149') : $counter.css('color', 'red');
    $counter.val(length);
  };
  
  $("#tweet-text").on('input', textLimit);
});