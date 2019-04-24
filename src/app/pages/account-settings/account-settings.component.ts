import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( 
    public _ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.rescatarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any){
    let selectors: any = document.getElementsByClassName('selector');

    for(let ref of selectors) {
      // vanilla javascript
      ref.classList.remove('working');
    }
    // vanilla javascript
    link.classList.add('working');
  }

  rescatarCheck() {
    // vanilla javascript
    let selectors: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for(let ref of selectors) {
      if(ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
