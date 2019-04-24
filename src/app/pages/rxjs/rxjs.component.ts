import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 
    let obs = new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(()=> {
        contador += 1;
        // notifica que llegó el contador
        observer.next(contador);
        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if(contador === 2) {
          observer.error('Hubo un error, solo llegó a 2');
        }
      }, 1000);
    });

    obs.subscribe( 
      numero => console.log("subscribe", numero),
      error => console.log('Error en el obs: ', error),
      () => console.log('El obs terminó ok')
    );
  }

  ngOnInit() {
  }

}
