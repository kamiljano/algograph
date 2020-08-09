import {TreeNode} from "./TreeNode";
import {DFSTreeNodeTraversalWrapper} from "./DFSTreeNodeTraversalWrapper";
import {BFSTreeNodeTraversalWrapper} from "./BFSTreeNodeTraversalWrapper";

//TODO: modify so that you also can pass the depth of the graph

export function traverse<T>(root: TreeNode<T>) { //TODO: add pre-order, in-order, post-order
    return {
        dfs: new DFSTreeNodeTraversalWrapper<T>(root),
        bfs: new BFSTreeNodeTraversalWrapper<T>(root)
    };
}

//TODO: binary trees and array representation
