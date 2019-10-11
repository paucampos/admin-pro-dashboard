import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico/medico.service';
import { HospitalService } from '../../../services/service.index';
import { Medico } from '../../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Location } from "@angular/common";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _medico: MedicoService, 
    public _hospital: HospitalService, 
    public _modalUpload: ModalUploadService,
     public router: Router, 
     public activatedRoute: ActivatedRoute,
     public _location: Location
     ) {
    this.activatedRoute.params.subscribe( params => {
      if ( params.id != 'nuevo') {
        let id = params.id;
        this.buscarMedicoId(id);
      }
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUpload.notificacion
    .subscribe( res => {
      this.medico.img = res.elementoActualizado.img;
    });
  }

  atras(){ 
    this._location.back();
  }

  buscarMedicoId(id) {
    this._medico.buscarMedicoId(id)
      .subscribe((medico:any) => {
        this.medico = medico;
        this.hospital = medico.hospital;
        this.medico.hospital = medico.hospital._id;
        console.log("medico", this.medico);
      });
  }
  
  cargarHospitales() {
    this._hospital.cargarHospitales()
      .subscribe( (res: any) => {
        this.hospitales = res.hospitales;
      });
  }

  guardarMedico(f: NgForm) {
    if(f.invalid) {
      return;
    }
    this._medico.guardarMedico(this.medico)
    .subscribe((medico: any) => {
      console.log(medico);
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    })
    console.log(f.valid);
    console.log(f.value);
  }

  cambioHospital(event) {
    let id = event.target.value;
    this._hospital.obtenerHospital(id)
    .subscribe( hospital => this.hospital = hospital);
    
  }

  mostrarModal() {
  this._modalUpload.mostrarModal('medicos', this.medico._id);
  }
}
