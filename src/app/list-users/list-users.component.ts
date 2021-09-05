import { Component } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ListRegisteredUsers } from '../models/list-registered-users.model';
import { RegisteredUser } from '../models/registered-user.model';
import { RegisteredUsersService } from '../services/registered-users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent {
  private regUsersSubject = new BehaviorSubject<RegisteredUser[]>([]);
  listRegUsers$ = this.regUsersSubject.asObservable();
  nextToken!: string;
  vermas!: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private registeredUsersService: RegisteredUsersService,
    private _snackBar: MatSnackBar
  ) {
    this.registeredUsersService.getAll().subscribe(
      (users: ListRegisteredUsers) => {
        this.listRegUsers$ = of(users.data);
        this.nextToken = users.nextToken;
        this.vermas = this.nextToken ? true : false;
      },
      (error: any) => {
        console.log(error.message + '' + error.status);
        this._snackBar.open(
          'No se ha podido listar a los usuarios',
          'Aceptar',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['coral-snackbar'],
          }
        );
      }
    );
  }

  verMas(): void {
    this.registeredUsersService
      .getPagination(this.nextToken)
      .pipe(
        withLatestFrom(this.listRegUsers$),
        tap(([apiResp, lstusers]) => {
          this.parseUsersData([...lstusers, ...apiResp.data]);
          this.nextToken = apiResp.nextToken;
          this.vermas = this.nextToken ? true : false;
        })
      )
      .subscribe();
  }

  private parseUsersData(users: RegisteredUser[]): void {
    const newData = users.map((user) => {
      return { ...user };
    });
    // console.log(newData);
    // this.regUsersSubject.next(newData);
    this.listRegUsers$ = of(newData);
  }
}
