import {LinkedList} from "../../../lib/simple/LinkedList";

describe('Given a LinkedList', () => {

    describe('When initializing it with no constructor parameters', () => {
        test('Then the size is 0', () => {
            expect(new LinkedList<number>().size).toEqual(0);
            expect(new LinkedList<number>().length).toEqual(0);
        });

        test('Then adding a new parameter increments the size by 1', () => {
            expect(new LinkedList<number>().add(2).size).toEqual(1);
            expect(new LinkedList<number>().add(2).add(3).size).toEqual(2);
        });
    });

    describe('When initializing it with the constructor parameter', () => {

        test('as array, Then the list is instantly initialized with the right size', () => {
           expect(new LinkedList<number>([1, 2, 3])).toHaveLength(3);
        });

        test('as set, Then the list is instantly initialized with the right size', () => {
            expect(new LinkedList<number>(new Set<number>([1, 2, 3]))).toHaveLength(3);
        });

        test('as another LinkedList, Then the list is instantly initialized with the right size', () => {
            expect(new LinkedList<number>(new LinkedList<number>([1, 2, 3]))).toHaveLength(3);
        });
    });

    test('When iterating through the list, all elements are properly listed', () => {
        const initial = [1, 2, 3];
        const list = new LinkedList<number>(initial);
        const result = [];

        for (let element of list) {
            result.push(element);
        }

        expect(result).toEqual(initial);
    });

    test('When converting to an array, then all elements are successfully copied', () => {
        const initial = [1, 2, 3];
        const arr = Array.from(new LinkedList<number>(initial));

        expect(arr).toEqual(initial);
    });

    describe('When getting an element', () => {

        const list: LinkedList<number> = new LinkedList<number>([1, 2, 3]);

        test('using a sub-zer id, then the returned value is undefined', () => {
            expect(list.get(-1)).toBeUndefined();
        });

        test('using a sub-zer id, then the returned value is undefined', () => {
            expect(list.get(3)).toBeUndefined();
        });

        test('usinga a valid id, then the value with matching id is returned', () => {
            expect(list.get(0)).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.get(2)).toBe(3);
        });
    });

    describe('When removing', () => {

        let list: LinkedList<number>;

        beforeEach(() => {
            list = new LinkedList<number>([1, 2, 3]);
        });

        test('an element, then the size is updated accordingly', () => {
            expect(Array.from(list.remove(0))).toHaveLength(2);
        });

        test('First element, Then it is successfully removed', () => {
            expect(Array.from(list.remove(0))).toEqual([2, 3]);
        });

        test('middle element, Then it is successfully removed', () => {
            expect(Array.from(list.remove(1))).toEqual([1, 3]);
        });

        test('last element, Then it is successfully removed', () => {
            expect(Array.from(list.remove(2))).toEqual([1, 2]);
        });
    });
});