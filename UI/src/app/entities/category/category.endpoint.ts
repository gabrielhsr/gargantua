import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { CategoryDto } from './category.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryEndpoint extends BaseEndpoint<CategoryDto> {
	public override endpoint = '/api/Category';

	constructor(private readonly http: HttpClient) {
		super(http);
	}
}
