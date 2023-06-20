import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription, filter } from 'rxjs';
import { Firestore } from '@angular/fire/firestore/firebase';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{

  authSubscribe: Subscription = new Subscription;
  ingresosEgresosSubscription: Subscription = new Subscription;

  usuario:string | undefined;

  constructor(private store:Store<AppState>,
              private ingresoEgresoService:IngresoEgresoService){

  }
  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe()
    this.authSubscribe.unsubscribe()
  }
  ngOnInit(): void {

    this.authSubscribe = this.store.select('auth')
    
                .pipe(filter(auth=>auth.user != null))
                .subscribe( user => {
                  this.usuario = user.user?.nombre

                    this.ingresosEgresosSubscription = this.ingresoEgresoService.ingresoEgresoListener(user.user?.uid)
                        .subscribe(item=>{
                          this.store.dispatch(setItems({items:item}))
                        })
                })
  }

}
