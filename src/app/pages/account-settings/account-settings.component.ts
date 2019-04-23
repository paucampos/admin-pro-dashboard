import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    let urlTema = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', urlTema);
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
}
