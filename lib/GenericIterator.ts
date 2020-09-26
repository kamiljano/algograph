type ForEachConsumer<T> = (value: T) => any;
type Mapping<T, R> = (value: T) => R;

export class GenericIterator<T> implements Iterable<T>{

    protected constructor(private readonly _iteratorGetter: () => Iterator<T>) {}

    [Symbol.iterator](): Iterator<T> {
        return this._iteratorGetter();
    }

    forEach(consumer: ForEachConsumer<T>): void {
        for (let e of this) {
            consumer(e);
        }
    }

    map<R>(map: Mapping<T, R>): R[] {
        const result: R[] = [];
        for (let e of this) {
            result.push(map(e));
        }
        return result;
    }
}