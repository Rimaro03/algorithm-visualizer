import { SortingAlgorithm } from "@/algorithms/types";

/**
 * This is a variant of the selection sort algorithm. The only difference is that instead of having loops that cycle the array, the variables i and j are incremented manually.
 */
export class SelectionSort implements SortingAlgorithm {
    private _array: number[] = [];
    private _i: number = 0;
    private _j: number = 0;
    private _min: number = 0;
    private _finished: boolean = false

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
        this._i = 0;
        this._j = this._i;
        this._min = this._i + 1;
        this._finished = false;
    }

    private swap(arr: number[], xp: number, yp: number) {
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }

    public nextMove() {
        //for(int j=i+1; j<array.length; j++)
        if (this._j < this._array.length - 1) {
            if (this._array[this._j] < this._array[this._min]) {
                this._min = this._j;
            }
            this._j++;
        }
        //for(int i=0; j<array.length - 1; j++)
        else {
            if (this._array[this._j] < this._array[this._min]) {
                this._min = this._j;
            }
            if (this._i < this._array.length) {
                this.swap(this._array, this._min, this._i);
                this._i++;
                this._min = this._i;
                this._j = this._i + 1;

            }
            else {
                this._finished = true;
            }
        }

        return {
            array: this._array,
            comparing: [this._min, this._j],
            leftBound: this._i,
            finished: this._finished
        };
    };
}