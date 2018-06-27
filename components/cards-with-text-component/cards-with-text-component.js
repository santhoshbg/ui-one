$(document).ready(function() {

    /*cards-with-text-component script*/
    var indexCount;
    $(".cards-with-text-slider").slick({
        autoplay: false,
        scroll: false,
        speed: 500,
        fade: false,
        cssEase: 'linear',
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 5,
        rows: 2,
        arrows: true,
        prevArrow: $(".prev"),
        nextArrow: $(".next"),

        responsive: [{
            breakpoint: 767,
            settings: {
                dots: true,
                arrows: false,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                slidesPerRow: 1,
                rows: 5
            }
        }]
    });
});