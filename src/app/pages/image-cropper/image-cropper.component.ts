import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'image-cropper',
  templateUrl: './image-cropper.component.html',
  styles: []
})
export class ImageCropperComponent {
  @ViewChild("image")
  imageElement: ElementRef;
  @Input('src')
  imageSource: string;
  imageDestination: string;
  private cropper: Cropper;

  constructor() {
    this.imageDestination = "";
   }

   ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL("image/png");
        console.log("this.imageDestination::: ", this.imageDestination );
      }
    })
  }

}
