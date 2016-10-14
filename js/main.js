$(document).ready(function() {
  "use strict";
  function Todo(text, completed) {
    this.text = text;
    this.completed = completed;
  }

  Todo.prototype.render = function() {
    var articleContainer = $('<li>');
    var article = $('<article>').appendTo(articleContainer);
    var checkButton = $('<button>').addClass('check').appendTo(article);
    var text = $('<p>').html(this.text).appendTo(article);
    var editText = $('<input>').addClass('edit-todo').attr({ type: "text", value: this.text}).appendTo(article);
    var deleteButton = $('<button>').addClass('delete').html('&times;').appendTo(article);

    $('.items').prepend(articleContainer);
    // .hide().slideDown('ease'); ???

  };

  function addNewItem(inputText, completed) {
    var todoObject = new Todo(inputText, completed);
    todoObject.render();
    remainingTodoCount();

    todoItems.push(todoObject);
    localStorage.setItem('storedTodos', JSON.stringify(todoItems));
    //*************************
  }

  // Create new item when submitting form
  $('form').submit(function() {
    event.preventDefault();
    var inputText = $("input").val();
    var completed = false;
    addNewItem(inputText, completed);
    $(this).trigger('reset');
  });

  // storedTodos is localStorage key name
  var todoItems = localStorage.getItem('storedTodos');
  if (todoItems === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoItems);
    var length = todoItems.length;
    for (var index = 0; index < length; index++) {
      var todo = todoItems[index];
      addNewItem(todo.text, todo.completed);
    }
  }


  // On button .check click, toggle class "completed" on article, and "complete" to <p>
  $('.items').on('click', '.check', function() {
    $(this).parent('article').toggleClass("completed");
    $(this).siblings('p').toggleClass("complete");

    if($(this).parent('article').hasClass("completed")) {
      $(this).addClass('fa fa-check');
    } else {
      $(this).removeClass('fa fa-check');
    }
    remainingTodoCount();

    // localStorage.setItem('storedTodos', JSON.stringify(todoItems));
    //*********************
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

  // on keyup, assign edited text to p tag
  $('.items').on('keyup', '.edit-todo', function(evt) {
    var text = $(this).val();
    if (evt.keyCode == 13) {
      $(this).siblings('p').html(text);
      $(this).siblings('p').show();
      $(this).hide();
    }
    var storage = localStorage.getItem('storedTodos');

    // localStorage.setItem('storedTodos', JSON.stringify());
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
    // *****************
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
    $('article.completed').slideUp('slow', function() {
      $(this).remove();

    });

  });
});
