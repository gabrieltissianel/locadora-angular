import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classe } from '../model/classe';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})
export class ClasseService extends GenericCrud<Classe>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/classes`)
  }
}
