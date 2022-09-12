import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageSnippetService} from "../services/image-snippet.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-hair',
  templateUrl: './hair.component.html',
  styleUrls: ['./hair.component.scss']
})
export class HairComponent implements OnInit {
  @ViewChild('image', {static: false}) imageUpload: ElementRef;
  selectedFile: ImageSnippet;
  url: any;

  constructor(private imageService: ImageSnippetService){}

  ngOnInit(): void {
  }

  uploadImage() {
    this.imageUpload.nativeElement.click();
  }

  processBinary(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     alert(res)
      //   },
      //   (err) => {
      //
      //   })
    });

    reader.readAsDataURL(file);
  }


}
