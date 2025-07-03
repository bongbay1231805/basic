$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown(200)
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp(200)
    })
})


$(function(){
    let currentImage=0;
    $(".slider").hide().first().show()

    setInterval(function(){
        let nextImgae=(currentImage + 1) % 3

        $(".slider").eq(currentImage).fadeOut(1200)
        $(".slider").eq(nextImgae).fadeIn(1200)

        currentImage=nextImgae
    },3000)
})

const tabBtn=$(".info-menu>a")
const tabCont=$(".info-cont>div")
tabCont.hide().first().show()

tabBtn.on("click",function(){
    const Index = $(this).index()
console.log(Index)
    $(this).addClass("active").show().siblings().removeClass("active")
    tabCont.eq(Index).show().siblings().hide()
})

$('.popup-btn').click(function(){
    $(".popup-view").show()
})
$('.popup-close').click(function(){
    $(".popup-view").hide()
})