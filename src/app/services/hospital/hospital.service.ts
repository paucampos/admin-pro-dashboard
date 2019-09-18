import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { Hospital } from "src/app/models/hospital.model";
import swal from "sweetalert";
import { map } from "rxjs/operators";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class HospitalService {

  constructor(public http: HttpClient, public _usuario: UsuarioService) {
    this._usuario.cargarStorage();
  }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;

    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;

    return this.http.get(url).pipe(map((res: any) => res.hospital));
  }

  eliminarHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    url += "?token=" + this._usuario.token;

    return this.http.delete(url).pipe(
      map(res => {
        swal(
          "Hospital eliminado",
          "El hospital ha sido eliminado exitósamente.",
          "success"
        );
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    
    let url = `${URL_SERVICIOS}/hospital`;
    url += "?token=" + this._usuario.token;
    return this.http.post(url, {nombre}).pipe(
      map((res: any) => {
        swal(
          "Hospital creado",
          `El hospital "${nombre}" ha sido creado exitosamente.`,
          "success"
        );
        return res.hospital;
      })
    );
  }

  buscarHospitales(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;

    return this.http.get(url).pipe(map((res: any) => res.hospitales));
  }

  editarHospital(hospital: Hospital) {
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}`;
    url += "?token=" + this._usuario.token;

    return this.http.put(url, hospital).pipe(
      map((res: any) => {
        swal("Hospital actualizado exitósamente", hospital.nombre, "success");

        return true;
      })
    );
  }
}
