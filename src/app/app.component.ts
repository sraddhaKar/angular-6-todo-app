import { Component, OnInit } from '@angular/core';
import { Category } from './categories/category';
import { CategoryDataService } from './categories/category-data.service';
import { Todo } from './todos/todo';
import { TodoDataService } from './todos/todo-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
      TodoDataService,
      CategoryDataService
  ]
})
export class AppComponent implements OnInit {
    newTodo: Todo = new Todo();
    newCategory: Category = new Category();
    selectedCategory: Category;
    addTodoForm: FormGroup;
    submitted = false;

    constructor (
        private _todoDataService: TodoDataService,
        private _categoryDataService: CategoryDataService) {}

    addTodo() {
        this.newTodo.category = this.selectedCategory.id;
        this._todoDataService.addTodo(this.newTodo);
        this.newTodo = new Todo();
        console.log(this.todos);
    }

    toggleTodoComplete(todo: Todo) {
        this._todoDataService.toggleTodoComplete(todo);
    }

    removeTodo(todo: Todo) {
        this._todoDataService.deleteTodoById(todo.id);
    }

    get todos() {
        return this._todoDataService.getAllTodos();
    }

    get todosForCat() {
        return this._todoDataService.getTodoByCategory(this.selectedCategory.id);
    }

    countTodoByCat(id: number) {
        return this._todoDataService.getTodoByCategory(id).length;
    }

    addCategory() {
        this._categoryDataService.addCategory(this.newCategory);
        this.newCategory = new Category();
    }

    removeCategory(category: Category) {
        this._categoryDataService.deleteCategoryById(category.id);
    }

    get categories() {
        return this._categoryDataService.getAllCategories();
    }

    categoryById(id: number) {
        return this._categoryDataService.getCategoryById(id);
    }

    addInitialCategory(category: Category) {
        this._categoryDataService.addCategory(category);
    }

    addInitialTodo(todo: Todo) {
        this._todoDataService.addTodo(todo);
    }

    onSelect(category: Category): void {
        this.selectedCategory = category;
    }

    ngOnInit() {

        let initCat = new Category();
        initCat = { 'name' : 'Today', 'id' : 1 };
        this.addInitialCategory(initCat);
        initCat = { 'name' : 'Tomorrow', 'id' : 2 };
        this.addInitialCategory(initCat);
        initCat = { 'name' : 'Work', 'id' : 3 };
        this.addInitialCategory(initCat);
        initCat = { 'name' : 'Holidays', 'id' : 1 };
        this.addInitialCategory(initCat);
        initCat = { 'name' : 'Shopping list', 'id' : 5 };
        this.addInitialCategory(initCat);

        let initTodo = new Todo();
        initTodo = { 'title' : 'Task1', 'complete' : false, 'id' : 1, category: 1 };
        this.addInitialTodo(initTodo);
        initTodo = { 'title' : 'Task2', 'complete' : false, 'id' : 2, category: 2 };
        this.addInitialTodo(initTodo);
        initTodo = { 'title' : 'Task3', 'complete' : false, 'id' : 3, category: 1 };
        this.addInitialTodo(initTodo);
    }

    onSubmit() {
        this.submitted = true;

        if (this.addTodoForm.invalid) {
            return;
        }
        alert('SUCCESS!!');
    }
}
