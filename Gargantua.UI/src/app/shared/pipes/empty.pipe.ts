import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'empty',
    standalone: true
})
export class EmptyPipe implements PipeTransform {
    public transform(value?: string | number | null): string | number {
        return value ? value : '-';
    }
}
