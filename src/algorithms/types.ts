export interface SortingAlgorithm {
    array: number[];
    setup: () => void;
    nextMove: () => {
        array: number[],
        comparing: number[],
        leftBound: number,
        finished: boolean,
        logs: string[]
    };
}