import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable()
export class CategoryDataService {
    lastId = 0;

    categories: Category[] = [];

    constructor() { }

    addCategory(category: Category): CategoryDataService {
        if (!category.id) {
            category.id = ++this.lastId;
        }
        this.categories.push(category);
        return this;
    }

    deleteCategoryById(id: number): CategoryDataService {
        this.categories = this.categories.filter(category => category.id !== id);
        return this;
    }

    updateCategoryById(id: number, values: Object = {}): Category | any {
        const category = this.getCategoryById(id);
        if (!category) {
            return null;
        }
        Object.assign(category, values);
        return category;
    }

    getAllCategories(): Category[] {
        return this.categories;
    }

    getCategoryById(id: number): Category | any {
        return this.categories.filter(category => category.id === id).pop();
    }
}
