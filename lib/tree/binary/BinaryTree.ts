import {Queue} from "../../collections/Queue";
import {Stack} from "../../collections/Stack";
import {Tree, TreeNodeIterationDescriptor} from "../Tree";
import {GenericIterator} from "../../GenericIterator";
import {BinaryTreeNode, getChildren} from "./BinaryTreeNode";

type DescribedTreeNode<T> = BinaryTreeNode<T> & TreeNodeIterationDescriptor<BinaryTreeNode<T>>;

const describe = <T>(node: BinaryTreeNode<T>, parent?: DescribedTreeNode<T>): DescribedTreeNode<T> => {
    const result: DescribedTreeNode<T> = {
        ...node,
        path: []
    };
    result.path = (parent?.path || []).concat(result);

    return result;
};

const dfs = <T>(root?: BinaryTreeNode<T>): Iterator<DescribedTreeNode<T>> => {
    const stack = new Stack<DescribedTreeNode<T>>(root ? [describe(root)] : []);

    return {
        next(): IteratorResult<DescribedTreeNode<T>> {
            const element = stack.pop() as DescribedTreeNode<T>;
            const children = getChildren(element);
            for (let i = children.length - 1; i >= 0; i--) {
                stack.add(describe(children[i], element));
            }
            return {
                value: element,
                done: !stack.length && !element
            };
        },
    };
};

const bfs = <T>(root?: BinaryTreeNode<T>): Iterator<DescribedTreeNode<T>> => {
    const queue = new Queue<DescribedTreeNode<T>>(root ? [describe(root)] : []);

    return {
        next(): IteratorResult<DescribedTreeNode<T>> {
            const element = queue.poll() as DescribedTreeNode<T>;
            const children = getChildren(element);
            queue.addAll(children.map(child => describe(child, element)));

            return {
                value: element,
                done: !queue.length && !element
            };
        },
    };
};

export class BinaryTree<T> extends Tree<BinaryTreeNode<T>> {

    private static getDepth(root?: BinaryTreeNode<any>): number {
        const queue = new Queue<BinaryTreeNode<any>>(root? [root] : []);
        let depth = queue.length;
        while (!queue.isEmpty) {
            const element = queue.poll();
            const children = getChildren(element);
            if (children.length) {
                queue.addAll(children);
                depth++;
            }
        }
        return depth;
    }

    private static countElements(root?: BinaryTreeNode<any>): number {
        const queue = new Queue<BinaryTreeNode<any>>(root? [root] : []);
        let count = queue.length;
        while (!queue.isEmpty) {
            const element = queue.poll();
            const children = getChildren(element);
            if (children.length) {
                queue.addAll(children);
                count += children.length;
            }
        }
        return count;
    }

    private _depth?: number;
    private _count?: number;

    constructor(private _root?: BinaryTreeNode<T>) {
        super(() => dfs(this._root));
    }

    get depth() {
        if (typeof this._depth === 'undefined') {
            this._depth = BinaryTree.getDepth(this._root);
        }
        return this._depth;
    }

    get count() {
        if (typeof this._count === 'undefined') {
            this._count = BinaryTree.countElements(this._root);
        }
        return this._count;
    }

    get iterator() {
        const self = this;
        return { //TODO: add pre-order, in-order, post-order
            get depthFirst() {
                return new GenericIterator(() => dfs(self._root));
            },
            get breadthFirst() {
                return  new GenericIterator(() => bfs(self._root));
            }
        };
    }
}