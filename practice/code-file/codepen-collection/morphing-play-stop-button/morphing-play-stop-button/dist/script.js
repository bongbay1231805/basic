var playing = false;

$('svg').click(function() {
  playing = !playing;
  var animation = playing ? 'stop' : 'play';
  $('#animate_to_' + animation).get(0).beginElement();
  
  $('h1').text('click to ' + (playing ? 'stop' : 'play'));
});