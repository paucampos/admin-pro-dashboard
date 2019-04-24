import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('Promesa Terminó!', mensaje)
    )
    .catch(error => console.log('Error en la promesa', error)
    )
  }

  ngOnInit() {
  }
  
  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador ++;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('Un simple error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
