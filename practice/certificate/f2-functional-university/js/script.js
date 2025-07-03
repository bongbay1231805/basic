$(function () {
    $(".nav>ul>li").mouseover(function () {
        $(this).find(".submenu").stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function () {
        $(this).find(".submenu").stop().slideUp()
    })
})