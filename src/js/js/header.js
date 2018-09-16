function header() {
    const header = document.querySelector('.page-header');
    window.addEventListener('scroll', function(e) {
        if (this.pageYOffset >= 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    })

        const links = document.querySelector('.page-nav a');
        for (const a of links) {
            const href = a.getAttribute('href');
            const targetSection = document.querySelector(href);
            console.log('x')
            document.scrollIntoView({
                behavior : 'smooth';
            });
        }
}

export {
    header
}
