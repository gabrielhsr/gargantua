import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Category } from './category.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryEndpoint extends BaseEndpoint<Category> {
	public override endpoint = '/api/Category';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}
}
