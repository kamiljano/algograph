import {GenericIterator} from "../GenericIterator";

export interface TreeNodeIterationDescriptor<TreeNode> {
    path: (TreeNode & TreeNodeIterationDescriptor<TreeNode>)[];
}

export class Tree<TreeNode> extends GenericIterator<TreeNode & TreeNodeIterationDescriptor<TreeNode>>{
    //todo: find
}