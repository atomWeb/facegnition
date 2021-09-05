import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FileUtils } from '../shared/file-utils';
import { ValidateUserService } from '../services/validate-user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css'],
})
export class ValidateComponent implements OnInit {
  validateForm = this.fb.group({
    image: ['', [Validators.required]],
  });

  fileUtils = new FileUtils();
  base64Img!: string;
  fileName: string = '';
  fileToUpload!: File;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private validateUser: ValidateUserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  resetForm() {
    this.fileName = '';
    this.base64Img = '';
    this.validateForm.reset();
  }

  onSubmit() {
    // console.log(this.validateForm.value);
    this.validateUser
      .validateUser(this.fileToUpload, this.validateForm.value)
      .subscribe(
        (resp) => {
          // console.log('Resp post validate ', JSON.stringify(resp));
          const message = `Persona validada correctamente! \nUsuario: ${resp['name']}`;
          let snackBarVal = this._snackBar.open(message, 'Aceptar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['ok-snackbar'],
          });
          snackBarVal.onAction().subscribe(() => this.resetForm());
        },
        (error: any) => {
          console.log(error.status);
          console.log(error.message);
          if (error.status === 404) {
            const message = 'No se ha podido validar a esta persona!';
            this._snackBar.open(message, 'Aceptar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['coral-snackbar'],
            });
          } else {
            this._snackBar.open(error.message, 'Aceptar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['coral-snackbar'],
            });
          }
        }
      );
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.fileName = this.fileToUpload.name;
    this.fileUtils.toBase64(this.fileToUpload).subscribe((imgCoded) => {
      this.base64Img = imgCoded;
    });
  }
}
