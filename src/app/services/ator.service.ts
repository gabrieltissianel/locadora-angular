import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ator } from '../model/ator';
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})
export class AtorService extends GenericCrud<Ator> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/atores`)
  }

}
