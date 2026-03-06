/*
Arkangel — Pre-launch Landing Page
*/
jQuery(function ($) {

    $(document).ready(function () {
        "use strict"

        // Smooth scrolling for anchor links
        $('.page-scroll a').on('click', function (event) {
            var $anchor = $(this);
            var target = $($anchor.attr('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1500, 'easeInOutExpo');
            }
            event.preventDefault();
        });

        // Back to top link
        var offset = 2000;
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(400);
            } else {
                $('.back-to-top').fadeOut(400);
            }
        });

        // Testimonials Carousel
        $("#owl-testimonials").owlCarousel({
            dots: true,
            loop: true,
            autoplay: false,
            nav: true,
            navText: [
                "<i class='flaticon-arrows-1'></i>",
                "<i class='flaticon-arrows'></i>"
            ],
            responsive: {
                1: {items: 1,},
                991: {items: 2,},
            }
        });

        // Email form validation
        $('#signup-form').on('submit', function(e) {
            var email = $(this).find('input[type="email"]').val();
            if (!email || email.indexOf('@') === -1) {
                e.preventDefault();
                $(this).find('.form-error').text('Por favor ingresa un email válido').show();
                return false;
            }
        });

    }); // end document ready

    // Window load function
    $(window).load(function () {
        // Page Preloader
        $("#preloader").fadeOut("slow");
    });

    // Navbar toggle on click
    $(document).on('click', function () {
        $('.navbar .collapse').collapse('hide');
    });

});
