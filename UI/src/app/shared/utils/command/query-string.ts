const FILTER_KEY = '$filter';
const TOP_KEY = '$top';
const COUNT_KEY = '$count';
const SKIP_KEY = '$skip';

export interface ODataOptions {
    top?: number;
    count?: boolean;
    skip?: number;
    filter?: string;
}

export class QueryString {
    private readonly parameters = new Map<string, string>();

    public value = '';

    public buildUrl(baseUrl: string) {
        const hasParameter = this.parameters.size >= 1;

        return hasParameter ? `${baseUrl}?${this.buildQueryString()}` : baseUrl;
    }

    public addParam(parameter: string, value: string | boolean | number) {
        this.parameters.set(parameter, value.toString());
    }

    public setParams(params: ODataOptions) {
        if (params.top) {
            this.top(params.top);
        }

        if (params.count) {
            this.count();
        }

        if (params.skip) {
            this.top(params.skip);
        }

        if (params.filter) {
            this.filter(params.filter);
        }
    }

    public count(value: boolean = true) {
        this.parameters.set(COUNT_KEY, value.toString());
    }

    public top(value?: number) {
        if (value === undefined || value === null) {
            this.parameters.delete(TOP_KEY);
        } else {
            this.parameters.set(TOP_KEY, value.toString());
        }
    }

    public skip(value?: number) {
        if (value) {
            this.parameters.set(SKIP_KEY, value.toString());
        } else {
            this.parameters.delete(SKIP_KEY);
        }
    }

    public filter(expression?: string) {
        if (expression) {
            this.parameters.set(FILTER_KEY, expression);
        } else {
            this.parameters.delete(FILTER_KEY);
        }
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