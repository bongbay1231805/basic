var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player(
    'player', {
      height: '360',
      width: '640',
      playerVars: { 'autoplay': 1, 'controls': 0, 'mute':1, 'loop': 1, 'playlist': 'jYSlpC6Ud2A' },
      videoId: 'jYSlpC6Ud2A', // 영상 고유 주소
      events: {
        'onReady': onPlayerReady									}
    }
  );
}

function onPlayerReady(event) {
  player.playVideo();
}