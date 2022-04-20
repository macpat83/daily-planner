//Get current day information

function getCurrentDay(){
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay)
}

getCurrentDay();

$(runCalendar);

function runCalendar() {
  

  //run colorHourBlocks() and set to refresh every minute
  colorHourBlocks();
  setInterval(colorHourBlocks, 60000);

  // keep data from local storage in blocks
  $(".hour-block").each(function() {
    var blockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // save button function
  $(".saveBtn").on("click", handleSave);
}

function colorHourBlocks() {
  // for hour block
  $(".hour-block").each(function() {
    var pastHour = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // remove classes that were added
    $(this).removeClass("past present future");
    // conditional statement for color blocks
    if (pastHour < currentHour) {
      $(this).addClass("past");
    } else if (pastHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  // get parent id
  var hourId = $(this).parent().attr("id");
  // save localstorage in textarea
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}