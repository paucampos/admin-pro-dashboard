import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(public http: HttpClient) { }

  login(usuario: Usuario, recuerdame = false) {
    let url = `${URL_SERVICIOS}/login`;
    
    return this.http.post(url, usuario)
  }

  crearUsuario(usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
      .pipe(map( (res: any) => {
        alert('Usuario creado exitosamente ' + usuario.email);
        return res.usuario;
      }));
  }
}
