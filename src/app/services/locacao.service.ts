import { Injectable } from '@angular/core';
import { Locacao } from '../model/locacao';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})

export class LocacaoService extends GenericCrud<Locacao> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/itens`)
  }

}
