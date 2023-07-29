import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from './period.model';

@Injectable({
	providedIn: 'root',
})
export class PeriodEndpoint extends BaseEndpoint<Period> {
	public override url = '/api/Period/';

	constructor(private readonly service: HttpService) {
		super(service);
	}

	public getPeriods() {
		return this.service.get<Period[]>(this.url);
	}
}
