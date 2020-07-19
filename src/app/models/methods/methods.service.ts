import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { IPaymentAccount, IPaymentCard } from './methods.model';

@Injectable()
export class MethodsService {

  private apiCardUrl = `${ environment.url.api }${ API_CONFIG.METHODS.CARD }/`;
  private apiAccountUrl = `${ environment.url.api }${ API_CONFIG.METHODS.ACCOUNT }/`;

  constructor(
    private http: HttpClient) {
  }

  // Cards
  public getAllCards(): Observable<IPaymentCard[]> {
    return this.http.get<IPaymentCard[]>(this.apiCardUrl);
  }

  public saveCard(entity: IPaymentCard): Observable<IPaymentCard> {
    return this.http.post<IPaymentCard>(this.apiCardUrl, entity);
  }

  public updateCard(entity: IPaymentCard): Observable<IPaymentCard> {
    return this.http.put<IPaymentCard>(this.apiCardUrl, entity);
  }

  public deleteCard(id: number): Observable<number> {
    return this.http.delete(this.apiCardUrl + id).pipe(
      map(() => id)
    );
  }

  // Account
  public getAllAccounts(): Observable<IPaymentAccount[]> {
    return this.http.get<IPaymentAccount[]>(this.apiAccountUrl);
  }

  public saveAccount(entity: IPaymentAccount): Observable<IPaymentAccount> {
    return this.http.post<IPaymentAccount>(this.apiAccountUrl, entity);
  }

  public updateAccount(entity: IPaymentAccount): Observable<IPaymentAccount> {
    return this.http.put<IPaymentAccount>(this.apiAccountUrl, entity);
  }

  public deleteAccount(id: number): Observable<number> {
    return this.http.delete(this.apiAccountUrl + id).pipe(
      map(() => id)
    );
  }

}
