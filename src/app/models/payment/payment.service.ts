import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { IPayment } from './payment.model';

@Injectable()
export class PaymentService {

  private apiUrl = `${ environment.url.api }${ API_CONFIG.PAYMENTS }/`;

  constructor(
    private http: HttpClient) {
  }

  public getAll(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.apiUrl);
  }

  public save(entity: IPayment): Observable<IPayment> {
    return this.http.post<IPayment>(this.apiUrl, entity);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete(this.apiUrl + id).pipe(
      map(() => id)
    );
  }

  public update(entity: IPayment): Observable<IPayment> {
    return this.http.put<IPayment>(this.apiUrl, entity);
  }
}
