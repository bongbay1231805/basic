const currentYoutube = document.querySelector('iframe');

document.querySelector('.play').addEventListener('click', function() {
  currentYoutube.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
});

document.querySelector('.pause').addEventListener('click', function() {
  currentYoutube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
});

document.querySelector('.stop').addEventListener('click', function() {
  currentYoutube.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
});