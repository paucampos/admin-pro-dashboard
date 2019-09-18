import { Component, OnInit } from "@angular/core";
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/medico/medico.service";
import { HospitalService } from "../../services/hospital/hospital.service";
import { Hospital } from "../../models/hospital.model";
import swal from "sweetalert";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  espera: boolean = true;
  totalRegistros: number = 0;
  medicos: Medico[] = [];
  hospital: String;
  desde: number = 0;

  constructor(
    public _medico: MedicoService,
    public _hospital: HospitalService,
    public _modalUpload: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.espera = true;
    this._medico.cargarMedicos(this.desde).subscribe((res: any) => {
      if (res.ok) {
        this.espera = false;
        this.totalRegistros = res.total;
        // Orden por nombre
        this.medicos = res.medicos.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      }
    });
  }

  // Paginacion
  verLista(valor) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;

    this.cargarMedicos();
  }

  obtenerHospital(id: string) {
    this._hospital.obtenerHospital(id);
  }

  buscarMedicos(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    if (termino.length >= 3) {
      this.espera = true;
      this._medico.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.espera = false;
      });
    }
  }

  eliminarMedico(medico: Medico) {
    swal({
      title: "¿Estás seguro que deseas eliminar al medico?",
      text: `Estás a punto de eliminar el medico "${medico.nombre}"`,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Eliminar"]
    }).then(eliminar => {
      if (eliminar) {
        this._medico.eliminarMedico(medico._id).subscribe(res => {
          this.cargarMedicos();
        });
      }
    });
  }

  mostrarModal(id: string) {}
}
