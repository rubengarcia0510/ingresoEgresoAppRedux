import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, doc, documentId, getDoc, getFirestore, setDoc,  } from '@angular/fire/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as action from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription = new Subscription();
  userFirestore: Subscription = new Subscription; 
  setuser:boolean = false
  _uid:string=''

  private firestore: Firestore = inject(Firestore);
  users$: Observable<Usuario[]> | undefined ;
  usersCollection: CollectionReference=collection(this.firestore, 'users');
  aux= Observable<Usuario[]>

  constructor(private store:Store<AppState>) { 
    /*
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser?.uid);
      console.log(aUser?.email);

   
  })

  */
  }

  ngOnDestroy(): void {
    this.userFirestore.unsubscribe();
    
  }

  addUserProfile(uid:string,nombre:string,email:string) {
    if (!nombre) return;

    let nuevo = {
      uid:uid,
      nombre:nombre,
      email:email
    }

    const docRef = doc(this.firestore, uid,"usuario")
    setDoc(docRef, nuevo)
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
     console.log("usuario :::: "+aUser);
     let userProfileCollection:any='users';

     

     if(aUser){
      userProfileCollection = collection(this.firestore, aUser?.uid);
      
     }
     

        // get documents (data) from the collection using collectionData
     let aux = collectionData(userProfileCollection) as Observable<Usuario[]>;
 

     
     if(aUser){
      console.log("UID : "+aUser.uid)
      console.log("Nombre : "+aUser.email)
      this._uid=aUser.uid
      this.userFirestore =
      aux.subscribe(data=>{
        console.log("aux : "+data[0])
        this.store.dispatch(action.setUser({user:data[0]}))
      })
        
        
     }else{
      console.log("unset user")
      this.store.dispatch(action.unSetUser())
      this.userFirestore.unsubscribe()
      this._uid=''
      
      

     }

    })
  }

  isAuth(){
    
    return this.authState$.pipe(
      map( user => user != null)
    )
  }

  get uid(){
    return this._uid
  }
}
