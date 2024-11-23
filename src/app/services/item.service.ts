import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { GenericCrud } from './generic_crud';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends GenericCrud<Item> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/itens`)
  }

}
