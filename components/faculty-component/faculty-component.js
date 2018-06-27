    $(document).ready(function() {

        var indexCount;

        /*faculty page Pagination Script*/
        var $status = $('.pagingInfo');
        var $slickElement = $('.faculty-slider');
        var totalItemCount = $(".faculty-content-page-component-wrapper").length;
        var pageViewCount = $(window).width() > 767 ? 6 : 3; //number of items in a page 
        var itemsShown = 0;
        var itemFrom = 0;
        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slider) {
            var pageNumber = (currentSlide ? currentSlide : 0) + 1;
            if (pageNumber == 1) {
                $('.prev').hide();
            } else {
                $('.prev').show();
            }
            itemsShown = pageNumber * pageViewCount;
            itemFrom = itemsShown - pageViewCount;
            
            console.log('pageViewCount .... ', pageViewCount);
            if (itemsShown > totalItemCount) {
                itemsShown = totalItemCount;
                itemFrom = totalItemCount - (totalItemCount % pageViewCount);
            }
            $status.text("Showing: " + (itemFrom + 1) + ' to ' + itemsShown + ' of ' + totalItemCount);
              if($(window).width() < 767 ) {
                console.log($(slick.$slides.get(indexCount)));
               $('.slick-dots').html('<li><a>'+ (pageNumber) + '</a> </li>' + '<li><a>'+ (pageNumber+1) + '</a> </li>' + '<li><a>'+ (pageNumber+2) + '</a> </li>');
               $('.slick-dots li').click(function() {
                 $('.faculty-slider').slick('slickNext');
               });
            }

        });

        $slickElement.slick({
            autoplay: false,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            slidesPerRow: 4,
            rows: 2,
            arrows: true,
            adaptiveHeight: true,
            prevArrow: $(".prev"),
            nextArrow: $(".next"),

            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data();
                indexCount = i;
                return $(window).width() > 768 ? '<a>' + (i + 1) + '' + '</a>' : '' ;
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
                    rows: 3
                }
            }]
        });


    });