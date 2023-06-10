import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NewNameDialogComponent} from "../../../code-list/new-name-dialog/new-name-dialog.component";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-calculate-name-code-dialog',
  templateUrl: './calculate-name-code-dialog.component.html',
  styleUrls: ['./calculate-name-code-dialog.component.scss']
})
export class CalculateNameCodeDialogComponent implements OnInit {
  nameInput = new FormControl('')
  calculatedCode: any;
  constructor(public dialogRef: MatDialogRef<NewNameDialogComponent>, private api: ApiService) { }

  ngOnInit(): void {
  }

  calculate() {
    console.log(this.nameInput.value)
    this.api.getNameCode(this.nameInput.value)
        .subscribe(((result: any) => {
          this.calculatedCode = result['code'];
          if (this.calculatedCode < 0) {
            this.calculatedCode = 'Translation Error'
          }
        }))
  }

  onCloseDialog() {
    this.dialogRef.close();
  }


}
