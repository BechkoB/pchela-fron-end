export interface IBeeHive {
  _id: string;
  beeGarden: string;
  name?: string;
  line?: number;
}

export interface IBeeGarden {
  _id: string;
  ownerId: string;
  name: string;
  createdAt: string
  lat: number;
  lng: number;
}

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
  token: string;
  tokenExpiresIn: number;
  userid?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBeeHiveData {
  _id: string;
  beeHive: string;
  data: IBeeHiveDataData;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBeeHiveDataData {
  cellData: ICellData[];
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

export interface ICellData {
  temp: number;
  humidity: number;
  viewValue: string;
}

