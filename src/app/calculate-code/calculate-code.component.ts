import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ApiService, codes} from "../services/api.service";

@Component({
  selector: 'app-calculate-code',
  templateUrl: './calculate-code.component.html',
  styleUrls: ['./calculate-code.component.scss']
})
export class CalculateCodeComponent implements OnInit {
  maxSelectionDate = new Date();
  nameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    onlyHebrewCharactersValidator()]);
  motherNameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    onlyHebrewCharactersValidator()]);
  genderOption = new FormControl('', [Validators.required]);
  birthDate = new FormControl(null, [Validators.required])
  result: codes | undefined;
  showResult = false;

  person = this._formBuilder.group({
    name: this.nameInput,
    motherName: this.motherNameInput,
    gender: this.genderOption,
    birth: this.birthDate
  })

  constructor(private _formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

  }

  calculateCode() {
    if (this.person.valid) {
      const birth = this.birthDate.value;
      const date = {day: birth?.getDate(), month: birth? birth.getMonth() + 1: null, year: birth?.getFullYear()}
      const details = {
        name: this.nameInput.value,
        mother: this.motherNameInput.value,
        gender: Number(this.genderOption.value),
        birth: date
      }

      const param = JSON.stringify(details);
      this.api.calculateCode(param)
          .subscribe(res => {
            this.result = res.codes;
            this.showResult = true;
          })
    }
  }

}

export function onlyHebrewCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.toString();
    let is_hebrewChars = true;
    for (let i in value) {
      const charValue = value.charCodeAt(i)
      if (charValue < 1488 || charValue > 1514) {
        is_hebrewChars = false;
        break;
      }
    }
    return is_hebrewChars ? null : {invalidHebrewCharacter: {value: control.value}}
  };

}
