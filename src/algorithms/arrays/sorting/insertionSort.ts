import { SortingAlgorithm } from "@/algorithms/types";

export class InsertionSort implements SortingAlgorithm {
    private _array: number[] = [];
    private _i: number = 0;
    private _j: number = 0;
    private _finished: boolean = false
    private _sortingLogs: string[] = [];

    constructor() {
        this.setup();
    }

    get array() {
        return this._array;
    }

    set array(array: number[]) {
        this._array = array;
    }

    public setup() {}

    public nextMove() {
        return {
            array: this._array,
            comparing: [/*FILL*/],
            leftBound: this._i,
            finished: this._finished,
            logs: this._sortingLogs
        };
    };
}