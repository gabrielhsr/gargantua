import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationEndpoint } from 'src/app/domain/authentication/authentication.endpoint';
import { AuthenticationHelper } from 'src/app/shared/helpers/authentication.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
    selector: 'g-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly authenticationEndpoint = inject(AuthenticationEndpoint);
    private readonly router = inject(Router);

    public readonly feedbackService = inject(FeedbackService);

    public validateTokenCommand = this.authenticationEndpoint.validateTokenCommand(() => AuthenticationHelper.getToken());
    public signInCommand = this.authenticationEndpoint.signInCommand(() => this.loginForm.value);
    public registerCommand = this.authenticationEndpoint.registerCommand(() => this.loginForm.value);
    
    public hidePassword = true;

    public loginForm: FormGroup = new FormGroup({
        Email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        Password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    });

    public get isLoading(): boolean {
        return this.validateTokenCommand.isLoading || this.signInCommand.isLoading || this.registerCommand.isLoading;
    }

    public ngOnInit(): void {
        this.validateTokenCommand.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.feedbackService.toastErrorResponse(res);

                if (res.data) {
                    this.router.navigate(['home']);
                }
            });

        this.signInCommand.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.feedbackService.toastErrorResponse(res);

                if (res.isSuccess && res.data) {
                    AuthenticationHelper.saveToken(res.data.Token);
                    this.router.navigate(['home']);
                }
            });

        this.registerCommand.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => this.feedbackService.toastResponse(res, 'Login.SuccessRegister', 'Login.Unauthorized'));

        this.validateTokenCommand.execute();
    }

    public ngOnDestroy(): void {
        this.validateTokenCommand.destroy();
        this.signInCommand.destroy();
        this.registerCommand.destroy();

        this.destroy$.next();
        this.destroy$.complete();
    }
}
