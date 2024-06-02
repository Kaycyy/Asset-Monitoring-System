"use strict"

$("form[name='editAssetForm']").validate({
    rules: {
        txt_EditAssetName: {'required': true},
        select_EditAssetCategory: {'required': true},
        txt_EditAssetSrno: {
            'required': true,
            'unique': true, },
        acqDate: {'required': true}
    },

    errorPlacement: function (error, element) {
        error.appendTo(element.parent());
        if (element.attr("name") === "txtAddAssetName") {
            error.insertAfter(".e_name");
        } else if (element.attr("name") === "selectAddAssetCategory") {
            error.insertAfter(".e_category");
        } else if (element.attr("name") === "txtAddAssetSrno") {
            error.insertAfter(".e_srNo");
        } else if (element.attr("name") === "acqDate") {
            error.insertAfter(".e_date");
        } else {
            error.appendTo(element.parent());
        }
    },
    messages: {
        txt_EditAssetName: {
            'required': 'Please enter an asset name!'
        },
        select_EditAssetCategory: {
            'required': 'Please choose a Category!'
        },
        txt_EditAssetSrno: {
            'required': 'Please enter a Serial Number!',
            'unique': 'This Serial Number already exists, please enter another one.'
        },
        acqDate: {
            'required': 'Please choose a Date!'
        }
    },

    submitHandler: function (form) {
        var uid = localStorage.getItem("uid");
        var name = $('#txtEditAssetName').val();
        var desc = $('#txtEditAssetDesc').val();
        var category = $('#selectEditAssetCategory :selected').val();
        var srno = $('#txtEditAssetSrno').val();
        var quantity = $('#txtEditAssetQuantity').val();
        var cost = $('#txtEditAssetCost').val();

//  Converting date into yyyy-mm-dd
        var acquisitionDate = $('#txtEditAssetAcqDate').val().split("-");
        //var splitDate = acquisitionDate.split("-");
        //var month = getMonthNum(splitDate[1]);
        var acquisitionDateFinal = acquisitionDate[2] + "-" + getMonthNum(acquisitionDate[1]) + "-" + acquisitionDate[0];

        var role = window.localStorage.getItem('role')
        if (role >= 2) {
            var owner = $('#selectEditAssetOwner').val()
        } else {
            owner = window.localStorage.getItem("fullName")
        }

        var loc = $('#selectEditAssetLoc').val();

        var status = $('#selectEditAssetStatus').val();
        if ($('#selectEditAssetStatus :selected').val() != "") {
            status = $('#selectEditAssetStatus :selected').val();
        } else {
            status = "NA"
        }

        var obj = {
            'uid': uid,
            'name': name,
            'description': desc,
            'category': category,
            'srno': srno,
            'quantity': quantity,
            'acquisitionDate': acquisitionDateFinal,
            'cost': cost,
            'owner': owner,
            'location': loc,
            'status': status
        };

        $.ajax({
            type: "POST",
            url: url + "editAsset",
            data: JSON.stringify(obj),
            contentType: "application/json;",
            crossDomain: false,
            cache: false,
            dataType: 'json',
            async: false,
            success: function (response) {

                if (response == true) {
                    alert("Asset Name: " + name + ", Edited successfully!");
                    window.location.href = "mainPage.html"
                    window.localStorage.removeItem('uid');
                    window.localStorage.removeItem('assetName');
                    window.localStorage.removeItem('desc');
                    window.localStorage.removeItem('category');
                    window.localStorage.removeItem('srno');
                    window.localStorage.removeItem('quantity');
                    window.localStorage.removeItem('acqDate');
                    window.localStorage.removeItem('cost');
                    window.localStorage.removeItem('location');
                    window.localStorage.removeItem('status');
                    window.localStorage.removeItem('owner');

                } else {
                    alert("Error editing Asset: " + name);
                }
            },
        });

    }

});



$.validator.addMethod('unique', function (value, element) {
    var result = false; // Default value
    var srno = localStorage.getItem("srno");
    // Make the AJAX request synchronous by setting 'async' to false
    $.ajax({
        url: url + 'uniqueSrNo',
        data: {
            serialNumber: value
        },
        type: 'GET',
        async: false, // Make the request synchronous
        success: function (data) {
            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++) {
                    if (data.result[i].srno === srno) {
                        continue;
                    } else if (data.result[i].srno === value) {
                        result = false; // Serial number already exists
                        break;
                    } else {
                        result = true; // Serial number is unique
                    }
                }
            } else {
                result = true; // Serial number is unique
            }
        },
        error: function () {
            result = false; // Error occurred, consider serial number as not unique
        }
    });

    return result;
}, 'This Serial Number already exists, please enter another one.');