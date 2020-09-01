import {Tree} from "../../../lib/tree/Tree";

describe('Given a tree', () => {

    describe('When requesting the depth', () => {

        test('of an empty tree, Then the depth is 0', () => {
            expect(new Tree().depth).toBe(0);
        });

        test('of 1-element tree, Then the depth is 1', () => {
            expect(new Tree({
                value: 1
            }).depth).toBe(1);
        });

        test('of 1-element tree with 1 child, Then the depth is 2', () => {
            expect(new Tree({
                value: 1,
                children: [
                    {
                        value: 1
                    }
                ]
            }).depth).toBe(2);
        });

        test('of 1-element tree with 2 children, Then the depth is 2', () => {
            expect(new Tree({
                value: 1,
                children: [
                    {
                        value: 1
                    },
                    {
                        value: 1
                    }
                ]
            }).depth).toBe(2);
        });

        test('of a tree of depth 3, Then the returned depth is 3', () => {
            expect(new Tree({
                value: 1,
                children: [
                    {
                        value: 1,
                        children: [
                            {
                                value: 1
                            }
                        ]
                    }
                ]
            }).depth).toBe(3);

            expect(new Tree({
                value: 1,
                children: [
                    {
                        value: 1
                    },
                    {
                        value: 1,
                        children: [
                            {
                                value: 1
                            },
                            {
                                value: 1
                            }
                        ]
                    }
                ]
            }).depth).toBe(3);
        });

        test('of a tree of depth 4, Then the returned depth is 4', () => {
            expect(new Tree({
                value: 1,
                children: [
                    {
                        value: 1,
                        children: [
                            {
                                value: 1,
                                children: [
                                    {
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }).depth).toBe(4);
        });
    });

    describe('When traversing it', () => {

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

        test('and it has no elements, Then loop is never executed', () => {
            const result: number[] = [];
            new Tree<number>().traverse.depthFirst.forEach(node => result.push(node.value));
            expect(result).toEqual([]);
        });

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