import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface response {
  codes: codes
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
  protocol = 'https';
  host = 'api-tsafya.vercel.app';
  endpoint = `${this.protocol}://${this.host}`

  constructor(private http: HttpClient) {}

  isHebrewCharacters(name: string) {
    return this.http.get(`https://human-code-api.herokuapp.com/is_hebrewChars/?name=%D7%A8%D7%97%D7%9C`);
  }

  calculateCode(details: any) {
    const requestOptions = {
      params: {details: details},
    };
    return this.http.get<response>(`${this.endpoint}/calculate/`, requestOptions);
  }
}

// https://api-tsafya.vercel.app/calculate/?details=%7B%22name%22:%22%D7%A6%D7%A4%D7%A8%D7%99%D7%A8%22,%22mother%22:%22%D7%A8%D7%97%D7%9C%22,%22gender%22:0,%22birth%22:%7B%22day%22:30,%22month%22:3,%22year%22:1972%7D%7D
