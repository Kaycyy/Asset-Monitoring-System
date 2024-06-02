
$(document).ready(function () {
    showCategories();

})

function showCategories() {
//  Fetching data from localStorage
    var id = window.localStorage.getItem("id");
    var username = window.localStorage.getItem("name");
    var password = window.localStorage.getItem("password");
    var role = window.localStorage.getItem("role");
    var managerId = window.localStorage.getItem("managerId");
    var fullName = window.localStorage.getItem("fullName");




    $.ajax({
        type: "GET",
        url: url + "showCategories?role=" + role,
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data) {

//          Generating Categories Table
            var tbl = '';

            tbl += '<table class="table table-striped table-info" id="categoriesData">';

            tbl += '<thead class="align-top">';
            tbl += '<tr>';
            tbl += '<th scope="col">Name</th>';
            tbl += '<th scope="col">Description</th>';
            tbl += '<th scope="col">Action</th>';
            tbl += '</tr>';
            tbl += '</thead>';

            tbl += '<tbody  class="table-group-divider align-middle">';


            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++)
                {
                    if (data.result[i].name === "Unmapped") {
                        continue;
                    }
                    tbl += '<tr>';
                    tbl += '<td>' + data.result[i].name + '</td>';
                    tbl += '<td>' + data.result[i].description + '</td>';
                    tbl += '<td><button id="editCategoryBtn" class="btn d-inline" data-bs-toggle="modal" data-bs-target="#editCategoryModal" onclick="categoryAction(this,' + data.result[i].id + ');">';
                    tbl += '<i class="fa-solid fa-pen-to-square"></i></button>';
                    tbl += '<button id="removeCategoryBtn" class="btn d-inline" onclick="removeCategory(this,' + data.result[i].id + ');">';//data-bs-toggle="modal" data-bs-target="#deleteCategoryModal"
                    tbl += '<i class="fa-solid fa-trash"></i>';
                    tbl += '</button>';
                    tbl += '</td>';
                    tbl += '</tr>';
//                    onclick="removeCategory(this,' + data.result[i].id + ');

                }
            } else {
                tbl += '<tr>';
                tbl += '<td colspan="3" class="text-center">No Data Found.</td>';
                tbl += '</tr>';
            }

            tbl += '</tbody>';
            tbl += '</table>';
            $("#categoryTable").html(tbl);

            let t = new DataTable("#categoriesData");



        }
    });
}


function addCategory() {
    var categoryName = $('#categoryNameField').val();
    var categoryDesc = $('#categoryDescField').val();
    console.log(categoryName)
    var obj = {
        'name': categoryName,
        'description': categoryDesc
    }

    $.ajax({
        type: "POST",
        url: url + "addCategory",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (response) {

            if (response == true) {
                alert("Category: " + categoryName + " created successfully!");
                location.reload();
            } else {
                alert("Error creating New Category!");
            }
        },
    });
}

// Fn for selecting the entire row to be deleted
function categoryAction(obj, id) {
    $('#txtCategoryId').val(id);
    $("#txtCategoryName").val($(obj).closest('tr')[0].cells[0].innerText);
    $('#txtCategoryDesc').val($(obj).closest('tr')[0].cells[1].innerText);

}


function editCategory() {

    var id = $('#txtCategoryId').val();
    var name = $('#txtCategoryName').val();
    var desc = $('#txtCategoryDesc').val();

    var obj = {
        'name': name,
        'description': desc,
        'id': id
    }



    $.ajax({
        type: "POST",
        url: url + "editCategory",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (response) {

            if (response == true) {
                alert("Category: " + name + ", updated successfully!");
                location.reload();

            } else {
                alert("Error editing Category: " + name);
            }
        },
    });

}




function removeCategory(obj, id) {
    var catId = id;
    var name = $(obj).closest('tr')[0].cells[0].innerText;
    var desc = $(obj).closest('tr')[0].cells[1].innerText;


    $.ajax({
        type: "GET",
        url: url + "assetUnderCategories?id=" + catId,
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data) {
            var list = "";
            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++)
                {
                    list += '<li>' + data.result[i].name + '</li>';
                }
                $("#noAssetDiv").hide();
                $("#assetList").html(list);
                $("#assetList").show();
                $("#a_Delcatmdl").click();
                categoryDropdown(catId);

                $('#saveChangesRemoveCategory').click(function () {
                    updateAssetCategory(catId, name, desc)
                });

            } else {
                const response = confirm("No Assets are mapped under this Category. \nAre you sure you want to delete Category: " + name);
                if (response == true) {
                    var data = {
                        'name': name,
                        'description': desc,
                        'id': catId
                    }

                    $.ajax({
                        type: "POST",
                        url: url + "removeCategory",
                        data: JSON.stringify(data),
                        contentType: "application/json;",
                        crossDomain: false,
                        cache: false,
                        dataType: 'json',
                        async: false,
                        success: function (response) {

                            if (response == true) {
                                alert("Category: " + name + ", deleted successfully!");
                                location.reload();
                            } else {
                                alert("Error deleting Category: " + name);
                            }
                        },
                    });


                }

            }
        }
    });

}

function categoryDropdown(catId) {
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
                opt += '<option selected value="00">Choose...</option>';
                opt += '<option value="0">Set Null</option>';
                for (var i = 0; i < data.result.length; i++)
                {
                    if (data.result[i].id == catId || data.result[i].id == 0) {
                        continue;
                    }
                    opt += '<option value="' + data.result[i].id + '">' + data.result[i].name + '</option>';
                }
                $('#selectCategory').html(opt);
            }


        }
    });

}

function updateAssetCategory(oldCatId, name, desc) {
    debugger;
    var newCatId = $('#selectCategory :selected').val();
    var newCatName = $('#selectCategory :selected').text();

    if (newCatId === '00') {
        newCatId = 0;
        newCatName = "Unmapped"
    }


    $.ajax({
        type: "POST",
        url: url + "updateAssetCategory?oldCatId=" + oldCatId + "&newCatId=" + newCatId,
//        data: JSON.stringify(obj),
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (response) {
            debugger;
            if (response == true) {
                alert("Assets mapped to Category: " + newCatName);
                location.reload();

            } else {
                alert("Error mapping Assets to Category: " + newCatName);
            }
        },
    });

    var data = {
        'name': name,
        'description': desc,
        'id': oldCatId
    }

    $.ajax({
        type: "POST",
        url: url + "removeCategory",
        data: JSON.stringify(data),
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (response) {

            if (response == true) {
                alert("Category: " + name + ", deleted successfully!");
                location.reload();
            } else {
                alert("Error deleting Category: " + name);
            }
        },
    });

}