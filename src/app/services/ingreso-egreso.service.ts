import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, collectionChanges, collectionData, collectionSnapshots, deleteDoc, doc, docData, documentId, refEqual, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { Observable, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  coll:string|undefined='';

  constructor(
      private firestore:Firestore,
      private authService:AuthService,
      private store:Store<AppState>) { }

  save(ingresoEgreso:IngresoEgreso){
        let uid = this.authService.uid
        
        let data = {
          descripcion:ingresoEgreso.descripcion,
          monto:ingresoEgreso.monto,
          tipo:ingresoEgreso.tipo
        }
    
        let nuevaCol = collection(this.firestore,uid+'/ingreso-egreso/items')
        return addDoc(nuevaCol,data)
        
        

  }

  ingresoEgresoListener(uid:string|undefined){
    
    let collectionUser = collection(this.firestore,uid+'/ingreso-egreso/items')
    return collectionSnapshots(collectionUser)
        .pipe(
          map(datos=>
            datos.map(item=>(
              {
                uid:item.id,
                monto:item.get('monto'),
                descripcion:item.get('descripcion'),
                tipo:item.get('tipo')
              }
            )))
        )

  }

  borrarItem(uid:string|undefined){
    let uidCol;
    this.store.select('auth')
    .subscribe(
      dato=>this.coll=dato.user?.uid)

    let docRef = doc(this.firestore,this.coll+'/ingreso-egreso/items/'+uid)
    return deleteDoc(docRef)
    
        

  }

  borrarRegistro(col: string | undefined,uid:string|undefined): any {
    let docRef = doc(this.firestore,col+'/ingreso-egreso/items/'+uid)
    return deleteDoc(docRef)
  }
}


