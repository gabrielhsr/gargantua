import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { PaymentMethod } from './payment-method.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodEndpoint extends BaseEndpoint<PaymentMethod> {
    public override activator: PaymentMethod = new PaymentMethod();
}
