import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) { 
    activatedRoute.params.subscribe(param => {
      let termino = param['termino'];
      this.buscar(termino);
    })
  }

  ngOnInit() {
  }

  buscar(termino: string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe( (res: any) => {
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
      this.usuarios = res.usuarios;
      console.log(this.medicos);
    })
  }
}
