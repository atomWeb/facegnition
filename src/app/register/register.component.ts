import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Validators, FormBuilder } from '@angular/forms';
import { AddUserService } from '../services/add-user.service';
import { FileUtils } from '../shared/file-utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  regForm = this.fb.group({
    image: ['', [Validators.required]],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(23)],
    ],
    notify: [true, []],
  });

  fileUtils = new FileUtils();
  fileName: string = '';
  fileToUpload!: File;
  base64Img!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private addUser: AddUserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.regForm.controls["image"].valueChanges.subscribe(val => {
    //   console.log(val)
    // })
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.fileName = this.fileToUpload.name;
    this.fileUtils.toBase64(this.fileToUpload).subscribe((imgCoded) => {
      this.base64Img = imgCoded;
    });
  }

  resetForm() {
    this.fileName = '';
    this.base64Img = '';
    this.regForm.reset();
    this.regForm.controls['nombre'].clearValidators();
    this.regForm.controls['nombre'].updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.regForm.value);
    this.addUser.registerUser(this.fileToUpload, this.regForm.value).subscribe(
      (resp) => {
        console.log('Resp post add-user ', JSON.stringify(resp));
        this.resetForm();
        this._snackBar.open('Persona registrada correctamente !', '', {
          duration: 2100,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['ok-snackbar'],
        });
      },
      (error: any) => {
        const message = 'No se ha podido registrar a esta persona!';
        console.log(message, error);
        this._snackBar.open(message, 'Aceptar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['coral-snackbar'],
        });
      }
    );
  }
}
