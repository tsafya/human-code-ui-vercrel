import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { CalculateCodeComponent } from './calculate-code/calculate-code.component';
import {ApiService} from "./services/api.service";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IconModule} from "./icon/icon.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NameCodesService} from "./services/name-codes.service";
import { CodeListComponent } from './code-list/code-list.component';
import {AgGridModule} from "ag-grid-angular";
import {AuthInterceptor} from "./authentication/auth.interceptor";
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    CalculateCodeComponent,
    CodeListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IconModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        AgGridModule,
        AuthModule.forRoot({
            domain: 'dev-rornbffga432mrx1.us.auth0.com',
            clientId: 'O5919MoP378XIfyVcN28j88QL36t2deV',
            authorizationParams: {
                audience: 'https://human-code/api',
            },
            // The AuthHttpInterceptor configuration
            httpInterceptor: {
                allowedList: [
                    // Attach access tokens to any calls to '/api' (exact match)
                    '/api',

                    // Attach access tokens to any calls that start with '/api/'
                    '/api/*',
                    '/code-list/*'
                ]
            }
        }),
    ],
  providers: [
      ApiService,
      NameCodesService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
