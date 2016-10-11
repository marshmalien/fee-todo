// class='new-todo'
function addNewItem(inputText) {
  var articleContainer = $('<li>');
  var article = $('<article>').appendTo(articleContainer);
  var checkButton = $('<button>').addClass('check').appendTo(article);
  var text = $('<p>').html(inputText).appendTo(article);
  var editText = $('<input>').addClass('edit-todo').attr({ type: "text", value: inputText}).appendTo(article);
  var deleteButton = $('<button>').addClass('delete').html('X').appendTo(article);

  checklistItem(inputText);
  $('.items').prepend(articleContainer);
  remainingTodoCount();
}

// checklistItem constructor
function checklistItem(inputText) {
  this.checked = false;
  this.todo = inputText;
}

// Create new item when submitting form
$('form').submit(function() {
  event.preventDefault();
  var inputText = $("input").val();
  addNewItem(inputText);
});

// on keyup, assign edited text to p tag
$('.items').on('keyup', '.edit-todo', function(evt) {
  var text = $(this).val();
  if (evt.keyCode == 13) {
    $(this).siblings('p').html(text);
    $(this).siblings('p').show();
    $(this).hide();
  }
});

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
// delete button
$('.items').on('mouseenter', 'article', function () {
  $(this).children('.delete').addClass("visible");
});

$('.items').on('mouseleave', 'article', function () {
  $(this).children('.delete').removeClass("visible");
});

$('.items').on('click', '.delete', function() {
  $(this).closest("li").remove();
  remainingTodoCount();
});

// update number of items left
function remainingTodoCount() {
  var numIncomplete = $('article:not(.completed)').length;
  $('.incomplete-items').html(numIncomplete);
  }
  $('.show-all').click(function() {
    $('article').show();
});

// Active button (hide completed)
$('.show-active').click(function() {
  $('article').show();
   $('article.completed').each(function() {
     $(this).hide();
   });
});
// Completed button (hide active)
$('.show-completed').click(function() {
  $('article').show();
  $('article:not(.completed)').each(function() {
    $(this).hide();
  });
});
// Delete completed items
$('.clear').click(function() {
  $('article.completed').remove();
});
