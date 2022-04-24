import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IBeeGarden } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BeeGardenService {
  constructor(private readonly _httpService: HttpService,
    ) {}

  getBeeGardenById(id: string) {
    return this._httpService.get<IBeeGarden>(`beegardens/${id}`);
  }

  getBeeGardens() {
    return this._httpService.get('beegardens/list');
  }

  addGarden(body: any) {
    return this._httpService.post('beegardens/add', body);
  }

  getRecentBeeGardens() {
    return this._httpService.get('beegardens/recent');
  }
}
