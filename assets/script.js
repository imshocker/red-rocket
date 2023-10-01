var timeDisplayEl = $('#time-display')

$(function () {
  function saveEvent() {
    // Event handler for "Save" buttons
    $('.saveBtn').on('click', function () {
      // Inside this function, `this` refers to the clicked button element
      var $timeBlock = $(this).closest('.time-block') // Find the parent time block
      var timeBlockId = $timeBlock.attr('id') // Get the time block's ID
    
      // Assuming you have a textarea inside the time block
      var userInput = $timeBlock.find('textarea').val() // Get the user's input
    
      // Save the user's input to local storage using the time block's ID as a key
      var savedData = JSON.parse(localStorage.getItem('savedData')) || {}
      savedData[timeBlockId] = userInput
      localStorage.setItem('savedData', JSON.stringify(savedData))
    
      // Optionally, provide feedback to the user (e.g., change button color)
      $(this).addClass('saved') // Apply a CSS class or other visual indication
    })
  }
  saveEvent()

  function defineTimeBlock() {
    // Get the current hour using Day.js
    var currentHour = dayjs().format('H')
  
    // Iterate through each time block
    $('.time-block').each(function () {
      var blockId = $(this).attr('id').split('-')[1]  // Extract the hour from the ID
      var blockHour = parseInt(blockId)   // Convert the hour to an integer
  
      if (blockHour < currentHour) {
        $(this).addClass('past')
      } else if (blockHour === currentHour) {
        $(this).addClass('present')
      } else {
        $(this).addClass('future')
      }
    })
  }
  
  defineTimeBlock()
 
  function readStoredEvents() {
    var savedData = JSON.parse(localStorage.getItem('savedData')) || {}

    // Loop through each time block
    $('.time-block').each(function () {
      var blockId = $(this).attr('id')
      var userInput = savedData[blockId]

      // Find the textarea within the time block and set its value
      $(this).find('textarea').val(userInput)
    })
}
readStoredEvents()
})

function displayTime() {
  var currentDate = dayjs().format('MMM DD, YYYY')
  timeDisplayEl.text(currentDate)
}

displayTime()
setInterval(displayTime, 1000)

