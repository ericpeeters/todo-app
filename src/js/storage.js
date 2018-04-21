const todoKey = 'todos';

export function saveTodos(todos) {
    localStorage.setItem(todoKey, JSON.stringify(todos));
}

export function loadTodos() {
    const todos = localStorage.getItem(todoKey);

    if (todos === null) {
        return [];
    }

    return JSON.parse(todos);
}
