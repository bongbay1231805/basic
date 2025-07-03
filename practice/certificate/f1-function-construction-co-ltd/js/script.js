$(function () {
    $(".nav>ul>li").mouseover(function () {
        $(this).find(".submenu").stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function () {
        $(this).find(".submenu").stop().slideUp()
    })
})

$(function(){
    let currentIndex=0
    $(".slider").hide().eq(0).show()
    setInterval(function(){
        let nextIndex=(currentIndex+1)%3
        $(".slider").eq(currentIndex).fadeOut(600)
        $(".slider").eq(nextIndex).fadeIn(600)
        currentIndex=nextIndex
    },3000)
})

$(function () {
    let tabBtn = $(".tabBtn>a")
    let tabCont = $(".tabCont>div")
    tabCont.hide().first().show()

    tabBtn.click(function () {
        let index = $(this).index()
        tabBtn.addClass(".active").siblings().removeClass(".active")
        tabCont.eq(index).show().siblings().hide()
    })
})