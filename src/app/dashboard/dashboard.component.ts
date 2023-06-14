import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription, filter } from 'rxjs';
import { Firestore } from '@angular/fire/firestore/firebase';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{

  authSubscribe: Subscription = new Subscription;

  constructor(private store:Store<AppState>,
              private ingresoEgresoService:IngresoEgresoService){

  }
  ngOnDestroy(): void {
    this.authSubscribe.unsubscribe()
  }
  ngOnInit(): void {

    this.authSubscribe = this.store.select('auth')
                .pipe(filter(auth=>auth.user != null))
                .subscribe( user => {
                  console.log(user)
                  if(user.user){
                    this.ingresoEgresoService.ingresoEgresoListener(user.user.uid)
                  }
                  
                })
  }

}
