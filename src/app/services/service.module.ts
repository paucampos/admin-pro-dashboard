import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoService, SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    UsuarioService,
    SettingsService, 
    SharedService, 
    SidebarService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
