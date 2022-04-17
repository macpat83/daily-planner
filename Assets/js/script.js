function getCurrentDay(){
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay)
}

getCurrentDay();

$(init);

function init() {
  // get current day and display on top of page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // color our time blocks and start interval to re-color every minute
  colorHourBlocks();
  setInterval(colorHourBlocks, 60000);

  // update hour with data in local storage
  $(".hour-block").each(function() {
    var blockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // attach our handler for the save buttons
  $(".saveBtn").on("click", handleSave);
}

function colorHourBlocks() {
  // for each hour block
  $(".hour-block").each(function() {
    var pastHour = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // remove any class we may have added before
    $(this).removeClass("past present future");
    // color block based on past, present, future class
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