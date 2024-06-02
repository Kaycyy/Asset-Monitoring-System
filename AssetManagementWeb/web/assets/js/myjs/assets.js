$(document).ready(function ()
{
    showAssets();

});


function showAssets() {

    var id = window.localStorage.getItem("id");
    var username = window.localStorage.getItem("name")
    var password = window.localStorage.getItem("password")
    var role = window.localStorage.getItem("role")
    var managerId = window.localStorage.getItem("managerId")
    var fullName = window.localStorage.getItem("fullName")


    $.ajax({
        type: "GET",
        url: url + "showAssets?role=" + role + "&username=" + username + "&id=" + id,
        //data: JSON.stringify(obj),
//        headers: {
//            'role': role,
//            'username': username,
//            'id': id
//        },
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,

        success: function (data) {
//          Generating Assets Table:
            var tbl = '';
            tbl += '<table class="table table-striped table-info" id="assetsData">';

            tbl += '<thead class="align-top">';
            tbl += '<tr>';
            tbl += '<th scope="col">Name</th>';
            tbl += '<th scope="col">Description</th>';
            tbl += '<th scope="col">Category</th>';
            tbl += '<th scope="col">Serial No.</th>';
            if (role >= 2) {
                tbl += '<th scope="col">Owner</th>';

            }
            tbl += '<th scope="col">Acquisition Date</th>';
            tbl += '<th scope="col">Status</th>';
            tbl += '<th scope="col">Action</th>'
            tbl += '</tr>';
            tbl += '</thead>';

            tbl += '<tbody  class="table-group-divider align-middle">';

            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++)
                {
                    tbl += '<tr>';
                    tbl += '<td>' + data.result[i].name + '</td>';
                    tbl += '<td>' + data.result[i].description + '</td>';
                    tbl += '<td>' + data.result[i].category + '</td>';
                    tbl += '<td>' + data.result[i].srno + '</td>';
                    if (role >= 2) {
                        tbl += '<td>' + data.result[i].owner + '</td>';
                    }

                    var date = data.result[i].acquisitionDate.split('-')
                    var acqDateFinal = date[2] + "-" + getMonthString(date[1]) + "-" + date[0];
                    tbl += '<td>' + acqDateFinal + '</td>';
                    tbl += '<td>' + data.result[i].status + '</td>';
                    tbl += '<td><button id="editAssetBtn" class="btn d-inline" onclick="addeditevent(' + "'Edit'" + ", " + data.result[i].uid + ", '" + data.result[i].name + "', '" + data.result[i].description + "', '" + data.result[i].category + "', '" + data.result[i].srno + "', " + data.result[i].quantity + ", '" + data.result[i].acquisitionDate + "', " + data.result[i].cost + ", '" + data.result[i].location + "', '" + data.result[i].owner + "', '" + data.result[i].status + "'" + ');">';
                    tbl += '<i class="fa-solid fa-pen-to-square"></i></button>';
                    tbl += '<button id="removeAssetBtn" class="btn d-inline" onclick="removeAsset(' + data.result[i].uid + ", '" + data.result[i].name + "', '" + data.result[i].description + "', '" + data.result[i].category + "', '" + data.result[i].srno + "', " + data.result[i].quantity + ", '" + data.result[i].acquisitionDate + "', " + data.result[i].cost + ", '" + data.result[i].location + "', '" + data.result[i].owner + "', '" + data.result[i].status + "'" + ')">';
                    tbl += '<i class="fa-solid fa-trash"></i>';
                    tbl += '</button>';
                    tbl += '</td>';
                    tbl += '</tr>';

                }
                tbl += '</tbody>';
                tbl += '</table>';
                $("#assetTable").html(tbl);


                let t = new DataTable("#assetsData");

            } else {
                tbl += '<tr>';
                if (role >= 2) {
                    tbl += '<td colspan="8" class="text-center">No Data Found.</td>';
                } else {
                    tbl += '<td colspan="7" class="text-center">No Data Found.</td>';
                }
                tbl += '</tr>';
                tbl += '</tbody>';
                tbl += '</table>';
                $("#assetTable").html(tbl);
            }



        }







    });
}


function removeAsset(uid, name, desc, category, srno, quantity, acqDate, cost, location, owner, status) {
//  Confirmation Prompt
    const response = confirm("Are you sure you want to delete Asset: " + name)

    if (response) {
        var obj = {
            'uid': uid,
            'name': name,
            'description': desc,
            'category': category,
            'srno': srno,
            'quantity': quantity,
            'acquisitionDate': acqDate,
            'cost': cost,
            'owner': owner,
            'location': location,
            'status': status
        }

        $.ajax({
            type: "POST",
            url: url + "removeAsset",
            data: JSON.stringify(obj),
            contentType: "application/json;",
            crossDomain: false,
            cache: false,
            dataType: 'json',
            async: false,
            success: function (response) {

                if (response == true) {
                    alert("Asset: " + name + " deleted successfully!");
                    window.location.href = "mainPage.html"
                } else {
                    alert("Error deleting Asset: " + name);
                }
            },
        });
    }

}


