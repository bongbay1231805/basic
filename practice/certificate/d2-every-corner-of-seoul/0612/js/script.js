$(function(){
  $(".nav>ul>li").mouseover(function(){
    $(this).find(".submenu").stop().slideDown(500)
  })
  $(".nav>ul>li").mouseout(function(){
    $(this).find(".submenu").stop().slideUp(200)
  })
})


$(function(){
  let currentIndex=0
  $(".sliderWrap").append($(".slider").eq(0).clone(true))

  setInterval(function(){
    currentIndex++
    $(".sliderWrap").animate({marginLeft:-currentIndex*100+"%"},600)
    if(currentIndex==3){
      setTimeout(function(){
        $(".sliderWrap").animate({marginLeft:0},0)
        currentIndex=0
      },700)
    }
  },3000)
})