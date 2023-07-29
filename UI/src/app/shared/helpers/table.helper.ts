// [...Object.keys(new Expense()), 'options'].filter((x) => x !== 'id')

interface Options {
	exclude: string[];
	include: string[];
}

export class TableHelper {
	public static GenerateColumns(item: object, options: Partial<Options>) {
		const itemKeys = Object.keys(item);
		const include = options.include ?? [];

		return [...itemKeys, ...include].filter((x) => !options.exclude?.includes(x));
	}
}
