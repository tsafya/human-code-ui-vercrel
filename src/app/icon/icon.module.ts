import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [MatIconModule],
  providers: [MatIconRegistry]
})
export class IconModule {
  private path = './assets/images'

  constructor(private domSanitizer: DomSanitizer,
              public matIconRegistry: MatIconRegistry) {
    this.matIconRegistry
        .addSvgIcon('2', this.setPath(`${this.path}/triangle.svg`))
        .addSvgIcon('0', this.setPath(`${this.path}/circle.svg`))
        .addSvgIcon('1', this.setPath(`${this.path}/rectangle.svg`))
  }
  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
