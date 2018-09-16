function parallax() {
	const $parallax = $('.main-parallax');

	//przy scrollu przewijam lekko tlo
	$(window).on('scroll', function() {
		$parallax.css({
            backgroundPositionY : -(this.scrollY * 0.2) + 'px'
        });
	});
}

export {parallax}