import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit{

  ingresoForm:FormGroup;
  tipo:string = "ingreso";
  

  constructor(
      private fb:FormBuilder,
      private ingresoEgresoService:IngresoEgresoService){
    this.ingresoForm =
    this.fb.group({
      monto:['',Validators.required],
      descripcion:['',Validators.required],
      tipo:['ingreso',Validators.required]
    })
    
  }

  ngOnInit(): void {

    
  }

  guardar(){
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
