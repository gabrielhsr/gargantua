import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryEndpoint extends BaseEndpoint<Category> {
    public override activator: Category = new Category();
}
