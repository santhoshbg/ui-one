$(document).ready(function() {
	$("#partiallyFilledForm").on('click', function() {
        var isFormValid = true;
        if ($("#formNumber").val().length == 0) {
            $(".partially-filled-form-error-message").text("*Please Fill Form ID");
            isFormValid = false;
        }
        else if ($("#formNumber").val().length != 0) {
            $('.otp-wrapper').show();
            $(".partially-filled-form-error-message").text('');
            $("#hideMsg span").html("5");
            $('#hideMsg').show();
                var sec = 4;
                var timer = setInterval(function() {
                    $('#hideMsg span').text(sec--);
                    if (sec == -1) {
                        $('#hideMsg').fadeOut('fast');
                        $("#sendOtp").prop("disabled", null);
                        clearInterval(timer);
                    }
                }, 1000);
            $("#sendOtp").click(function() {
                $("#sendOtp").prop("disabled", true);
                $("#hideMsg span").html("5");
                $('#hideMsg').show();
                var sec = 4;
                var timer = setInterval(function() {
                    $('#hideMsg span').text(sec--);
                    if (sec == -1) {
                        $('#hideMsg').fadeOut('fast');
                        $("#sendOtp").prop("disabled", null);
                        clearInterval(timer);
                    }
                }, 1000);
            })
            if ($("#enterOtp").val().length != "6") {
	            $(".partially-filled-form-error-message").text("*Please Provide Correct OTP");
	            isFormValid = false;
	        }
	        else {
	            isFormValid = true;
	            $(".partially-filled-form").hide();
	            $(".terms-wrapper").show();
	            return false;
	        }
        } 
        return isFormValid;
    });

	$('#proceedTerms').on('click', function() {
		if($("#termsAndCondition").prop('checked') == false || $("#declaration").prop('checked') == false) {
			$(".terms-error").text("*Please Agree Terms and declaration");
	        isFormValid = false;
		}
		else {
            isFormValid = true;
            $(".terms-error").text('');
            $('.payment').show();
            return false;
        }
        return isFormValid;
	});


   	$(document).on("keypress", "#amount", function(e) {
        var regex = new RegExp("^[0-9.]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(str)) {
            e.preventDefault();
            return false;
        }
    });
    $('#paymentSubmit').on('click', function() {
    	var isFormValid = true;
    	if($('input[name="fee-payment"]:checked').length <= 0 && $('input[name="payment-mode"]:checked').length <= 0) {
    		$(".payment-option-error").text("*Please Select Payment Option");
    		$(".payment-mode-error").text("*Please Select Payment Mode");
    		$("body, html").animate({ 
              scrollTop: $(".payment-option-error").offset().top -10
            }, 600);
    		isFormValid = false;
    	}
    	else if($('input[name="fee-payment"]:checked').length >= 0 && $('input[name="payment-mode"]:checked').length <= 0) {
    		$(".payment-option-error").text('');
    		$(".payment-option-error").text("*Please Select Payment Mode");
    		if($("#amount").val().length <= 0) {
    			$('#amount').prop('required', true);
				$(".payment-mode-error").text("*Please Enter The Partial Fee Amount");
    		}
    		else {
    			$(".payment-mode-error").text("");
    		}
    		$("body, html").animate({ 
              scrollTop: $(".payment-option-error").offset().top -10
            }, 600);
    		isFormValid = false;
    	}
    	else if($('#partialPayment:checked').length > 0 && $('#offlinePayment:checked').length > 0) {
			$('#amount').prop('required', true);
			$(".payment-mode-error").text("*Please Enter The Partial Fee");
			$("body, html").animate({ 
              scrollTop: $(".payment-mode-error").offset().top -10
            }, 600);
			if($("#amount").val().length == '') {
				isFormValid = false;
			}
			if($("#amount").val().length != '' && $('#amount').val() <= "20000") {
				$(".payment-mode-error").text("Amount Must greater 20000 INR");
				$("body, html").animate({ 
	              scrollTop: $(".payment-mode-error").offset().top -10
	            }, 600);
				isFormValid = false;
			}
		}
		if(($('input[name="fee-payment"]:checked').length >= 0  || $('input[name="payment-mode"]:checked').length >= 0) && $('#onlinePayment:checked').length > 0 && isFormValid == true) {
			$(".partially-filled-form, .terms-wrapper").hide();
			window.location.href = 'http://www.google.com';
			return false;
		}
		else if(($('input[name="fee-payment"]:checked').length >= 0  || $('input[name="payment-mode"]:checked').length >= 0) && $('#offlinePayment:checked').length > 0 && isFormValid == true) {
			$(".partially-filled-form, .terms-wrapper").hide();
			window.location.href = 'https://www.valtech.co.in/';
			return false;
		}
		return isFormValid;
    }) 
});