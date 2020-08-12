import {TreeNode} from "./TreeNode";

export type ItarationConsumer<T> = (value: T) => any;

export interface Collection<T> {
    add(element: T): void;
    pop(): T | undefined;
    readonly empty: boolean;
}

export abstract class TraversalWrapper<T> implements Iterable<TreeNode<T>>{

    protected abstract readonly collection: Collection<TreeNode<T>>;

    protected constructor(protected readonly node: TreeNode<T>) { }

    forEach(consumer: ItarationConsumer<TreeNode<T>>): void {
        for (let node of this) {
            consumer(node);
        }
    }

    [Symbol.iterator](): Iterator<TreeNode<T>, any, undefined> {
        const col = this.collection;

        return {
            next(): IteratorResult<TreeNode<T>> {
                const element = col.pop() as TreeNode<T>;
                if (element?.children) {
                    for (let i = element.children.length - 1; i >= 0; i--) {
                        col.add(element.children[i]);
                    }
                }
                return {
                    value: element,
                    done: col.empty && !element
                };
            },
        };
    }
}
