import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from '../../shared/ui.actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: FormGroup;
  cargando:boolean=false;
  uiSubscription: Subscription | undefined;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private route:Router,
              private store:Store<AppState>){ 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading
      });
    
  }

  loginUsuario(){

    if(this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    /*Swal.fire({
      title: 'Logeando usuario...',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/

    const {email,password} = this.loginForm.value;
    this.authService.loginUsuario(email,password)
      .then(credenciales=>{
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.route.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

}
