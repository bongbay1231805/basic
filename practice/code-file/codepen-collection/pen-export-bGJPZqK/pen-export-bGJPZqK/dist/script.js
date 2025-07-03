custom_cursor();
function custom_cursor() {


	var $cursor_primary = $('#custom_cursor');
	var $cursor_secondary = $('#custom_cursor_text');
	var $circle = $cursor_primary.find('.custom_cursor_circle');
	var $txt = $cursor_secondary.find('.custom_cursor_txt');

	// default moving
	$('body').mousemove(function (e) {
		gsap.to($cursor_primary, {
			duration: 1,
			x: e.clientX,
			y: e.clientY,
			ease: Power3.easeOut
		});
		gsap.to($cursor_secondary, {
			duration: 1.6,
			x: e.clientX,
			y: e.clientY,
			ease: Power3.easeOut
		});
	});

	// default hover cursor
	$(document).on({
		mouseenter: function () {
			var $this = $(this);
			var words = ($this.data('hover') != undefined) ? $this.data('hover') : '';
			var size = ($this.data('size') != undefined) ? $this.data('size') : '100%';
			if ($this.hasClass('drag')) {
				$cursor_primary.addClass('drag');
				$cursor_secondary.addClass('drag');
			}

			$txt.find('> span').text(words);

			gsap.killTweensOf($circle);
			gsap.killTweensOf($txt);
			gsap.to($circle, {
				duration: 0.3,
				width: size,
				height: size,
				autoAlpha: 1,
				ease: Power0.easeNone
			});
			gsap.to($txt, {
				duration: 0.3,
				width: size,
				height: size,
				autoAlpha: 1,
				ease: Power0.easeNone
			});
		},
		mouseleave: function () {
			var $this = $(this);

			if ($this.hasClass('drag')) {
				$cursor_primary.removeClass('drag');
				$cursor_secondary.removeClass('drag');
			}

			gsap.killTweensOf($circle);
			gsap.killTweensOf($txt);
			gsap.to($circle, {
				duration: 0.2,
				width: '0%',
				height: '0%',
				autoAlpha: 0,
				ease: Power0.easeNone
			});
			gsap.to($txt, {
				duration: 0.2,
				width: '0%',
				height: '0%',
				autoAlpha: 0,
				ease: Power0.easeNone
			});
		}
	}, '.custom_hover');
}