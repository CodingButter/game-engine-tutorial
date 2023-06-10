export class Num {
    public value: number;
    public max: number;
    public min: number;
    public step: number;
    public precision: number;
    constructor(value: number = 0, min: number = 0, max: number = 1, step: number = 0.1, precision: number = 2) {
        this.value = value;
        this.max = max;
        this.min = min;
        this.step = step;
        this.precision = precision;
    }

}