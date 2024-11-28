import { Injectable } from '@angular/core';
import { GenericCrud } from './generic_crud';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericCrud<Cliente>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/clientes`)
  }
}
