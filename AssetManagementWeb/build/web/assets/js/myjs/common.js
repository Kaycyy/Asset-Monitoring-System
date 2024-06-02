
var url = "";
var server = "pro";

if (server == "prod")
{
    url = "http://192.168.1.102:8080/MarketingDashboard/";
} else
{
    url = "http://localhost:7073/demo/";
}


function getMonthNum(month) {
    switch (month) {
        case "Jan":
            return "01";
            break;
        case "Feb":
            return "02";
            break;
        case "Mar":
            return "03";
            break;
        case "Apr":
            return "04";
            break;
        case "May":
            return "05";
            break;
        case "Jun":
            return "06";
            break;
        case "Jul":
            return "07";
            break;
        case "Aug":
            return "08";
            break;
        case "Sep":
            return "09";
            break;
        case "Oct":
            return "10";
            break;
        case "Nov":
            return "11";
            break;
        case "Dec":
            return "12";
            break;

    }
}


function getMonthString(month) {
    switch (month) {
        case "01":
            return "Jan";
            break;
        case "02":
            return "Feb";
            break;
        case "03":
            return "Mar";
            break;
        case "04":
            return "Apr";
            break;
        case "05":
            return "May";
            break;
        case "06":
            return "Jun";
            break;
        case "07":
            return "Jul";
            break;
        case "08":
            return "Aug";
            break;
        case "09":
            return "Sep";
            break;
        case "10":
            return "Oct";
            break;
        case "11":
            return "Nov";
            break;
        case "12":
            return "Dec";
            break;

    }
}