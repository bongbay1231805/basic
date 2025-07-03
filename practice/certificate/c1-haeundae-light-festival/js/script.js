$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find($(".submenu")).stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find($(".submenu")).stop().slideUp()
    })
})

$(function(){
    let currnetIndex=0
    $(".slide").hide().first().show()

    setInterval(function(){
        let nextIndex=(currnetIndex + 1)%3
        $(".slide").eq(currnetIndex).fadeOut(1200)
        $(".slide").eq(nextIndex).fadeIn(1200)

        currnetIndex=nextIndex
    },3000)
})

$(function(){
    let infoTit=$(".info_tit>a")
    let infoCont=$(".info .info_cont>div")
    infoCont.hide().eq(0).show()

    infoTit.click(function(){
        const Index = $(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        infoCont.eq(Index).show().siblings().hide()
    })
})