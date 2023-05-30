import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@auth0/auth0-angular";

export interface response {
  codes: codes
}

export interface names {
  name: string,
  code: number
}

export interface nameCodes {
  name: string,
  code: number,
  hebrew: string
}

export interface codes {
  human: string,
  guide: string,
  spiritual: string,
  evoluzione: string
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // protocol = 'http';
  // host = '127.0.0.1:5000';
  protocol = 'https';
  host = 'human-code-api.vercel.app';
  endpoint = `${this.protocol}://${this.host}`

  constructor(public auth: AuthService, private http: HttpClient) {}

  isHebrewCharacters(name: string) {
    return this.http.get(`https://human-code-api.herokuapp.com/is_hebrewChars/?name=%D7%A8%D7%97%D7%9C`);
  }

  calculateCode(details: any) {
    const requestOptions = {
      params: {details: details},
    };
    return this.http.get<response>(`${this.endpoint}/calculate/`, requestOptions);
  }

  getNameList(q: string) {
    const requestOptions = {
      params: {query: q},
    };

    return this.http.get<names[]>(`${this.endpoint}/name_list/`, requestOptions);
  }
  getNameCodeList() {
    return this.http.get<nameCodes[]>(`${this.endpoint}/api/name_code_list/`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }
  getNameCode(name: string) {
    const requestOptions = {
      params: {name: name},
    };

    return this.http.get(`${this.endpoint}/name_code/`, requestOptions);
  }
  addNewNameCode(newRecord: nameCodes) {
    const requestOptions = {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    const newRecordParam = {new_record: newRecord}
    return this.http.post(`${this.endpoint}/api/add_name_code/`, newRecordParam, requestOptions);
  }
  updateNameCode(oldRecord: nameCodes, updatedRecord: nameCodes) {
    const body = {
      query: oldRecord,
      updated_fields: updatedRecord
    }

    const requestOptions = {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    return this.http.put(`${this.endpoint}/api/update_name/`, body, requestOptions);
  }
  deleteNameCode(recordToDelete: nameCodes) {
    const requestOptions = {
      body: recordToDelete,
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    return this.http.delete(`${this.endpoint}/api/delete_name/`, requestOptions);
  }

}

// https://api-tsafya.vercel.app/calculate/?details=%7B%22name%22:%22%D7%A6%D7%A4%D7%A8%D7%99%D7%A8%22,%22mother%22:%22%D7%A8%D7%97%D7%9C%22,%22gender%22:0,%22birth%22:%7B%22day%22:30,%22month%22:3,%22year%22:1972%7D%7D
