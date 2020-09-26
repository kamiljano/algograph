import {GenericTree} from "../../../../lib/tree/generic/GenericTree";

describe('Given a tree', () => {

    describe('When requesting the count', () => {

        test('of an empty tree, Then the count is 0', () => {
            expect(new GenericTree().count).toBe(0);
        });

        test('of a 1-element tree, Then the count is 1', () => {
            expect(new GenericTree({
                value: 1
            }).count).toBe(1);
        });

        test('of a 1-element tree with 3 children, Then the count is 4', () => {
            expect(new GenericTree({
                value: 1,
                children: [
                    {
                        value: 1
                    },
                    {
                        value: 1
                    },
                    {
                        value: 1
                    }
                ]
            }).count).toBe(4);
        });

        test('of a 1-element tree with depth 3, Then the count is 4', () => {
            expect(new GenericTree({
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
            }).count).toBe(4);
        });

    });

    describe('When requesting the depth', () => {

        test('of an empty tree, Then the depth is 0', () => {
            expect(new GenericTree().depth).toBe(0);
        });

        test('of 1-element tree, Then the depth is 1', () => {
            expect(new GenericTree({
                value: 1
            }).depth).toBe(1);
        });

        test('of 1-element tree with 1 child, Then the depth is 2', () => {
            expect(new GenericTree({
                value: 1,
                children: [
                    {
                        value: 1
                    }
                ]
            }).depth).toBe(2);
        });

        test('of 1-element tree with 2 children, Then the depth is 2', () => {
            expect(new GenericTree({
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
            expect(new GenericTree({
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

            expect(new GenericTree({
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
            expect(new GenericTree({
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

    describe('When iterating it', () => {

        const tree = new GenericTree<number>({
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

        describe('depth first', () => {

            describe('using the root iterator', () => {

                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    for (let node of tree) {
                        result.push(node.value);
                    }
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });

                test('Then the path is generated correctly', () => {
                    let result: number[] = [];
                    for (let node of tree) {
                        if (node.value === 6) {
                            result = node.path.map(n => n.value);
                        }
                    }
                    expect(result).toEqual([1, 3, 6]);
                });
            });

            describe('using the iterator.depthFirst iterator', () => {
                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    for (let node of tree.iterator.depthFirst) {
                        result.push(node.value);
                    }
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });
            });

            describe('using the iterator.depthFirst.forEach iterator', () => {
                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    tree.iterator.depthFirst.forEach(node => {
                        result.push(node.value);
                    });
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });
            });

            describe('using the iterator.depthFirst.map iterator', () => {
                const getValues = (tree: GenericTree<number>) => tree.iterator.depthFirst.map(node => node.value);

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });
            });

            describe('using the forEach iterator', () => {
                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    tree.forEach(node => {
                        result.push(node.value);
                    });
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });
            });

            describe('using the map iterator', () => {
                const getValues = (tree: GenericTree<number>) => tree.map(node => node.value);

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 4, 5, 3, 6]);
                });
            });
        });

        describe('breadth first', () => {

            describe('using the iterator.breadthFirst iterator', () => {
                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    for (let node of tree.iterator.breadthFirst) {
                        result.push(node.value);
                    }
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
                });
            });

            describe('using the iterator.breadthFirst.forEach iterator', () => {
                const getValues = (tree: GenericTree<number>) => {
                    const result: number[] = [];
                    tree.iterator.breadthFirst.forEach(node => {
                        result.push(node.value);
                    });
                    return result;
                };

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
                });
            });

            describe('using the iterator.breadthFirst.map iterator', () => {
                const getValues = (tree: GenericTree<number>) => tree.iterator.breadthFirst.map(node => node.value);

                test('and it has no elements, Then loop is never executed', () => {
                    const result = getValues(new GenericTree<number>());

                    expect(result).toEqual([]);
                });

                test('Then all elements are processed depth first', () => {
                    const result = getValues(tree);

                    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
                });
            });
        });

    });

});