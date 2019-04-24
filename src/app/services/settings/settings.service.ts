import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Ajustes por defecto
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // Guardando ajustes en localStorage
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    // Cargando ajustes del localStorage
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      // Carga ajustes por defecto
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', this.ajustes.temaUrl);
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
