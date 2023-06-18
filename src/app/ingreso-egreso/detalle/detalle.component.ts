import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy{
borrar(arg0: string|undefined) {
throw new Error('Method not implemented.');
}

  ingEgArray:IngresoEgreso[] = []
  storeSubs:Subscription = new Subscription;

  constructor(private store:Store<AppState>){}
  ngOnDestroy(): void {
    this.storeSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.storeSubs = 
    this.store.select('ie')
        .subscribe(store=>this.ingEgArray=store.items)
  }

}
