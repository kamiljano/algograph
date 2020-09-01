import {Tree} from "../../../lib/tree/Tree";

describe('Given a tree', () => {

    const tree = new Tree<number>({
        value: 1,
        children: [
            {
                value: 2,
                children: [
                    {
                        value: 4,
                    },
                    {
                        value: 5,
                    }
                ]
            },
            {
                value: 3,
                children: [
                    {
                        value: 6
                    }
                ]
            }
        ]
    });

    describe('When traversing it', () => {

        test('depth first, Then it gets successfully traversed', () => {
            const result: number[] = [];
            tree.traverse.depthFirst.forEach(node => result.push(node.value));
            expect(result).toEqual([1, 2, 4, 5, 3, 6]);
        });

        test('breadth first, Then it gets successfully traversed', () => {
            const result: number[] = [];
            tree.traverse.breadthFirst.forEach(node => result.push(node.value));
            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });

    });

});