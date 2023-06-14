import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

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

  ingresoEgresoListener(uid:string){
    let collectionUser = collection(this.firestore,uid+'/ingreso-egreso/items')
    let docsIngresoEgreso = collectionData(collectionUser) as Observable<IngresoEgreso[]>;
    docsIngresoEgreso.subscribe(items=>{
      console.log(items)
    })
  }
}
