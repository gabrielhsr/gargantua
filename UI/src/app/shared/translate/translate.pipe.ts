import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({	name: 'translate' })
export class TranslatePipe implements PipeTransform {
	constructor(private translationService: TranslateService) {}

	public transform(value: string): string {
		return this.translationService.instant(value);
	}
}
