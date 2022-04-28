import { FormArray, FormControl } from '@angular/forms';

export class BeeHiveData {
  _id: string;
  beeHive: string;
  data: BeeHiveDataData;
  time: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(beeHiveData?: BeeHiveData) {
    for (const beeHiveDataKey in beeHiveData) {
      if (!beeHiveData.hasOwnProperty(beeHiveDataKey)) {
        continue;
      }

      let value = beeHiveData[beeHiveDataKey];
      if (['time', 'createdAt', 'updatedAt'].includes(beeHiveDataKey)) {
        value = new Date(value);
      }

      this[beeHiveDataKey] = value;
    }
  }
}

export interface BeeHiveDataData {
  cellData: CellData[];
  eggsWeight: number;
  queensCount: number;
  queensWeight: number;
  layersInfo: string;
  honeyCombCount: number;
  broodCount: number;
  beesInfo: string;
  familyInfo: string;
  hiveWeight: number;
  naturalValue: number;
  unnaturalValue: number;
  outsideTemp: number;
  outsideHumid: number;
}

export interface CellData {
  temp: number;
  humidity: number;
  viewValue: string;
}

export type BeeHiveDataFormGroup = {
  [prop in keyof BeeHiveDataData]?: FormControl | FormArray;
};
