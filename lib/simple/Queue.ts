export class Queue<T> {

    constructor(private readonly elements: T[] = []) {}

    get length() {
        return this.elements.length;
    }

    get size() {
        return this.elements.length;
    }

    add(element: T) {
        this.elements.push(element);
    }

    /**
     * Retrieves the element and removes it from the queue
     */
    poll(): T | undefined{
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}
