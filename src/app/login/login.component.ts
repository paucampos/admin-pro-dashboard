import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

// llamar cualquier script fuera angular en un archivo de js
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;

  constructor(public _usuario: UsuarioService , public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(formulario: NgForm) {
    if(!formulario.valid) {
      return;
    }

    let usuario = new Usuario(null, formulario.value.email, formulario.value.password)
  
    this._usuario.login(usuario, formulario.value.recuerdame)
    .subscribe( res => {
      console.log(res);
    })
    // this.router.navigate(['/dashboard']);
  }
}
