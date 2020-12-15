$(document).ready(function () {
   // debugger
   
    loadData();
});


function loadData() {
    debugger
    var Bearer = "Bearer ";
    var localStorage = window.localStorage.getItem('access_token');
    var Auth = Bearer + localStorage;
    $.ajax({
        url: "/Api/Test//GetAllCustumer",
       
        headers: {
            
            'Authorization': Auth
            //'Authorization': Bearer.concat(localStorage)
        },
       
        contentType: "application/json; charset=utf-8",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var htmlString = '';

            // debugger
            result
            //debugger
            //$.each(result, function (index,val) {
            for (var i = 0; i < result.data.length; i++) {


                //debugger
                htmlString += '<tr>';
                htmlString += '<td>' + result.data[i].CustomerId + '</td>';
                htmlString += '<td>' + result.data[i].Name + '</td>';
                htmlString += '<td>' + result.data[i].Address + '</td>';
                htmlString += '<td>' + result.data[i].MobileNo + '</td>';
                htmlString += '<td>' + formatDate(result.data[i].Birthdate) + '</td>';
                htmlString += '<td>' + result.data[i].Emailid + '</td>';
                htmlString += '<td><a href="#" onclick="return getbyID(' + result.data[i].CustomerId + ')">Edit</a> | <a href="#" onclick="Delele(' + result.data[i].CustomerId + ')">Delete</a></td>';
                htmlString += '</tr>';
            };
            $('.tbody').append(htmlString);
        },
        error: function (errormessage) {
            debugger
            alert(errormessage.responseText);
        }
    });
}

function Add() {
    debugger
    var res = validate();
    if (res == false) {
        return false;
    }
    var Bearer = "Bearer ";
    var localStorage = window.localStorage.getItem('access_token');
    var Auth = Bearer + localStorage;
    debugger
    var CusObj = {
       
        CustomerId: $('#CustomerId').val(),
        Name: $('#Name').val(),
        Address: $('#Address').val(),
        MobileNo: $('#MobileNo').val(),
        Birthdate: $('#Birthdate').val(),
        Emailid: $('#Emailid').val()
    };
    $.ajax({
        url: "/Api/Test//InsertCustomer",
        data: CusObj,
        type: "POST",
        //dataType: "json",
        headers: {

            'Authorization': Auth
            //'Authorization': Bearer.concat(localStorage)
        },

        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            //window.location.reload();
            loadData();
            $('#myModal').modal('hide');
           
            $('#CustomerId').val("");
            $('#Name').val("");
            $('#Address').val("");
            $('#MobileNo').val("");
            $('#Birthdate').val("");
            $('#Emailid').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getbyID(CustomerId) {
    // debugger
    var Bearer = "Bearer ";
    var localStorage = window.localStorage.getItem('access_token');
    var Auth = Bearer + localStorage;
    $.ajax({

        url: "/Api/Test//GetCustomerById/" + CustomerId,
        typr: "GET",

        dataType: "json",
        headers: {

            'Authorization': Auth
            //'Authorization': Bearer.concat(localStorage)
        },

        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            //debugger
            $('#CustomerId').val(result.data.CustomerId);
            $('#Name').val(result.data.Name);
            $('#Address').val(result.data.Address);
            $('#MobileNo').val(result.data.MobileNo);
            $('#Birthdate').val(formatDate(result.data.Birthdate));
          
            $('#Emailid').val(result.data.Emailid);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


function Update() {
    debugger
    var res = validate();
    if (res == false) {
        return false;
    }
    var Bearer = "Bearer ";
    var localStorage = window.localStorage.getItem('access_token');
    var Auth = Bearer + localStorage;
    var CusObj = {
        CustomerId: $('#CustomerId').val(),
        Name: $('#Name').val(),
        Address: $('#Address').val(),
        MobileNo: $('#MobileNo').val(),
        Birthdate: $('#Birthdate').val(),
        Emailid: $('#Emailid').val(),

    };
    $.ajax({
        url: "/Api/Test//UpdateCustomerDetails",
        data: CusObj,
        type: "POST",

        dataType: "json",
        headers: {

            'Authorization': Auth
            //'Authorization': Bearer.concat(localStorage)
        },

       // contentType: "application/json; charset=utf-8",
        success: function (result) {
            //window.location.reload();
            $('.tbody').empty();
            loadData();
            $('#myModal').modal('hide');
            $('#CustomerId').val("");
            $('#Name').val("");
            $('#Address').val("");
            $('#MobileNo').val("");
            $('#Birthdate').val("");
            $('#Emailid').val("");


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Delele(ID) {
    var Bearer = "Bearer ";
    var localStorage = window.localStorage.getItem('access_token');
    var Auth = Bearer + localStorage;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        debugger
        $.ajax({
            url: "/Api/Test//DeleteCustomerDetail/" + ID,
            type: "POST",
            //contentType: "application/json;charset=UTF-8",
            dataType: "json",

            dataType: "json",
            headers: {

                'Authorization': Auth
                //'Authorization': Bearer.concat(localStorage)
            },
            success: function (result) {
                window.location.reload();
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($('#MobileNo').val().trim() == "") {
        $('#MobileNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MobileNo').css('border-color', 'lightgrey');
    }

    if ($('#Birthdate').val().trim() == "") {
        $('#Birthdate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Birthdate').css('border-color', 'lightgrey');
        $('#error').html("rsgh");
    }

    if ($('#Emailid').val().trim() == "") {
        $('#Emailid').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Emailid').css('border-color', 'lightgrey');
    }
    return isValid;
}


function formatDate(date) {



    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
};
$(document).on('click', '#btnUpload', function () {


    debugger
    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        fileData.append('username', 'Manas');

        $.ajax({
            url: '/Home/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,

            dataType: "json",
            headers: {

                'Authorization': Auth
                //'Authorization': Bearer.concat(localStorage)
            },
            success: function (result) {
                alert(result);
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
});  