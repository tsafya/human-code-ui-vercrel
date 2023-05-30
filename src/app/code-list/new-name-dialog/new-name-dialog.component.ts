import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {nameCodes} from "../../services/api.service";

@Component({
  selector: 'app-new-name-dialog',
  templateUrl: './new-name-dialog.component.html',
  styleUrls: ['./new-name-dialog.component.scss']
})
export class NewNameDialogComponent implements OnInit {
  nameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3)])
  codeInput = new FormControl(0,[Validators.required])
  hebrewNameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3)])


  constructor(public dialogRef: MatDialogRef<NewNameDialogComponent>) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
  addNameCode() {
    const result: nameCodes = {name: this.nameInput.value, code: this.codeInput.value, hebrew: this.hebrewNameInput.value}
    this.dialogRef.close(result);
  }

}
