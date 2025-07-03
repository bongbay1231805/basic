
gsap.registerPlugin(Flip);

const items = gsap.utils.toArray(".item"),
      details = document.querySelector('.detail'),
      detailContent = document.querySelector('.content'),
      detailImage = document.querySelector('.detail img'),
      detailTitle = document.querySelector('.detail .title'),
      detailSecondary = document.querySelector('.detail .secondary'),
      detailDescription = document.querySelector('.detail .description');

let activeItem; // 어떤 항목이 열려 있는지 추적합니다(세부 사항).

gsap.set(detailContent,{yPercent:-100})//나타날때 위에서 아래로 떨어지는 애니메이션을 주기위해서..

function showDetails(item){
   if(activeItem){
      return hideDetails();
   }
   let onLoad=()=>{
      //details의 자식인 detailImage를 item에 맞추기
      //움직이는것은 details의 자식인 img가 움직인다
      Flip.fit(details, item,{scale:true, fitChild:detailImage})//1)
      //details를 item과 동일한 영역에 즉시 맞추는것이다 fitChild는 자식요소인 img를 item에 맞춘다는 의미이다.

      const state=Flip.getState(details);//details의 자식요소인 image가 item의 크기에 맞아진것이 초기값으로 캡처된다. 


      gsap.set(details,{clearProps:true}) //2)애니메이션이 끝난 후 대상 객체의 모든 애니메이션과 관련된 속성을 초기화
      gsap.set(details,{xPercent:-50, top:"50%",yPercent:-50,visibility:'visible',overflow:'hidden'})

      Flip.from(state,{
         duration:0.5,ease:"power2.inOut",
         scale:true,
         onComplete:()=>gsap.set(details,{overflow:"auto"})
      })
      .to(detailContent,{yPercent:0},0.2);

      //detailImage.removeEventListener("load",onLoad);//, HTML 문서에서 특정 이벤트가 발생했을 때 실행되는 이벤트 핸들러를 제거하는 역할
      document.addEventListener('click',hideDetails)


   }

   const data=item.dataset;
   detailImage.addEventListener("load",onLoad);
   detailImage.src=item.querySelector("img").src;
   detailTitle.innerText = data.title;
	detailSecondary.innerText = data.secondary;
	detailDescription.innerText = data.text;

   //gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);//.kill(item)빼도됨  //3)
   gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}});
	gsap.to(".app", {backgroundColor: "#888", duration: 1, delay: 0.3}); // fade out the background
	activeItem = item;

}

function hideDetails(){
   document.removeEventListener('click', hideDetails);
	gsap.set(details, {overflow: "hidden"});
   const state = Flip.getState(details);


   //details의 자식인 detailImage를 activeItem 영역에 맞추기
   Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

   const tl = gsap.timeline();
	tl.set(details, {overflow: "hidden"})
    .to(detailContent, {yPercent: -100})
	  .to(items, {opacity: 1, stagger: {amount: 0.7, from: items.indexOf(activeItem), grid: "auto"}})
	  .to(".app", {backgroundColor: "#fff"}, "<");//"<" 이전애니메이션과 동일한 시점에서 진행

     	// animate from the original state to the current one.
	Flip.from(state, {
		scale: true,
		duration: 0.5,
		delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
		//onInterrupt: () => tl.kill()//4)    //이줄 없어도 됨
	})
	  .set(details, {visibility: "hidden"});

	activeItem = null;

}

items.forEach(item => item.addEventListener("click",()=>showDetails(item)));

gsap.to(".app",{autoAlpha:1, duration:0.2})
gsap.from(".item",{autoAlpha:0,yPercent:30,stagger:0.05})





//1)한 요소를 다른 요소와 동일한 영역에 정확히 맞도록 위치를 변경하거나 크기를 조정합니다. fitChild 특수 속성을 사용하면 해당 하위 요소가 대신 피팅 계산에 사용되도록 요소의 크기를 조정하거나 위치를 변경할 수도 있습니다! 기본적으로 요소의 너비와 높이뿐만 아니라 변환(x, y, 회전 및skewX)도 변경되지만 scale: true를 설정하면 너비와 높이 대신 scaleX와 scaleY가 사용됩니다.

//2)
// gsap.set(details, {clearProps: true}) 코드는 GSAP(GreenSock Animation Platform) 라이브러리에서 사용되는 코드입니다. 이 코드는 gsap 객체의 set 메서드를 호출하며, 애니메이션의 초기 상태를 설정합니다.
// 여기서 사용된 매개변수는 다음과 같습니다:
// details: 애니메이션 대상 객체입니다. 이 객체에 대한 애니메이션 속성이 설정됩니다.
// {clearProps: true}: 옵션 객체로, 여러 가지 설정을 포함할 수 있습니다. 여기서는 clearProps 속성을 사용하여 애니메이션이 끝난 후 대상 객체의 모든 속성을 초기 상태로 되돌릴 것인지를 결정합니다. clearProps를 true로 설정하면 애니메이션이 끝난 후 대상 객체의 모든 속성이 초기값으로 돌아갑니다.


//3)
// 주어진 코드 gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);은 GSAP(GreenSock Animation Platform) 라이브러리를 사용하여 요소들의 애니메이션을 만드는 코드입니다.

// 여기서 사용된 메서드와 옵션을 해석하면 다음과 같습니다:

// gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}): GSAP의 to 메서드를 사용하여 items 배열의 각 요소에 대한 애니메이션을 생성합니다.

// opacity: 0.3: 애니메이션 동안 투명도를 0.3으로 설정합니다.
// stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}: 각 요소에 대한 애니메이션을 순차적으로 지연시키기 위해 stagger 효과를 사용합니다. amount는 각 요소 간의 간격을 나타냅니다. from은 애니메이션이 시작될 때의 기준 인덱스를 나타냅니다. grid: "auto"는 그리드 형태로 애니메이션을 배치합니다.
// .kill(item): GSAP의 kill 메서드를 사용하여 특정 요소의 애니메이션을 중지합니다. 여기서 item은 애니메이션을 중지할 대상 요소를 나타냅니다.

// 따라서 전체 코드는 items 배열의 각 요소에 대한 투명도 애니메이션을 만들고, 각 요소 간에 0.7초의 간격을 두며 시작 인덱스는 item의 인덱스로 설정합니다. 그리고 이 애니메이션을 시작하자마자 item에 해당하는 요소의 애니메이션을 즉시 중지합니다.


//4)
// 주어진 코드 Flip.from(state, { scale: true, duration: 0.5, delay: 0.2, onInterrupt: () => tl.kill() })은 아마도 Flip.js 또는 관련된 라이브러리에서 제공되는 메서드를 사용하여 요소에 대한 애니메이션을 생성하는 코드일 것입니다. 하지만 정확한 해석을 위해서는 해당 라이브러리의 문서를 참조해야 합니다. 일반적으로 이 코드는 상태(state)를 기반으로 한 요소에 대한 애니메이션을 생성하며 몇 가지 설정이 포함되어 있습니다.

// 여기에서 코드의 주요 부분을 해석해보겠습니다:

// Flip.from(state, {...}): 아마도 Flip.js 또는 관련 라이브러리의 from 메서드를 호출하고, state를 기반으로 하는 애니메이션을 생성하는 것으로 보입니다.
// state: 애니메이션의 기준이 되는 상태를 나타냅니다.
// { scale: true, duration: 0.5, delay: 0.2, onInterrupt: () => tl.kill() }: 애니메이션에 대한 옵션 객체로, 다양한 설정을 담고 있습니다.
// scale: true: 애니메이션 동안 크기를 조절하는 설정입니다.
// duration: 0.5: 애니메이션의 지속 시간을 나타냅니다. 여기서는 0.5초로 설정되어 있습니다.
// delay: 0.2: 애니메이션의 시작을 지연시키는 설정으로, 0.2초의 지연이 있습니다.
// onInterrupt: () => tl.kill(): 애니메이션 실행 중에 중단될 경우(onInterrupt 이벤트 발생 시), tl.kill()를 호출하여 타임라인을 중지합니다.
// 이 코드는 상태(state)를 기반으로 하는 요소에 대한 Flip.js 애니메이션을 설정하고, 애니메이션의 일부 설정(크기 조절, 지속 시간, 지연, 중단 시 타임라인 중지)을 제공합니다. 하지만 정확한 동작은 해당 라이브러리의 문서를 참조하여야 합니다.