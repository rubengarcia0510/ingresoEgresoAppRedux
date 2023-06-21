import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy{


  ingEgArray:IngresoEgreso[] = []
  storeSubs:Subscription = new Subscription;

  constructor(private store:Store<AppStateWithIngresoEgreso>,
              private itemsService:IngresoEgresoService){}
  ngOnDestroy(): void {
    this.storeSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.storeSubs = 
    this.store.select('ie')
        .subscribe(store=>this.ingEgArray=store.items)
  }

  borrar(arg0: string|undefined) {
    this.itemsService.borrarItem(arg0)
          .then(resp=>Swal.fire('Borrado','Item borrado','success'))
          .catch(err=>Swal.fire('Borrado',err.message(),'error'))
        

        
  }

}
