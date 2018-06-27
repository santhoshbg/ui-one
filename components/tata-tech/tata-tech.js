$(function() {
    $("#tataTechEnquireForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            phoneNumber: {
                required: true,
                number: true                
            },
            inputEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please, enter a name"
            },
            phoneNumber: {
                required: "Please, enter Your Phone number",
                email: "Email is invalid"
            },
            inputEmail: {
                required: "Please, enter valid email"
            }
        },
        submitHandler: function (tataTechEnquireForm) { // for demo
            alert('valid form submitted'); // for demo
            return false; // for demo
        }
    });

    // $(".tata-tech-form-submit").click(function(e) {
    //     // $('#errormsg').show();
    //     // $('#emailerrormsg').show();
    // });
    $('#phoneNumber').keypress(function(e) {
        var regex = new RegExp("^[0-9-]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
    });

});