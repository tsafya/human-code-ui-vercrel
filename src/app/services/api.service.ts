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
  host = 'human-code-api.herokuapp.com';
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
