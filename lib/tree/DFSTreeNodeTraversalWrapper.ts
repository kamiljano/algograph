import {TreeNode} from "./TreeNode";
import {TraversalWrapper} from "./TraversalWrapper";
import {Stack} from "../simple/Stack";

export class DFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(readonly node: TreeNode<T>) {
        super();
    }

    [Symbol.iterator](): Iterator<TreeNode<T>> {
        let stack = new Stack<TreeNode<T>>([this.node]);

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = stack.pop() as TreeNode<T>;
                if (element?.children) {
                    for (let i = element.children.length - 1; i >= 0; i--) {
                        stack.push(element.children[i]);
                    }
                }
                return {
                    value: element,
                    done: !stack.length && !element
                };
            },
        };
    }
}
