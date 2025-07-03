gsap.registerPlugin(Draggable,ScrollTrigger);

const images = document.querySelectorAll(".item");
const imageSize = images.length;
const degree = 360 / imageSize;

const cursor = document.querySelector('#custom-cursor')
const main=document.querySelector('.main')

const init=()=>{
    const timeline=gsap.timeline();
    images.forEach((image,index)=>{
        const sign=Math.floor((index/2)%2)?1:-1; 
                            // (0 / 2) % 2   ==>0
                            // (1 / 2) % 2   ==>0.5
                             // (2/ 2) % 2   ==>1
                             // (3/ 2) % 2   ==>1.5
        const value=Math.floor((index+4)/4)*4
                              //((0 + 4) / 4) * 4 ==>4
                              //((1 + 4) / 4) * 4 ==>5
                              //((2 + 4) / 4) * 4 ==>6
        const rotation=index> imageSize - 3? 0 : sign * value

        gsap.set(image,{
            rotation:rotation,
            scale:0.5
        })
        timeline.to(image,{autoAlpha:1},0)
        timeline.from(
            image,{
                x:()=>(index%2? window.innerWidth + image.clientWidth * 4:-window.innerWidth - image.clientWidth * 4),
                y:()=> window.innerHeight - image.clientHeight,
                rotation:index%2? 200: -200,
                scale:4,
                duration:1,
                opacity:1,
                delay:0.15*(index/2),
                   // index 0 -->0
                   // index 1 -->1
                   // index 2 -->0
                   // index 3 -->1
            },0
        );
        let rotationAngle=index*degree;
        timeline.to(image,{
            scale:1,
            duration:0,
        },0.17*(imageSize/2 - 1) + 1)

        timeline.to(image,{
            transformOrigin:"center 200vh",
            rotation:index>imageSize/2 ? -degree*(imageSize - index):rotationAngle,
            duration:1,
            autoAlpha:1,
            ease:"power1.out",
        },0.15*(imageSize/2 - 1) + 1)
    })
}

Draggable.create(".items", {
    type: "rotation",
    onDragStart: function () {
        start = this.rotation;
      },
      onDragEnd: function () {
        const rotation = this.rotation;
        const offset = Math.abs(rotation - start);
        if (rotation > start) {
          if (rotation - start < degree / 2) {
            gsap.to(".items", {
              rotation: `-=${offset}`,
            });
          } else {
            gsap.to(".items", {
              rotation: `+=${2 * degree - offset}`,
            });
          }
        } else {
          if (Math.abs(rotation - start) < degree / 2) {
            gsap.to(".items", {
              rotation: `+=${offset}`,
            });
          } else {
            gsap.to(".items", {
              rotation: `-=${2 * degree - offset}`,
            });
          }
        }
      },

  });
  

ScrollTrigger.create({
    trigger:".main",
    start:"top 30%",
    onEnter:()=>{
        init();
        cursorM();
        ScrollTrigger.getById("mainTrigger").kill();//scrollTrigger,제거
    },
    id:"mainTrigger",//scrollTrigger에 id부여
    once:true//한번만 실행되도록 설정
})

//cursor
function cursorM(){
function updateCursorPosition(cursor, event){
    const top=event.pageY - main.offsetTop - cursor.offsetHeight/2;
    const left=event.pageX -  cursor.offsetWidth/2;
    gsap.to(cursor,{top:top,left:left,duration:0.3, ease:"power1.out",})
}
main.addEventListener("mousemove",(e)=>{
    updateCursorPosition(cursor,e)
})
main.addEventListener("mouseleave",(e)=>{
    gsap.to(cursor,{opacity:0,duration:0.3})
})
}