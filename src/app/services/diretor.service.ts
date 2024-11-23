import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Diretor } from '../model/diretor';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})
export class DiretorService extends GenericCrud<Diretor>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/diretores`)
  }

}
