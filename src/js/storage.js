const todoKey = 'todos';

export function saveTodos(todos) {
    localStorage.setItem(todoKey, JSON.stringify(todos));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem(todoKey));
}
