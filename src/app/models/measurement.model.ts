import {nanoid} from "nanoid";

export class Measurement {
    id?: string;
    controlChartId: string;
    value: number;
    conforming: boolean;

    constructor() {
        this.id = nanoid();
        this.controlChartId = '';
        this.value = 0;
        this.conforming = true;
    }
}
