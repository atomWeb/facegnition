import { Injectable } from '@angular/core';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  constructor(private http: HttpClient) {}

  registerUser(data: File, strform: any) {
    // Las cabeceras se las coloca el interceptor
    const body: any = strform;
    const message = 'No se ha podido dar de alta al usuario';
    return this.http
      .get<any>(`${environment.apiUrl}/signed-url`)
      .pipe(
        mergeMap((url) => {
          body['imgname'] = url.key;
          return this.http.put(url.url, data);
        }),
        catchError((err): any => {
          console.log(message, err);
          return throwError(err);
        })
      )
      .pipe(
        mergeMap((comment) => {
          // console.log('resp PUT image ' + comment);
          return this.http.post<any>(`${environment.apiUrl}/add`, body);
        }),
        catchError((err): any => {
          console.log(message, err);
          return throwError(err);
        })
      );
  }
}
