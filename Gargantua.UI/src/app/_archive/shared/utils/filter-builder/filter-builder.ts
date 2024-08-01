export type OperatorExpression = (obj: ODataOperators) => string;
export type AllowedValues = string | number | boolean | OperatorExpression;
export type AllowedProperties = string | OperatorExpression;

export const REPLACEABLE_KEY = '{replace}';

export class ODataOperators {
    constructor(private readonly normalize: boolean = false) {}

    public toLower(target: string) {
        return this.normalize ? `toLower('${target}')` : `toLower(${target})`;
    }

    public toUpper(target: string) {
        return this.normalize ? `toUpper('${target}')` : `toUpper(${target})`;
    }
}

export class FilterBuilder {
    private rules: string[] = [];

    public eq(property: AllowedProperties, value: AllowedValues) {
        const propertyIsExpression = typeof property === 'function';
        const valueIsExpression = typeof value === 'function';

        const parsedProperty = propertyIsExpression ? property(new ODataOperators()) : property;
        const parsedValue = valueIsExpression ? value(new ODataOperators(true)) : value;

        const originalValueIsString = typeof value === 'string';
        const normalizedValue = originalValueIsString ? `'${parsedValue.toString()}'` : parsedValue;

        this.rules.push(`(${parsedProperty} eq ${normalizedValue})`);

        return this;
    }

    public contains(property: AllowedProperties, value?: AllowedValues) {
        const propertyIsExpression = typeof property === 'function';
        const valueIsExpression = typeof value === 'function';

        const parsedProperty = propertyIsExpression ? property(new ODataOperators()) : property;
        const parsedValue = valueIsExpression ? value(new ODataOperators(true)) : value ? value : `'${REPLACEABLE_KEY}'`;

        const originalValueIsString = typeof value === 'string';
        const normalizedValue = originalValueIsString ? `'${parsedValue.toString()}'` : parsedValue;

        this.rules.push(`(contains(${parsedProperty}, ${normalizedValue}))`);

        return this;
    }

    public build(condition?: 'or' | 'and') {
        if (this.rules.length > 1 && !condition) {
            throw new Error('FilterBuilder with more than one rule. The condition is required.');
        }

        return `(${this.rules.join(` ${condition} `)})`;
    }
}