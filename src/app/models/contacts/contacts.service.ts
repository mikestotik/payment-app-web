import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { IContact } from './contacts.model';

@Injectable()
export class ContactsService {

  private apiUrl = `${ environment.url.api }${ API_CONFIG.CONTACTS }/`;

  constructor(
    private http: HttpClient) {
  }

  public getAll(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  public save(entity: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.apiUrl, entity);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete(this.apiUrl + id).pipe(
      map(() => id)
    );
  }

  public update(entity: IContact): Observable<IContact> {
    return this.http.put<IContact>(this.apiUrl, entity);
  }
}
