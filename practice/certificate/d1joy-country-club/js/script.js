$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp()
    })
})

$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".slider").eq(0).clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginTop:-currentIndex*400+"px"},600)
        if(currentIndex==3){
            setTimeout(function(){
                $(".sliderWrap").animate({marginTop:0},0)
                currentIndex=0
            },700)
        }
        
    },3000)
})


$(function(){
    let infoTit=$(".info_tit>a")
    let infoCont=$(".info_cont>div")
    infoCont.hide().eq(0).show()

    infoTit.click(function(){
        let index=$(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        infoCont.eq(index).show().siblings().hide()
    })
})