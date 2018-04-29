let date=new Date();
$('#dateDestination').datepicker({startDate:date, format: 'DD-MM-YYYY'});
$('#dateLocation').datepicker({startDate:date, format: 'DD-MM-YYYY'});
$('#dateRent').datepicker({startDate: date+1, format: 'DD-MM-YYYY'});
$('#checkInHotel').datepicker({startDate:date, format: 'DD-MM-YYYY'});
$('#checkOutHotel').datepicker({startDate:date, format: 'DD-MM-YYYY'});


$('input[type="radio"][id="radio01"]').click(function(){
    $("#leave").css("display", "block");

});

$('input[type="radio"][id="radio02"]').click(function(){
     $("#leave").css("display", "none");
});



$('#search').on("click", function sbm() {
    let data = {};
    data.checkBox = $('input[type=radio][id=radio01]:checked').val();
    data.destination1 = $('#destination').val();
    data.dateDestination = $('#dateDestination').val();
    data.dateLocation = $('#dateLocation').val();
    data.adults = $('#adults').val();
    data.children = $('#children').val();
    data.locate = $('#locate').val();
    data.level = $('#level').val();
    data.message="mes";
    $.ajax({
        url: 'http://localhost:3000/flight',
        method: 'POST',
        data: data, //можно так повыебываться, а можно просто объект отправить вида data: data
        dataType: "json", //при возврате не объекта - удалить эту строку
        success: function (data) { // просто, как день, еррор не нужОн, ибо вызывает ересь
            alert(JSON.stringify(data.message)) //делай, что захочешь с ним
            console.log("success");
            //console.log(JSON.stringify(data));
        }
    })
});

$('#buttonRentCar').on("click", function Rent() {
    let data = {};
    data.cityCar = $('#cityCar').val();
    data.model = $('#model').val();
    data.dateRent = $('#dateRent').val();
    data.NumDays = $('#NumDays').val();
    $.ajax({
        url: 'http://localhost:3000/car',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
            alert(JSON.stringify(data.message))
            console.log("success");
            //console.log(JSON.stringify(data));
        }
    })
});

$('#buttonRentHotel').on("click", function RentHotel() {
    let data = {};
    data.cityHotel = $('#cityHotel').val();
    data.nameHotel = $('#nameHotel').val();
    data.checkInHotel = $('#checkInHotel').val();
    data.checkOutHotel = $('#checkOutHotel').val();
    data.typeOfEat = $('#typeOfEat').val();
    data.NumOfPeople = $('#NumOfPeople').val();
    $.ajax({
        url: 'http://localhost:3000/hotel',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
            alert(JSON.stringify(data.message))
            console.log("success");
            //console.log(JSON.stringify(data));
        }
    })
});

$('#add').on("click", function Add() {
    let data = {};
    data.NewDestination = $('#NewDestination').val();
    data.NewLocation = $('#NewLocation').val();
    $.ajax({
        url: 'http://localhost:3000/AddFlight',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
            alert(JSON.stringify(data.mes));
        }
    })
});


$('#edit').on("click", function Edit() {
    let data = {};
    data.NewDestination = $('#NewDestination').val();
    data.NewLocation = $('#NewLocation').val();
    data.destination1 = $('#destination').val();
    data.locate = $('#locate').val();
    $.ajax({
        url: 'http://localhost:3000/EditFlight',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
            alert(JSON.stringify(data.mes));
        }
    })
});

$('#delete').on("click", function Delete() {
    let data = {};
    data.NewDestination = $('#NewDestination').val();
    data.NewLocation = $('#NewLocation').val();
    data.destination1 = $('#destination').val();
    data.locate = $('#locate').val();
    $.ajax({
        url: 'http://localhost:3000/DeleteFlight',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (data) {
            alert(JSON.stringify(data.mes));
        }
    })
});

