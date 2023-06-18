import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
borrar(arg0: string|undefined) {
throw new Error('Method not implemented.');
}

  ingEgArray:IngresoEgreso[] = []

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.store.select('ie')
        .subscribe(store=>this.ingEgArray=store.items)
  }

}
