import {TreeNode} from "./TreeNode";
import {TraversalWrapper} from "./TraversalWrapper";

export class BFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(readonly node: TreeNode<T>) {
        super();
    }

    [Symbol.iterator](): Iterator<TreeNode<T>> {
        let fifo: TreeNode<T>[] = [this.node];

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = fifo.shift() as TreeNode<T>;
                element?.children?.forEach(child => fifo.push(child));
                return {
                    value: element,
                    done: !fifo.length && !element
                };
            },
        };
    }
}
