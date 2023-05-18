import { Injectable } from '@angular/core';
import {ApiService, names} from "./api.service";
import {map} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NameCodesService {
  constructor(private api: ApiService) {}
  public nameCodes$ = this.api.getNameList('').pipe(
      map((value: any) => {
        return value.map((name: any) => ({
          ...name
        }))
      })
  )
}
