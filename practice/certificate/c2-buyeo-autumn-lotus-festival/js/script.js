$(function(){
    $("nav>ul>li").mouseover(function(){
        $(this).find($(".submenu")).stop().slideDown(500)
    })
    $("nav>ul>li").mouseout(function(){
        $(this).find($(".submenu")).stop().slideUp(500)
    })
})


// $(function(){
//     let currentIndex=0
//     $(".slider").hide().first().show()
    
//     setInterval(function(){
//         let nextIndex=(currentIndex+1)%3

//         $(".slider").eq(currentIndex).fadeOut(1200)
//         $(".slider").eq(nextIndex).fadeIn(1200)
//         currentIndex=nextIndex
//     },3000)
// })


$(function(){
    let currentIndex=0
    $(".slider").hide().first().show()

    setInterval(function(){
        let nextIndex=(currentIndex+1)%3
        $(".slider").eq(currentIndex).fadeOut(1200)
        $(".slider").eq(nextIndex).fadeIn(1200)

        currentIndex=nextIndex
    },3000)
})


$(function(){
    let tabBtn = $(".tab_btn>a")
    let tabCont = $(".tab_cont>div")
    tabCont.hide().eq(0).show()

    tabBtn.click(function(){
        const Index=$(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        tabCont.eq(Index).show().siblings().hide()
    })
})