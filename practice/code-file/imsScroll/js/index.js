const getGrid = selector => {//1)
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
		  	let a = [], 
			  	subsets = {},
			  	onlyEven = alternating === "even",
			  	p;
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === "odd") {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
		  	if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
		  	}
		  	return a;
		};
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
	elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
	elements.refresh();

	return elements;
}



const grids = document.querySelectorAll('.grid');

const applyAnimation = (grid, animationType) => {
	const gridWrap = grid.querySelector('.grid-wrap');
	const gridItems = grid.querySelectorAll('.grid__item');
	const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'));
	
	const timeline = gsap.timeline({
	  	defaults: { ease: 'none' },
	  	scrollTrigger: {
			trigger: gridWrap,
			start: 'top bottom+=5%',
			end: 'bottom top-=5%',
			scrub: true
	  	}
	});
	
	switch(animationType) {
		
		case 'type1':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '1000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');

			timeline
			.set(gridWrap, {
				rotationY: 25
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-1600,200)
			})
			.fromTo(gridItems, {
				xPercent: () => gsap.utils.random(-1000,-500)
			}, {
				xPercent: () => gsap.utils.random(500,1000)
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: .5
			}, 0)
			
			break;

	  	case 'type2':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '160%');
			grid.style.setProperty('--perspective', '2000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '6');
			grid.style.setProperty('--grid-gap', '14vw');

		  	timeline
		  	.set(gridWrap, {
				rotationX: 20
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-3000,-1000)
			})
			.fromTo(gridItems, {
				yPercent: () => gsap.utils.random(100,1000),
				rotationY: -45,
				filter: 'brightness(200%)'
			}, {
				ease: 'power2',
				yPercent: () => gsap.utils.random(-1000,-100),
				rotationY: 45,
				filter: 'brightness(0%)'
			}, 0)
			.fromTo(gridWrap, {
				rotationZ: -5,
			}, {
				rotationX: -20,
				rotationZ: 10,
				scale: 1.2
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0)

			break;
	  
		case 'type3':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '105%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--perspective', '1500px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			
			timeline
			.set(gridItems, {
				transformOrigin: '50% 0%',
				z: () => gsap.utils.random(-5000,-2000),
				rotationX: () => gsap.utils.random(-65,-25),
				filter: 'brightness(0%)'
			})	
			.to(gridItems, {
				xPercent: () => gsap.utils.random(-150,150),
				yPercent: () => gsap.utils.random(-300,300),
				rotationX: 0,
				filter: 'brightness(200%)'
			}, 0)
			.to(gridWrap, {
				z: 6500
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0);
			
			break;

		case 'type4':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '50%');
			grid.style.setProperty('--perspective', '3000px');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-gap', '1vw');

			timeline
			.set(gridWrap, {
				transformOrigin: '0% 50%',
				rotationY: 30,
				xPercent: -75
			})
			.set(gridItems, {
				transformOrigin: '50% 0%'
			})
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2',
				z: 500,
				stagger: 0.04
			}, 0)
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2.in',
				z: 0,
				stagger: 0.04
			}, 0.5)
			.fromTo(gridItems, {
				rotationX: -70,
				filter: 'brightness(120%)'
			}, {
				duration: 1,
				rotationX: 70,
				filter: 'brightness(0%)',
				stagger: 0.04
			}, 0)
			
			break;

		case 'type5':

			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '120%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--grid-gap', '0');
			
			const gridObj = getGrid(gridItems);

			timeline
			.set(gridWrap, {
				rotationX: 50
			})
			.to(gridWrap, {
				rotationX: 30
			})
			.fromTo(gridItems, {
				filter: 'brightness(0%)'
			}, {
				filter: 'brightness(100%)'
			}, 0)
			.to(gridObj.rows('even'), {
				xPercent: -100,
				ease: 'power1'
			}, 0)
			.to(gridObj.rows('odd'), {
				xPercent: 100,
				ease: 'power1'
			}, 0)
			.addLabel('rowsEnd', '>-=0.15')
			.to(gridItems, {
				ease: 'power1',
				yPercent: () => gsap.utils.random(-100, 200),
			}, 'rowsEnd');
			break;

		case 'type6':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '2500px');
			grid.style.setProperty('--grid-width', '100%');
			grid.style.setProperty('--grid-gap', '6');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-item-ratio', '1');
			
			timeline
			.fromTo(gridItems, {
				transformOrigin: '50% 200%',
				rotationX: 0,
				yPercent: 400,
			}, {
				yPercent: 0,
				rotationY: 360,
				opacity: 0.2,
				scale: 0.8,
				stagger: 0.03,
			})

			break;
	  	
		default:
			console.error('Unknown animation type.');
			break;
	}
}

// Apply animations to each grid
const scroll = () => {
	grids.forEach((grid, i) => {
		// Determine animation type
		let animationType;
		switch (i % 6) {
			case 0:
				animationType = 'type1';
				break;
			case 1:
				animationType = 'type2';
				break;
			case 2:
				animationType = 'type3';
				break;
			case 3:
				animationType = 'type4';
				break;
			case 4:
				animationType = 'type5';
				break;
			case 5:
				animationType = 'type6';
				break;
		}
		applyAnimation(grid, animationType);
	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
window.addEventListener("load",() => {
	scroll();
	document.body.classList.remove('loading');
});



//1) 이 코드는 gsap (GreenSock Animation Platform)을 사용하여 선택된 요소들의 위치와 크기를 계산하고, 이를 기반으로 그리드 형태로 요소들을 정렬하는 유틸리티 함수입니다. 이 함수는 특정 CSS 선택자(selector)를 입력으로 받아 해당 요소들을 배열로 반환하며, 열(columns)과 행(rows)으로 나누는 기능을 제공합니다. 주요 기능은 다음과 같습니다:
// 요소 배열화: 주어진 선택자(selector)를 사용하여 선택된 모든 요소를 배열로 만듭니다.
// 위치와 크기 계산: 각 요소의 위치와 크기를 getBoundingClientRect()를 통해 계산하여 저장합니다.
// 서브셋 생성: 특정 축(axis)과 치수(dimension)을 기준으로 요소들을 그룹화합니다. 요소들이 중앙 위치를 기준으로 그룹화되어 서브셋을 만듭니다.
// 홀수/짝수 필터링: 홀수 또는 짝수 서브셋만 선택할 수 있습니다.
// 서브셋 병합: 서브셋들을 병합하여 하나의 배열로 만들 수 있습니다.
// 새로고침 기능: 요소들의 위치와 크기를 새로고침하는 기능을 제공합니다.
// 열과 행 구분 기능: 요소들을 열 또는 행으로 구분하여 반환합니다.
// 주요 함수 및 메서드 설명
// getGrid(selector): 주어진 선택자에 해당하는 요소들을 배열로 반환하고, 이 배열에 추가 메서드를 부여합니다.
// elements.refresh(): 각 요소의 현재 위치와 크기를 새로고침합니다.
// elements.columns(alternating, merge): 열을 기준으로 요소들을 그룹화하여 배열로 반환합니다. alternating은 홀수 또는 짝수를 필터링하며, merge는 서브셋들을 병합할지 여부를 결정합니다.
// elements.rows(alternating, merge): 행을 기준으로 요소들을 그룹화하여 배열로 반환합니다. alternating과 merge는 elements.columns와 동일한 역할을 합니다.