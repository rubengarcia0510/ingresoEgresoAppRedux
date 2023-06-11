import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
      private firestore:Firestore,
      private authService:AuthService) { }

  save(ingresoEgreso:IngresoEgreso){

      console.log("datos en el servicio de ingreso egreso : "+ingresoEgreso.descripcion)


        console.log("authservice : "+this.authService.uid)
        let uid = this.authService.uid
        
        let data = {
          descripcion:ingresoEgreso.descripcion,
          monto:ingresoEgreso.monto,
          tipo:ingresoEgreso.tipo
        }
    
        let nuevaCol = collection(this.firestore,uid+'/ingreso-egreso/items')
        return addDoc(nuevaCol,data)
        
        

  }
}
