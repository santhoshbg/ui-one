$(document).ready(function() {

    /*cards-with-text-component script*/
    var indexCount;
    $(".cards-with-text-slider").slick({
        autoplay: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 5,
        rows: 2,
        arrows: true,
        prevArrow: $(".prev"),
        nextArrow: $(".next"),

        customPaging: function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            indexCount = i;
            return '<a>' + (i + 1) + '' + '</a>';

        },
        responsive: [{
            breakpoint: 767,
            settings: {
                dots: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                slidesPerRow: 1,
                rows: 20
            }
        }]
    });

    var $status = $('.pagingInfo');
    var $slickElement = $('.cards-with-text-slider');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slider) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text("Showing: " + i + '/' + (slick.slideCount ? slick.slideCount : indexCount + 1));
    });

    $slickElement.slick({
        dots: true
    });
});