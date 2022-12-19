import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
	public categories =  this.homeService.getCategories();
	public paymentMethods = this.homeService.getPaymentMethods();

	constructor(private readonly homeService: HomeService) {}

	ngOnInit(): void {	}
}
