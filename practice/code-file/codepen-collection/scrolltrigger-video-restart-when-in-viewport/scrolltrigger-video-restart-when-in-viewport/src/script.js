const videos = gsap.utils.toArray("video");

videos.forEach(function (video, i) {
  ScrollTrigger.create({
    trigger: video,
    id: "playing",
    scroller: ".appVideos",
    start: "top center",
    end: "bottom center",
    markers: true,
    onToggle: self => self.isActive ? playVideo(video) : pauseVideo(video),
    
    
  });
});

function playVideo(el) {
   el.play();
  $(el).attr("id","vch")
  
}

function pauseVideo(el) {
  el.currentTime = 0;
  el.pause();
  $(el).removeAttr("id");
}

/*
function reset() {
  console.log("set");
  $("video").get(0).currentTime = 0;
}

function pause() {
  $("video").get(0).currentTime = 0;
  $("video").get(0).pause();
}
function play() {
  $("video").get(0).currentTime = 0;
  $("video").get(0).play();
}


var $div = $("video");
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    var attributeValue = $(mutation.target).prop(mutation.attributeName);
    console.log("Class attribute changed to:", attributeValue);
  });
});

observer.observe($div[0], {
  attributes: true,
  attributeFilter: ["class"]
});*/
