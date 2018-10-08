import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
    providedIn: 'root'
})
export class TodoDataService {
    lastId: 0;

    todos: Todo[] = [];

    constructor() { }

    addTodo(todo: Todo): TodoDataService {
        if (!todo.id) {
            todo.id = ++this.lastId;
        }
        this.todos.push(todo);
        return this;
    }

    deleteTodoById(id: number): TodoDataService {
        this.todos = this.todos.filter(todo => todo.id !== id);
        return this;
    }

    updateTodoById(id: number, values: Object = {}): Todo | any {
        const todo = this.getTodoById(id);
        if (!todo) {
            return this;
        }
        Object.assign(todo, values);
        return todo;
    }

    getAllTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: number): Todo | any {
        return this.todos.filter(todo => todo.id === id).pop();
    }

    getTodoByCategory(id: number): Todo[] {
        return this.todos.filter(todo => todo.category === id);
    }

    toggleTodoComplete(todo: Todo) {
        const updatedTodo = this.updateTodoById(todo.id, {
            complete: !todo.complete
        });
        return updatedTodo;
    }
}
