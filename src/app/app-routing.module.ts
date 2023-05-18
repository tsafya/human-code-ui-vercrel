import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalculateCodeComponent} from "./calculate-code/calculate-code.component";
import {CodeListComponent} from "./code-list/code-list.component";

const routes: Routes = [
  { path: 'calculate', component: CalculateCodeComponent },
  { path: 'code-list', component: CodeListComponent },
  { path: '**', component: CalculateCodeComponent },
  // { path: '', redirectTo: '/calculate', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
