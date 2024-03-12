export function toTitleCase(str: string): string {
    return str.replace(/\b\w/g, (s) => s.toUpperCase());
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
