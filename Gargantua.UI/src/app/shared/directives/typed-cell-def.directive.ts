import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatCellDef, MatTable } from '@angular/material/table';

@Directive({
    selector: '[matCellDef]',
    providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }],
    standalone: true,
})
export class TypeSafeMatCellDef<T> extends MatCellDef {
    // leveraging syntactic-sugar syntax when we use *matCellDef
    @Input() public matCellDefTable?: MatTable<T>;

    // ngTemplateContextGuard flag to help with the Language Service
    public static ngTemplateContextGuard<T>(dir: TypeSafeMatCellDef<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
        return true;
    }
}
