import {TreeNode} from "./TreeNode";
import {TreeTraversalCollection, TraversalWrapper} from "./TraversalWrapper";
import {Stack} from "../collections/Stack";

export class DFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(node?: TreeNode<T>) {
        super(node);
    }

    protected get collection(): TreeTraversalCollection<TreeNode<T>> {
        const stack = new Stack<TreeNode<T>>(this.node ? [this.node] : []);
        return {
            get empty() {
                return !stack.length;
            },
            iterate() {
                const element = stack.pop();
                if (element?.children) {
                    for (let i = element.children.length - 1; i >= 0; i--) {
                        stack.add(element.children[i]);
                    }
                }
                return element;
            }
        };
    }
}
