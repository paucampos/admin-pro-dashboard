import { Component, OnInit } from "@angular/core";
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from "src/app/services/service.index";
import swal from 'sweetalert';


@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  espera: boolean = true;

  constructor(public _usuario: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.espera = true;
    this._usuario.cargarUsuarios(this.desde).subscribe((res: any) => {
      if (res.ok) {
        this.espera = false;
        this.totalRegistros = res.total;
        // Orden por nombre
        this.usuarios = res.usuarios;
        // .sort((a, b) => a.nombre.localeCompare(b.nombre));
      }
    });
  }

  verLista(valor) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if(termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    if(termino.length >= 3) {
      this.espera = true;
      this._usuario.buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.espera = false;
        });
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuario.usuario._id) {
      swal("No puede eliminar a usuario", "No puedes eliminar tu mismo usuario", "error");
      return;
    } else {
      swal({
        title: '¿Estás seguro que deseas eliminar al usuario?',
        text: `Estás a punto de eliminar el usuario "${usuario.nombre}"`,
        icon:'warning',
        dangerMode: true,
        buttons: ['Cancelar', 'Eliminar'],
      })
      .then(eliminar => {
        console.log(eliminar);
        if (eliminar) {
          this._usuario.eliminarUsuario(usuario._id)
          .subscribe( res => {
            console.log(res);
            this.cargarUsuarios();
          });          
        }
      });

    }
  }

  modificarUsuario(usuario: Usuario) {
    this._usuario.actualizarUsuario(usuario)
    .subscribe();
  }
}
