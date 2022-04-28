import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IBeeGarden } from '../interfaces/interfaces';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BeeGardenService {
  constructor(private readonly _httpService: HttpService,
  ) { }

  getBeeGardenById(id: string): Observable<IBeeGarden> {
    return this._httpService.get(`beegardens/${id}`);
  }

  getBeeGardens(): Observable<IBeeGarden[]> {
    return this._httpService.get('beegardens/list');
  }

  addGarden(body: any) {
    return this._httpService.post('beegardens/add', body);
  }

  getRecentBeeGardens(): Observable<IBeeGarden[]> {
    return this._httpService.get('beegardens/recent');
  }
}
