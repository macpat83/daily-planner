function getCurrentDay(){
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay)
}

getCurrentDay();

//creating hour blocks


