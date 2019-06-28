import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): any {
    // Validar si la imagen es de google
    if (img.indexOf("https") >= 0) {
      return img;
    }
    // Sino voy a buscarla
    let url = `${URL_SERVICIOS}/img`;

    // si no viene ImagenPipe, muestra una por defecto
    if (!img) {
      return url + "/usuarios/xxxx";
    }

    switch (tipo) {     
      case "usuario":
          return url += '/usuarios/' + img;
      case "medico":
          return url += '/medicos/' + img;
      case "hospital":
       return url += '/hospitales/' + img;

      default:
        alert('Tipo de imagen no existe, usuarios, medicos, hospitales');
        return url += "/usuarios/xxxx";
    }
  }
}
