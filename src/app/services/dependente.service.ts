import { Injectable } from '@angular/core';
import { Dependente } from '../model/dependente';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericCrud } from './generic_crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenteService extends GenericCrud<Dependente>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/dependentes`)
  }

  listDependentes(id: number): Observable<Dependente[]> {
    return this.httpClient.get<Dependente[]>(`${this.url}/listDependentes/${id}`);
  }
}
