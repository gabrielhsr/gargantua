import { IQueryString, QueryString } from '../base/query-string';

const ODATA_FILTER_KEY = '$filter';
const ODATA_TOP_KEY = '$top';
const ODATA_COUNT_KEY = '$count';
const ODATA_SKIP_KEY = '$skip';
const ODATA_EXPAND_KEY = '$expand';

export interface ODataOptions {
    top?: number;
    count?: boolean;
    skip?: number;
    filter?: string;
    expand?: string;
}

export interface IODataQueryString extends IQueryString {
    setParams: (params: ODataOptions) => void;
    count: (value: boolean) => void;
    top: (value?: number) => void;
    skip: (value?: number) => void;
    filter: (expression?: string) => void;
    expand: (expression?: string) => void;
}

export class ODataQueryString extends QueryString implements IODataQueryString {
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

        if (params.expand) {
            this.expand(params.expand);
        }
    }

    public count(value: boolean = true) {
        this.parameters.set(ODATA_COUNT_KEY, value.toString());
    }

    public top(value?: number) {
        if (value === undefined || value === null) {
            this.parameters.delete(ODATA_TOP_KEY);
        } else {
            this.parameters.set(ODATA_TOP_KEY, value.toString());
        }
    }

    public skip(value?: number) {
        if (value) {
            this.parameters.set(ODATA_SKIP_KEY, value.toString());
        } else {
            this.parameters.delete(ODATA_SKIP_KEY);
        }
    }

    public filter(expression?: string) {
        if (expression) {
            this.parameters.set(ODATA_FILTER_KEY, expression);
        } else {
            this.parameters.delete(ODATA_FILTER_KEY);
        }
    }

    public expand(expression?: string) {
        if (expression) {
            this.parameters.set(ODATA_EXPAND_KEY, expression);
        } else {
            this.parameters.delete(ODATA_EXPAND_KEY);
        }
    }
}