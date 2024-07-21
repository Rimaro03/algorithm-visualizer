export interface SortingAlgorithm {
    nextMove: (array: number[]) => {
        array: number[],
        comparing: number[],
        leftBound: number,
        finished: boolean
    };
}