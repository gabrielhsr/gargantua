import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Directives
import { AutocompleteDisableDirective } from './directives/autocomplete-disable.directive';
import { LoadingDirective } from './directives/loading.directive';
import { PreventDefaultDirective } from './directives/prevent-default.directive';
import { TypeSafeMatCellDef } from './directives/type-safe-mat-cell-def.directive';

// Pipes

// Services

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PeriodSelectComponent } from './components/period-select/period-select.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { YesOrNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';

// Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SearchableAutocompleteComponent } from './components/searchable-autocomplete/searchable-autocomplete.component';
import { MaterialModule } from './material/material.module';
import { EmptyPipe } from './pipes/empty.pipe';


@NgModule({
    declarations: [
        // Directives
        TypeSafeMatCellDef,
        AutocompleteDisableDirective,
        LoadingDirective,
        PreventDefaultDirective,

        // Pipes
        EmptyPipe,

        // Components
        TopbarComponent,
        SidebarComponent,
        ConfirmDialogComponent,
        PeriodSelectComponent,
        YesOrNoDialogComponent,
        SearchableAutocompleteComponent
    ],
    imports: [
        // Modules
        CommonModule,
        MaterialModule,
        RouterModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        TranslateModule,
        MatProgressSpinnerModule
    ],
    exports: [
        // Modules
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CurrencyMaskModule,
        TranslateModule,

        // Directives
        TypeSafeMatCellDef,
        AutocompleteDisableDirective,
        LoadingDirective,
        PreventDefaultDirective,

        // Pipes
        EmptyPipe,

        // Components
        TopbarComponent,
        SidebarComponent,
        PeriodSelectComponent,
        SearchableAutocompleteComponent
    ],
    providers: []
})
export class SharedModule {}
