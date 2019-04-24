import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit {
  constructor() {
    // pipe con operador retry
    this.regresaObservable()
      .pipe(
        // recibe como argumento el número de reintentos
        retry(2)
      )
      .subscribe(
        numero => console.log("subscribe", numero),
        error => console.log("Error en el obs: ", error),
        () => console.log("El observador terminó ok")
      );
  }

  ngOnInit() {}

  regresaObservable(): Observable<number> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        // notifica que llegó el contador
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          // clearInterval(intervalo);
          observer.error("Hubo un error, solo llegó a 2");
        }
      }, 1000);
    });
  }
}
