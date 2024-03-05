export class Login {
	public email: string = '';
	public password: string = '';
}

export interface AuthRes {
	token: string;
}
