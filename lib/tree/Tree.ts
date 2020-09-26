import {GenericIterator} from "../GenericIterator";

export interface TreeNodeIterationDescriptor<TreeNode> {
    path: (TreeNode & TreeNodeIterationDescriptor<TreeNode>)[];
}

export class Tree<TreeNode> extends GenericIterator<TreeNode & TreeNodeIterationDescriptor<TreeNode>>{
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
}