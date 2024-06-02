"use strict"

$("form[name='addAssetForm']").validate({
    rules: {
        txt_AddAssetName: {'required': true},
        select_AddAssetCategory: {'required': true},
        txt_AddAssetSrno: {
            'required': true,
            'unique': true,},
        acqDate: {'required': true}
    },

    errorPlacement: function (error, element) {
        error.appendTo(element.parent());
        if (element.attr("name") === "txtAddAssetName") {
            error.insertAfter(".a_name");
        } else if (element.attr("name") === "selectAddAssetCategory") {
            error.insertAfter(".a_category");
        } else if (element.attr("name") === "txtAddAssetSrno") {
            error.insertAfter(".a_srNo");
        } else if (element.attr("name") === "acqDate") {
            error.insertAfter(".a_date");
        } else {
            error.appendTo(element.parent());
        }
    },
    messages: {
        txt_AddAssetName: {
            'required': 'Please enter an asset name!'
        },
        select_AddAssetCategory: {
            'required': 'Please choose a Category!'
        },
        txt_AddAssetSrno: {
            'required': 'Please enter a Serial Number!',
            'unique': 'This Serial Number already exists, please enter another one.'
        },
        acqDate: {
            'required': 'Please choose a Date!'
        }
    },

    submitHandler: function (form) {
        var name = $('#txtAddAssetName').val();
        var desc = $('#txtAddAssetDesc').val();
        var srno = $('#txtAddAssetSrno').val();
        var quantity = $('#txtAddAssetQuantity').val();

//        Converting date into yyyy-mm-dd
        var acquisitionDate = $('#txtAddAssetAcqDate').val().split("-");
        var acquisitionDateFinal = acquisitionDate[2] + "-" + getMonthNum(acquisitionDate[1]) + "-" + acquisitionDate[0];
        var cost = $('#txtAddAssetCost').val();

        var category = "";
        if ($('#selectAddAssetCategory :selected').val() != "") {
            category = $('#selectAddAssetCategory :selected').val();
        } else {
            category = 0;
        }
        ;
        var role = window.localStorage.getItem('role');

        var owner = "";
        if (role >= 2) {
            if ($('#selectAddAssetOwner :selected').val() != "") {
                owner = $('#selectAddAssetOwner :selected').val();
            } else {
                owner = "Unassigned";
            }

        } else {
            owner = window.localStorage.getItem("fullName");
        }
        console.log(owner);

        var location = $('#txtAddAssetLoc').val();
        var status = "";
        if ($('#txtAddAssetStatus :selected').val() != "") {
            status = $('#txtAddAssetStatus :selected').val();
        } else {
            status = "NA";
        }

        var obj = {
            'name': name,
            'description': desc,
            'category': category,
            'srno': srno,
            'quantity': quantity,
            'acquisitionDate': acquisitionDateFinal,
            'cost': cost,
            'owner': owner,
            'location': location,
            'status': status
        };

        console.log(obj)

        $.ajax({
            type: "POST",
            url: url + "addAsset",
            data: JSON.stringify(obj),
            contentType: "application/json;",
            crossDomain: false,
            cache: false,
            dataType: 'json',
            async: false,
            success: function (response) {
                console.log(response)
                if (response == true) {
                    alert("Asset created successfully!");
                    window.location.href = "mainPage.html"
                } else {
                    alert("Error creating New Asset!");
                }
            }
        });

    }

});



$.validator.addMethod('unique', function (value, element) {
  var result = false; // Default value

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
          if (data.result[i].srno === value) {
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