$(function(){
    let currentIndex=0
    $(".img").append($(".s").eq(0).clone(true))

    setInterval(function(){
        currentIndex++
        $(".s img").animate({marginLeft:-currentIndex*100+"%"},1200)
        if(currentIndex==3){
            setTimeout(function(){
                $(".s img").animate({marginLeft:0},0)
                    currentIndex=0
            },1200)
        }
    },3000)
})