// eslint-disable-next-line no-undef
$(function() {
  const newTweet = document.getElementById('tweet-text');
  

  newTweet.addEventListener('input', function(event) {
    const count = document.getElementsByClassName('counter')[0];
    count.innerHTML = 140 - this.value.length;
  });
});