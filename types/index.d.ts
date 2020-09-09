export function get<T> (obj: object, path: string, defaultValue?: T): T;
export function set<T> (obj: object, path: string, value: T): T;
export function del (obj: object, path: string): boolean;
export function has (obj: object, path: string): boolean;
