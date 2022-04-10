import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${URL}/${url}`, {
      headers: this.headers
    });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${URL}/${url}`, body, {
      headers: this.headers
    });
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.httpClient.patch<T>(`${URL}/${url}`, body, {
      headers: this.headers
    });
  }

  delete(url: string) {
    return this.httpClient.delete(`${URL}/${url}`, {
      headers: this.headers
    });
  }

  get headers(): HttpHeaders | Record<string, never> {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
      return {};
    }

    const token = userData?.token;
    return new HttpHeaders().append('x-access-token', token);
  }
}
