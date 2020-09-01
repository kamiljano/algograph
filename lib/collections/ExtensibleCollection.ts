export interface ExtensibleCollection<T> {
    readonly size: number;
    readonly length: number;
    readonly isEmpty: boolean;

    add(value: T): this;
    addAll(iterable: Iterable<T>): this;

    toArray(): T[];
}