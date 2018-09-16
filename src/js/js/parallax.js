function parallax() {
	const parallax = document.querySelector('.main-parallax');

	//przy scrollu przewijam lekko tlo
	window.addEventListener('scroll', function() {
		parallax.style.backgroundPositionY = -(this.scrollY * 0.2) + 'px';
	});
}

export {parallax}