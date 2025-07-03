gsap.set(".circle", {
	xPercent: -50,
	yPercent: -50,
	transformOrigin: "50% 50%"
});

gsap.to(".circle", {
    motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
    },
    scrollTrigger: {
      trigger: '.path-holder',
      start: 'top center',
      end: 'bottom center',
      markers: true,
      scrub: 1
    },
    ease: pathEase("#path"),
}, 0);


// helper function that returns and ease that bends time to ensure the tractor stays relatively centered. Requires MotionPathPlugin of course
function pathEase(path, axis="y", precision=1) {
		let rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [],
			minIndex = 0,
			getClosest = p => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
			},
			i = 1,
			p, v;
		for (; i < l; i++) {
			p = i / l;
			v = MotionPathPlugin.getPositionOnPath(rawPath, p)[axis];
			positions[i] = (v - start) / range;
		}
		positions[l] = 1;
		for (i = 0; i < l; i++) {
			getClosest(i / l);
		}
		a.push(1);
		return p => {
			let i = p * l,
				s = a[i | 0];
			return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
		}
	}