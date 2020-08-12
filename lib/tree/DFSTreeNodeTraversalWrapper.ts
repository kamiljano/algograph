import {TreeNode} from "./TreeNode";
import {Collection, TraversalWrapper} from "./TraversalWrapper";
import {Stack} from "../simple/Stack";

export class DFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(node: TreeNode<T>) {
        super(node);
    }

    protected get collection(): Collection<TreeNode<T>> {
        const stack = new Stack<TreeNode<T>>([this.node]);
        return {
            add(element: TreeNode<T>) {
                stack.push(element);
            },
            pop(): TreeNode<T> | undefined {
                return stack.pop();
            },
            get empty() {
                return !stack.length;
            }
        };
    }
}
