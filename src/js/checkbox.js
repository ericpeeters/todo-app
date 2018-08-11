import $ from "jquery";

import { loadTodos, saveTodos } from "./storage";
import { checkBoxSelector } from "./constants";

function setTodoDone($todoListItem, $todoCheckbox) {
    $todoListItem.addClass("done");

    const todos = loadTodos(),
        date = $todoCheckbox.attr("id"),
        todoData = todos.find(function(todo) {
            return todo.date === date;
        });

    todoData.done = true;

    saveTodos(todos);
}

function setTodoPending($todoListItem, $todoCheckbox) {
    $todoListItem.removeClass("done");

    const todos = loadTodos(),
        date = $todoCheckbox.attr("id"),
        todoData = todos.find(function(todo) {
            return todo.date === date;
        });

    todoData.done = false;

    saveTodos(todos);
}

function onTodoCheckboxChange(event) {
    const $checkbox = $(event.target),
        $todo = $checkbox.parent();

    if ($checkbox.prop("checked")) {
        setTodoDone($todo, $checkbox);
    } else {
        setTodoPending($todo, $checkbox);
    }
}

export function bindTodoDone($todo) {
    const $checkbox = $todo.find(checkBoxSelector);

    $checkbox.on("change", onTodoCheckboxChange);
}
