import { SortingAlgorithm } from "@/algorithms/types";

export class InsertionSort implements SortingAlgorithm {
    private _array: number[] = [];
    private _i: number = 0;
    private _j: number = 0;
    private _key: number = 0;
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

    public setup() {
        this._i = 1;
        this._key = this._array[this._i];
        this._j = this._i - 1;
        this._finished = false;
    }

    public nextMove() {
        //TODO: fix bug, on first sorting the second element, arr[1], is undefined. Not present when using the "reset" button
        
        if (this._j >= 0 && this._array[this._j] > this._key) {
            this._array[this._j + 1] = this._array[this._j];
            this._j--;
        }
        else {
            if (this._i < this._array.length) {
                this._array[this._j + 1] = this._key;
                this._i++;
                this._key = this._array[this._i];
                this._j = this._i - 1;
            }
            else {
                this._finished = true;
            }
        }

        return {
            array: this._array,
            comparing: [this._j, this._i],
            leftBound: this._i,
            finished: this._finished,
            logs: this._sortingLogs

        };
    }
}