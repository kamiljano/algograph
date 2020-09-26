import {TreeNode} from "./TreeNode";
import {Queue} from "../../collections/Queue";
import {Stack} from "../../collections/Stack";
import {Tree, TreeNodeIterationDescriptor} from "../Tree";
import {GenericIterator} from "../../GenericIterator";

type DescribedTreeNode<T> = TreeNode<T> & TreeNodeIterationDescriptor<TreeNode<T>>;

const describe = <T>(node: TreeNode<T>, parent?: DescribedTreeNode<T>): DescribedTreeNode<T> => {
    const result: DescribedTreeNode<T> = {
        ...node,
        path: []
    };
    result.path = (parent?.path || []).concat(result);

    return result;
};

const dfs = <T>(root?: TreeNode<T>): Iterator<DescribedTreeNode<T>> => {
    const stack = new Stack<DescribedTreeNode<T>>(root ? [describe(root)] : []);

    return {
        next(): IteratorResult<DescribedTreeNode<T>> {
            const element = stack.pop() as DescribedTreeNode<T>;
            if (element?.children) {
                for (let i = element.children.length - 1; i >= 0; i--) {
                    stack.add(describe(element.children[i], element));
                }
            }
            return {
                value: element,
                done: !stack.length && !element
            };
        },
    };
};

const bfs = <T>(root?: TreeNode<T>): Iterator<DescribedTreeNode<T>> => {
    const queue = new Queue<DescribedTreeNode<T>>(root ? [describe(root)] : []);

    return {
        next(): IteratorResult<DescribedTreeNode<T>> {
            const element = queue.poll() as DescribedTreeNode<T>;
            if (element?.children) {
                queue.addAll(element.children?.map(child => describe(child, element)));
            }
            return {
                value: element,
                done: !queue.length && !element
            };
        },
    };
};

export class GenericTree<T> extends Tree<TreeNode<T>> {

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

    constructor(private _root?: TreeNode<T>) {
        super(() => dfs(this._root));
    }

    get depth() {
        if (typeof this._depth === 'undefined') {
            this._depth = GenericTree.getDepth(this._root);
        }
        return this._depth;
    }

    get count() {
        if (typeof this._count === 'undefined') {
            this._count = GenericTree.countElements(this._root);
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