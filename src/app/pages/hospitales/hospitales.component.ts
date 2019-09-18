import { Component, OnInit } from "@angular/core";
import { HospitalService } from "../../services/service.index";
import { Hospital } from "../../models/hospital.model";
import swal from "sweetalert";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  espera: boolean = true;

  constructor(public _hospital: HospitalService, public _modalUpload: ModalUploadService) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUpload.notificacion.subscribe( res => this.cargarHospitales());
  }

  cargarHospitales() {
    this.espera = true;

    this._hospital.cargarHospitales().subscribe((res: any) => {
      // Orden por nombre
      this.hospitales = res.hospitales.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.totalRegistros = res.total;
      this.espera = false;
    });
  }

  buscarHospitales(termino: string) {
    if(termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    if(termino.length >= 3) {
      this.espera = true;
      this._hospital.buscarHospitales(termino)
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.espera = false;
        });
    }
  }

  modificarHospital(hospital: Hospital) {
    this._hospital.editarHospital(hospital)
    .subscribe();
  }

  eliminarHospital(hospital: Hospital) {
    swal({
      title: "¿Estás seguro que deseas eliminar el hospital?",
      text: `Estás a punto de eliminar el hospital "${hospital.nombre}"`,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Eliminar"]
    }).then(eliminar => {
      if (eliminar) {
        this._hospital.eliminarHospital(hospital._id).subscribe(res => {
          this.cargarHospitales();
        });
      }
    });
  }

  crearHospital() {
    swal({
      title: "Crea un hospital",
      text: "Ingresa el nombre del hospital",
      content: {
        element: "input",
        attributes: {
          placeholder: "Nombre hospital",
          type: "text",
        }
      },
      buttons: ["Cancelar", "Crear"]
    }).then((hospital: string) => {
      if (hospital) {
        this._hospital.crearHospital(hospital).subscribe(() => this.cargarHospitales());
      }
    });
  }

  mostrarModal(id: string) {
    this._modalUpload.mostrarModal('hospitales', id);
  }

}
