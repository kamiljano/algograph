import {TreeNode} from "./TreeNode";
import {TraversalWrapper} from "./TraversalWrapper";
import {Queue} from '../simple/Queue';

export class BFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(readonly node: TreeNode<T>) {
        super();
    }

    [Symbol.iterator](): Iterator<TreeNode<T>> {
        const queue = new Queue<TreeNode<T>>([this.node]);

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = queue.shift() as TreeNode<T>;
                element?.children?.forEach(child => queue.push(child));
                return {
                    value: element,
                    done: !queue.length && !element
                };
            },
        };
    }
}
