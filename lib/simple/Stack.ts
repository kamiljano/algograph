export class Stack<T> {

    constructor(private readonly elements: T[] = []) {}

    get length() {
        return this.elements.length;
    }

    pop() {
        return this.elements.pop();
    }

    push(element: T) {
        this.elements.push(element);
    }
}
