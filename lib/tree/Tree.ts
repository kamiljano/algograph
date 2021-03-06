import {TreeNode} from "./TreeNode";
import {DFSTreeNodeTraversalWrapper} from "./DFSTreeNodeTraversalWrapper";
import {BFSTreeNodeTraversalWrapper} from "./BFSTreeNodeTraversalWrapper";
import {Queue} from "../collections/Queue";

export class Tree<T> {

    private static getDepth(root?: TreeNode<any>): number {
        const queue = new Queue<TreeNode<any>>(root? [root] : []);
        let depth = queue.length;
        while (!queue.isEmpty) {
            const element = queue.poll();
            if (element?.children) {
                queue.addAll(element?.children);
                depth++;
            }
        }
        return depth;
    }

    private static countElements(root?: TreeNode<any>): number {
        const queue = new Queue<TreeNode<any>>(root? [root] : []);
        let count = queue.length;
        while (!queue.isEmpty) {
            const element = queue.poll();
            if (element?.children) {
                queue.addAll(element?.children);
                count += element.children.length;
            }
        }
        return count;
    }

    private _depth?: number;
    private _count?: number;

    constructor(private _root?: TreeNode<T>) {}

    get depth() {
        if (typeof this._depth === 'undefined') {
            this._depth = Tree.getDepth(this._root);
        }
        return this._depth;
    }

    get count() {
        if (typeof this._count === 'undefined') {
            this._count = Tree.countElements(this._root);
        }
        return this._count;
    }

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