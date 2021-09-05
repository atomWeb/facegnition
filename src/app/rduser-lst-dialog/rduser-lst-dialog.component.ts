import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  validations: [
    {
      s3path: string,
      faceid: string,
      timest: string,
      avatarpath: string,
    },
  ]
}

@Component({
  selector: 'app-rduser-lst-dialog',
  templateUrl: './rduser-lst-dialog.component.html',
  styleUrls: ['./rduser-lst-dialog.component.css'],
})
export class RduserLstDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RduserLstDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
