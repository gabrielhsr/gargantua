import { BaseEntity } from '../base.model';

export class Movement extends BaseEntity {
    public description: string = '';
    public displayDescription: string = '';
    public amount: number | null = null;
    public periodic: boolean = false;
    public recurrentId: string | null = null;
    public installments: number = 1;
    public monthInterval: number = 1;
    public paid: boolean = false;
}
