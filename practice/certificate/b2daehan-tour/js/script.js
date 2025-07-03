

$(function(){
    $(".nav > ul > li").mouseover(function(){
        $(".submenu").stop().slideDown(300);
        $("#header .container").addClass("on");
    });
    $(".nav > ul > li").mouseout(function(){
        $(".submenu").stop().slideUp(100);
        $("#header .container").removeClass("on");
    });
})

$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".slider").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginTop:-currentIndex * 300 + "px"},600)

        if(currentIndex == 3){
            $(".sliderWrap").animate({marginTop:0},0)
            currentIndex=0
        }
    },3000)
})

$(".popup-btn").click(function(){
    $(".popup-view").show()
})
$(".popup-close").click(function(){
    $(".popup-view").hide()
})