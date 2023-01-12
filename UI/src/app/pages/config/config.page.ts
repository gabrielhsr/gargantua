import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
import { InputComponent, ItemType } from './components/input/input.component';
import { ConfigService } from './services/config.service';

@Component({
	selector: 'page-config',
	templateUrl: './config.page.html',
	styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {
	@ViewChildren('categoryInputs') categoryInputs?: QueryList<InputComponent>;
	@ViewChildren('paymentMethodInputs') paymentMethodInputs?: QueryList<InputComponent>;

	public categories?: Category[];
	public paymentMethods?: PaymentMethod[];

	public itemUpdate = new BehaviorSubject<void>(undefined);
	private itemUpdate$?: Subscription;

	constructor(private readonly configService: ConfigService, private readonly changeDetectorRef: ChangeDetectorRef) {}

	public ngOnInit() {
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.configService.getAllCategories())).subscribe(res => res.isSuccess ? this.categories = res.value : EMPTY);
		this.itemUpdate$ = this.itemUpdate.pipe(switchMap(() => this.configService.getAllPaymentMethods())).subscribe(res => res.isSuccess ? this.paymentMethods = res.value : EMPTY);
	}

	public ngOnDestroy() {
		this.itemUpdate$?.unsubscribe();
	}

	public addNewItem(list: ItemType) {
		const listToAdd = list === 'category' ? this.categories : this.paymentMethods;

		listToAdd?.push({ name: '', id: GuidHelper.default });

		this.changeDetectorRef.detectChanges();

		if (list === 'category') {
			this.categoryInputs?.last?.focus();
		} else {
			this.paymentMethodInputs?.last?.focus();
		}
	}
}
