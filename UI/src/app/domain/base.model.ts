export class Guid {
    public static default = '00000000-0000-0000-0000-000000000000';

    public static new(): string {
        return crypto.randomUUID();
    }

    public static isNullOrDefault(id: string): boolean {
        return id === this.default || id === null;
    }
}

export abstract class BaseEntity {
    public id: string = Guid.default;

    public get className(): string {
        const activatorName = this?.constructor?.name;

        if (!activatorName) {
            throw new Error('Cannot get the BaseEntity type name.');
        }

        return activatorName;
    }
}

export interface OdataResponse<T> {
    count?: boolean;
    value: T[];
}