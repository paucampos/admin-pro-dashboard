import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titleRoute: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute()
    .subscribe( titlePage => {
      this.titleRoute = titlePage;
      // setteo el titulo que quiero que aparezca en la pestaña del navegador
      this.title.setTitle('AdminPro - ' + this.titleRoute);
      // agregar un nuevo metatag con los siguientes valores
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titleRoute
      }
      // Actualiza el meta
      this.meta.updateTag( metaTag);
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
      map((titulo: ActivationEnd) => titulo.snapshot.data.title)
    );
  }

}
