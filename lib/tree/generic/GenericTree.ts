import {TreeNode} from "./TreeNode";
import {Queue, Stack} from "../../collections";
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

    constructor(private _root?: TreeNode<T>) {
        super(() => dfs(this._root));
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