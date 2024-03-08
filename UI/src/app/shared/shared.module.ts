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
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from './material/material.module';


@NgModule({
    declarations: [
        // Directives
        TypeSafeMatCellDef,
        AutocompleteDisableDirective,
        LoadingDirective,
        PreventDefaultDirective,

        // Pipes

        // Components
        TopbarComponent,
        SidebarComponent,
        ConfirmDialogComponent,
        PeriodSelectComponent,
        YesOrNoDialogComponent
    ],
    imports: [
        // Modules
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
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

        // Components
        TopbarComponent,
        SidebarComponent,
        PeriodSelectComponent
    ],
    providers: []
})
export class SharedModule {}
