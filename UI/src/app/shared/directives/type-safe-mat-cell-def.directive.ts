
import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';

import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Directive({
	selector: '[matCellDef]',
	providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }]
})
export class TypeSafeMatCellDef<T> extends MatCellDef {
	@Input() public matCellDefDataSouce?: T[] | Observable<T[]> | MatTableDataSource<T>;

	public static ngTemplateContextGuard<T>(dir: TypeSafeMatCellDef<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
		return true
	}
}
