import {Queue} from '../../../';

describe('Given a queue', () => {

    test('When polling an element from an empty queue, then the returned value is "undefined"', () => {
        expect(new Queue().poll()).toBeUndefined();
    });

    test('When adding something to the queue, Then it is retrievable', () => {
        const queue = new Queue<number>();
        queue.add(11);
        queue.add(12);

        expect(queue.length).toBe(2);
        expect(queue.size).toBe(2);
        expect(queue.isEmpty).toBe(false);

        const element = queue.poll();
        expect(element).toBe(11);

        expect(queue.length).toBe(1);
    });

});