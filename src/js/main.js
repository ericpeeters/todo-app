import '../scss/main.scss';
import $ from 'jquery';
import handlebars from 'handlebars';
import { loadTodos, saveTodos } from './storage';
import { formatDate } from './date';

///////////////////////////////////////////////////////////////////////
//    Constants
///////////////////////////////////////////////////////////////////////

const checkBoxSelector = '.js-todo-checkbox';

const $todoList = $('.js-todos');
const $singleTodoTemplate = $('.js-single-todo-item-template');
const $addTodo = $('.js-add-todo');
const $newTodoInput = $('.js-new-todo');

const createTodo = handlebars.compile($singleTodoTemplate.html());

///////////////////////////////////////////////////////////////////////
//    Add todo
///////////////////////////////////////////////////////////////////////

function addTodo(todo) {
    const todoList = loadTodos();
    todoList.push(todo);
    showTodo(todo);
    saveTodos(todoList);
}

function onClickAddTodo() {
    const newTodo = $newTodoInput.val();

    addTodo({
        title: newTodo,
        date: formatDate(),
        done: false
    });
}

function bindAddEvent() {
    $addTodo.on('click', onClickAddTodo);
}

///////////////////////////////////////////////////////////////////////
//    Show todo's
///////////////////////////////////////////////////////////////////////

function setTodoDone($todoListItem, $todoCheckbox) {
    $todoListItem.addClass('done');

    const todos = loadTodos(),
        date = $todoCheckbox.attr('id'),
        todoData = todos.find(function (todo) {
            return todo.date === date;
        });

    todoData.done = true;

    saveTodos(todos);
    // Find the todo
    // set its state to 'done'
    // save back to local storage
}

function setTodoPending($todoListItem, $todoCheckbox) {
    $todoListItem.removeClass('done');

    const todos = loadTodos(),
        date = $todoCheckbox.attr('id'),
        todoData = todos.find(function (todo) {
            return todo.date === date;
        });

    todoData.done = false;

    saveTodos(todos);
}

function onTodoCheckboxChange(event) {
    const $checkbox = $(event.target),
        $todo = $checkbox.parent();

    if ($checkbox.prop('checked')) {
        setTodoDone($todo, $checkbox);
    } else {
        setTodoPending($todo, $checkbox);
    }
}

function bindTodoDone($todo) {
    const $checkbox = $todo.find(checkBoxSelector);

    $checkbox.on('change', onTodoCheckboxChange);
}

function showTodo(todo) {
    const todoHTML = createTodo(todo),
        $todoElement = $(todoHTML);

    $todoList.append($todoElement);
    bindTodoDone($todoElement);
}

function showTodos(todos) {
    todos.forEach(showTodo);
}

///////////////////////////////////////////////////////////////////////
//    Initialize
///////////////////////////////////////////////////////////////////////

function init() {
    //load todos
    const todos = loadTodos();

    //show todos
    showTodos(todos);

    //events
    bindAddEvent();
}

$(init);

// const dummyData = [
//     { title: 'go to the mall'},
//     { title: 'get groceries'},
//     { title: 'buy flowers'},
//     { title: 'sleep'}
// ];

// const todoHtml = '<li> {{ title}} </li>';
// const createToDo = handlebars.compile(todoHtml);

// const [firstTodo, secondTodo] = dummyData;

// dummyData.forEach(todo => $toDoList.append(createToDo(todo)));

// dummyData.forEach(function (todo) {
//     $toDoList.append(createToDo(todo))
// });
