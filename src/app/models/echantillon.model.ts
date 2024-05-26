import {Measurement} from "./measurement.model";
import {nanoid} from "nanoid";

export class Echantillon {
  id?: string;
  measurements: Measurement[];
  mean: number;
  range: number;

  constructor() {
    this.id = nanoid();
    this.measurements = [];
    this.mean = 0;
    this.range = 0;
  }
}
