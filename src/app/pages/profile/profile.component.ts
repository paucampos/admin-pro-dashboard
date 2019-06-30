import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuario: UsuarioService) {
    this.usuario = this._usuario.usuario;
   }

  ngOnInit() {
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

  actualizarImagen() {
    this._usuario.actualizarImagen(this.imagenSubir, this.usuario._id);
  }

}
