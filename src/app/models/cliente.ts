import { Consulta } from './consulta';
import { Mascota } from './mascota';

export class Cliente {
    public DUI:string;
    public nombre:string;
    public mascotas:Mascota[];
    public consultas:Consulta[];
}
