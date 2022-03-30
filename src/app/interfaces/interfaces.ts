export interface IBeeHive {
  name?: string;
  line?: number;
}

export interface IBeeGarden {
  name?: string;
  lat?: number;
  lng?: number;
}

export interface User {
  token: string;
  userid: string;
  email: string;
  userRole: string;
  isActive: string;
  tokenExpiresIn: number;
}

export interface BeeHiveData {
  _id: string;
  beeHive: string;
  data: BeeHiveDataData;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
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
