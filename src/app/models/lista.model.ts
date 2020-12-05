import { ListaItem } from './lista-item.model';
export class Lista {
	id?: string;
	nombre: string;
	completada: boolean;
	fechaCreacion: number;
	fechaCompletada?: number;
	items?: ListaItem[];

	constructor(nombre: string) {
		this.nombre = nombre;
		this.fechaCreacion = Date.now();
		this.items = [];
		this.completada = false;
	}
}
