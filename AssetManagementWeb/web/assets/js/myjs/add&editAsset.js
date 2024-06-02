

$(document).ready(function () {

    categoryDropdown();
//  Add and Edit Forms:
    if (window.localStorage.getItem("eventperform") == "Add")
    {
        $("#addFormContainer").show();
        $("#editFormContainer").hide();

        $('#txtAddAssetQuantity').val(1);

        var role = localStorage.getItem('role');
        if (role >= 2) {
            $('#divAddOwner').show();
            ownerDropdown();
        } else {
            $('#divAddOwner').hide();
        }

    } else {
        var role = localStorage.getItem('role');

        var name = localStorage.getItem("assetName");
        var desc = localStorage.getItem("desc");
        var cat = localStorage.getItem("category");

        var srno = localStorage.getItem("srno");
        var quantity = localStorage.getItem("quantity");
        var acquisitionDate = localStorage.getItem("acqDate");
        var cost = localStorage.getItem("cost");
        var location = localStorage.getItem("location");
        var status = localStorage.getItem("status");
        var owner = localStorage.getItem("owner");


        $('#txtEditAssetName').val(name);
        $('#txtEditAssetDesc').val(desc);

        $('#txtEditAssetSrno').val(srno);
        $('#txtEditAssetQuantity').val(quantity);

        var category = $('#selectEditAssetCategory');
        for (var i = 0; i < category.children().length; i++) {
            if (category.children()[i].innerText == cat) {
                document.getElementById('selectEditAssetCategory').selectedIndex = i;
            }
        }

//      Converting date into dd-M-yyyy   2023-01-23
        var date = acquisitionDate.split("-");
        var acqDateFinal = date[2] + "-" + getMonthString(date[1]) + "-" + date[0];
        $('#txtEditAssetAcqDate').val(acqDateFinal);

        $('#txtEditAssetCost').val(cost);

        if (location == "null" || location == "Null") {
            $('#txtEditAssetLoc').val("");
        } else {
            $('#txtEditAssetLoc').val(location);
        }




//      Setting the status dropdown
        var ddStatus = $('#selectEditAssetStatus');
        for (var i = 0; i < ddStatus.children().length; i++) {
            if (ddStatus.children()[i].innerText == status) {
                document.getElementById('selectEditAssetStatus').selectedIndex = i;
            }
        }

        $("#addFormContainer").hide();
        $("#editFormContainer").show();

//      Setting the owner dropdown to the required user
        if (role >= 2) {
            $('#divEditOwner').show();
            var ddOwner = $('#selectEditAssetOwner');
            ownerDropdown();
            for (var i = 0; i < ddOwner.children().length; i++) {
                if (ddOwner.children()[i].innerText == owner) {
                    document.getElementById('selectEditAssetOwner').selectedIndex = i;
                }
            }
        } else {

            var user = window.localStorage.getItem('fullName')
            $('#divEditOwner').children()[1].remove();
            $('<input/>').attr({type: 'text', id: 'selectEditAssetOwner', class: 'form-control', disabled: 'true'}).appendTo('#divEditOwner');
            $('#selectEditAssetOwner').val(user)


        }
    }

// Get the input field element
    var inputField = $("input[name='acqDate']");
    console.log(inputField)
    var displayElement = document.getElementById("txtAddAssetAcqDate");

//     Initialize the datepicker with the desired format
    flatpickr(inputField, {
        enableTime: false,
        dateFormat: "d-M-Y",
        maxDate: new Date().fp_incr(5) // 14 days from now
        // Add any other configuration options you need
    });
//    $(inputField).datepicker({
//        todayBtn: "linked",
//        language: "it",
//        autoclose: true,
//        todayHighlight: true,
//        format: 'dd-M-yyyy'
////        container: inputField.parent() // Set the container to the input field's parent container
//
//    });

//    // Add an event listener to the input field to listen for changes
//    inputField.on("change", function () {
//        // Get the current value of the input field
//        var dateValue = this.value;
//
//        // Convert the date to the desired format
//        var dateObj = new Date(dateValue);
//        var formattedDate = dateObj.getDate() + "-" + dateObj.toLocaleString('default', {month: 'short'}) + "-" + dateObj.getFullYear();
//
////        // Update the value of the input field to the required format
////        var formattedValue = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1).toString().padStart(2, '0') + "-" + dateObj.getDate().toString().padStart(2, '0');
////        this.value = formattedValue;
//
//        // Update the display element with the formatted date
//        displayElement.textContent = formattedDate;
//
//    });


});


function formatDate() {
    var inputDate = document.getElementById("dateInput").value;
    var formattedDate = new Date(inputDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    document.getElementById("formattedDate").textContent = formattedDate;
}

function ownerDropdown() {

    var role = window.localStorage.getItem('role');
    var id = window.localStorage.getItem('id');
    var managerName = window.localStorage.getItem('fullName');

    $.ajax({
        type: "GET",
        url: url + "ownerDropdown?role=" + role + "&id=" + id,
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,

        success: function (data) {

            var opt = '';

            if (data.result.length > 0) {
                opt += '<option value="">Choose...</option>';
                opt += '<option value="Unassigned">Unassigned</option>';
                opt += '<option value="' + managerName + '">' + managerName + '</option>';
                for (var i = 0; i < data.result.length; i++)
                {
                    opt += '<option value="' + data.result[i] + '">' + data.result[i] + '</option>';
                }
            }

            $('#selectAddAssetOwner').html(opt);
            $('#selectEditAssetOwner').html(opt);
        }
    });

}


function categoryDropdown() {

    $.ajax({
        type: "GET",
        url: url + "allCategories?",
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,

        success: function (data) {

            var opt = '';

            if (data.result.length > 0) {
                opt += '<option selected value="">Choose...</option>';
                for (var i = 0; i < data.result.length; i++)
                {
                    opt += '<option value="' + data.result[i].id + '">' + data.result[i].name + '</option>';
                }
            }

            $('#selectAddAssetCategory').html(opt);
            $('#selectEditAssetCategory').html(opt);
        }
    });

}








//function addAsset() {
//
//    var name = $('#txtAddAssetName').val()
//    var desc = $('#txtAddAssetDesc').val()
//    var srno = $('#txtAddAssetSrno').val()
//    var quantity = $('#txtAddAssetQuantity').val()
//
////  Converting date into yyyy-mm-dd
//    var acquisitionDate = $('#txtAddAssetAcqDate').val().split("-");
//    var acquisitionDateFinal = acquisitionDate[2] + "-" + getMonthNum(acquisitionDate[1]) + "-" + acquisitionDate[0];
//
//
//    var cost = $('#txtAddAssetCost').val()
//
//    var category = "";
//    if ($('#selectAddAssetCategory :selected').val() != "") {
//        category = $('#selectAddAssetCategory :selected').val();
//    } else {
//        category = 0;
//    }
//    ;
//
//
//    var role = window.localStorage.getItem('role')
//    if (role >= 2) {
//        var owner = "";
//        if ($('#txtAddAssetStatus :selected').val() != "") {
//            owner = $('#txtAddAssetStatus :selected').val();
//        } else {
//            owner = "Unassigned";
//        }
//
//    } else {
//        owner = window.localStorage.getItem("fullName")
//    }
//
//    var location = $('#txtAddAssetLoc').val();
//
//    var status = "";
//    if ($('#txtAddAssetStatus :selected').val() != "") {
//        status = $('#txtAddAssetStatus :selected').val();
//    } else {
//        status = "NA";
//    }
//
//    var obj = {
//        'name': name,
//        'description': desc,
//        'category': category,
//        'srno': srno,
//        'quantity': quantity,
//        'acquisitionDate': acquisitionDateFinal,
//        'cost': cost,
//        'owner': owner,
//        'location': location,
//        'status': status
//    };
//
//
//    $.ajax({
//        type: "POST",
//        url: url + "addAsset",
//        data: JSON.stringify(obj),
//        contentType: "application/json;",
//        crossDomain: false,
//        cache: false,
//        dataType: 'json',
//        async: false,
////        data: {name: name, description: desc, category: category, srno: srno, quantity: quantity,
////        acquisitionDate: acquisitionDate, cost: cost, owner: owner, location: location, status: status},
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
//        success: function (response) {
//
//            if (response == true) {
//                alert("Asset created successfully!");
//                window.location.href = "mainPage.html"
//            } else {
//                alert("Error creating New Asset!");
//            }
//        },
//    });
//
//}


//function editAsset() {
//    var uid = localStorage.getItem("uid");
//    var name = $('#txtEditAssetName').val();
//    var desc = $('#txtEditAssetDesc').val();
//    var category = $('#selectEditAssetCategory :selected').val();
//    var srno = $('#txtEditAssetSrno').val();
//    var quantity = $('#txtEditAssetQuantity').val();
//    var cost = $('#txtEditAssetCost').val();
//
////  Converting date into yyyy-mm-dd
//    var acquisitionDate = $('#txtEditAssetAcqDate').val().split("-");
//    //var splitDate = acquisitionDate.split("-");
//    //var month = getMonthNum(splitDate[1]);
//    var acquisitionDateFinal = acquisitionDate[2] + "-" + getMonthNum(acquisitionDate[1]) + "-" + acquisitionDate[0];
//
//    var role = window.localStorage.getItem('role')
//    if (role >= 2) {
//        var owner = $('#selectEditAssetOwner').val()
//    } else {
//        owner = window.localStorage.getItem("fullName")
//    }
//
//    var loc = $('#selectEditAssetLoc').val();
//
//    var status = $('#selectEditAssetStatus').val();
//    if ($('#selectEditAssetStatus :selected').val() != "") {
//        status = $('#selectEditAssetStatus :selected').val();
//    } else {
//        status = "NA"
//    }
//
//    var obj = {
//        'uid': uid,
//        'name': name,
//        'description': desc,
//        'category': category,
//        'srno': srno,
//        'quantity': quantity,
//        'acquisitionDate': acquisitionDateFinal,
//        'cost': cost,
//        'owner': owner,
//        'location': loc,
//        'status': status
//    };
//
//    $.ajax({
//        type: "POST",
//        url: url + "editAsset",
//        data: JSON.stringify(obj),
//        contentType: "application/json;",
//        crossDomain: false,
//        cache: false,
//        dataType: 'json',
//        async: false,
//        success: function (response) {
//
//            if (response == true) {
//                alert("Asset Name: " + name + ", Edited successfully!");
//                window.location.href = "mainPage.html"
//                window.localStorage.removeItem('uid');
//                window.localStorage.removeItem('assetName');
//                window.localStorage.removeItem('desc');
//                window.localStorage.removeItem('category');
//                window.localStorage.removeItem('srno');
//                window.localStorage.removeItem('quantity');
//                window.localStorage.removeItem('acqDate');
//                window.localStorage.removeItem('cost');
//                window.localStorage.removeItem('location');
//                window.localStorage.removeItem('status');
//                window.localStorage.removeItem('owner');
//
//            } else {
//                alert("Error editing Asset: " + name);
//            }
//        },
//    });
//
//}

//"use strict";
//
//// Required field alert
//$("form[name='addAssetForm']").validate({
//    rules: {
//        txtAddAssetName: "required",
////        pass: {required: true}
//    },
//    errorPlacement: function (error, element) {
//        error.appendTo(element.parent());
//        if (element.attr("id") === "txtAddAssetName") {
//            error.insertAfter("#txtAddAssetName.form-control");
//        }
////        else if (element.attr("name") === "pass") {
////            error.insertAfter(".clspass");
////        } else {
////            error.appendTo(element.parent());
////        }
//    },
//    messages: {
//
//    },
//});


function closeAsset() {
    window.location.href = "mainPage.html"
}

