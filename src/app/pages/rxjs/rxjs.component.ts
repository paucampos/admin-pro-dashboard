import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  // referencia al observador
  subscription: Subscription;  

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log("subscribe", numero),
        error => console.log("Error en el obs: ", error),
        () => console.log("El observador terminó ok")
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    // Al dejar el componente me desuscribo
    this.subscription.unsubscribe();
  }

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
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
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
