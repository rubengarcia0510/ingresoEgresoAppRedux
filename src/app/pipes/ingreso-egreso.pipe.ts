import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

    let copia = [...items]
    copia.sort((a,b)=>{

      if(a.tipo == 'ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
    return copia
  }

}
