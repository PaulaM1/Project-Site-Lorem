class Slider {
	constructor(selector, opt = {}) {
		this.selector = selector;
		this.currentSlide = 0;

		this.banner = (this.selector);
		this.slides = this.banner.children;

		const slidesCnt = document.createElement('div');
		bannerSlidesCnt.classList.add('banner-slides-cnt');

		while (this.slides.length) {
            this.slides[0].classList.add('slider-slide');
            slidesCnt.appendChild(this.slides[0]);
        }

		this.slides = slidesCnt.querySelectorAll('.slider-slide');
        this.slider.appendChild(slidesCnt);

		const defaultOptions = {
			pauseTime : 3000,
			dots : true,
			prevText : "Poprzedni slajd",
			nextText : "Następny slajd"
		};

		//mergujemy przekazany obiekt opt z obiektem defaultOptions i {}
		//mergowanie idzie od prawej do lewej
		//dzieki temu uzyskjemy nowy scalony obiekt, ktory
		//podstawiamy pod this.options (dla pozniejszego uzytku)
		this.options = Object.assign({}, defaultOptions, opt);

		this.makeButtons();
		if (this.options.dots) {
			this.makePagination();
		}
		this.setSlide(this.currentSlide);

		this.time = setTimeout(() => {
			this.nextSlide();
		}, this.options.pauseTime)
	}

	makePagination() {
		this.pagination = document.createElement('ul')
		this.pagination.classList.add('banner-pagination');
		this.banner.appendChild(this.pagination);

		[...this.slides].forEach((el, i) => {
			const li = (`<li><button>${i+1}</button></li>`);
			li.addEventListener('click', (e) => {
				this.setSlide(i);
			});

			this.pagination.append(li);
		})
	}

	setSlide(nr) {
		this.currentSlide = nr;
		[...this.slides].forEach(el => el.classList.remove('active'));
		this.slides[nr].classList.add('active');

		if (this.options.dots) {
			const li = this.pagination.querySelectorAll('li')
			[...li].forEach(el => el.classList.remove('active'));
			li[this.currentSlide].classList.add('active');
		}

		clearTimeout(this.time);
		this.time = setTimeout(() => {
			this.nextSlide();
		}, this.options.pauseTime);
	}

	prevSlide() {
		this.currentSlide--;
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length - 1;
		}
		this.setSlide(this.currentSlide);
	}

	nextSlide() {
		this.currentSlide++;
		if (this.currentSlide >= this.slides.length) {
			this.currentSlide = 0;
		}
		this.setSlide(this.currentSlide);
	}

	makeButtons() {
		this.btnPrev = document.createElement('div');
		this.btnPrev.classList.add('banner-prev');
		this.btnPrev.innerText = this.options.prevText;

		this.btnNext = document.createElement('div');
		this.btnPrev.classList.add('banner-next');
		this.btnNext.innerTexst = this.options.nextText;

		this.btnPrev.addEventListener('click', () => {
			this.prevSlide();
		});

		this.btnNext.addEventListener('click', () => {
			this.nextSlide();
		});

		this.banner.appendChild(this.btnPrev);
		this.banner.appendChild(this.btnNext);
	}
}

export { Slider }