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

    // sino viene ImagenPipe, muestra una por defecto
    if (!img) {
      return url + "/usuarios/xxxx";
    }

    switch (tipo) {
      case "usuario":
          url += '/usuarios/' + img;
          break;

      case "medico":
          url += '/medicos/' + img;
          break;

      case "hospital":
       url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no existe, usuarios, medicos, hospitales');
        url += "/usuarios/xxxx";
        break;
    }
    return "FUNCIONA!";
  }
}
