$(function(){
    $(".submenu").hide()
    $(".nav>ul>li").mouseover(function(){
        $(".submenu").stop().fadeIn(300)
        $("#slider").addClass("on")
    })
    $(".nav>ul>li").mouseout(function(){
        $(".submenu").stop().fadeOut(200)
        $("#slider").removeClass("on")
    })
})

$(function(){
    let currenIndex=0
    $(".slider").hide().first().show()

    setInterval(function(){
        let nextIndex=(currenIndex+1)%3
        $(".slider").eq(currenIndex).fadeOut(1200)
        $(".slider").eq(nextIndex).fadeIn(1200)
        currenIndex=nextIndex
    },3000)
})