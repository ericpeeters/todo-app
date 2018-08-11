import $ from "jquery";
import { deleteButtonSelector, checkBoxSelector } from "./constants";
import { loadTodos, saveTodos } from "./storage";

///////////////////////////////////////////////////////////////////////
//    Delete todo's
///////////////////////////////////////////////////////////////////////

function onClickDelete(event) {
    const $deleteButton = $(event.target),
        $todoCheckbox = $deleteButton.siblings(checkBoxSelector),
        todos = loadTodos(),
        date = $todoCheckbox.attr("id"),
        todoData = todos.find(function(todo) {
            return todo.date === date;
        }),
        index = todos.indexOf(todoData),
        $todoParent = $deleteButton.parent();

    if (index > -1) {
        todos.splice(index, 1);
    }

    saveTodos(todos);

    $todoParent.remove();
}

export function bindDeleteTodo($todo) {
    const $delete = $todo.find(deleteButtonSelector);

    $delete.on("click", onClickDelete);
}
