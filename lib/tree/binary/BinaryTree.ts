import {Queue, Stack} from "../../collections";
import {Tree, TreeNodeIterationDescriptor} from "../Tree";
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

    constructor(private _root?: BinaryTreeNode<T>) {
        super({
            iterators: {
                dfs: () => dfs(this._root),
                bfs: () => bfs(this._root)
            }
        });
    }
}