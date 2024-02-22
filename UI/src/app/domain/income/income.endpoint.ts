// import { Injectable } from '@angular/core';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { BaseEndpoint } from '../base.endpoint';
// import { Period } from '../period/period.model';
// import { Income } from './income.model';

// @Injectable({
// 	providedIn: 'root',
// })
// export class IncomeEndpoint extends BaseEndpoint<Income> {
// 	constructor(private readonly service: HttpService) {
// 		super(service, '/api/Income/');
// 	}

// 	public getIncomePeriods() {
// 		return this.service.get<Period[]>(this.url + 'periods');
// 	}

// 	public getIncomeByPeriod(month: number, year: number) {
// 		return this.service.get<Income[]>(this.url + 'incomeByPeriod', { month, year });
// 	}
// }
