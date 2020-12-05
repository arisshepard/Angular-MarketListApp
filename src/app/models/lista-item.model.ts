export class ListaItem {
	id?: string;
	producto: string;
	cantidad: number;
	comprado: boolean;

	constructor(producto: string, cantidad: number) {
		this.producto = producto;
		this.cantidad = cantidad;
		this.comprado = false;
	}
}
