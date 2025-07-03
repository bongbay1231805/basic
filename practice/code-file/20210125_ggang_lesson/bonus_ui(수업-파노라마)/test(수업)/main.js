        var panowrap = $(".sj_panorama .pano_wrap");
		var	listWrap = panowrap.children();//ul.list
		var	item = listWrap.children();//li
		var	listClone = null;
		var	itemWidth = item.width();
		var	itemLength = item.length;
		var	listWidth = itemWidth * itemLength;
		var	winWidth = $(window).width();//화면의 넓이
		var	move = 0;
		var	contorls = panowrap.parent().find(".controls");
		var	timer;

        var init = function(){
            panowrap.css({width: (listWidth) * 2 + "px"});
            listWrap.css({width: listWidth + "px"});//그래도두면 6000이 된다
            listWrap.clone().appendTo(panowrap);//listWrap를 복사해서pnanoWrap안쪽 끝에 붙인다
            listClone = panowrap.children();//ul두개이다
            render();
			event();
            app();
        };


       var app = function(){
           setInterval(function(){
             listWrap.clone().appendTo(panowrap); 
               listClone = panowrap.children();
           },10000);
           
       }
        
        var event = function(){

            contorls.find("a.play_on").on('click',function(e){

                if($(this).hasClass("active")){
                    clear();
                    $(this).removeClass("active");
                }else {
                    $(this).addClass("active");
                    render();
                }
            });
        }
        var render = function(){
            move +=1;
            listClone.css({"transform":"translateX(" + -move  + "px)" });
            timer = window.requestAnimationFrame(render);//애니메이션 실행

        };

        clear = function(){
            //window.cancelAnimationFrame() - 애니메이션 타이밍 정지
            console.log("clear")

            window.cancelAnimationFrame(timer);
        };

        init();
