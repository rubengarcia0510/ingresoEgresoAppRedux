import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registroForm: FormGroup;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private route:Router){
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
        this.route.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

}
