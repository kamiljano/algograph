import {GenericIterator} from "../GenericIterator";

export interface TreeNodeIterationDescriptor<TreeNode> {
    path: (TreeNode & TreeNodeIterationDescriptor<TreeNode>)[];
}

export interface TreeOptions<T> {
    iterators: {
      dfs: () => Iterator<T>;
      bfs: () => Iterator<T>;
    };
}

export abstract class Tree<TreeNode> extends GenericIterator<TreeNode & TreeNodeIterationDescriptor<TreeNode>>{

    protected constructor(private readonly _options: TreeOptions<TreeNode & TreeNodeIterationDescriptor<TreeNode>>) {
        super(_options.iterators.dfs);
    }

    //todo: find

    get depth() {
        let max = 0;
        for (let node of this) {
            if (node.path.length > max) {
                max = node.path.length;
            }
        }
        return max;
    }

    get count() {
        let counter = 0;
        for (let node of this) {
            counter++;
        }
        return counter;
    }

    get iterator() {
        const self = this;
        return { //TODO: add pre-order, in-order, post-order
            get depthFirst() {
                return new GenericIterator(self._options.iterators.dfs);
            },
            get breadthFirst() {
                return new GenericIterator(self._options.iterators.bfs);
            }
        };
    }
}