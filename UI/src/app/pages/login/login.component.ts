import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Login } from 'src/app/entities/authentication/authentication.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit, OnDestroy {
	public hidePassword = true;
	public loginForm?: FormGroup;
	public loading = false;

	private destroy = new Subject();

	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router
	) {}

	public ngOnInit(): void {
		this.createForm();
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

		this.authenticationService.signIn(formValue)
			.pipe(takeUntil(this.destroy))
			.subscribe((response) => {
				console.log(response);

				if (response.isSuccess) {
					localStorage.setItem('jwt', response.value.token);
					this.router.navigate(['/home']);
				}

				this.loading = false;
			});
	}

	private createForm(): void {
		const formsControl = FormHelper.build(new Login, {
			allValidators: {
				validators: [Validators.required],
			},
			specificValidators: {
				email: [Validators.email],
				password: [Validators.minLength(5), Validators.maxLength(12)]
			}
		});

		this.loginForm = new FormGroup(formsControl);
	}
}
