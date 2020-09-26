export interface BinaryTreeNode<T> {
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;

    value: T;
}

export const getChildren = <T>(node: BinaryTreeNode<T> | undefined): BinaryTreeNode<T>[] => {
    return node
        ? [node.left, node.right].filter(n => n) as BinaryTreeNode<T>[]
        : [];
};