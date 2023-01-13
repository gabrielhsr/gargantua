// [...Object.keys(new Expense()), 'options'].filter((x) => x !== 'id')

interface Options {
	remove: string[];
	include: string[];
}

export class TableHelper {
	public static GenerateColumns(item: object, options: Partial<Options>) {
		const itemKeys = Object.keys(item);
		const include = options.include ?? [];

		return [...itemKeys, ...include].filter((x) => !options.remove?.includes(x));
	}
}
