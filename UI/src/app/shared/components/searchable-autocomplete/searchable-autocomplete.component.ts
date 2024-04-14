import { Component, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { BaseEntity, ODataResponse } from 'src/app/domain/base.model';
import { FeedbackService } from '../../services/feedback.service';
import { REPLACEABLE_KEY } from '../../utils/command/filter-builder';
import { QueryCommand } from '../../utils/command/query-command';

@Component({
    selector: 'searchable-autocomplete',
    templateUrl: './searchable-autocomplete.component.html',
    styleUrls: ['./searchable-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SearchableAutocompleteComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: SearchableAutocompleteComponent
        }
    ],
})
export class SearchableAutocompleteComponent<TEntity extends BaseEntity> implements ControlValueAccessor, OnInit, OnDestroy {
    @ViewChild(FormControlDirective, { static: true }) private formControlDirective?: FormControlDirective;

    private readonly destroy$ = new Subject<void>();

    private readonly controlContainer = inject(ControlContainer);
    
    protected readonly feedbackService = inject(FeedbackService);

    @Input() public queryCommand?: QueryCommand<ODataResponse<TEntity>>;
    @Input() public label: string = 'no-label';
    @Input() public placeholder: string = '';

    @Input() public queryString?: string;
    @Input() public formControl?: FormControl;
    @Input() public formControlName?: string;
    @Input() public displayWith?: ((value: unknown) => string) | string = 'Id';

    protected get control(): FormControl {
        if ((!this.formControl && !this.formControlName) || !this.formControlName) {
            throw new Error('No formControl or formControlName directive informed!');
        }

        const formControl = this.controlContainer.control?.get(this.formControlName);

        if (!formControl) {
            throw new Error(`Unable to find the control with the name "${this.formControlName}"`);
        }

        if (!(formControl instanceof FormControl)) {
            throw new Error('Informed control is not a FormControl');
        }

        return this.formControl || formControl;
    }

    protected get commandList() {
        return this.queryCommand?.response.data?.value ?? [];
    }

    protected get formValue() {
        return this.control.value;
    }

    protected get commandIsLoading() {
        return this.queryCommand?.isLoading;
    }

    protected get hasValueInResponse() {
        return this.queryCommand?.response.data?.count;
    }

    protected get hasFilter() {
        return this.queryCommand?.queryString.value.includes('$filter');
    }

    public ngOnInit() {
        this.control.valueChanges
            .pipe(debounceTime(400), takeUntil(this.destroy$))
            .subscribe(() => this.handleSearch());
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public writeValue(obj: TEntity): void {
        this.formControlDirective?.valueAccessor?.writeValue(obj);
    }

    public registerOnChange(fn: unknown): void {
        this.formControlDirective?.valueAccessor?.registerOnChange(fn);
    }

    public registerOnTouched(fn: unknown): void {
        this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.formControlDirective?.valueAccessor?.setDisabledState?.(isDisabled);
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        this.formControlDirective?.validator?.(control);

        return this.formControlDirective?.errors ?? null;
    }

    protected renderItem(item: TEntity) {
        if (!item || !this.displayWith) return '';

        const displayWith = this.displayWith;
        const isFunction = typeof displayWith === 'function';

        return isFunction ? displayWith(item) : item[displayWith as keyof TEntity] as string;
    }

    protected clearControl() {
        this.control.patchValue(null);
    }

    private handleSearch() {
        if (this.formValue && typeof this.formValue === 'object') {
            return;
        }

        if (this.queryString) {
            if (this.formValue) {
                this.queryCommand?.queryString.filter(this.queryString.replace(REPLACEABLE_KEY, this.formValue));
            } else {
                this.queryCommand?.queryString.filter();
            }
        }

        this.queryCommand?.execute();
    }
}
