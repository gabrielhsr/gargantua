import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationEndpoint } from 'src/app/entities/authentication/authentication.endpoint';
import { Login } from 'src/app/entities/authentication/authentication.model';
import { AuthenticationHelper } from 'src/app/shared/helpers/authentication.helper';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { TranslateService } from 'src/app/shared/translate/translate.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	public hidePassword = true;
	public loginForm?: FormGroup;
	public loading = false;

	private destroy = new Subject();

	constructor(
		private readonly authenticationEndpoint: AuthenticationEndpoint,
		private readonly router: Router,
		private readonly matSnackBar: MatSnackBar,
		private readonly translate: TranslateService
	) {}

	public ngOnInit(): void {
		this.createForm();

		const token = AuthenticationHelper.getToken();

		if (token) {
			this.loading = true;

			this.authenticationEndpoint.validateToken(token)
				.pipe(takeUntil(this.destroy))
				.subscribe(res => {
					if (res.isSuccess) {
						this.router.navigate(['home']);
					}

					this.loading = false;
				});
		}
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
		this.destroy.complete();
	}

	public showErrorMessage(input: string) {
		if (this.loginForm) {
			return FormHelper.showErrorMessage(input, this.loginForm);
		}

		throw 'Form not initialized!';
	}

	public submitForm(): void {
		this.loading = true;
		const formValue = this.loginForm?.value as Login;

		this.authenticationEndpoint
			.signIn(formValue)
			.pipe(takeUntil(this.destroy))
			.subscribe((response) => {
				if (response.isSuccess) {
					AuthenticationHelper.saveToken(response.value.token);
					this.router.navigate(['home']);
				} else {
					this.matSnackBar.open(this.translate.instant("Pages.Login.Unauthorized"))
				}

				this.loading = false;
			});
	}

	private createForm(): void {
		const formsControl = FormHelper.build(new Login(), {
			allValidators: {
				validators: [Validators.required],
			},
			specificValidators: {
				email: [Validators.email],
				password: [Validators.minLength(5), Validators.maxLength(20)],
			},
		});

		this.loginForm = new FormGroup(formsControl);
	}
}
