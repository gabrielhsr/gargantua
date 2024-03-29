// // import { Component, OnDestroy, OnInit } from '@angular/core';
// // import { EMPTY, Subject, lastValueFrom, of, switchMap, takeUntil, tap } from 'rxjs';

// // import { FeedbackService } from 'src/app/shared/services/feedback.service';
// // import { Income } from 'src/app/domain/income/income.model';
// // import { IncomeService } from '../../services/income.service';
// // import { MatTableDataSource } from '@angular/material/table';
// // import { Period } from 'src/app/domain/period/period.model';
// // import { TableHelper } from 'src/app/shared/helpers/table.helper';
// // import { sortingIncomeDataAccessor } from 'src/app/shared/helpers/sort.helper';
// // import { toTitleCase } from 'src/app/shared/helpers/string.helper';

// // const IGNORE_COLUMNS = [
// //     'id',
// //     'periodic',
// //     'recurrentId',
// //     'installments',
// //     'displayDescription',
// //     'monthInterval',
// //     'paid',
// //     'paymentDate',
// // ];
// // export interface SortOption {
// //     text: string;
// //     value: keyof Income;
// //     order?: 'asc' | 'desc';
// // }

// // @Component({
// //     selector: 'income-table',
// //     templateUrl: './income-table.component.html',
// //     styleUrls: ['./income-table.component.scss'],
// // })
// // export class IncomeTableComponent implements OnInit, OnDestroy {
// //     public displayedColumns: string[] = TableHelper.GenerateColumns(new Income(), { exclude: IGNORE_COLUMNS, include: ['options'] });
// //     public periodIncome = new MatTableDataSource<Income>();
// //     public periodSubject = new Subject<Period | undefined>();
// //     public incomeLoading: boolean = true;

// //     private lastSortOption?: SortOption;
// //     private destroy$ = new Subject<void>();

// //     constructor(
// //         private readonly incomeService: IncomeService,
// //         private readonly feedback: FeedbackService
// //     ) {}

// //     public get totalAmount() {
// //         return this.periodIncome.data.map(x => x.amount ?? 0).reduce((acc, val) => acc + val, 0)
// //     };

// //     public get sortOptions(): SortOption[] {
// //         return this.displayedColumns
// //             .filter((column) => column !== 'options')
// //             .map((column) => {
// //                 const defaultOption: SortOption = { text: `Pages.Income.${toTitleCase(column)}`, value: column as keyof Income };
// //                 return column === 'paymentDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
// //             });
// //     }

// //     public ngOnInit() {
// //         this.periodSubject
// //             .pipe(
// //                 tap(() => this.incomeLoading = true),
// //                 switchMap((period) => period ? this.incomeService.getIncomeByPeriod(period) : of(period)),
// //                 takeUntil(this.destroy)
// //             )
// //             .subscribe((res) => {
// //                 if (res?.isSuccess) {
// //                     this.periodIncome.data = res.value;
// //                     this.sort();
// //                 }

// //                 this.incomeLoading = false;
// //             });
// //     }

// //     public ngOnDestroy(): void {
// //         this.destroy.next(null);
// //         this.destroy.complete();
// //     }

// //     public deleteIncome(income: Income) {
// //         // const dialogToOpen = income.recurrentId
// //         //     ? this.feedback.yesOrNoDialog('Pages.Income.Alerts.DeleteRecurrent', 'Common.OnlyMonth', 'Common.Periodic')
// //         //     : this.feedback.confirmCancelDialog(income.description);

// //         this.feedback
// //             .deleteDialog(income.description)
// //             .pipe(
// //                 switchMap((res) => res?.confirm ? this.incomeService.removeIncome(income.id) : EMPTY),
// //                 takeUntil(this.destroy)
// //             )
// //             .subscribe(({ isSuccess }) => {
// //                 if (isSuccess) this.feedback.successToast('Feedback.DeleteSuccess');
// //             });
// //     }

// //     public async editIncome(income: Income) {
// //         if (income.periodic || income.installments > 1) {
// //             const dialog$ = this.feedback.yesOrNoDialog('Pages.Income.EditOption', 'Common.OnlyMonth', 'Common.Periodic');
// //             const response = await lastValueFrom(dialog$);

// //             this.incomeService.openFormDialog(income, response?.confirm);
// //         } else {
// //             this.incomeService.openFormDialog(income);
// //         }
// //     }

// //     public sort(category?: SortOption) {
// //         const sortOption = category ?? this.lastSortOption;

// //         if (!sortOption) return;

// //         this.lastSortOption = sortOption;
// //         this.periodIncome.data = this.periodIncome.data.sort((incomeA, incomeB) => {
// //             const itemA = sortingIncomeDataAccessor(incomeA, sortOption.value);
// //             const itemB = sortingIncomeDataAccessor(incomeB, sortOption.value);

// //             if (itemA && itemB) {
// //                 return sortOption.order === 'asc' ? (itemA < itemB ? -1 : itemA > itemB ? 1 : 0) : (itemA > itemB ? -1 : itemA < itemB ? 1 : 0);
// //             }

// //             throw new Error(`Key named '${sortOption.value}' not finded in object of type 'Income'!`);
// //         });
// //     }
// // }
