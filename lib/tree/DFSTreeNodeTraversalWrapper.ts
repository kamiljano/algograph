import {TreeNode} from "./TreeNode";
import {TraversalWrapper} from "./TraversalWrapper";

export class DFSTreeNodeTraversalWrapper<T> extends TraversalWrapper<T> {

    constructor(readonly node: TreeNode<T>) {
        super();
    }

    [Symbol.iterator](): Iterator<TreeNode<T>> {
        let filo: TreeNode<T>[] = [this.node];

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = filo.pop() as TreeNode<T>;
                if (element?.children) {
                    for (let i = element.children.length - 1; i >= 0; i--) {
                        filo.push(element.children[i]);
                    }
                }
                return {
                    value: element,
                    done: !filo.length && !element
                };
            },
        };
    }
}
