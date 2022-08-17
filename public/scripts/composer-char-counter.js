// eslint-disable-next-line no-undef
$(function() {
  const textLimit = function() {
    // eslint-disable-next-line no-undef
    const $counter = $(this).parent().next().children('.counter');
    const length = 140 - this.value.length;
    length >= 0 ? $counter.css('color', 'rgb(84, 81, 73)') : $counter.css('color', 'red');
    $counter.val(length);
  };
  
  // eslint-disable-next-line no-undef
  $("#tweet-text").on('input', textLimit);
});