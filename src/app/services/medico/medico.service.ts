import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import { UsuarioService } from "../usuario/usuario.service";
import swal from "sweetalert";
import { Medico } from "../../models/medico.model";

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  constructor(public http: HttpClient, public _usuario: UsuarioService) {}

  cargarMedicos(desde: number = 0) {
    let url = `${URL_SERVICIOS}/medico?=desde${desde}`;

    return this.http.get(url);
  }

  buscarMedicos(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url).pipe(map((res: any) => res.medicos));
  }

  buscarMedicoId(id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url).pipe(map((res: any) => res.medico));
  }

  eliminarMedico(id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;
    url += "?token=" + this._usuario.token;

    return this.http.delete(url).pipe(
      map(res => {
        swal(
          "Médico eliminado",
          "El médico ha sido eliminado exitósamente.",
          "success"
        );
        return true;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = `${URL_SERVICIOS}/medico`;

    if (medico._id) {
      // Actualizando
      url += "/" + medico._id;
      url += "?token=" + this._usuario.token;

      return this.http.put(url, medico).pipe(
        map((res: any) => {
          swal("Medico Creado", medico.nombre, "success");
          return res.medico;
        })
      );
    } else {
      // Creando
      url += "?token=" + this._usuario.token;

      return this.http.post(url, medico).pipe(
        map((res: any) => {
          swal(
            "Médico creado",
            `El médico "${medico.nombre}" ha sido creado exitosamente.`,
            "success"
          );
          return res.medico;
        })
      );
    }
  }
}
