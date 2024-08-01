export interface IQueryString {
    parameters: Map<string, string>;
    value: string;
    
    buildUrl: (baseUrl: string) => string;
    addParam: (paramter: string, value: string | boolean | number) => void;
}

export class QueryString implements IQueryString {
    public readonly parameters = new Map<string, string>();

    public value = '';

    public buildUrl(baseUrl: string) {
        const hasParameter = this.parameters.size >= 1;

        return hasParameter ? `${baseUrl}?${this.buildQueryString()}` : baseUrl;
    }

    public addParam(parameter: string, value: string | boolean | number) {
        this.parameters.set(parameter, value.toString());
    }

    private buildQueryString() {
        this.value = '';

        this.parameters.forEach((value, key) => {
            const isFirst = this.value === '';

            this.value += isFirst ? `${key}=${value}` : `&${key}=${value}`;
        });

        return this.value;
    }
}