import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';
// import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// import { error } from 'protractor';

import {
	AngularFireDatabase,
	AngularFireList,
	AngularFireObject,
} from '@angular/fire/database';
// import {
// 	AngularFirestore,
// 	AngularFirestoreCollection,
// 	DocumentReference,
// } from '@angular/fire/firestore';

// export class Item {
// 	id?: string;
// 	nombre: string;
// 	completada: boolean;
// 	fechaCreacion: Date;
// 	fechaCompletada: Date;
// 	// items: ListaItem[];

// 	constructor(nombre: string) {
// 		this.nombre = nombre;
// 		this.fechaCreacion = new Date();
// 		// this.items = [];
// 	}
// }

@Injectable({
	providedIn: 'root',
})
export class ListasService {
	// listas: Lista = new Lista('nueva lista');
	// public listas: Lista[] = [];

	// private listasCollection: AngularFirestoreCollection<Lista>;
	// listas: Observable<Lista[]>;

	// private itemsCollection: AngularFirestoreCollection<Item>;
	// items: Observable<Item[]>;

	listaListRef: AngularFireList<Lista>;
	listaRef: AngularFireObject<Lista>;

	constructor(
		// private http: HttpClient,
		private db: AngularFireDatabase // private afs: AngularFirestore
	) {}

	// CREATE ITEM
	createItem(item: ListaItem, listaId: string) {
		const listaItemsRef = this.db.list(`/listas/${listaId}/items`);
		return listaItemsRef.push(item);
	}

	// CREATE LISTA
	createLista(nombre: string) {
		this.listaListRef = this.db.list('/listas');
		const lista: Lista = new Lista(nombre);
		return this.listaListRef.push(lista);
	}

	// DELETE ITEM
	deleteItem(idLista: string, idItem: string): Promise<void> {
		const itemRef = this.db.object(`/listas/${idLista}/items/${idItem}`);
		return itemRef.remove();
	}

	// DELETE LISTA
	deleteLista(id: string): Promise<void> {
		this.listaRef = this.db.object('/listas/' + id);
		return this.listaRef.remove();
		// return this.http.delete(`${environment.URL}/listas/${id}.json`);
	}

	// GET ITEM
	getItem(idLista: string, idItem: string): Observable<ListaItem> {
		const itemRef = this.db.object<ListaItem>(
			`/listas/${idLista}/items/${idItem}`
		);

		// Hay que hacer un pipe porque necesita el ID que no lo tiene
		return itemRef.valueChanges().pipe(
			map((respuesta) => {
				// console.log('GetItem');

				const item: ListaItem = { ...respuesta };
				item.id = idItem;

				return item;
			})
		);
	}

	// GET LISTA
	getLista(id: string): Observable<Lista> {
		const listaRef = this.db.object('/listas/' + id);

		// console.log('ListaRef', listaRef);

		return listaRef.valueChanges().pipe(
			map((respuesta: Lista) => {
				if (respuesta) {
					console.log('GetLista', respuesta);

					const lista: Lista = { ...respuesta };
					lista.items = this.crearArrayItems(respuesta.items);
					lista.id = id;

					return lista;
				}
			})
		);
	}

	// GET LISTAS
	getListas(): Observable<Lista[]> {
		const listaListRef = this.db.list('/listas');

		return listaListRef.snapshotChanges().pipe(
			map((respuesta: any) => {
				console.log('GetListas');

				return this.crearArregloListas(respuesta);
			})
		);
	}

	// UPDATE ITEM
	updateItem(idLista: string, item: ListaItem): Promise<void> {
		const itemRef = this.db.object<ListaItem>(
			`/listas/${idLista}/items/${item.id}`
		);

		return itemRef.update(item);
	}

	// UPDATE LISTA
	updateLista(lista: Lista): Promise<void> {
		this.listaRef = this.db.object<Lista>('/listas/' + lista.id);

		return this.listaRef.update(lista);
	}

	// PRIVATE METHODS
	private crearArregloListas(listasObj: any): Lista[] {
		const listas: Lista[] = [];

		if (listasObj === null) {
			return [];
		}

		listasObj.forEach((item: any) => {
			const lista = item.payload.toJSON() as Lista;
			lista.id = item.key;
			listas.push(lista);
		});

		return listas;
	}

	private crearArrayItems(itemsObj: object): ListaItem[] {
		const items: ListaItem[] = [];

		if (itemsObj === null || !itemsObj) {
			return [];
		}
		Object.keys(itemsObj).forEach((key) => {
			const item: ListaItem = itemsObj[key];
			item.id = key;
			items.push(item);
		});

		return items;
	}

	// actualizarLista(lista: Lista): Observable<any> {
	// 	const listaTemp = { ...lista };

	// 	delete listaTemp.id;

	// 	return this.http.put(
	// 		`${environment.URL}/listas/${lista.id}.json`,
	// 		listaTemp
	// 	);
	// }

	// borrarLista(id: string): Observable<any> {
	// 	return this.http.delete(`${environment.URL}/listas/${id}.json`);
	// }

	// crearItem(item: ListaItem, listaId: string): Observable<ListaItem> {
	// 	console.log('crearItem');

	// 	// console.log('vamos a crear el item ', item);
	// 	// console.log('En la lista ', listaId);

	// 	const listaItem = {
	// 		...item,
	// 	};

	// 	delete item.id;

	// 	// console.log('Esto es lo que vamos a crear: ', listaItem);

	// 	return this.http
	// 		.post(`${environment.URL}/listas/${listaId}/items.json`, listaItem)
	// 		.pipe(
	// 			map((respuesta: any) => {
	// 				item.id = respuesta.name;
	// 				return item;
	// 			})
	// 		);
	// }

	// crearLista(nombre: string): Promise<DocumentReference> {
	// 	// console.log(nombre);

	// 	// const listaTemp = { ...lista };

	// 	// delete listaTemp.id;

	// 	// delete listaTemp.id;

	// 	const lista: Lista = new Lista(nombre);

	// 	const listatemp = { ...lista };

	// 	delete listatemp.id;
	// 	// console.log('ItemTemp: ', listatemp);

	// 	return this.listasCollection.add(listatemp);

	// 	// const id = this.afs.createId();
	// 	// const listaTemp: Lista = new Lista(nombre);
	// 	// listaTemp.id = id;

	// 	// console.log('La lista: ', listaTemp);

	// 	// this.listasCollection.doc(id).set(listaTemp);

	// 	// console.log(listaTemp);

	// 	// return this.http.post(`${environment.URL}/listas.json`, listaTemp).pipe(
	// 	// 	map((respuesta: any) => {
	// 	// 		listaTemp.id = respuesta.name;
	// 	// 		// console.log('respuesta servicio');

	// 	// 		return listaTemp;
	// 	// 	})
	// 	// );

	// 	// console.log('Lista temp 2: ', listatemp);

	// 	// return of(listatemp);
	// }

	// getLista(id: string): Observable<Lista> {
	// 	// console.log('Id: ', id);

	// 	return this.http.get(`${environment.URL}/listas/${id}.json`).pipe(
	// 		map((respuesta: Lista) => {
	// 			// console.log('La respuesta: ', respuesta);

	// 			const lista: Lista = { ...respuesta };
	// 			lista.items = this.crearArrayItems(respuesta.items);
	// 			// console.log('La lista: ', lista);
	// 			lista.id = id;

	// 			return lista;
	// 		})
	// 	);
	// }

	// getListas(): AngularFireList<Lista> {
	// 	this.listaListRef = this.db.list('/listas');

	// 	return this.listaListRef;
	// }

	// getListas(): Observable<Lista[]> {
	// 	// return this.http.get(`${environment.URL}/listas.json`).pipe(
	// 	// 	map((respuesta: any) => {
	// 	// 		// this.listas = this.crearArreglo(respuesta);
	// 	// 		// return this.listas;
	// 	// 		return this.crearArreglo(respuesta);
	// 	// 	})
	// 	// );

	// 	this.listasCollection = this.afs.collection<Lista>('listas');

	// 	// console.log('La colección: ', this.listasCollection);

	// 	this.listas = this.listasCollection.valueChanges();
	// 	// console.log('this.listas: ', this.listas);

	// 	return this.listas;

	// 	// return this.listas.pipe(
	// 	// 	map((respuesta: any) => {
	// 	// 		console.log('La lista respuesta: ', respuesta);
	// 	// 		return this.crearArreglo(respuesta);
	// 	// 	})
	// 	// );

	// 	// return this.afs
	// 	// 	.collection<Lista>('listas')
	// 	// 	.valueChanges()
	// 	// 	.pipe(
	// 	// 		map((respuesta: any) => {
	// 	// 			console.log('La lista respuesta: ', respuesta);

	// 	// 			this.listas = this.crearArreglo(respuesta);
	// 	// 			return this.listas;
	// 	// 			// return this.crearArreglo(respuesta);
	// 	// 		})
	// 	// 	);
	// }

	// private crearArreglo(listasObj: object): Lista[] {
	// 	const listas: Lista[] = [];
	// 	console.log('Lista obj: ', listasObj);

	// 	if (listasObj === null) {
	// 		return [];
	// 	}

	// 	Object.keys(listasObj).forEach((key) => {
	// 		const lista: Lista = listasObj[key];

	// 		lista.id = key;
	// 		listas.push(lista);
	// 	});

	// 	return listas;
	// }
}
