import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationEndpoint } from 'src/app/domain/authentication/authentication.endpoint';
import { AuthenticationHelper } from 'src/app/shared/helpers/authentication.helper';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
	selector: 'g-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	public hidePassword = true;
	public loginForm: FormGroup = new FormGroup({});

	public validateTokenCommand = this.authenticationEndpoint.validateTokenCommand(() => AuthenticationHelper.getToken());
	public signInCommand = this.authenticationEndpoint.signInCommand(() => this.loginForm?.value);
	public registerCommand = this.authenticationEndpoint.registerCommand(() => this.loginForm?.value);

	private readonly destroy$ = new Subject<void>();

	constructor(
		private readonly authenticationEndpoint: AuthenticationEndpoint,
		private readonly router: Router,
		private readonly feedback: FeedbackService
	) {}

	public get isLoading() {
		return this.validateTokenCommand.isLoading || this.signInCommand.isLoading || this.registerCommand.isLoading;
	}

	public ngOnInit(): void {
		this.createForm();

		this.validateTokenCommand.response$
			.pipe(takeUntil(this.destroy$), filter(({ isSuccess }) => isSuccess))
			.subscribe((res) => {
				if (res.value) {
					this.router.navigate(['home']);
				}
			});

		this.signInCommand.response$
			.pipe(takeUntil(this.destroy$))
			.subscribe((res) => {
				this.feedback.toastErrorResponse(res);

				if (res.isSuccess && res.value) {
					AuthenticationHelper.saveToken(res.value.token);
					this.router.navigate(['home']);
				}
			});

		this.registerCommand.response$
			.pipe(takeUntil(this.destroy$))
			.subscribe((res) => this.feedback.toastResponse(res, "Login.SuccessRegister", "Login.Unauthorized"));

		this.validateTokenCommand.execute();
	}

	public ngOnDestroy(): void {
		this.validateTokenCommand.destroy();
		this.signInCommand.destroy();
		this.registerCommand.destroy();

		this.destroy$.next();
		this.destroy$.complete();
	}

	public showErrorMessage(input: string) {
		return FormHelper.showErrorMessage(input, this.loginForm);
	}

	private createForm(): void {
		this.loginForm.addControl("email", new FormControl('', [Validators.required, Validators.email]));
		this.loginForm.addControl("password", new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]));
	}
}
