/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const isaacTweet = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1660600297413
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1660686697413
    }
  ];
    

  const createTweetElement = function(tweetObj) {
    const user = tweetObj.user;
    const $tweetHTML = $(`
    <article class="tweet-article">
    <header class="tweet-h">
      <div>
        <img src="${user.avatars}><span class="display-name">${user.name}</span>
      </div>
      <span class="handle">${user.handle}</span>
    </header>
      <p class="tweetp">${tweetObj.content.text}</p>
    <footer class="row apartv">
      <span>${tweetObj.created_at}</span> 
      <div>
        <i class="fa-solid fa-flag fa-sm"></i> <i class="fa-solid fa-retweet fa-sm"></i> <i class="fa-solid fa-heart fa-sm"></i>
      </div>
    </footer>
    </article>
    `);
    return $tweetHTML;
  };

  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      console.log(tweet);
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  };


  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const test = $(this).serialize();
    $.post("/tweets", test);
      // .then(() => console.log('Test a'));
  });
});