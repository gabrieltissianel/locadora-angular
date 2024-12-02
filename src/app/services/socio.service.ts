import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from '../model/socio';
import { GenericCrud } from './generic_crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocioService extends GenericCrud<Socio>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/socios`)
  }

  trocarEstado(obj: Socio): Observable<Socio>{
    return this.httpClient.post<Socio>(`${this.url}/trocarEstado`, obj);
  }
}
