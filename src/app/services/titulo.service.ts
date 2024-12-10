import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrud } from './generic_crud';
import { Titulo } from '../model/titulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloService extends GenericCrud<Titulo> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/titulos`)
  }

  pesquisar(parametros: { nome?: string; classe?: string; ator?: string }): Observable<Titulo[]> {
    // Configurando os parâmetros da requisição
    let params = new HttpParams();
    if (parametros.nome) {
      params = params.set('nome', parametros.nome);
    }
    if (parametros.classe) {
      params = params.set('classe', parametros.classe);
    }
    if (parametros.ator) {
      params = params.set('ator', parametros.ator);
    }

    // Realiza a requisição GET com os parâmetros
    return this.httpClient.get<Titulo[]>(`${this.url}/pesquisar`, { params });
  }
}
