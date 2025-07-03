$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown(300)
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp(300)
    })
})


// $(function(){
//     let currentIndex = 0;
//     $(".sliderWrap").append($(".slider").first().clone(true));

//     setInterval(function(){
//         currentIndex++;
//         $(".sliderWrap").animate({marginLeft: -currentIndex * 100 + "%"}, 600);

//         if(currentIndex == 3){
//             setTimeout(function(){  
//                 $(".sliderWrap").animate({marginLeft: 0}, 0);
//                 currentIndex = 0;
//             }, 700);
//         }
//     }, 3000);
// });




$(function(){
    let currentIndex = 0
    $(".sliderWrap").append($(".slider").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginLeft:-currentIndex*100+"%"},600)

        if(currentIndex==3){
            setTimeout(function(){
                $(".sliderWrap").animate({marginLeft:0},0)
                currentIndex=0
            },600)
        }
    },3000)
})


$(function(){
    $(".popup-btn").click(function(){
        $(".popup-view").show()
    })
    $(".popup-close").click(function(){
        $(".popup-view").hide()
    })
})