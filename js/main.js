// Create new item when submitting form
$('form').submit(function() {
  event.preventDefault();
  var inputText = $("input").val();
  addNewItem(inputText);

});

$('.items').on('keyup', '.edit-todo', function() {
  var text = $(this).val();
  $(this).siblings('p').html(text);

});

// class='new-todo'
function addNewItem(inputText) {
  var cellContainer = $('<li>');
  var cell = $('<article>').appendTo(cellContainer);
  var checkButton = $('<button>').addClass('check').appendTo(cell);
  var cellText = $('<p>').html(inputText).appendTo(cell);
  var editText = $('<input>').addClass('edit-todo').attr({ type: "text", value: inputText}).appendTo(cell);
  var deleteButton = $('<button>').addClass('delete').html('X').appendTo(cell);

  checklistItem(inputText);
  $('.items').prepend(cellContainer);
  remainingTodoCount();
}

// checklistItem constructor
function checklistItem(inputText){
  this.checked = false;
  this.todo = inputText;
}

// On button .check click, toggle class "completed" on article, and "complete" to <p>
$('.items').on('click', '.check', function() {
  $(this).parent('article').toggleClass("completed");
  $('p').toggleClass("complete");
  if($(this).parent('article').hasClass("completed")) {
    $(this).css('backgroundColor', 'green');
  } else {
    $(this).css('backgroundColor', 'white');
  }
  remainingTodoCount();
});

// On text click, toggle class "editing" on article
// Only one .edit-todo at a time

$('.items').on('click', 'p', function() {

  $('.editing').each(function() {
    $(this).removeClass('editing');
    $(this).children('input').hide();
    $(this).children('p').show();
  });
  $(this).parent().addClass('editing');
  $(this).siblings('input').show();
  $(this).hide();


});

function remainingTodoCount() {
    var numIncomplete = $('article:not(.completed)').length;
    $('.incomplete-items').html(numIncomplete);
}

$('.show-all').click(function() {
  $('article').show();
});


// hide completed
$('.show-active').click(function() {
  $('article').show();

   $('article.completed').each(function() {
     $(this).hide();
   });
});
// hide active
$('.show-completed').click(function() {
  $('article').show();

  $('article:not(.completed)').each(function() {
    $(this).hide();
  });
});
