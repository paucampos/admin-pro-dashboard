import { Component, OnInit } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit {
  constructor() {
    this.regresaObservable()
      .subscribe(
        numero => console.log("subscribe", numero),
        error => console.log("Error en el obs: ", error),
        () => console.log("El observador terminó ok")
      );
  }

  ngOnInit() {}

  regresaObservable(): Observable<number> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        }
        // notifica que llegó el contador
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      // map transforma la info como quiera
      map( resp => resp.valor),
      filter((valor, index) => {
        if((valor%2) === 1){
          // impar
          return true;
        }
        // par
        return false;
      })
    );
  }
}
