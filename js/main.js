

// Create new item when submitting form
$('form').submit(function() {
  event.preventDefault();
  var inputText = $("input").val();
  console.log(inputText);
  addNewItem(inputText);
});

// class='new-todo'
function addNewItem(inputText) {
  var cellContainer = $('<li>');
  var cell = $('<article>').appendTo(cellContainer);
  var checkButton = $('<button>').addClass('check').appendTo(cell);
  var cellText = $('<p>').html(inputText).appendTo(cell);
  var deleteButton = $('<button>').addClass('delete').html('X').appendTo(cell);

  checklistItem(inputText);

 $('.items').prepend(cellContainer);
}

// checklistItem constructor
function checklistItem(inputText){
  this.checked = false;
  this.todo = inputText;
}

// On button .check click, add class "completed" to article, and "complete" to <p>
$('.items').on('click', '.check', function() {
  $('article').toggleClass("completed");
  $('p').toggleClass("complete");
  console.log("Button Clicked!");
});
