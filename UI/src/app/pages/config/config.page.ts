// // import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
// // import { EMPTY, Subject, takeUntil } from 'rxjs';
// // import { Category } from 'src/app/domain/category/category.model';
// // import { PaymentMethod } from 'src/app/domain/payment-method/payment-method.model';
// // import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
// // import { InputComponent, ItemType } from './components/input/input.component';
// // import { ConfigService } from './services/config.service';

// // @Component({
// //     selector: 'page-config',
// //     templateUrl: './config.page.html',
// //     styleUrls: ['./config.page.scss'],
// // })
// // export class ConfigPage implements OnInit, OnDestroy {
// //     @ViewChildren('categoryInputs') categoryInputs?: QueryList<InputComponent>;
// //     @ViewChildren('paymentMethodInputs') paymentMethodInputs?: QueryList<InputComponent>;

// //     public categories?: Category[];
// //     public paymentMethods?: PaymentMethod[];

// //     private destroy$ = new Subject<void>();

// //     constructor(
// //         private readonly configService: ConfigService,
// //         private readonly changeDetectorRef: ChangeDetectorRef
// //     ) {}

// //     public ngOnInit() {
// //         this.configService.getAllCategories()
// //             .pipe(takeUntil(this.destroy))
// //             .subscribe((res) => res.isSuccess ? (this.categories = res.value) : EMPTY);

// //         this.configService.getAllPaymentMethods()
// //             .pipe(takeUntil(this.destroy))
// //             .subscribe((res) => res.isSuccess ? (this.paymentMethods = res.value) : EMPTY);
// //     }

// //     public ngOnDestroy() {
// //         this.destroy.next(null);
// //         this.destroy.complete();
// //     }

// //     public addNewItem(list: ItemType) {
// //         const listToAdd = list === 'category' ? this.categories : this.paymentMethods;

// //         listToAdd?.push({ name: '', id: GuidHelper.default });

// //         this.changeDetectorRef.detectChanges();

// //         if (list === 'category') {
// //             this.categoryInputs?.last?.focus();
// //         } else {
// //             this.paymentMethodInputs?.last?.focus();
// //         }
// //     }
// // }
