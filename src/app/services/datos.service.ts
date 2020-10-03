import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Cliente } from '../models/cliente';

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

  guardarConsulta(cliente:Cliente){
    this.firebase.list('Clientes').update(cliente.DUI,{
      nombre: cliente.nombre,
      consultas: cliente.consultas,
      mascotas: cliente.mascotas
    });
  }
}
