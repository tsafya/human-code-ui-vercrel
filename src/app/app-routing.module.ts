import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalculateCodeComponent} from "./calculate-code/calculate-code.component";

const routes: Routes = [
  { path: 'calculate', component: CalculateCodeComponent },
  { path: '**', component: CalculateCodeComponent },
  // { path: '', redirectTo: '/calculate', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
