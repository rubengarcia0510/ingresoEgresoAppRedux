import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit,OnDestroy{

  ingresoForm:FormGroup;
  tipo:string = "ingreso";
  cargando:boolean=false
  cargansoSubs:Subscription=new Subscription();
  

  constructor(
      private fb:FormBuilder,
      private store:Store<AppState>,
      private ingresoEgresoService:IngresoEgresoService){
    this.ingresoForm =
    this.fb.group({
      monto:['',Validators.required],
      descripcion:['',Validators.required],
      tipo:['ingreso',Validators.required]
    })
    
  }
  ngOnDestroy(): void {
    if(!this.cargando){
      this.cargansoSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.cargansoSubs =
    this.store.select('ui').subscribe(item=>{
      console.log("variable cargando..."+item.isLoading)
      if(item.isLoading){
        this.cargando=true
      }else{
        this.cargando=false
      }
    })
    
  }

  guardar(){

    setTimeout(()=>{
      this.store.dispatch(ui.stopLoading())
    },2500)
    //const {email,password} = this.ingresoForm.value;
    console.log("ingrespForm object : "+this.ingresoForm?.value)
    let datos = {
      descripcion: this.ingresoForm.get('descripcion')?.value,
      monto: this.ingresoForm.get('monto')?.value,
      tipo: this.tipo
    }
    this.ingresoEgresoService.save(datos)
      .then(response=>{
        console.log("salida de firestore : "+response)
        Swal.fire("Registro insertado",datos.descripcion,'success')
        this.ingresoForm.reset
      })
      .catch(error=>{
        Swal.fire("Error insertando registro en firestore",error,'error')
      })
    console.log("tipo : "+this.tipo)

    
    
    //this.ingresoEgresoService.save()
  }

}
