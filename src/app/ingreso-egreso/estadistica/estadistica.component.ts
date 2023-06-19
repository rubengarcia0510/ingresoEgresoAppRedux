import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit{

  totalIngresos:number=0;
  totalEgresos:number=0;
  ingresosCounter:number=0;
  egresosCounter:number=0;
  porcentajeIngresos:number=0;
  porcentajeEgresos:number=0;

  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.select('ie')
          .subscribe(registro=>{
            registro.items.map(item=>{
              if(item.tipo == 'ingreso'){
                this.totalIngresos+=item.monto
                this.ingresosCounter++;
              }else{
                this.totalEgresos+=item.monto
                this.egresosCounter++;
              }
            })
          })
  }

}
