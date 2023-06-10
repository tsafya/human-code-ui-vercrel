import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ApiService, codes, names} from "../services/api.service";
import {debounceTime, distinctUntilChanged, filter, finalize, map, Observable, startWith, switchMap, tap} from "rxjs";
import {NameCodesService} from "../services/name-codes.service";
import {fromArrayLike} from "rxjs/internal/observable/innerFrom";

type Nullable<T> = T | null;
export interface NameCode {
  name: string,
  code: number;
}

export interface HumanObject {
  name: string,
  nameCode: Nullable<number>,
  mother: string,
  motherCode: Nullable<number>,
  gender: Nullable<number>,
  birth: Nullable<Date>
}



@Component({
  selector: 'app-calculate-code',
  templateUrl: './calculate-code.component.html',
  styleUrls: ['./calculate-code.component.scss']
})

export class CalculateCodeComponent implements OnInit {
  maxSelectionDate = new Date();

  human: HumanObject;
  personalName: NameCode;
  motherName: NameCode;

  nameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3)])
    // onlyHebrewCharactersValidator()]);
  motherNameInput = new FormControl('',[
    Validators.required,
    Validators.minLength(3)])
    // onlyHebrewCharactersValidator()]);
  genderOption = new FormControl('', [Validators.required]);
  birthDate = new FormControl(null, [Validators.required])
  result: codes | undefined;
  showResult = false;
  nameList = [];
  filteredNames$: Observable<any>;
  filteredMotherNames$: Observable<any>;
  isLoading = false;

  person = this._formBuilder.group({
    name: this.nameInput,
    motherName: this.motherNameInput,
    gender: this.genderOption,
    birth: this.birthDate
  })

  nameCodes: any;
  constructor(private _formBuilder: FormBuilder, private api: ApiService, private names: NameCodesService) { }

  ngOnInit(): void {
    this.human =  {
      birth: null,
      gender: null,
      mother: '',
      motherCode: NaN,
      name: '',
      nameCode: null
    }
    this.names.nameCodes$.subscribe((items) => {
      this.nameCodes = items;
      this.filteredNames$ = this.nameInput.valueChanges
          .pipe(
            distinctUntilChanged(),
            tap(() => {
              // console.log('tap')
            }),
            map(value => this._filter(value || '')),
          )
      this.filteredMotherNames$ = this.motherNameInput.valueChanges
          .pipe(
            distinctUntilChanged(),
            tap(() => {
              // console.log('tap')
            }),
            map(value => this._filter(value || '')),
          )

    })
  }
  private _filter(value: string): any {
    if (value.length > 2) {
      return this.nameCodes.filter((option: any) => {
        return option.name.includes(value)
      })
    }
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

      // this.human.gender = Number(this.genderOption.value);

      const param = JSON.stringify(details);
      this.isLoading = true;
      this.api.calculateCode(param)
          .subscribe(res => {
            this.result = res.codes;
            this.showResult = true;
          },
          () => {},
          () => {
            this.isLoading = false;
          })
    }
  }

  onNameOptionSelected(event: any, type: string) {
    if (type === 'name') {
      this.human.name = event.option.value;
      this.human.nameCode = event.option.id;
    } else {
      this.human.mother = event.option.value;
      this.human.motherCode = event.option.id;
    }
  }

  nameChanges(ev: any, control: any, autoComplete:any) {
    // Handle check of manual string rather than select from list
    if (autoComplete.isOpen) {
      return;
    }
    this.api.getNameCode(ev.currentTarget.value).subscribe(
        (response: any) => {
          if (response?.code < 0) {
            control.setErrors({invalidTranslation: {value: ev.target.value}});
          } else {
            control.setErrors(null);
          }
          console.log(response.code)
        }
    )
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
