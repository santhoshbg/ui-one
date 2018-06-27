$(document).ready(function() {
    $(document).on("keypress", "#mobile, #enterOtp", function(e) {
        $("#mobile").attr('maxlength', '10');
        $("#enterOtp").attr('maxlength', '6');
        var regex = new RegExp("^[0-9.]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(str)) {
            e.preventDefault();
            return false;
        }
    });

    var validationInputs = $("#fname, #lname, #email, #mobile");

    //Label Star Mark
    var validationLabels = $(".fname label, .lname label, .email label, .mobile label");
    $(validationLabels).addClass("required");

    $(validationInputs).on('keypress', function() {
        $(".login-component-wrapper").addClass('changebg');
        $(".partially-filled-form").removeClass('changebg');
        $(".partially-filled-form #formNumber").val('');
    });

    /*Step -1 Click functionality*/
    $("#login-form-submit").on('click', function(e) {
        $(".login-component-wrapper").addClass('changebg');
        var validateEmail = function(elementValue) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(elementValue);
        }
        $(".login-component-wrapper input").prop('required', true);
        var value = $('#email').val();
        var valid = validateEmail(value);

        var isFormValid = true;
        if ($("#fname").val().length == 0 || $("#lname").val().length == 0 || $("#email").val().length == 0) {
            $(".form-error-message").text("*Please fill all the Mandatory Fields");
            isFormValid = false;
        } else if ((!valid) && $("#mobile").val().length != 0) {
            $(".form-error-message").text("*Please fill Valid Email ID");
            $(".invalid-error-message").text("*Please Provide Valid Mobile Number");
            isFormValid = false;
        } else if ((!valid) || $.trim($("#email").val()).length == 0 && $("#mobile").val().length == 0) {
            $(".form-error-message").text("*Please fill Valid Email ID");
            $(".invalid-error-message").text("*Please fill all the Mandatory Fields");
            isFormValid = false;
        } else if ($("#mobile").val().length == 0) {
            $(".invalid-error-message").text("");
            $(".form-error-message").text("*Please fill all the Mandatory Fields");
            isFormValid = false;
        } else if ($("#mobile").val().length != "10" || $("input").val().length != "") {
            $(".form-error-message").text("*Please Provide Valid Mobile Number");
            isFormValid = false;
        } else if ($("#mobile").val().length == "10") {
            $("#enterOtp, #sendOtp").css("visibility", "visible");
            $(".form-error-message").text("*Please Provide Valid OTP");
            $('#hideMsg').show();
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
            var sec = 4;
            var timer = setInterval(function() {
                $('#hideMsg span').text(sec--);
                if (sec == -1) {
                    $('#hideMsg').fadeOut('fast');
                    $("#sendOtp").prop("disabled", null);
                    clearInterval(timer);
                }
            }, 1000);
            $("#login-form-submit").val("Verify OTP & Proceed");
            if ($("#enterOtp").val().length == "6") {
                isFormValid = true;
                $("#myLinks li:first-child").addClass("changebg");
                $(".form-two-column-wrapper").hide();
                $(".basic-details-section").show();
                return false;
            } else {
                isFormValid = false;
            }
        } else {
            isFormValid = true;
            $(".form-two-column-wrapper .login-component-wrapper").removeClass("changebg");
        }
        return isFormValid;
    });

    //Partially Filled Form
    var partailFormLabel = $(".formNumber label");
    $(partailFormLabel).addClass("required");

    $("#formNumber").on('keypress', function() {
        $(".partially-filled-form").addClass('changebg');
        $(".form-two-column-wrapper .login-component-wrapper, #fname, #lname, #email, #mobile").val("");
        $(".form-two-column-wrapper .login-component-wrapper, #fname, #lname, #email, #mobile").prop("required", false);
        $(".form-error-message, .invalid-error-message").text("");
        $(".form-two-column-wrapper .login-component-wrapper").removeClass("changebg");
    });
    $("#partiallyFilledForm").on('click', function() {
        var isFormValid = true;
        if ($("#formNumber").val().length == 0) {
            $(".partially-filled-form-error-message").text("*Please Fill Form ID");
            isFormValid = false;
        } else {
            isFormValid = true;
            $(".form-two-column-wrapper").hide();
            $(".basic-details-section").show();
            return false;
        }
        return isFormValid;
    });
    //Label Star Mark
    var mandateLabels = $(".program-wrapper label, .sslcBoard label, .sslcPassingYear label, .sslcMarks label, .sslcPercentage label, .pucBoard label, .pucSchool label, .pucStatus label, .pucPassingYear label, .pucCity label, .pucPincode label, .pucPercentage label, .dob label, .aadharNo label, .address-heading, .fatherName label, .motherName label");
    $(mandateLabels).addClass("required");

    //Prepopulate Values 
    $("#programSelection").children('option:gt(0)').hide();
    $("#levelSelection").change(function() {
        $("#programSelection").children('option').hide();
        $("#programSelection").children("option[id^=" + $(this).val() + "]").show();
    });

    //General Valdation For Basic Details Step before submit
    var passingYear = $("#sslcPassingYear, #pucPassing-year, #ugPassing-year").attr('maxlength', '4');
    var sslcPercentage = $("#sslcPercentage,#pucPercentage, #ugPercentage").attr('maxlength', '5');
    var aadharNo = $("#aadharNo").attr('maxlength', 12);
    var mobileNo = $("#fatherMobile, #motherMobile").attr('maxlength', 10)
    $(document).on("keypress", "#sslcPassingYear, #sslcPercentage, #pucPassingYear, #pucPincode, #pucPercentage, #ugPassingYear, #ugPincode, #ugPercentage, #aadharNo,#fatherMobile, #motherMobile", function(e) {
        var regex = new RegExp("^[0-9.]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(str)) {
            e.preventDefault();
            return false;
        }
    });

    $(document).on("keypress", "#pucCity", function(e) {
        var regex = new RegExp(/^[a-zA-Z]*$/);
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(str)) {
            e.preventDefault();
            return false;
        }
    });

    //PUC Status Change Enable Aggregation Status
    $("#pucStatus").change(function() {
        if ($(this).val() == "passed") {
            $("#pucResultsYes").prop("checked", true);
        } else if ($(this).val() == "appearing") {
            $("#pucResultsNo").prop("checked", true);
        }
    });

    //Copy Address 
    $('#copyAddress').click(function() {
        if ($(this).is(':checked')) {
            $('#permanentAddress').attr("readonly", true);
            $('#permanentAddress').val($('#correspondenceAddress').val());
        } else {
            $('#permanentAddress').attr("readonly", false);
            $('#permanentAddress').val('');
        }
    });

    //Suffer Change Status
    $('#basic-details-form input[name=suffer]').on('change', function() {
        if ($('input[name=suffer]:checked', '#basic-details-form').val() == "sufferYes") {
            $("#suffering").show();
        } else {
            $("#suffering").val('');
            $("#suffering").hide();
        }
    });

    //DatePicker
    $("#dob").datepicker({
        dateFormat: 'dd-mm-yy',
        changeYear: true,
        yearRange: '1900:2018',
        maxDate: 0
    });
    $("#dob").each(function() {
        $(this).datepicker('setDate', $(this).val());
    });

    //Step To Proceed To Upload Section
    $("#save").click(function() {
        var isFormValid = true;
        var validationInputs = $("#levelSelection, #sslcBoard, #sslcPassingYear, #sslcMarks, #sslcPercentage, #pucBoard, #pucSchool, #pucStatus, #pucPassingYear, #pucPercentage, #pucCity, #pucPincode, #dob, #aadharNo, #correspondenceAddress, #permanentAddress, #fatherName, #motherName");

        $("#programSelection,#levelSelection ").prop("required", true);
        var ugInputs = $("#ugCollege, #ugUniversity, #ugCourse, #ugSpecialization, #ugPassingYear, #ugCity, #ugPincode, #ugPercentage");
        $(ugInputs).each(function() {
            var ugElement = $(this);
            if ($("#levelSelection").val() == "pg" && ugElement.val() == "") {
                var $label = $(".graduation-wrapper .select-option label:not(.select-option label)").addClass("required");
                $(ugElement).prop('required', true);
            } else {
                $(ugElement).prop('required', false);
            }
        });
        $(validationInputs).each(function() {
            var element = $(this);
            if (element.val() == "") {
                $(element).prop('required', true);
                /*$("body, html").animate({ 
                  scrollTop: $(".basic-details-section").offset().top -10
                }, 600);*/
                $(".basic-details-form-error-message").text("Please Fill Mandatory Fields");
                isFormValid = false;
            } else {
                $(element).prop('required', false);
                isFormValid = true;
            }
        });
        //PUC On Change Select Results Declared Status
        if ($("#pucStatus").val() == "passed" && $("#pucRollNo").val() == "") {
            $(".pucRollNo label").addClass('required');
            $("#pucRollNo").prop('required', true);
            isFormValid = false;
        } else if ($("#pucStatus").val() == "passed" && $("#pucRollNo").val() !== "") {
            $("#pucRollNo").prop('required', false);
        } else if ($("#pucStatus").val() == "appearing") {
            $("#pucRollNo").prop('required', false);
            $("#pucResultsNo").prop("checked", true);
            $(".pucRollNo label").removeClass('required');
            isFormValid = true;
        }

        //Suffer Required Add on change
        if ($('input[name=suffer]:checked', '#basic-details-form').val() == "suffer-yes" && $("#suffering").val() == '') {
            $("#suffering").prop('required', true);
        } else {
            $("#suffering").prop('required', false);
        }

        //Family Details One Mobile Number Mandate
        if ($("#fatherMobile").val() == '' && $("#motherMobile").val() == '') {
            $(".basic-details-mobile-error-message").text("One Mobile Number Mandatory");
            isFormValid = false;
        }
        $("#myLinks li:nth-child(2)").addClass("changebg");
        $(".form-two-column-wrapper, .basic-details-section").hide();
        $(".upload-section").show();
        return false;
        return isFormValid;
    });
    $("#sendOtp").click(function() {
        if ($("#mobile").val().length == "10") {
            $("#enterOtp").css("visibility", "visible");
        }
        if ($("#enterOtp").val().length != "6") {
            $(".form-error-message").text("*Please Provide Correct OTP");
            isFormValid = false;
        }
    });

    var uploadSectionLabel = $(".upload-section-wrapper h4:not(.upload-ug-marksheet-content h4)");
    $(uploadSectionLabel).addClass("required");
    $(".upload-option span").click(function() {
        $("#uploadPhoto").val('');
        $("#photo-name").text('');
        $(".upload-option, .upload-photo-content").removeClass('changebg');
    })
    $(".upload-sslc-option span").click(function() {
        $("#uploadSslcMarksheet").val('');
        $("#sslc-marksheet-name").text('');
        $(".upload-sslc-option, .upload-sslc-marksheet-content").removeClass('changebg');
    })
    $(".upload-section input:file").bind('change', function() {
        var isFormValid = true;
        var attach_id = "uploadPhoto";
        var fileLength = $('#' + attach_id)[0].files.length;
        var fileSize = fileLength;

        if ($("#uploadPhoto").val() == '') {
            $("#uploadPhoto, .upload-photo-content").removeClass('changebg');
        }
        if ($("#uploadPhoto").val() != '') {
            $(".upload-option, .upload-photo-content").addClass('changebg');
            $("span.photo").show();
            var _URL = window.URL || window.webkitURL;
            var file, img;
            if ($("#photo-name").text() == '') {
                var _URL = window.URL || window.webkitURL;
                var file, img;
                if ($("#file-name").text() == '') {
                    if ((file = this.files[0])) {
                        img = new Image();
                        img.onload = function() {
                            if (this.width != 99 && this.height != 128) {
                                $(".upload-error-message").text("*Upload Exact Photo size");
                                $("#photo-name").text('');
                                $(".upload-option, .upload-photo-content").removeClass('changebg');
                                $("#file-name").text('');
                            } else {
                                $(".upload-error-message").text("");
                            }
                        }
                        img.src = _URL.createObjectURL(file);
                    }
                    var filename = $("#uploadPhoto").val().replace(/C:\\fakepath\\/i, '')
                    $("#photo-name").text(filename);
                }
            }
            $("#file-name").text(this.files[0].name);
            if (!(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test($("#uploadPhoto").val())) {
                $(".upload-error-message").text("*Upload only Image Format Files");
                this.value = null;
                if ($("#uploadPhoto").val() == '') {
                    $(".upload-option, .upload-photo-content").removeClass('changebg');
                }
            }
            if (fileSize > 10000000) {
                $(".upload-error-message").text("*Allowed file size exceeded. (Max. 1 MB)");
                this.value = null;
            }
            isFormValid = false;
        }
        var attach_id = "uploadSslcMarksheet";
        var fileSize = $('#' + attach_id)[0].files.length;

        if ($("#uploadSslcMarksheet").val() != '') {
            $("span.sslc").show();
            $(".upload-sslc-option, .upload-sslc-marksheet-content").addClass('changebg');
            var filename = $("#uploadSslcMarksheet").val().replace(/C:\\fakepath\\/i, '')
            $("#sslc-marksheet-name").text(filename);
            $("#uploadSslcMarksheet, .upload-sslc-marksheet-content").addClass('changebg');
            if (!(/\.(gif|jpg|jpeg|tiff|png|bmp|pdf)$/i).test($("#uploadSslcMarksheet").val())) {
                $(".upload-error-message").text("*Upload only Image Format Files");
                this.value = null;
            }
            if (fileSize > 20000000) {
                $(".upload-error-message").text("*Allowed file size exceeded. (Max. 2 MB)");
                this.value = null;
            }
            isFormValid = false;
        }

        var attach_id = "uploadHscMarksheet";
        var fileLength = $('#' + attach_id)[0].files.length;
        var fileSize = fileLength;
        if ($("#uploadHscMarksheet").val() != '' || fileSize > 20000000) {
            $("span.hsc").show();
            $(".upload-hsc-option, .upload-hsc-marksheet-content").addClass('changebg');
            if ($("#hsc-marksheet-name").text() == '') {
                $("#hsc-marksheet-name").text(this.files[0].name);
            }
            var filename = $("#uploadHscMarksheet").val().replace(/C:\\fakepath\\/i, '')
            $("#hsc-marksheet-name").text(filename);
            $("#uploadHscMarksheet, .upload-hsc-marksheet-content").addClass('changebg');
            if (!(/\.(gif|jpg|jpeg|tiff|png|bmp|pdf)$/i).test($("#uploadHscMarksheet").val())) {
                $(".upload-error-message").text("*Upload only Image Format Files");
                this.value = null;
            }
            if (fileSize > 20000000) {
                $(".upload-error-message").text("*Allowed file size exceeded. (Max. 2 MB)");
                this.value = null;
            }
            isFormValid = false;
        } else {
            isFormValid = true;
        }
        return isFormValid;

    });
    //Upload Document Validation
    $("#uploadSubmit").click(function() {
        $(".essay-question").addClass("required");
        var isFormValid = true;
        $('.essay-question-first textarea, .essay-question-second textarea').prop('minLength', 100);
        $('.essay-question-first textarea, .essay-question-second textarea').prop('maxLength', 2000);
        if ($("#uploadPhoto").val().length === 0 || $("#uploadSslcMarksheet").val().length === 0 || $("#uploadHscMarksheet").val().length === 0 || $(".essay-question-first textarea").val().length === 0 || $(".essay-question-second textarea").val().length === 0) {
            $("body, html").animate({
                scrollTop: $(".upload-section-wrapper").offset().top - 10
            }, 600);
            $(".upload-error-message").text("*Please Upload Mandatory Documents & Please Fill Mandatory Field");
            isFormValid = false;
        } else if ($("#videoUrl").val() == '' && $("#videoWhatsApp").prop('checked') == false) {
            $(".one-field-mandate").text("*Please Provide atleaset one input");
            isFormValid = false;
        } else if ($("#videoUrl").val() != '') {
            var url = $('#videoUrl').val();
            url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (!url_validate.test(url)) {
                $(".one-field-mandate").text("*Please Provide URL");
                isFormValid = false;
            }
        } else if (($(".essay-question-first textarea").val().length != 0 && $(".essay-question-first textarea").val().length < 100) || $(".essay-question-second textarea").val().length != 0 && $(".essay-question-second textarea").val().length < 100) {
            $(".upload-error-message").text("*Please Provide atleaset 100 words");
            isFormValid = false;
        } else {
            isFormValid = true;
            $("#myLinks li:last-child").addClass("changebg");
            $(".basic-details-section, .form-two-column-wrapper, .upload-section").hide();
            $(".thanks-wrapper").show();
            return false;
        }
        return isFormValid;
    });
});