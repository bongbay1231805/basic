gsap.registerPlugin(ScrollTrigger,Flip); 

let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.1, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};
initSmoothScrolling();
//-------------------------------------------------------

let triggerFlipOnScroll=(galleryEl, option)=>{
    let settings={
        flip:{
            absolute:false,
            absoluteOnLeave:false,
            scale:true,
            simple:true
        },
        scrollTrigger:{
            start:"center center",
            end:"+=300%"
        }
    }

    settings=Object.assign({},settings,option)//1)
    console.log(settings)

    let galleryCaption=galleryEl.querySelector(".caption");
    let galleryItems=galleryEl.querySelectorAll(".gallery__item");
   


    //L:최종상태를 캡처
    galleryEl.classList.add("gallery--switch");

    //F:초기상태를 캡처

    //수업  getState 오타/////
    let flipstate=Flip.getState([galleryItems,galleryCaption],{props:'filter,opacity'})

    //초기 상태로 되돌리려면 최종 클래스를 제거합니다, 최종상태를 파악하게만하고 클래스명은 바로 제거한다
    galleryEl.classList.remove("gallery--switch");


    //뒤집기 애니메이션 , 타임라인 만들기
    let tl=Flip.to(flipstate,{
        ease:"none",
        absolute:settings.flip.absolute,
        absoluteOnLeave:settings.flip.absoluteOnLeave,
        scale:settings.flip.scale,
        simple:settings.flip.simple,
        stagger:settings.stagger,
        scrollTrigger:{
            trigger:galleryEl,
            start:settings.scrollTrigger.start,
            end:settings.scrollTrigger.end,
            pin:galleryEl.parentNode,
            scrub:1
        }

    })

}








let scroll=()=>{
    let galleries=[
        {id:"#gallery-1",options:{flip:{absoluteOnLeave:true,scale:false}}},
        {id:"#gallery-2"},
        {id:"#gallery-3",options:{flip:{absolute:true,scale:false},scrollTrigger:{
            end:"+=400%"
        },stagger:0.05}},
        {id:"#gallery-4"},
        {id:"#gallery-5"},
        {id:"#gallery-6"},
        {id:"#gallery-7"},
        {id:"#gallery-8",options:{flip:{scale:false}}},
        {id:"#gallery-9"},
    ]
    galleries.forEach((gallery)=>{
        let galleryElement=document.querySelector(gallery.id);
        triggerFlipOnScroll(galleryElement,gallery.options)
    })

}
scroll()











//1)
//Object.assign({}, settings, options): Object.assign() 메서드는 주어진 객체들의 속성들을 병합하는 역할을 합니다. 첫 번째 인자는 대상 객체(여기서는 빈 객체 {})이며, 두 번째 이후의 인자들은 병합할 객체들입니다. 이 경우에는 빈 객체에 settings와 options 객체의 속성들이 병합됩니다.
//settings = Object.assign({}, settings, options): 병합된 결과를 다시 settings 변수에 할당합니다. 이를 통해 settings 객체가 업데이트되고, 기존 설정에 새로운 옵션들이 추가되거나 덮어쓰여진 상태가 됩니다.
//이러한 방식으로 settings 객체를 업데이트하면서 새로운 옵션을 추가하거나 기존의 값을 변경할 수 있습니다. 이는 주로 라이브러리나 프레임워크에서 설정 객체를 초기화하거나 업데이트할 때 사용됩니다. 위의 코드는 GSAP(GreenSock Animation Platform)과 같은 라이브러리에서 자주 볼 수 있는 패턴 중 하나입니다.