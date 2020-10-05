import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Guardar datos de usuario registrados

  constructor(
    public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,  
    public ngZone: NgZone // Servicio NgZone para eliminar la advertencia de alcance externo
  ) {    

    /* Guardar datos de usuario en almacenamiento local cuando
    iniciado sesión y configurando nulo al cerrar sesión*/
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Iniciar sesión con correo electrónico / contraseña
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
        this.ngZone.run(() => {
          localStorage.setItem('user', JSON.stringify(result.user));
          JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['listCliente']);
        });
      }).catch((error) => {
       // window.alert("Por favor revisar credenciales")
         window.alert(error.message)
      })
  }

  // Regístrese con correo electrónico / contraseña
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

    // Devuelve verdadero cuando el usuario está conectado y  el correo electrónico está verificado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    //^ Verifica que el correo haya sido confirmado
    return (user !== null) ? true : false;
  }

  // Iniciar sesión usando Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Lógica de autenticación para ejecutar cualquier proveedor de autenticación  
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      this.SetUserData(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      JSON.parse(localStorage.getItem('user'));
      this.ngZone.run(() => {
          this.router.navigate(['listCliente']);
        })
    }).catch((error) => {
      window.alert(error)
    })
  }


  /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
  registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
  proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // desconectar
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }



}