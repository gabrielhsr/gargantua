import { BaseEntity } from '../base.model';

export class Category extends BaseEntity {
    public Name: string = '';
    public Icon: string = '';
    public Color: string = '';

    constructor(name?: string) {
        super();

        this.Name = name ?? '';
    }
}
