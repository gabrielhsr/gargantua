import { FormControl } from "@angular/forms";

interface buildOptions {
	object: object;
	exclude?: string[]
}

export class FormHelper {
	public static build(options: buildOptions) {
		const formObj: {[key: string]: FormControl} = {};

		Object.keys(options.object)
			.filter(key => options.exclude ? !options.exclude.includes(key) : key)
			.forEach(key => {
				formObj[key] = new FormControl()
			})

		return formObj;
	}
}
