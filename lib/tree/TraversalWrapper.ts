import {TreeNode} from "./TreeNode";

type Consumer<T> = (value: T) => any;

export abstract class TraversalWrapper<T> implements Iterable<TreeNode<T>>{

    [Symbol.iterator](): Iterator<TreeNode<T>, any, undefined> {
        throw new Error("Method not implemented.");
    }

    forEach(consumer: Consumer<TreeNode<T>>): void {
        for (let node of this) {
            consumer(node);
        }
    }
}
