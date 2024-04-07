// export type AllowedValues = string | number | boolean;

// export type PropertyExpression = (obj: ODataFunctions) => string;

// export class ODataFunctions {
//     public toLower(property: string | PropertyExpression) {
//         return '';
//     }

//     public toUpper(property: string | PropertyExpression) {
//         return '';
//     }
// }

// export class FilterBuilder {
//     private rules: string[] = [];

//     public eq(property: PropertyExpression | string, value: AllowedValues) {
//         if (typeof property === 'function') {
//             console.log(property(value));
//         }

//         const isString = typeof value === 'string';
//         const normalizedValue = isString ? `'${value.toString()}'` : value;

//         this.rules.push(`(${property} eq ${normalizedValue})`);

//         return this;
//     }

//     public build(condition: 'or' | 'and') {
//         return `(${this.rules.join(` ${condition} `)})`;
//     }
// }