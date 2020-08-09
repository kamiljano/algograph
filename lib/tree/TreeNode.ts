export interface TreeNode<T> {
    children?: TreeNode<T>[];
    value: T;
}
