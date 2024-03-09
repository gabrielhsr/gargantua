// // import { Injectable } from '@angular/core';
// // import { MatDialog } from '@angular/material/dialog';
// // import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
// // import { PaymentMethodEndpoint } from 'src/app/domain/payment-method/payment-method.endpoint';
// // import { PaymentMethod } from 'src/app/domain/payment-method/payment-method.model';
// // import { RefreshService } from 'src/app/shared/services/refresh.service';
// // import { PaymentMethodDialogComponent } from '../components/payment-method-dialog/payment-method-dialog.component';

// // @Injectable({
// //     providedIn: 'root'
// // })
// // export class ConfigService {
// //     constructor(
// //         private readonly categoryEndpoint: CategoryEndpoint,
// //         private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
// //         private readonly dialog: MatDialog,
// //         private readonly update: RefreshService
// //     ) {}

// //     public getAllCategories() {
// //         return this.update.handle(this.categoryEndpoint.get());
// //     }

// //     public getAllPaymentMethods() {
// //         return this.update.handle(this.paymentMethodEndpoint.get());
// //     }

// //     public openPaymentMethodDialog(paymentMethod: PaymentMethod) {
// //         this.dialog.open(PaymentMethodDialogComponent, { data: paymentMethod, panelClass: ['responsive-dialog'] })
// //     }
// // }
