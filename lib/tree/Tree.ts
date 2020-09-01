import {TreeNode} from "./TreeNode";
import {DFSTreeNodeTraversalWrapper} from "./DFSTreeNodeTraversalWrapper";
import {BFSTreeNodeTraversalWrapper} from "./BFSTreeNodeTraversalWrapper";

export class Tree<T> {

    constructor(private _root?: TreeNode<T>) { }

    get traverse() {
        const self = this;
        return { //TODO: add pre-order, in-order, post-order
            get depthFirst() {
                return new DFSTreeNodeTraversalWrapper(self._root);
            },
            get breadthFirst() {
                return new BFSTreeNodeTraversalWrapper(self._root);
            }
        };
    }
}