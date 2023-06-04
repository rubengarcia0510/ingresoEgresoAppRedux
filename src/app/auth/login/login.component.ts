import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private route:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })
    
  }

  loginUsuario(){
    console.log(this.loginForm)
    console.log(this.loginForm.valid)
    if(this.loginForm.invalid) return;

    const {email,password} = this.loginForm.value;
    this.authService.loginUsuario(email,password)
      .then(credenciales=>{
        console.log(credenciales)
        this.route.navigate(['/']);
      })
      .catch(err => {
        console.error(err)
      })
  }

}
