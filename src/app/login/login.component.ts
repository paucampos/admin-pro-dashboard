import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

// llamar cualquier script fuera angular en un archivo de js
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  auth2: any;

  constructor(public _usuario: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '744966470634-r8ri8m5dd4oc5gcvbgl3n5nu92rdsl9k.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
     // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuario.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard' );
    });
  }

  ingresar(formulario: NgForm) {
    if(!formulario.valid) {
      return;
    }

    let usuario = new Usuario(null, formulario.value.email, formulario.value.password)
  
    this._usuario.login(usuario, formulario.value.recuerdame)
    .subscribe( res => this.router.navigate(['/dashboard']));
  }
}
