import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

interface BuildOptions {
	exclude: string[];
	validators: ValidationErrors;
	specificValidators: SpecificValidators;
}

interface SpecificValidators {
	[key: string]: ValidationErrors;
}

interface AllValidators {
	validators: ValidationErrors;
	exclude?: string[]
}

const messageErrors: any[] = [];

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

	public static build<T>(item: T, options: Partial<BuildOptions>): FormGroup {
		const controls: {[key: string]: FormControl} = {};
		const object = item as object;

		Object.keys(object)
			.filter(key => options.exclude ? !options.exclude.includes(key) : key)
			.forEach(item => {
				const key = item as keyof typeof object;
				const validators = this.buildValidators(options, key);

				controls[key] = new FormControl(object[key], validators);
			});

		return new FormGroup(controls);
	}

	private static buildValidators(options: Partial<BuildOptions>, key: string): ValidationErrors {
		const allValidators = options.validators ?? [];
		const specificValidator = options.specificValidators?.[key] ? options.specificValidators[key] : [] as ValidationErrors;

		const validators: any = [];

		// Object.keys(allValidators).forEach((allKey) => {
		// 	if (!options.validators?.exclude?.includes(key)) validators.push(allValidators[allKey]);
		// });

		Object.keys(specificValidator).forEach((specificKey) => validators.push(specificValidator[specificKey]));

		return validators;
	}
}
