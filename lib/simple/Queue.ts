export class Queue<T> {

    constructor(private readonly elements: T[] = []) {}

    get length() {
        return this.elements.length;
    }

    push(element: T) {
        this.elements.push(element);
    }

    shift() {
        return this.elements.shift();
    }
}
