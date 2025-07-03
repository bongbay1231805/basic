$(function () {
  $(".nav>ul>li").mouseover(function () {
    $(".submenu").stop().slideDown(300)
    $("#slider").addClass("on")
  })
  $(".nav>ul>li").mouseout(function () {
    $(".submenu").stop().slideUp(300)
    $("#slider").removeClass("on")
  })
}, 3000)

$(function () {
  let currentIndex = 0
  $(".sliderWrap").append($(".slider").eq(0).clone(true))

  setInterval(function () {
    currentIndex++
    $(".sliderWrap").animate({
      marginLeft: -currentIndex * 100 + "%"
    }, 600)
    if (currentIndex == 3) {
      setTimeout(function () {
        $(".sliderWrap").animate({
          marginLeft: 0
        }, 0)
        currentIndex = 0
      }, 700)
    }
  }, 3000)
})

$(function(){
    let tabBtn=$(".tabBtn>a")
    let tabCont=$(".tabCont>div")
    tabCont.hide().eq(0).show()

    tabBtn.click(function(){
        let index=$(this).index()
        tabBtn.addClass("active").siblings().removeClass("active")
        tabCont.eq(index).show().siblings().hide()
    })
})