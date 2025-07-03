 	/*lottie animation*/
	if ($(".logo_lottie").length) {
		const LottiePlayerAll = document.querySelectorAll('.logo_lottie');
		for (let jj = 0; jj < LottiePlayerAll.length; jj++) {
			let eachLottiePlayer = LottiePlayerAll[jj];
			let el_path = eachLottiePlayer.dataset.animation_path;
			// console.log(path);
			let intro = {
				container: eachLottiePlayer,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				rendererSettings: {
					progressiveLoad: false,
					preserveAspectRatio: 'xMidYMid meet',
					//className: 'lottieSvg',
					//viewBoxOnly: false
				},
				path: el_path,
			};

			let anims = lottie.loadAnimation(intro);
			anims.addEventListener('DOMLoaded', function () {
				setTimeout(() => {
					ScrollTrigger.create({
						trigger: eachLottiePlayer,
						start: "top center",
						end: "bottom bottom",
						scrub: true,
						//markers: true,
						onEnter: function () {
                          anims.stop();
							anims.play();
						},
                      onEnterBack: function () {
							anims.stop();
                        anims.play();
						},
					});

				}, 2000)

			});
		}
	}
	/*end lottie animation*/