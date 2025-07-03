

// let observer=new IntersectionObserver(callback함수,options)

let observer=new IntersectionObserver(function(entrys){
  console.log(entrys)//배열 //화면에서 보이거나 사라지거나
  entrys.forEach((entry)=>{
    if(entry.isIntersecting){//감지되면 true //화면에 보일 때
      console.log("title이 보인다.")
      entry.target.classList.add("show")
    }else{
      entry.target.classList.remove("show")
    }
  })
  
})

let title=document.querySelector(".title");

let pEle=document.querySelectorAll("p")
let h4Ele=document.querySelectorAll("h4")
let aEle=document.querySelectorAll("a")
//관찰대상 등록
// observer.observe(title) 하나일 때

//관찰대상 등록(다수일 때)
pEle.forEach((item)=>observer.observe(item))
h4Ele.forEach((item)=>observer.observe(item))
aEle.forEach((item)=>observer.observe(item))

