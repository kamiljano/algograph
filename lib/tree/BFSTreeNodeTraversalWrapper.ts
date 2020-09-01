import {TreeNode} from "./TreeNode";
import {Collection, TraversalWrapper} from "./TraversalWrapper";
import {Queue} from '../simple/Queue';

export class BFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(node: TreeNode<T>) {
        super(node);
    }

    [Symbol.iterator](): Iterator<TreeNode<T>> {
        const queue = new Queue<TreeNode<T>>([this.node]);

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = queue.poll() as TreeNode<T>;
                element?.children?.forEach(child => queue.add(child));
                return {
                    value: element,
                    done: !queue.length && !element
                };
            },
        };
    }

    protected get collection(): Collection<TreeNode<T>> {
        const queue = new Queue<TreeNode<T>>([this.node]);
        return {
            add(element: TreeNode<T>) {
                queue.add(element);
            },
            pop(): TreeNode<T> | undefined {
                return queue.poll();
            },
            get empty() {
                return !queue.length;
            }
        };
    }
}
