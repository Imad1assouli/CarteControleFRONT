import { Echantillon } from './echantillon.model';
import {nanoid} from "nanoid";

export class ControlChart {
  id?: string;
  title: string;
  type: string;
  echantillons: Echantillon[];
  upperControlLimit: number;
  lowerControlLimit: number;
  xBar: number; 
  rBar: number; 
  centralLine: number;
  upperSecurityLimit: number;
  lowerSecurityLimit: number;
  lowerToleranceLimit: number;
  upperToleranceLimit: number;
  normalityTestPValue: number;
  cp: number;
  cpk: number;
  cm: number;
  cmk: number;
  interpretations: string[];

  constructor() {
    this.id = nanoid();
    this.title = '';
    this.type = '';
    this.echantillons = [];
    this.upperControlLimit = 0;
    this.lowerControlLimit = 0;
    this.xBar = 0;
    this.rBar = 0;
    this.centralLine = 0;
    this.upperSecurityLimit = 0;
    this.lowerSecurityLimit = 0;
    this.lowerToleranceLimit = 0;
    this.upperToleranceLimit = 0;
    this.normalityTestPValue = 0;
    this.cp = 0;
    this.cpk = 0;
    this.cm = 0;
    this.cmk = 0;
    this.interpretations = [];
  }
}
