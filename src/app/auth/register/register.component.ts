import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registroForm: FormGroup;

  constructor(private fb:FormBuilder,
              private authService:AuthService){
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
    if(this.registroForm.invalid) return;

    const {nombre,email,password} = this.registroForm.value;
    this.authService.crearUsuario(nombre,email,password)
      .then(credenciales=>{
        console.log(credenciales)
      })
      .catch(err => {
        console.error(err)
      })
  }

}
