$(document).ready(function () {
    showReports();
})

function showReports() {
    var id = window.localStorage.getItem("id");
    var username = window.localStorage.getItem("name");
    var password = window.localStorage.getItem("password");
    var role = window.localStorage.getItem("role");
    var managerId = window.localStorage.getItem("managerId");
    var fullName = window.localStorage.getItem("fullName");




    $.ajax({
        type: "GET",
        url: url + "showReports?id=" + id + "&role=" + role,
        contentType: "application/json;",
        crossDomain: false,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data) {

//            console.log(data)
            var tbl = '';

            tbl += '<table class="table table-striped table-info" id="reportsData">';

            tbl += '<thead class="align-top">';
            tbl += '<tr>';
            tbl += '<th scope="col">UID</th>';
            tbl += '<th scope="col">Name</th>';
            tbl += '<th scope="col">Description</th>';
            tbl += '<th scope="col">Category</th>';
            tbl += '<th scope="col">Serial No.</th>';
            if (role >= 2) {
                tbl += '<th scope="col">Owner</th>';

            }
            tbl += '<th scope="col">Quantity</th>';
            tbl += '<th scope="col">Acquisition Date</th>';
            tbl += '<th scope="col">Cost</th>';
            tbl += '<th scope="col">Location</th>';
            tbl += '<th scope="col">Status</th>';
            tbl += '</tr>';
            tbl += '</thead>';

            tbl += '<tbody  class="table-group-divider align-middle">';

            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++)
                {
                    tbl += '<tr>';
                    tbl += '<td>' + data.result[i].uid + '</td>';
                    tbl += '<td>' + data.result[i].name + '</td>';
                    tbl += '<td>' + data.result[i].description + '</td>';
                    tbl += '<td>' + data.result[i].category + '</td>';
                    tbl += '<td>' + data.result[i].srno + '</td>';
                    if (role >= 2) {
                        tbl += '<td>' + data.result[i].owner + '</td>';
                    }
                    tbl += '<td>' + data.result[i].quantity + '</td>';

                    var date = data.result[i].acquisitionDate.split('-')
                    var acqDateFinal = date[2] + "-" + getMonthString(date[1]) + "-" + date[0];
                    tbl += '<td>' + acqDateFinal + '</td>';
                    tbl += '<td>' + data.result[i].cost + '</td>';
                    tbl += '<td>' + data.result[i].location + '</td>';
                    tbl += '<td>' + data.result[i].status + '</td>';
                    tbl += '</tr>';

                }
                tbl += '</tbody>';
                tbl += '</table>';
                $("#table").html(tbl);

                let t = new DataTable("#reportsData");
            } else {
                tbl += '<tr>';
                if (role >= 2) {
                    tbl += '<td colspan="11" class="text-center">No Data Found.</td>';
                } else {
                    tbl += '<td colspan="10" class="text-center">No Data Found.</td>';
                }
                tbl += '</tr>';
                tbl += '</tbody>';
                tbl += '</table>';
                $("#table").html(tbl);
            }





        }
    });
}