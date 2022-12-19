import { BaseEntity } from "../base.model";

export class Category extends BaseEntity {
	name: string = '';
}

export interface CategoryDto {
	id: string;
	name: string;
}
