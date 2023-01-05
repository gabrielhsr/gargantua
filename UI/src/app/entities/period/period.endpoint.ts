import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from '../period/period.dto';

@Injectable({
	providedIn: 'root',
})
export class PeriodEndpoint extends BaseEndpoint<Period> {
	public override endpoint = '/api/Period/';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}

	public getPeriods() {
		return this.service.handle(this.httpClient.get<Period[]>(environment.baseApi + this.endpoint));
	}
}
