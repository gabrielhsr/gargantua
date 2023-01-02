import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
import { ItemType } from './components/input/input.component';
import { AdminService } from './services/admin.service';

@Component({
	selector: 'page-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
	public categories?: Category[];
	public paymentMethods?: PaymentMethod[];

	public itemUpdate = new BehaviorSubject<void>(undefined);
	private itemUpdate$?: Subscription;

	constructor(private readonly adminService: AdminService) {	}

	public ngOnInit() {
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.adminService.getAllCategories())).subscribe(res => res.isSuccess ? this.categories = res.value : EMPTY);
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.adminService.getAllPaymentMethods())).subscribe(res => res.isSuccess ? this.paymentMethods = res.value : EMPTY);
	}

	public ngOnDestroy() {
		this.itemUpdate$?.unsubscribe();
	}

	public addNewItem(list: ItemType) {
		const listToAdd = list === 'category' ? this.categories : this.paymentMethods;

		listToAdd?.push({ name: null, id: GuidHelper.generate() });
	}
}
