import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    UsuarioService,
    SettingsService, 
    SharedService, 
    SidebarService
  ],
  declarations: []
})
export class ServiceModule { }
