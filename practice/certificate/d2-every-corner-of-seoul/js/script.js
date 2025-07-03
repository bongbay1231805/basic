$(function(){
    let currentIndex=0
    $(".img").append($(".si").eq(0).clone(true))

    setInterval(function(){
        currentIndex++
        $(".si img").animate({marginLeft:-currentIndex * 100+"%"},1200)

        if(currentIndex==3){
            setTimeout(function(){
                $(".si img").animate({marginLeft:0},0)
                currentIndex=0
            },1200)
        }
    },3000)
})
