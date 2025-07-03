//메인메뉴의 움직이는 바
$('.gnb a').mouseenter(function(){
    let bar=$(this).position().left
    //position() : 요소의 위치정보(top,left)를 반환한다.
    console.log(bar)
    let widnum=$(this).width()
    // $('.bar').animate({옵션},시간)
    $('.bar').animate({
        'left':bar + 'px',
        'width':widnum + 'px',
    },200)
})

//애니메이션
$('.animate').scrolla({
    mobile: false, // 모바일엔 넣지 않겠다는 의미
    once: false, // 애니메이션 한번 실행할건지
    animateCssVersion: 4 // 버전
  });

// menuOpen
let open=$('.menuOpen .open')
let menuWrap=$('.menuWrap')
let close=$('.menuWrap .close')

open.click(function(){
    menuWrap.addClass('on')
})
close.click(function(){
    menuWrap.removeClass('on')
})

//path의 총 길이를 구하는 방법
let path=document.querySelector('.path1')
let pathHeight=path.getTotalLength()
// console.log(pathHeight)

//service 영역시 배경 색상 바꾸기

//스크롤을 움직이면 어떤 일이 일어난다.
$(window).scroll(function(){
    // $(this) --> $(window)
    let scrollTop = $(this).scrollTop()
    //offset().top : 전체 문서의 top에서 service영역의 top까지의 거리
    let offset = $('.service').offset().top
    //offset 선택한 요소의 좌표를 가져오거나 특정 좌표로 이동
    if(scrollTop > offset){
        $("body").addClass("on")
    }else{
        $("body").removeClass("on")
    }
})