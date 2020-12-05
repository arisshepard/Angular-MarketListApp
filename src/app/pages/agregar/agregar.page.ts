import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListasService } from '../../services/listas.service';
import { ListaItem } from '../../models/lista-item.model';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-agregar',
	templateUrl: './agregar.page.html',
	styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
	// la inicializamos para que no de error al leer los parámetros
	lista: Lista = new Lista('Nueva lista');

	constructor(
		private activatedRoute: ActivatedRoute,
		private listasService: ListasService,
		private router: Router
	) {
		const listaId = this.activatedRoute.snapshot.paramMap.get('id');

		this.lista.items = [];

		this.listasService.getLista(listaId).subscribe((listaRespuesta: Lista) => {
			this.lista = listaRespuesta;
		});

		// this.listasService
		// 	.getLista(listaId)
		// 	.valueChanges()
		// 	.subscribe((listaRespuesta: Lista) => {
		// 		this.lista = listaRespuesta;
		// 	});
	}

	ngOnInit() {
		// const listaId = this.activatedRoute.snapshot.paramMap.get('id');
		// this.listasService.getLista(listaId).subscribe((listaRespuesta: Lista) => {
		// 	console.log('La lista: ', listaRespuesta);
		// 	this.lista = listaRespuesta;
		// });
	}

	agregarItem() {
		this.router.navigateByUrl(
			`tabs/tab1/agregar/${this.lista.id}/agregar-item`
		);
	}

	borrarItemAlert(item: ListaItem) {
		console.log('Vamos a borrar: ', item);
	}

	editarItem(id: string) {
		console.log('Vamos a editar: ', id);
		this.router.navigateByUrl(
			`tabs/tab1/agregar/${this.lista.id}/agregar-item/${id}`
		);
	}
}
