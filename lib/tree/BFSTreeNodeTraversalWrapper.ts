import {TreeNode} from "./TreeNode";
import {TreeTraversalCollection, TraversalWrapper} from "./TraversalWrapper";
import {Queue} from '../collections/Queue';

export class BFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(node?: TreeNode<T>) {
        super(node);
    }

    protected get collection(): TreeTraversalCollection<TreeNode<T>> {
        const queue = new Queue<TreeNode<T>>(this.node ? [this.node] : []);
        return {
            get empty() {
                return !queue.length;
            },
            iterate(): TreeNode<T> | undefined {
                const element = queue.poll();
                if (element?.children) {
                    queue.addAll(element.children);
                }
                return element;
            }
        };
    }
}
