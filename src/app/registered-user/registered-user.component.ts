import { Component, OnInit, Input } from '@angular/core';
import { RegisteredUser } from '../models/registered-user.model';
import { ValidatedUser } from '../models/validated-user.model';
import { ListValidatedUsers } from '../models/list-validated-users.model'
import { RduserLstDialogComponent } from '../rduser-lst-dialog/rduser-lst-dialog.component';
import { RegisteredUsersService } from '../services/registered-users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css'],
})
export class RegisteredUserComponent implements OnInit {
  @Input() registeredUser!: RegisteredUser;
  validatedUsers!: ValidatedUser[];
  data = {};
  constructor(
    public dialog: MatDialog,
    private registeredUsersService: RegisteredUsersService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.registeredUsersService
      .getUserValidations(this.registeredUser.faceid)
      .subscribe(
        (vadUsrs: ListValidatedUsers) => {
          this.validatedUsers = vadUsrs.data;
          // console.log(vadUsrs);
          const dialogRef = this.dialog.open(RduserLstDialogComponent, {
            width: '450px',
            data: {
              name: this.registeredUser.name,
              validations: vadUsrs.data,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
          });
        },
        (error) => {
          console.log('Imposible mostrar las validaciones del usuario', error);
        }
      );
  }
}
