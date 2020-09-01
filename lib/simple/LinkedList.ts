interface Element<T> {
    readonly value: T;
    previous?: Element<T>;
    next?: Element<T>
}

export class LinkedList<T> implements Iterable<T> {
    private _first?: Element<T>;
    private _last?: Element<T>;
    private _size = 0;

    //TODO: reverse()
    //TODO: all array methods

    constructor(iterable?: Iterable<T>) {
        if (iterable) {
            this.addAll(iterable);
        }
    }

    get size() {
        return this._size;
    }

    get length() {
        return this._size;
    }

    get isEmpty() {
        return this._size === 0;
    }

    get first(): T | undefined {
        return this._first?.value;
    }

    get last(): T | undefined {
        return this._last?.value;
    }

    add(value: T): this {
        const element: Element<T> = {
            value,
            previous: this._last
        }
        if (this.isEmpty) {
            this._first = element;
            this._last = element;
        } else {
            (this._last as Element<T>).next = element;
            element.previous = this._last;
            this._last = element;
        }
        this._size++;
        return this;
    }

    addAll(iterable: Iterable<T>): this {
        for (let e of iterable) {
            this.add(e);
        }
        return this;
    }

    private getElement(id: number): Element<T> | undefined {
        if (id < 0 || id >= this._size) {
            return undefined;
        }

        let current = this._first;
        let currentId = 0;
        while (currentId < id) {
            currentId ++;
            current = current?.next;
        }
        return current;
    }

    get(id: number): T | undefined {
        return this.getElement(id)?.value;
    }

    remove(id: number): this {
        const element = this.getElement(id);

        if (element) {
            this._size --;
            if (element.previous) {
                element.previous.next = element.next;
            } else {
                this._first = element.next;
            }
            if (element.next) {
                element.next.previous = element.previous;
            } else {
                this._last = element.previous;
            }
        }

        return this;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        let nextElement: Element<T> | undefined = this._first;
        return {
            next: function () {
                if (nextElement) {
                    const result = {
                        value: nextElement.value,
                        done: false
                    };
                    nextElement = nextElement.next;
                    return result;
                }

                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
}