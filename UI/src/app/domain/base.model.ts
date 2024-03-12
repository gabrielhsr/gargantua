export abstract class BaseEntity {
    public id: string = Guid.default;
}

export class Guid {
    public static default = '00000000-0000-0000-0000-000000000000';

    public static new(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            (c) => {
                const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;

                return v.toString(16);
            }
        );
    }

    public static isNullOrDefault(id: string): boolean {
        return id === this.default || id === null;
    }
}
