import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { ListaItem } from '../../models/lista-item.model';
import { ListasService } from '../../services/listas.service';

@Component({
	selector: 'app-agregar-item',
	templateUrl: './agregar-item.page.html',
	styleUrls: ['./agregar-item.page.scss'],
})
export class AgregarItemPage implements OnInit {
	formulario: FormGroup;
	item: ListaItem;

	idLista: string;
	idItem: string;

	// @Output() newItemEvent = new EventEmitter<ListaItem>();

	// devolverItem(value: ListaItem) {
	// 	this.newItemEvent.emit(value);
	// }

	constructor(
		private formBuilder: FormBuilder,
		private listasService: ListasService,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) {
		// const idItem = this.activatedRoute.snapshot.paramMap.get('idItem');
		// console.log('Id de la lista: ', idLista);
		// console.log('Id del item: ', idItem);

		this.crearFormulario();
		this.crearListeners();
		this.getItem();
	}

	ngOnInit() {}

	grabarItem() {
		// this.idLista = this.activatedRoute.snapshot.paramMap.get('id');

		// this.listasService.crearItem(this.item, idLista).subscribe(
		// 	// (data) => console.log(data),
		// 	// (err) => console.log(err),
		// 	() => {
		// 		// console.log('yay');
		// 		// this.devolverItem(this.item);
		// 		// this.location.back();
		// 	}
		// );

		if (this.idItem) {
			console.log('Vamos a editar');

			this.listasService.updateItem(this.idLista, this.item).then(() => {
				console.log('Elemento actualizado');
				this.location.back();
			});
		} else {
			console.log('Vamos a grabar');
			this.listasService.createItem(this.item, this.idLista).then(
				// (data) => console.log(data),
				// (err) => console.log(err),
				() => {
					console.log('Elemento grabado');
					// this.devolverItem(this.item);
					this.location.back();
				}
			);
		}
	}

	private crearFormulario() {
		this.formulario = this.formBuilder.group({
			producto: ['', Validators.required],
			cantidad: [
				1,
				[Validators.required, Validators.min(1), Validators.max(100)],
			],
			comprado: [false],
		});

		this.item = this.formulario.value;

		// this.formulario = this.formBuilder.group(new ListaItem('Prueba', 3));
	}

	private crearListeners(): void {
		// cualquier valor del formulario
		this.formulario.valueChanges.subscribe((valor) => {
			this.item = valor;
			// console.log('El item: ', this.item);
		});
	}

	private getItem() {
		this.idLista = this.activatedRoute.snapshot.paramMap.get('id');
		this.idItem = this.activatedRoute.snapshot.paramMap.get('idItem');

		if (this.idItem) {
			this.listasService
				.getItem(this.idLista, this.idItem)
				.subscribe((item: ListaItem) => {
					this.item = item;
					console.log('Item recuperado: ', this.item);

					this.formulario.setValue(item);
				});
		} else {
			console.log('Item nuevo');
		}
	}
}
