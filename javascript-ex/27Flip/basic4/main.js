gsap.registerPlugin(Flip);


const thumbs = document.querySelectorAll(".item");
const modal = document.querySelector('.modal');
const toggle = document.querySelector('.page3 button')
const modalImage = modal.querySelector('.modal-image');
const wrapper = document.querySelector('.grid-wrapper');
let activeThumb;

thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        activeThumb = thumb;
        thumb.classList.add("active-thumb");
        thumb.dataset.flipId = "img"; //<div class="item" data-flip-id="img">...</div>
        gsap.set(thumb, {
            opacity: 0
        })

        const state = Flip.getState([thumb, modalImage], {
            props: "borderRadius,aspectRatio,boxShadow"
        })

        modalImage.querySelector("img").setAttribute("src", thumb.dataset.url)
        modal.classList.add('active')
        modalImage.style.display = "block";

        Flip.from(state, {
            duration: 0.25,
            ease: "sin.inOut"
        })
    })
})

modal.addEventListener('click',()=>{
    gsap.set(activeThumb,{opacity:1})
    const state=Flip.getState([activeThumb,modalImage],{
        props:"borderRadius,aspectRatio,boxShadow"
    })
    modal.classList.remove("active")
    Flip.from(state,{
        duration:0.25,
        absolute:true,
        ease:"sine,inOut",
       onComplete:()=>{
        modalImage.querySelector("img").setAttribute("src","")
        activeThumb.classList.remove("active-thumb");
       }
    })
})

toggle.addEventListener("click",()=>{
    toggle.classList.toggle("gird-view-on");
    let state=Flip.getState(".grid-wrapper, .item-wrapper");//F
    wrapper.classList.toggle("stack")//L
    Flip.from(state,{
        absolute:true,
        duration:0.5,
        ease:"sine",
        stagger:0.05
    })
})