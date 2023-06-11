import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit{

  ingresoForm:FormGroup;
  tipo:string = "ingreso";

  constructor(private fb:FormBuilder){
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
    console.log("ingrespForm object : "+this.ingresoForm)
    console.log("tipo : "+this.tipo)
  }

}
