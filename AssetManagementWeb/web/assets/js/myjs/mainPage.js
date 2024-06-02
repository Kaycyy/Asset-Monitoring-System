$(document).ready(function () {

//    // CONTAINERS:
//    // 1. Main container
//    let display = document.getElementById("display");
//
//    // 2. Reports Table
//    let dataTable = document.getElementById("dataTable");
//
//    // 3. Categories card
//    let categoriesCrud = document.getElementById('categoriesCrud');
//
//    let tabs = document.getElementById('tabs');

//    let assetsDiv = tabs.firstElementChild;
//    let childMain = assetsDiv.firstElementChild;



//    // ON LOAD...
//    const show = {
//        onload: function () {
//
//            childMain.innerHTML = `My Assets`;
//            // console.log(childMain)
//            assetsDiv.style.display = "block";
//            dataTable.style.display = "none";
//            categoriesCrud.style.display = "none";
//            display.append(tabs);
//        }
//    }
//
//    show.onload.call();


    var role = window.localStorage.getItem("role");
    if (role == 1) {
        $('#categories').hide();
    }


});






// Add and Edit Button Function call for ASSETS
function addeditevent(obj, uid, name, desc, category, srno, quantity, acqDate, cost, location, owner, status) {
    if (obj == "Add")
    {
        window.localStorage.setItem("eventperform", "Add");

    } else {

        window.localStorage.setItem("eventperform", "Edit");
        window.localStorage.setItem("uid", uid);
        window.localStorage.setItem("assetName", name);
        window.localStorage.setItem("desc", desc);
        window.localStorage.setItem("category", category);
        window.localStorage.setItem("srno", srno);
        window.localStorage.setItem("quantity", quantity);
        window.localStorage.setItem("acqDate", acqDate);
        window.localStorage.setItem("cost", cost);
        window.localStorage.setItem("location", location);
        window.localStorage.setItem("owner", owner);
        window.localStorage.setItem("status", status);

    }

    window.location.href = "add&editAsset.html";
}



// Signout function call to remove localStorage Items
function removeItems() {
    window.localStorage.removeItem("eventperform");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("managerId");
    window.localStorage.removeItem("fullName");
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



}

