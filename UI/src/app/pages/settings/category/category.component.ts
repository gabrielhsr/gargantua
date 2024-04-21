import { Component, OnInit } from '@angular/core';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';

@Component({
    selector: 'g-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    protected categoryCommand = this.categoryEndpoint.getODataCommand();
    protected displayedColumns = ['Name', 'Icon', 'Color'];

    constructor(private readonly categoryEndpoint: CategoryEndpoint) {}

    public get categoryDataSource() {
        return this.categoryCommand.dataSource;
    }

    public ngOnInit() {
        this.categoryCommand.execute();
    }
}
