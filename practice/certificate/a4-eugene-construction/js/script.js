$(function(){
    $(".nav>ul>li").mouseover(function(){
        $('.submenu').stop().slideDown(300)
        $("#header").addClass("on")
    })
    $(".nav>ul>li").mouseout(function(){
        $('.submenu').stop().slideUp(200)
        $("#header").removeClass("on")
    })
})

$(function(){
    let currentIndex=0
    $('.slider').hide().first().show()
    
    setInterval(function(){
        let nextIndex= (currentIndex + 1) % 3

        $('.slider').eq(currentIndex).fadeOut(1200)
        $('.slider').eq(nextIndex).fadeIn(1200)

        currentIndex=nextIndex
    },3000)
})

$(".popup-bts").click(function(){
    $(".popup-view").show()
})
$(".popup-close").click(function(){
    $(".popup-view").hide()
})
