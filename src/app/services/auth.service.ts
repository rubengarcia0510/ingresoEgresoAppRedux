import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getFirestore, setDoc,  } from '@angular/fire/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  private firestore: Firestore = inject(Firestore);
  users$: Observable<Usuario[]> | undefined;
  usersCollection: CollectionReference=collection(this.firestore, 'users');

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

  addUserProfile(uid:string,nombre:string,email:string) {
    if (!nombre) return;

    let nuevaColl=collection(this.firestore,uid)
    
    addDoc(nuevaColl, <Usuario> { uid,nombre,email }).then((documentReference: DocumentReference) => {
        // the documentReference provides access to the newly created document
        console.log(documentReference)
    });
}

  crearUsuario(nombre:string,email:string,password:string){
    console.log({nombre,email,password})
    
    return createUserWithEmailAndPassword(this.auth,email,password)
                .then(user=>{
                  this.addUserProfile(user.user.uid,nombre,email);
                })

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
