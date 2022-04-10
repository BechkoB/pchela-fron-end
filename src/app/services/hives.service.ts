import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IBeeHiveData } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { IBeeHive } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BeeHivesService {
  constructor(private readonly _httpService: HttpService) {}

  getBeeHives(id: string) {
    return this._httpService.get(`beegardens/${id}/hives`);
  }

  deleteHive(id: string) {
    return this._httpService.delete(`beehives/${id}`);
  }

  addHive(body: any) {
    return this._httpService.post('beehives/add', body);
  }

  getBeeHiveById(id: string) {
    return this._httpService.get<IBeeHive>(`beehives/${id}`);
  }

  sendData(id: string, body: any) {
    return this._httpService.post(`beehives/data/edit/${id}`, body);
  }

  getHivesData(id: string, body: object): Observable<IBeeHiveData> {
    return this._httpService.post<IBeeHiveData>(`beehives/data/get/${id}`, body);
  }
}
