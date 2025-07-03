

const allVideos = $('.video');

/* play-all */
const allPlay =$('#play-all');

var video;
allVideos.hover(function(){
   video = $(this).find('video');
    //Video.play();//실행이 되지않는다 javaScript에서는 되지만 jquey에서는 안된다/jquey에서는 비디오와 오디오를 직접 control할수가 없다.get(0)->0이란 html요소의 element 첫번째, 하나밖에 없지만 index번호를 적어야한다
    //$('li').get(0) ==  $('li').eq(0)[0]
    //console.log(video);//jquery객체
    console.log(video.get(0));

  video.get(0).play();
 
},function(){
  video = $(this).find('video');
  video.get(0).pause();

})





allPlay.on('click',function(){

  if(allPlay.hasClass('on')){
      const video = $('video');
      for(i=0;i<video.length; i++){
        
        video.get(i).play();
      }
    allPlay.removeClass('on');
    $('#play-all em').text("Pause All")
  }else{
      const video = $('video');
      for(i=0;i<video.length; i++){
        video.get(i).pause();
      }
    allPlay.addClass('on');
    $('#play-all em').text("Play All")
  }
  
  })






