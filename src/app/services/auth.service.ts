import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() { 
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
   console.log(aUser?.uid);
   console.log(aUser?.email);
  })
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
    
  }

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

  listenerUserState(){
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
     console.log(aUser);
    })
  }

  isAuth(){
    
    return this.authState$.pipe(
      map( user => user != null)
    )
  }
}
