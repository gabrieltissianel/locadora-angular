import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrud } from './generic_crud';
import { Titulo } from '../model/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService extends GenericCrud<Titulo> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/titulos`)
  }

}
