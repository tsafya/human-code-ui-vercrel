import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalculateCodeComponent} from "./calculate-code/calculate-code.component";
import {CodeListComponent} from "./code-list/code-list.component";
import {AuthGuard} from "@auth0/auth0-angular";
import {MissingNamesComponent} from "./admin/missing-names/missing-names.component";

const routes: Routes = [
  { path: 'calculate', component: CalculateCodeComponent },
  { path: 'admin', canActivate: [AuthGuard], children:[
      { path: 'code-list', component: CodeListComponent, canActivate: [AuthGuard] },
      { path: 'missing-names', component: MissingNamesComponent, canActivate: [AuthGuard] }
    ] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
