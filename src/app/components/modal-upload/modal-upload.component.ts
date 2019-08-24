import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _modalUpload: ModalUploadService, public _subirArchivo: SubirArchivoService ) {
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUpload.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0) {
      alert('Sólo imagenes, el archivo seleccionado no es una imagen.');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    // Cargar preview de la imagen
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.imagenSubir);
  
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivo.subirArchivo(this.imagenSubir, this._modalUpload.tipo, this._modalUpload.id)
    .then( res => {
      this._modalUpload.notificacion.emit(res);
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga...');
    });
  }
}
