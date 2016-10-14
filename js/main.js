$(document).ready(function() {
  "use strict";
  // "Global" Id
  var nextId = 0;
  // Todo constructor
  function Todo(text, completed) {
    this.id = nextId++;
    this.text = text;
    this.completed = completed;
  }
  // Todo prototype render method
  Todo.prototype.render = function() {
    var articleContainer = $('<li>');
    var article = $('<article>').appendTo(articleContainer).attr('id', 'todo'+this.id);
    var checkButton = $('<button>').addClass('check').appendTo(article);
    var text = $('<p>').html(this.text).appendTo(article);
    var editText = $('<input>').addClass('edit-todo').attr({ type: "text", value: this.text}).appendTo(article);
    var deleteButton = $('<button>').addClass('delete').html('&times;').appendTo(article);

    if (this.completed) {
      checkButton.addClass('fa fa-check');
      article.addClass('completed');
      text.addClass('complete');
    }
    $('.items').prepend(articleContainer);
  };
  // Update stored todo items array
  function updateTodoStore(todo) {
    todoItems.push(todo);
    localStorage.setItem('storedTodos', JSON.stringify(todoItems));
  }
  // Create new item when submitting form
  $('form').submit(function() {
    event.preventDefault();
    var inputText = $("input").val();
    var newTodo = new Todo(inputText, false);
    newTodo.render();
    updateRemainingTodoCount();
    updateTodoStore(newTodo);
    $(this).trigger('reset');
  });
  // On page load, retrieve and render localStorage
  var todoItems = localStorage.getItem('storedTodos');
  if (todoItems === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoItems);
    todoItems.forEach(function(todo) {
      new Todo(todo.text, todo.completed).render();
    });
  }

  // On button .check click, toggle class "completed" on article, and "complete" to <p>
  $('.items').on('click', '.check', function() {
    $(this).parent('article').toggleClass("completed");
    $(this).siblings('p').toggleClass("complete");
    var button = $(this).toggleClass('fa fa-check');
    // Assign completed to item in array
    var parentArticleId = $(this).parent('article').attr('id');
    var indexOfCompletedTodo = Number(parentArticleId.slice(4));
    todoItems[indexOfCompletedTodo].completed = button.hasClass('fa fa-check');

    localStorage.setItem('storedTodos', JSON.stringify(todoItems));
    updateRemainingTodoCount();
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
  });

  // delete button
  $('.items').on('mouseenter', 'article', function () {
    $(this).children('.delete').addClass("visible");
  });
  $('.items').on('mouseleave', 'article', function () {
    $(this).children('.delete').removeClass("visible");
  });
  // delete item from view and array
  $('.items').on('click', '.delete', function() {
    $(this).closest("li").remove();
    updateRemainingTodoCount();
    var parentArticleId = $(this).parent('article').attr('id');
    var indexOfRemovedTodo = Number(parentArticleId.slice(4));
    todoItems.splice(indexOfRemovedTodo, 1);
    localStorage.setItem('storedTodos', JSON.stringify(todoItems));
  });

  // update number of items left
  function updateRemainingTodoCount() {
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

      var articleId = $(this).attr('id');
      var indexOfRemovedTodo = Number(articleId.slice(4));
      todoItems.splice(indexOfRemovedTodo, 1);
      localStorage.setItem('storedTodos', JSON.stringify(todoItems));
    });
  });
});
