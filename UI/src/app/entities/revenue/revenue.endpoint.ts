import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from '../period/period.dto';
import { Revenue } from './revenue.model';

@Injectable({
	providedIn: 'root',
})
export class RevenueEndpoint extends BaseEndpoint<Revenue> {
	public override url = '/api/Revenue/';

	constructor(private readonly service: HttpService) {
		super(service);
	}

	public getRevenuePeriods() {
		return this.service.get<Period[]>(this.url + 'periods');
	}

	public getRevenueByPeriod(month: number, year: number) {
		return this.service.get<Revenue[]>(this.url + 'revenueByPeriod', { month, year });
	}
}
