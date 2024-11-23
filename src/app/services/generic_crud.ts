import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenericCrud<T extends {id?: number}> {

  constructor(private httpClient: HttpClient, private url: string) { }

  listAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/list`);
  }

  create(obj: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/add`, obj);
  }

  update(obj: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/edit`, obj);
  }

  delete(id: number): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
