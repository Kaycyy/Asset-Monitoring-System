
"use strict";

// Required field alert
$("form[name='frmlogin']").validate({
    rules: {
        uname: "required",
        pass: {required: true}
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent());
        if (element.attr("name") === "uname") {
            error.insertAfter(".clsuname");
        } else if (element.attr("name") === "pass") {
            error.insertAfter(".clspass");
        } else {
            error.appendTo(element.parent());
        }
    },
    messages: {

    },


//  Validating login
    submitHandler: function (form) {
        var username = $("#username").val();
        var password = $("#password").val();
        var obj = {
            'username': username,
            'password': password
        };

        $.ajax({
            type: "POST",
            url: url + "login",
            data: JSON.stringify(obj),
            contentType: "application/json;",
            crossDomain: false,
            cache: false,
            dataType: 'json',
            async: false,
            success: function (data) {

                if(data.status=="Success"){
                    window.localStorage.setItem("id", data.result.id);
                    window.localStorage.setItem("name", data.result.username);
                    window.localStorage.setItem("password", data.result.password);
                    window.localStorage.setItem("role", data.result.role);
                    window.localStorage.setItem("managerId", data.result.managerId);
                    window.localStorage.setItem("fullName", data.result.fullName)

                    window.location.href = "mainPage.html";
                }
                else {
                    alert(data.errorMsg);

                }
            }
        });
    }
});




