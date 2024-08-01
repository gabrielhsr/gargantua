import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { TypeSafeMatCellDef } from 'src/app/shared/directives/typed-cell-def.directive';
import { TypeSafeMatRowDef } from 'src/app/shared/directives/typed-row-def.directive';
import { EmptyPipe } from 'src/app/shared/pipes/empty.pipe';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        EmptyPipe,
        TranslateModule,
        TypeSafeMatCellDef,
        TypeSafeMatRowDef
    ]
})
export class CategoryComponent implements OnInit {
    protected categoryCommand = this.categoryEndpoint.getODataCommand();
    protected displayedColumns = ['Name', 'Icon', 'Color'];

    constructor(private readonly categoryEndpoint: CategoryEndpoint) {}

    public get categoryDataSource() {
        return this.categoryCommand.getOdataDataSource();
    }

    public ngOnInit() {
        this.categoryCommand.execute();
    }
}
