import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoService, SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService, HospitalService,
  LoginGuardGuard, AdminGuard, VerificaTokenGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
