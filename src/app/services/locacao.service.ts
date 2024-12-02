import { Locacao } from './../model/locacao';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})

export class LocacaoService extends GenericCrud<Locacao> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/locacoes`)
  }

  devolverItem(obj: Locacao): Observable<Locacao>{
    return this.httpClient.post<Locacao>(`${this.url}/devolver`, obj);
  }

  buscarItem(numSerie: number): Observable<Locacao>{
    return this.httpClient.get<Locacao>(`${this.url}/buscar/${numSerie}`);
  }
}
