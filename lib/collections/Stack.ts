import {LinkedList} from "./LinkedList";

export class Stack<T> {

    private readonly list: LinkedList<T>;

    constructor(elements: T[] = []) {
        this.list = new LinkedList<T>(elements);
    }

    get length() {
        return this.list.length;
    }

    get size() {
        return this.list.length;
    }

    pop(): T | undefined {
        const result = this.list.last;
        this.list.remove(this.list.size - 1);
        return result;
    }

    add(element: T): this {
        this.list.add(element);
        return this;
    }

    addAll(iterable: Iterable<T>): this {
        this.list.addAll(iterable);
        return this;
    }
}
