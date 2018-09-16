function header() {
    const $header = $('.page-header');
    $(window).on('scroll', function(e) {
        if ($(this).scrollTop() >= 100) {
            $header.addClass('sticky');
        } else {
            $header.removeClass('sticky');
        }
    })

    //po kliku na link w menu przewijamy do sekcji
    //na ktora wskazuje dany link
    $('.page-nav a').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        const $target = $(href) //$('#ourCourses')
        console.log(href, $target)
        $('html, body').animate({
            scrollTop : $target.offset().top
        }, 1000)
    })
}

export {
    header
}