
$(document).ready(function() {
    $(".fancybox").fancybox({
        content: function(curr) {
            return $.fancybox.current.group[$.fancybox.current.index].element.html()        
        }
    })
    /*Image gallery script*/
    var indexCount;
    $(".imggeupcoming-event-slider").slick({
        autoplay: false,
        adaptiveHeight: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 5,
        rows: 5,
        arrows: true,
        prevArrow: $(".prev"),
        nextArrow: $(".next"),

        customPaging: function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            indexCount = i;
            return '<a>' + (i + 1) + '' + '</a>';

        },
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                adaptiveHeight: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                slidesPerRow: 1,
                rows: 6
            }
        }],
        responsive: [{
            breakpoint: 767,
            settings: {
                dots: true,
                adaptiveHeight: true,
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
    var $slickElement = $('.imggeupcoming-event-slider');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slider) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        console.log(currentSlide);
        $status.text("Showing: " + i + '/' + (slick.slideCount ? slick.slideCount : indexCount + 1));
        $status.append(' of ' + $(".slick-slide img").length);
    });

    $slickElement.slick({
        dots: true
    });
});