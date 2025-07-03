gsap.registerPlugin(ScrollTrigger);

function scrollTriggerIntro() {
	let introWrapperHeight = document.querySelector(".intro__wrapper")
		.offsetHeight;

	gsap.to(".intro__wrapper", {
		y: `-${introWrapperHeight}`,
		ease: "none",
		scrollTrigger: {
			trigger: ".intro",
			pin: true,
			scrub: true,
			end: `+=${introWrapperHeight}px`
		}
	});
}

function animationXScrollReview() {
	let reviews = gsap.utils.toArray(".review");

	let reviewsScroll = gsap.to(reviews, {
		xPercent: -100 * (reviews.length + 10),
		ease: "none",
		scrollTrigger: {
			trigger: ".reviews",
			pin: true,
			scrub: true,
			end: () =>
				"+=" + document.querySelector(".reviews__container").offsetWidth + "px"
		}
	});

	let reviewsWrapper = gsap.utils.toArray(".review__wrapper");
	reviewsWrapper.forEach((review) => {
		const t1 = gsap.timeline({
			scrollTrigger: {
				trigger: review,
				start: "left 100%",
				end: "left 35%",
				scrub: true,
				containerAnimation: reviewsScroll
			}
		});

		t1.to(review, {
			y: 0
		});

		const t2 = gsap.timeline({
			scrollTrigger: {
				trigger: review,
				start: "left 35%",
				end: "left -50%",
				scrub: true,
				containerAnimation: reviewsScroll,
				markers: true
			}
		});

		t2.to(review, {
			transform: "translateY(100%)"
		});
	});
}

animationXScrollReview();
scrollTriggerIntro();
ScrollTrigger.sort();

gsap.to(".reviews__logo", {
	y: 10,
	duration: 2,
	yoyo: true,
	ease: "sine.inOut",
	repeat: -1
});

gsap.utils.toArray(".arrow").forEach(function (item, index) {
	gsap.to(item, {
		y: 20,
		duration: 1,
		yoyo: true,
		repeat: -1,
		ease: "sine.inOut"
	});
});
