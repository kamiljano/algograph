import {TreeNode} from "../../../lib/tree/TreeNode";
import {traverse} from "../../../lib/tree/traverse";

describe('Given a tree', () => {

    describe('defined as a graph', () => {

        const root: TreeNode<number> = {
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
        };

        test('When traversing the tree using the DFS strategy', () => {
            const result: number[] = [];
            traverse(root).dfs.forEach(node => result.push(node.value));
            expect(result).toEqual([1, 2, 4, 5, 3, 6]);
        });

        test('When traversing the tree using the BFS strategy', () => {
            const result: number[] = [];
            traverse(root).bfs.forEach(node => result.push(node.value));
            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });

    });

});
