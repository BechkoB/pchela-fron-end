export interface IBeeHive {
  name?: string;
  line?: number;
}

export interface IBeeGarden {
  name?: string;
  lat?: number;
  lng?: number;
}

export interface IUser {
  token: string;
  userid: string;
  email: string;
  userRole: string;
  isActive: string;
  tokenExpiresIn: number;
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

export interface IUserData {
  email: string;
  success: boolean;
  token: string;
  tokenExpiresIn: number;
  userid: string;
}
