import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  registroForm: FormGroup;
  cargando:boolean=false;
  uiSubscription: Subscription | undefined;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private route:Router,
              private store:Store<AppState>){
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

  }
  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading
        console.log("cargando subs...")
        console.log(this.cargando)
      });
    
  }

  crearUsuario(){

    if(this.registroForm.invalid) return;

    this.store.dispatch(ui.isLoading());
/*
    Swal.fire({
      title: 'Creando usuario',
      didOpen: () => {
        Swal.showLoading()
      }
    })
*/
    const {nombre,email,password} = this.registroForm.value;
    this.authService.crearUsuario(nombre,email,password)
      .then(credenciales=>{
        console.log(credenciales);
        this.store.dispatch(ui.stopLoading());
        //Swal.close();
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
