import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  datosFirebase:AngularFireList<any>;
  constructor(
    private firebase:AngularFireDatabase
  ) { }

  obtenerDatos(rama:string){
    return this.datosFirebase = this.firebase.list(rama);
  }
}
