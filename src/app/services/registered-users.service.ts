import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ListRegisteredUsers} from '../models/list-registered-users.model'
import { ListValidatedUsers } from '../models/list-validated-users.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisteredUsersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ListRegisteredUsers>(`${environment.apiUrl}/list-users`);
  }

  getPagination(nexttk: string) {
    let params = new HttpParams();
    params = params.set('nextToken', nexttk);

    return this.http.get<ListRegisteredUsers>(`${environment.apiUrl}/list-users`, {params: params});
  }

  getUserValidations(faceid: string) {
    return this.http.get<ListValidatedUsers>(`${environment.apiUrl}/validate/${faceid}`);
  }
}
