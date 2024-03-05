import { FormGroup } from "@angular/forms";

const messageErrors: string[] = [];

export class FormHelper {
	public static showErrorMessage(input: string, form: FormGroup) {
		if (!input) {
			console.error('Field empty!');
			return;
		}

		const field = form.get(input);

		if (field) {
			const key = (field.errors ? Object.keys(field.errors)[0] : '') as keyof typeof messageErrors;

			if (!messageErrors[key] && key) {
				return key;
			}

			return messageErrors[key];
		}

		console.error(`Field '${input} does not exist in the form.`);
		return '';
	}
}
