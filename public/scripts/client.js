/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // Used to date timestamps as how long ago they posted.
  $("time.timeago").timeago();

  // Tweet element templates with XSS protection. This would need to go on usernames too.
  const createTweetElement = function(tweetObj) {
    const user = tweetObj.user;
    const timeCreated = new Date(tweetObj.created_at);
    let content = tweetObj.content.text;
    const $tweetHTML = $(`
    <article class="tweet-article">
    <header class="tweet-h">
      <div>
        <img src="${user.avatars}><span class="display-name">${user.name}</span>
      </div>
      <span class="handle">${user.handle}</span>
    </header>
      <p class="tweetp"></p>
    <footer class="row apartv">
    <time class="timeago" datetime="${timeCreated.toISOString()}">${$.timeago(timeCreated)}</time> 
      <div class="icons">
        <i class="fa-solid fa-flag fa-sm"></i> <i class="fa-solid fa-retweet fa-sm"></i> <i class="fa-solid fa-heart fa-sm"></i>
      </div>
    </footer>
    </article>
    `);
    $($tweetHTML).children('.tweetp').text(content); // Prevents XSS
    return $tweetHTML;
  };

  // Prepends each tweet object in the tweet array to the tweet container section.
  const renderTweets = function(tweetArr) {
    for (const tweet of tweetArr) {
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  };

  // Sends an AJAX request to load the database again.
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      $('#tweet-container').empty(); // Doing this here prevents duplicate tweets from being listed.
      renderTweets(data);
    });
  };
  // Initial load of database once document is loaded.
  loadTweets();

  //
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    $('.error-msg').slideUp('slow', () => { // Stop user from seeing error msg swap.
      const inputText = $('#tweet-text').val();
      if (!inputText) {
        return $('.error-msg').text('😢 You tried to share nothing. Tragically, you cannot do that!').slideDown('slow');
      }
      if (inputText.length > 140) {
        return $('.error-msg').text('😡 Please respect the 140 character limit! Ain\'t no one got time to read all that! 😡').slideDown('slow');
      }
      const newTweetContent = $(this).serialize();
      $('#tweet-text').val(''); // Reset textarea on good tweet.
      $(this.counter).val(140);
      $.post("/tweets/", newTweetContent, loadTweets);
    });
  });
});