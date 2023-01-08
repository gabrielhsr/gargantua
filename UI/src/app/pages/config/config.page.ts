import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
import { ItemType } from './components/input/input.component';
import { ConfigService } from './services/config.service';

@Component({
	selector: 'page-config',
	templateUrl: './config.page.html',
	styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {
	public categories?: Category[];
	public paymentMethods?: PaymentMethod[];

	public itemUpdate = new BehaviorSubject<void>(undefined);
	private itemUpdate$?: Subscription;

	constructor(private readonly configService: ConfigService) {	}

	public ngOnInit() {
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.configService.getAllCategories())).subscribe(res => res.isSuccess ? this.categories = res.value : EMPTY);
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.configService.getAllPaymentMethods())).subscribe(res => res.isSuccess ? this.paymentMethods = res.value : EMPTY);
	}

	public ngOnDestroy() {
		this.itemUpdate$?.unsubscribe();
	}

	public addNewItem(list: ItemType) { // TODO: Add 'focus' on new Input.
		const listToAdd = list === 'category' ? this.categories : this.paymentMethods;

		listToAdd?.push({ name: '', id: GuidHelper.default });
	}
}
