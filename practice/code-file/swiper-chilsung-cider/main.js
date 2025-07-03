
/*---------------------------history SLICK---------------------------*/
$('.history_slide').slick({
        fade:true,
        autoplay:true,
        autoplaySpeed:2000, 
    });
    var hBtn=$('.history_btn li'),
        hCont=$('.history_slide'),
        hIndex;
    
    hBtn.on('click',function(e){
        e.preventDefault();
        var target=$(this),
            index=target.index();
        //console.log(index);
    
        if(index == 0){
            hIndex=0;
        }else if(index == 1){
            hIndex=4;
        }else if(index  == 2){
            hIndex=8;
        }else if(index == 3){
            hIndex=12;
        }else if(index == 4){
            hIndex=16;
        }
        hCont.slick('slickGoTo' , hIndex);
        hBtn.removeClass('active');
        target.addClass('active');
    });
    

    //beforeChange(slick, currentSlide) 슬라이드전 호출
    hCont.on('beforeChange',function(event, slick, currentSlide , nextSlide){
        //console.log(nextSlide);
        if(nextSlide >= 0 && nextSlide <= 3){
            hBtn.removeClass('active');
            hBtn.eq(0).addClass('active');
        }else if(nextSlide >= 4 && nextSlide <= 7){
            hBtn.removeClass('active');
            hBtn.eq(1).addClass('active');
        }else if(nextSlide >= 8 && nextSlide <= 11){
            hBtn.removeClass('active');
            hBtn.eq(2).addClass('active');
        }else if(nextSlide >= 12 && nextSlide <= 15){
            hBtn.removeClass('active');
            hBtn.eq(3).addClass('active');
        }else if(nextSlide >= 16 && nextSlide <= 19){
            hBtn.removeClass('active');
            hBtn.eq(4).addClass('active');
        }
    
        $('.history_page em').text(nextSlide+1);
    });
    
    
    
    
    
    /*----------------------history poster tab----------------------*/
    
    var posterBtn=$('.poster_btn ul li'),
        posterCont=$('.poster_cont .poster');
    
    posterCont.hide().eq(0).show();

    posterBtn.click(function(e){
        e.preventDefault();
        var pTarget=$(this),
            pIndex=pTarget.index();
        //console.log(pIndex);
    
        posterBtn.removeClass('active2');
        pTarget.addClass('active2');
    
        posterCont.hide();
        posterCont.eq(pIndex).fadeIn();
    
        posterCont.find('figure').removeClass('move');
        posterCont.eq(pIndex).find('figure').addClass('move');
    
    });
    
    
    
    
    
    
    /*---------------------history cider bottle----------------------*/
    
    $('.cider_bottle').slick({
      centerMode: true,
      centerPadding: '380px',
      slidesToShow: 1,
      dots:true,
      autoplay:true,
      autoplaySpeed:2000,
     
    });



    
/*     또다른 추가 */


var mBtn=$('.memory_btn > li'),
mCont=$('.memory-slider'),
mbg = $('.history-slider-background'),
mIndex;


mCont.slick({
    fade:true,
    autoplay:true,
    autoplaySpeed:2000,
});


mBtn.on('click',function(e){
e.preventDefault();
var target=$(this),
    index=target.index();
console.log(index);

if(index == 0){
    mIndex=0;
 

}else if(index == 1){
    mIndex=4;
   
}else if(index  == 2){
    mIndex=8;
}else if(index == 3){
    mIndex=12;
}else if(index == 4){
    mIndex=16;
}
mCont.slick('slickGoTo' , mIndex);
//mBtn.removeClass('active');
//target.addClass('active');
});


//beforeChange(slick, currentSlide) 슬라이드전 호출
mCont.on('beforeChange',function(event, slick, currentSlide , nextSlide){
    
//console.log(nextSlide);
if(nextSlide >= 0 && nextSlide <= 3){
    mBtn.removeClass('active');
    mBtn.eq(0).addClass('active');
    $('.history-slider-background').removeClass('bg-item-01 bg-item-02 bg-item-03 bg-item-04 bg-item-05').addClass('bg-item-01');
}else if(nextSlide >= 4 && nextSlide <= 7){
    mBtn.removeClass('active');
    mBtn.eq(1).addClass('active');
    $('.history-slider-background').removeClass('bg-item-01 bg-item-02 bg-item-03 bg-item-04 bg-item-05').addClass('bg-item-02');
}else if(nextSlide >= 8 && nextSlide <= 11){
    mBtn.removeClass('active');
    mBtn.eq(2).addClass('active');
    $('.history-slider-background').removeClass('bg-item-01 bg-item-02 bg-item-03 bg-item-04 bg-item-05').addClass('bg-item-03');
}else if(nextSlide >= 12 && nextSlide <= 15){
    mBtn.removeClass('active');
    mBtn.eq(3).addClass('active');
    $('.history-slider-background').removeClass('bg-item-01 bg-item-02 bg-item-03 bg-item-04 bg-item-05').addClass('bg-item-04');
}else if(nextSlide >= 16 && nextSlide <= 19){
    mBtn.removeClass('active');
    mBtn.eq(4).addClass('active');
    $('.history-slider-background').removeClass('bg-item-01 bg-item-02 bg-item-03 bg-item-04 bg-item-05').addClass('bg-item-05');
}


 
mCont.slick('slickPlay');
     

$('.memory_page_btn em').text(nextSlide+1);
});

