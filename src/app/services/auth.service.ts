import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  constructor() { }

  crearUsuario(nombre:string,email:string,password:string){
    console.log({nombre,email,password})

    return createUserWithEmailAndPassword(this.auth,email,password)     

  }

  loginUsuario(email:string,password:string){
    console.log({email,password})

    return signInWithEmailAndPassword(this.auth,email,password); 

  }

  logouUsusario(){
    return this.auth.signOut();
  }
}
