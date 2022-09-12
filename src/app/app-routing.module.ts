import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HairComponent} from "./hair/hair.component";

const routes: Routes = [
  { path: 'hair', component: HairComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
