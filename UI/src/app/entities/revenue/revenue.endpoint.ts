import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from '../period/period.dto';
import { Revenue } from './revenue.model';

@Injectable({
	providedIn: 'root',
})
export class RevenueEndpoint extends BaseEndpoint<Revenue> {
	public override endpoint = '/api/Revenue/';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}

	public getRevenuePeriods() {
		return this.service.handle(this.httpClient.get<Period[]>(environment.baseApi + this.endpoint + 'periods'));
	}

	public getRevenueByPeriod(month: number, year: number) {
		return this.service.handle(this.httpClient.get<Revenue[]>(environment.baseApi + this.endpoint + 'revenueByPeriod', { params: { month, year }}));
	}
}
