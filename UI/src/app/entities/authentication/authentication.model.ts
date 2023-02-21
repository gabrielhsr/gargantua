export class Login {
	email: string = '';
	password: string = '';
}

export interface AuthenticatedResponse {
	token: string;
}
