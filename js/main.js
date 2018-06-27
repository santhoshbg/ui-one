$(document).ready(function() {

    $(".search-form").submit(function(){
        if($(this).find('input[type="search"]').val() == "")
        {
            return false;
        }
    })

    $(".right-side-nav-bar i.fa-search").click(function(){
        $(this).parents(".search-form").submit();
    })


    /*Target Parent Menu Which is have sub menu*/
    $('.main-menu ul li > ul li').closest('ul').closest('li').addClass('active');
    /*Timeline Carousel*/
    var sync1 = $(".glorious-carousel-image");
    var sync2 = $(".glorious-carousel-year");
    var slidesPerPage = 8; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            responsiveClass: true,
            responsive: {
                0: {
                    items: 3,
                    touchDrag: true,
                    mouseDrag: true,
                    margin: 80,
                    nav: false,
                    dots: false
                },
                768: {
                    items: 5,
                    margin: 80,
                    touchDrag: true,
                    mouseDrag: true,
                    nav: false,
                    dots: false
                },
                1200: {
                    items: 10,
                    margin: 92,
                    dots: false,
                    nav: false,
                    URLhashListener: true,
                    startPosition: 'URLHash',
                }
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var current = el.item.index;
        sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
        console.log(start);
        console.log(end);

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    /*Banner Carousel*/
    var one = $(".owl-carousel");
    var banner_carousel = $(".geu-banner-carousel");
    one.owlCarousel({
        items: 4,
        loop: true,
        margin: 5,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true
    });

    banner_carousel.owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        autoplayTimeout: 2000,
    });

    $('.geu-banner-carousel').addClass('owl-carousel').owlCarousel({
        margin: 10,
        nav: true,
        items: 1,
    });

    /*Text Carousel*/
    /*Banner Carousel*/
    var one = $(".text-carousel");
    $('.text-carousel').addClass('owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"]
    });

    /*Counter*/
    $('.count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

 var indexCount;
    /*News and Events Pagination Script*/
    $(".upcoming-event-slider").slick({
        autoplay: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 3,
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
                rows: 3
            }
        }]
    });

    var $status = $('.pagingInfo');
    var $slickElement = $('.upcoming-event-slider');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slider) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text("Showing: " + i + '/' + (slick.slideCount ? slick.slideCount : indexCount + 1));
    });

    $slickElement.slick({
        dots: true
    });

    $(".slider").not('.slick-initialized').slick()

    /*Previous Events Pagination Script*/
    $(".previous-event-slider").slick({
        autoplay: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 3,
        rows: 2,
        arrows: true,
        prevArrow: $(".prev"),
        nextArrow: $(".next"),

        customPaging: function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
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
                rows: 3
            }
        }]
    });

    var $status = $('.pagingInfo');
    var $slickElement = $('.slider');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        //var i = currentSlide;
        $status.text("Showing: " + i + '/' + slick.slideCount);
    });
    $slickElement.slick({
        dots: true
    });


    //loading youtube video player
    GEU.videoplayer.init();  

        consolidateAddress = [
        address= {
                "addressheading": "Mailing Address",
                "contactName": "Graphic Era University",
                "contactAddress": "566/6, Bell Road, Clement Town Dehradun, Uttarakhand, India -248002",
                "contactEmail": "admissions@geu.ac.in",
                "contactText": "(for admission related enquiries)",
                "contactEnquiry": "enquiry@geu.ac.in",
                "contactCorporateText":"For Corporate Relations, write to us at",
                "contactCorporate":"corporate-relations@geu.ac.in",
                "contactPhone":"+91-135-2643421, 2642727",
                "contactFax": "91-135-2644025",
                "contactLattitude": "30.2734235",
                "contacctLongitude": "77.9976334"
        },
        address = {
                "addressheading": "Delhi Resource Center",
                "contactName": "Ms. Nishtha Kapoor",
                "contactAddress": "B 6/11 (Lower Ground Floor), Safdarjung Enclave, New Delhi - 110029",
                "contactEmail": "admissions_delhi@geu.ac.in",
                "contactEnquiry": "nishthakapoor@geu.ac.in",
                "contactPhone":"011-41354520/21/22, +91-9718004776, +91-9205014006",
                "contactLattitude": "28.6466772",
                "contacctLongitude": "76.8130664"
        }
    ];
    var locationBtn = "";
     var locationDropdown = "";
    for(var i=0; i<consolidateAddress.length; i++) {
        locationBtn += '<li data-id="'+i+'">'+consolidateAddress[i].addressheading +'</li>'
        locationDropdown += '<option value="'+i+'">'+consolidateAddress[i].addressheading +'</option>'
    }

    $(".address-details ul").html(locationBtn);
    $(".mobile-address-list").html(locationDropdown);
    $('.address-details ul li:first').addClass("active");
    $(".address-details ul li.active").trigger('click');

    
    //init enquiry form scripts
    GEU.enquiryForm.init();  
    GEU.searchResults.init();

});


var GEU = GEU || {};

GEU.videoplayer = {
    apiReady : false,
    init : function(id, container){
        $(".video-item-wrapper").click(function(){
            var container = ""; //video container
            var id = $(this).data("videoid");
            $(".video-item-wrapper").removeClass("selected");
            $(this).addClass("selected");
            
            container = $(".video-player")
            GEU.videoplayer.createPlayer(id, container);
        })

        $(".video-player .video-placeholder").click(function(){
            var id = $(".video-placeholder img").data("videoid");       
            GEU.videoplayer.createPlayer(id, $(".video-player"));
        })
    },

    createPlayer: function(id, container){
        $(".video-placeholder").hide();
        container.find("iframe").remove();

        var src = 'https://www.youtube.com/embed/'+ id +'?rel=0&amp;showinfo=0&amp;autoplay=1';
        var iframe = '<iframe width="100%" src="'+src+'" height="610" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'

        container.append(iframe);
        $('html, body').animate({
            scrollTop: container.offset().top
        });
        
    }
}

$(document).on('click', '.address-details ul li', function() {
    $(this).addClass("active").siblings().removeClass('active');
   var addressIndex  = $(this).data("id");
   showAdress(addressIndex);
});

$(document).on('change', '.mobile-address-list', function() {
   var addressIndex  = $(this).val();
   showAdress(addressIndex);
    $(this).find(':selected').addClass('selected').siblings('option').removeClass('selected');
});

function showAdress(addressIndex){
    var contactDetails = '<div class="address-wrapper"><div class="heading">'+consolidateAddress[addressIndex].addressheading + '</div>' + '<div >'+consolidateAddress[addressIndex].contactName +'</div>'  + '<div class="contact-address">'+consolidateAddress[addressIndex].contactAddress +'</div>' + '<a class="contact-email" href="mailTo:'+consolidateAddress[addressIndex].contactEmail +'">'+consolidateAddress[addressIndex].contactEmail +'</a>' + '<br>'+ '<a class="contact-enquiry" href="mailTo:'+consolidateAddress[addressIndex].contactEnquiry +'">'+consolidateAddress[addressIndex].contactEnquiry +'</a>'+ '<br>' +'<div>'+consolidateAddress[addressIndex].contactCorporateText +'</div>'+'<a class="contact-corporate" href="mailTo:'+consolidateAddress[addressIndex].contactCorporate +'">'+consolidateAddress[addressIndex].contactCorporate +'</a>'+'<div> Telephone: '+consolidateAddress[addressIndex].contactPhone +'</div>'+ '<div class="fax"> Fax:'+consolidateAddress[addressIndex].contactFax +'</div></div>';
        $(".address").html(contactDetails);
        $('.address-wrapper').find('*').each(function(){
            if($(this).text() == 'undefined') {
                console.log($(this));
                $(this).hide();
                $(".fax").hide();
            }
        });
    
   var lat = parseInt(consolidateAddress[addressIndex].contactLattitude);
   var lon = parseInt(consolidateAddress[addressIndex].contacctLongitude);
   
   createMarker(map, {lat: lat, lng: lon});
}
GEU.enquiryForm = {

    init:function() {
        GEU.enquiryForm.validations();
    },

    validations: function() {

        jQuery.validator.addMethod('selectcheck', function (value) {
        	return (value != '-1');
        },"This field is required.");
        
        jQuery.validator.addMethod('customEmailCheck', function (value) {
        	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
    	},"Please enter a valid email address.");
    
  		$( "#enquiryForm" ).validate( {
            rules: {
                name: {
                    required: true
                },
                lastname: {
                    required: true
                },
                email: {
                    required: true,
                    email: false,
                    customEmailCheck:true
                },
                mobile: {
                    required: true,
                    number: true,
                    maxlength:15
                },
                areaInterest: {
                    selectcheck :true
                },
                query: {
                    required: true
                },
            },
            messages: {
                mobile: {
                    number: "Please enter a valid mobile number",
                    maxlength : "Please enter a valid mobile number"
                }
            }
        });

        $("#enquiryForm #country").change(function(){
            if($(this).val() == "india")
            {
                $("#enquiryForm .state-row, #enquiryForm .city-row").show();
            }
            else
            {
                $("#enquiryForm .state-row, #enquiryForm .city-row").hide();
            }
        })
    }
}

GEU.searchResults = {
    items:6, //number of ressults per page
    init:function(){
        var indexCount;
        /*News and Events Pagination Script*/

        var $status = $('.search-results-component .pagingInfo');
        var $slickElement = $('.search-result-pages');
    
        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide, slider) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text("Showing: " + i + '/' + (slick.slideCount ? slick.slideCount : indexCount + 1));
        });
    
        
        $(".search-result-pages").slick({
            autoplay: false,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            slidesPerRow: 1,
            rows: GEU.searchResults.items,
            arrows: true,
            prevArrow: $(".search-results-component .prev"),
            nextArrow: $(".search-results-component .next"),
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data();
                indexCount = i;
                return '<a>' + (i + 1) + '' + '</a>';
            }
        });
    }
}