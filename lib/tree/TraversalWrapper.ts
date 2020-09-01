import {TreeNode} from "./TreeNode";

export type ItarationConsumer<T> = (value: T) => any;

export interface TreeTraversalCollection<T> {
    readonly empty: boolean;
    iterate(): T | undefined;
}

export abstract class TraversalWrapper<T> implements Iterable<TreeNode<T>>{

    protected abstract readonly collection: TreeTraversalCollection<TreeNode<T>>;

    protected constructor(protected readonly node?: TreeNode<T>) { }

    forEach(consumer: ItarationConsumer<TreeNode<T>>): void {
        for (let node of this) {
            consumer(node);
        }
    }

    [Symbol.iterator](): Iterator<TreeNode<T>, any, undefined> {
        const col = this.collection;

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = col.iterate();
                return {
                    value: element as TreeNode<T>,
                    done: col.empty && !element
                };
            },
        };
    }
}
