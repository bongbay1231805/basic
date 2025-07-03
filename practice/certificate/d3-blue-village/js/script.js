$(function () {
    $(".nav>ul>li").mouseover(function () {
        $(".nav>ul>li>ul>li").stop().fadeIn(300)
        $(".sliderwrap").addClass("on")
    })
    $(".nav>ul>li").mouseout(function () {
        $(".nav>ul>li>ul>li").stop().fadeOut(100)
        $(".sliderwrap").removeClass("on")
    })
})


// $(function(){
//     let currentIndex=0
//     $(".img").hide().eq(0).show()



//     setInterval(function(){
//         let nextIndex=(currentIndex+1)%3
//         $(".img").eq(currentIndex).fadeOut(600)
//         $(".img").eq(nextIndex).fadeIn(600)
//         currentIndex=nextIndex
//     },3000)
// })

// let s1=$(".img").eq(0)
// console.log(s1)


$(function () {
    let currentIndex = 0
    $(".img").hide().eq(0).show()

    setInterval(function () {
        let nextIndex = (currentIndex + 1) % 3
        $(".img").eq(currentIndex).fadeOut(600)
        $(".img").eq(nextIndex).fadeIn(600)
        currentIndex = nextIndex
    }, 3000)
})



$(function () {
    let infotit = $(".info_tit>a")
    let infocont = $(".info_cont>div")

    infocont.hide().first().show()

    infotit.click(function () {
        let index = $(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        infocont.eq(index).show().siblings().hide()
    })
})