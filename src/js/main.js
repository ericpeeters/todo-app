import "../scss/main.scss";

import $ from "jquery";
import handlebars from "handlebars";

import {
    $singleTodoTemplate,
    $todoList,
    checkBoxSelector,
    $addTodo,
    $newTodoInput
} from "./constants";

import { loadTodos, saveTodos } from "./storage";
import { formatDate } from "./date";
import { bindDeleteTodo } from "./delete";
import { bindTodoDone } from "./checkbox";

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

    $newTodoInput.val("");
}

function bindAddEvent() {
    $addTodo.on("click", onClickAddTodo);
}

///////////////////////////////////////////////////////////////////////
//    Show todo's
///////////////////////////////////////////////////////////////////////

function showTodo(todo) {
    const todoHTML = createTodo(todo),
        $todoElement = $(todoHTML);

    $todoList.append($todoElement);
    bindTodoDone($todoElement);
    bindDeleteTodo($todoElement);
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
