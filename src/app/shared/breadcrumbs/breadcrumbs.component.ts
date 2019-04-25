import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titleRoute: string;

  constructor(private router: Router) {
    this.getDataRoute()
    .subscribe( event => {
      this.titleRoute = event;
    });
  }

  ngOnInit() {
  }

  getDataRoute(): Observable<string> {
    return this.router.events.pipe(
      // filtra solo los eventos tipo ActivationEnd
      filter(evento => evento instanceof ActivationEnd),
      // filtra los eventos de tipo ActivationEnd contengan dentro de sus propiedades snapshot.data.title
      filter((evento: ActivationEnd) => evento.snapshot.data.title),
      // transforma la respuesta a el valor del evento.snapshop.data.title
      map((evento: ActivationEnd) => evento.snapshot.data.title)
    );
  }

}
