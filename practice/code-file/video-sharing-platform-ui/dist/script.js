

const allVideos = document.querySelectorAll('.video');
/* play-all */
const allPlay = document.querySelector('#play-all');

/* allVideos.forEach(v => {
  v.addEventListener('mouseover', () => {
    const video = v.querySelector('video');
    video.play();
  });
  v.addEventListener('mouseleave', () => {
    const video = v.querySelector('video');
    video.pause();
  });
}); */
allVideos.forEach(function(v) {
  v.addEventListener('mouseover', () => {
    const video = v.querySelector('video');
    console.log(video);
    video.play();
  });
  v.addEventListener('mouseleave', () => {
    const video = v.querySelector('video');
    video.pause();
  });
}); 

allPlay.addEventListener('click',function(){

if(allPlay.classList.contains('on')){
  console.log("ok")
  allVideos.forEach(function(v) {
    const video = v.querySelector('video');
    video.play();
    document.querySelector('.play_all').innerHTML ="Pause All";
  
}); 
  allPlay.classList.remove('on');
}else{
  allVideos.forEach(function(v) {
    const video = v.querySelector('video');
    video.pause();

    document.querySelector('.play_all').innerHTML ="Play All";
  
}); 

  allPlay.classList.add('on');
}




})


/* allPlay.addEventListener('click',function(){
  allVideos.forEach(function(v) {
    const video = v.querySelector('video');
    video.play();
  
}); 
}) */
