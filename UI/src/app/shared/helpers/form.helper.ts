import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { TranslateService } from "../translate/translate.service";

interface buildOptions {
	object: object;
	exclude?: string[];
	allValidators?: AllValidators;
	specificValidators?: SpecificValidators;
}

interface SpecificValidators {
	[key: string]: ValidationErrors;
}

interface AllValidators {
	validators: ValidationErrors;
	exclude?: string[]
}

const messageErrors = new TranslateService().instant('ErrorMessage');

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

	public static build(options: buildOptions) {
		const formObj: {[key: string]: FormControl} = {};

		Object.keys(options.object)
			.filter(key => options.exclude ? !options.exclude.includes(key) : key)
			.forEach(item => {
				const key = item as keyof typeof options.object;
				const validators = this.buildValidators(options, key);

				formObj[key] = new FormControl(options.object[key], validators);
			})

		return formObj;
	}

	private static buildValidators(options: buildOptions, key: string): ValidationErrors {
		const allValidators = options.allValidators?.validators ?? [];
		const specificValidator = options.specificValidators?.[key] ? options.specificValidators[key] : [];

		const validators: any = [];

		Object.keys(allValidators).forEach((allKey) => {
			if (!options.allValidators?.exclude?.includes(key)) validators.push(allValidators[allKey]);
		});

		Object.keys(specificValidator).forEach((specificKey) => validators.push(specificValidator[specificKey]));

		return validators;
	}
}
