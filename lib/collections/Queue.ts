import {LinkedList} from "./LinkedList";
import {ArrayLike} from "./ArrayLike";

export class Queue<T> implements ArrayLike<T> {

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

    add(element: T): this {
        this.list.add(element);
        return this;
    }

    addAll(iterable?: Iterable<T>): this {
        this.list.addAll(iterable);
        return this;
    }

    /**
     * Retrieves the element and removes it from the queue
     */
    poll(): T | undefined {
        const element = this.list.first;
        this.list.remove(0);
        return element;
    }

    get isEmpty() {
        return this.list.isEmpty;
    }

    toArray(): T[] {
        return Array.from(this.list);
    }
}
