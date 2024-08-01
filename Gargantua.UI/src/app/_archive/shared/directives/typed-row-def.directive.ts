import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatRowDef, MatTable } from '@angular/material/table';
import { TypeSafeMatCellDef } from './typed-cell-def.directive';

@Directive({
    selector: '[matRowDef]',
    providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }],
    standalone: true,
})
export class TypeSafeMatRowDef<T> extends MatRowDef<T> {
    // leveraging syntactic-sugar syntax when we use *matCellDef
    @Input() public matRowDefTable?: MatTable<T>;

    // ngTemplateContextGuard flag to help with the Language Service
    public static ngTemplateContextGuard<T>(dir: TypeSafeMatRowDef<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
        return true;
    }
}
