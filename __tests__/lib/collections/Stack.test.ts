import {Stack} from "../../../lib/collections/Stack";

describe('Given a stack', () => {

    test('When adding a new element, This is the first element to be retrieved', () => {
        const stack = new Stack<number>();
        stack.add(2);
        stack.add(3);

        const element = stack.pop();
        expect(element).toBe(3);
        expect(stack.size).toBe(1);
        expect(stack.length).toBe(1);
    });

});