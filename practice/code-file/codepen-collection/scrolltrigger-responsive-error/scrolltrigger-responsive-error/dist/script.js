gsap.registerPlugin(ScrollTrigger);

var distance = $('.yb02').offset().top - $('.yb01').offset().top - $('.yb01').height();
let yb01 = $('.yb01').height();
let yb02 = $('.yb02').height();
let yb04 = $('.yb04').height();
let test1 = '+=' + distance + ' 50%';
let test2 = '+=' + distance * 2 + ' 50%';

$(window).on('resize', function() {
    distance = $('.yb02').offset().top - $('.yb01').offset().top - $('.yb01').height();
    yb01 = $('.yb01').height();
    yb02 = $('.yb02').height();
    yb04 = $('.yb04').height();

    // ScrollTrigger.refresh();
    gsap.set(".sticky01", {
        y: 0
    });
});


gsap.to(".sticky01", {
    immediateRender: false,
    y: function(index, target, targets) {
        console.log(yb01 + distance);
        return yb01 + distance;
    },
    scrollTrigger: {
        trigger: '.yb01',
        start: function() {
            return '+=' + distance + ' 50%'
        },
        end: function() {
            return 'bottom+=' + distance + ' 50%'
        },
        scrub: 1,
        invalidateOnRefresh: true,
    },
})

gsap.to(".sticky01", {
    immediateRender: false,
    y: function(index, target, targets) {
        console.log(yb01 + yb02 + distance * 2);
        return yb01 + yb02 + distance * 2;
    },
    scrollTrigger: {
        trigger: '.yb02',
        start: function() {
            return '+=' + distance * 2 + ' 50%'
        },
        end: function() {
            return 'bottom+=' + distance * 2 + ' 50%'
        },
        scrub: 1,
        invalidateOnRefresh: true,
    },
})

gsap.to(".sticky02", {
    immediateRender: false,
    y: function(index, target, targets) {
        return yb04 + distance
    },
    scrollTrigger: {
        trigger: '.yb04',
        start: function() {
            return '+=' + distance + ' 50%'
        },
        end: function() {
            return 'bottom+=' + distance * 2 + ' 50%'
        },
        scrub: 1,
        // markers: true,
        invalidateOnRefresh: true,
    },
})




var yearData = $('.yearBox .year');
$.each(yearData, function(index, item) {
    let yearTxt = $(item).parents('.historyList').find('.sticky').html();
    $(item).attr('data-num', yearTxt);
});