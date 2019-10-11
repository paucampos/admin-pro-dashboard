import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';


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


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuario: UsuarioService) {
    this.usuario = this._usuario.usuario;
    this.imageDestination = "";
   }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuario.actualizarUsuario(this.usuario)
    .subscribe();
  }

  seleccionImagen(archivo: File) {
    console.log(archivo);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0) {
      swal('Sólo imagenes, el archivo seleccionado no es una imagen.');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    // Cargar preview de la imagen
    let reader = new FileReader();
    // let urlImagenTemp = reader.readAsDataURL(this.imagenSubir);
  
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  actualizarImagen() {
    this._usuario.actualizarImagen(this.imagenSubir, this.usuario._id);
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
