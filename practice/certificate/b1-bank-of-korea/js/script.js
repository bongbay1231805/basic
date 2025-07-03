$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp()
    })
})

// $(function(){
//     let currentIndex=0
//     $(".sliderWrap").append($(".slider").first().clone(true))

//     setInterval(function(){
//         currentIndex++
//         $('.sliderWrap').animate({marginLeft:-currentIndex * 100 + "%"},600)

//         if(currentIndex == 3){
//             setTimeout(function(){
//                 $('.sliderWrap').animate({marginLeft:0},0)
//                 currentIndex=0
//             },700)
//         }
//     },3000)
// })

$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".slider").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginLeft:-currentIndex*100 + "%"},600)
        if(currentIndex == 3){
            setTimeout(function(){
                $(".sliderWrap").animate({marginLeft:0},0)
                currentIndex=0
            },700)
        }
    },3000)
})


// const tabBtn = $(".info-menu>a")
// const tabCont = $(".info-cont>div")
// tabCont.hide().first().show()

// tabBtn.on("click",function(){
//     const Index=$(this).index()

//     $(this).addClass("active").show().siblings().removeClass("active")
//     tabCont.eq(Index).show().siblings().hide()
// })


const tabBtn=$(".info-menu>a")
const tabCont=$(".info-cont>div")
tabCont.hide().eq(0).show()

tabBtn.on("click",function(){
    const Index = $(this).index()
    $(this).addClass("active").siblings().removeClass("active")
    tabCont.eq(Index).show().siblings().hide()
})
