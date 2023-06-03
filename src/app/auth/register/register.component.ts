import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registroForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })
    
  }

  crearUsuario(){
    console.log(this.registroForm)
    console.log(this.registroForm.valid)
  }

}
