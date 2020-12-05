import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListasService } from '../../services/listas.service';

@Component({
	selector: 'app-listas',
	templateUrl: './listas.component.html',
	styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
	@ViewChild(IonList) lista: IonList;

	@Input() listas: Lista[] = [];

	constructor(
		private route: Router,
		private alertController: AlertController,
		public listasService: ListasService
	) {}

	ngOnInit() {}

	async borrarListaAlert(lista: Lista) {
		const alert = await this.alertController.create({
			// cssClass: 'my-custom-class',
			header: '¿Está seguro?',
			message: 'La lista seleccionada se borrará.',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					// cssClass: 'secondary',
					handler: () => {
						this.lista.closeSlidingItems();
						// console.log('Confirm Cancel: blah');
					},
				},
				{
					text: 'Aceptar',
					handler: () => {
						this.borrarLista(lista);
						this.lista.closeSlidingItems();
						// console.log('Confirm Okay');
					},
				},
			],
		});

		await alert.present();
	}

	editarLista(id: string) {
		this.route.navigateByUrl(`tabs/tab1/agregar/${id}`);
	}

	async editarNombre(lista: Lista) {
		const alert = await this.alertController.create({
			// cssClass: 'my-custom-class',
			header: 'Editar nombre',
			inputs: [
				{
					name: 'nombre',
					type: 'text',
					placeholder: 'Nombre de la lista',
					value: lista.nombre,
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					// cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
						this.lista.closeSlidingItems();
					},
				},
				{
					text: 'Aceptar',
					handler: (data) => {
						lista.nombre = data.nombre;
						this.editarNombreLista(lista);

						this.lista.closeSlidingItems();
						// console.log('La data: ', data);

						// console.log('Confirm Ok');
					},
				},
			],
		});

		await alert.present();
	}

	private borrarLista(lista: Lista) {
		this.listasService.deleteLista(lista.id).then((respuesta) => {
			// const index = this.listas.indexOf(lista);
			// this.listas.splice(index, 1);
			// console.log(this.listas);
		});

		// this.listasService.borrarLista(lista.id).subscribe();
	}

	// private borrarLista(lista: Lista) {
	// 	this.listasService.borrarLista(lista.id).subscribe((respuesta) => {
	// 		// console.log('Respuesta borrado: ', respuesta);
	// 		const index = this.listas.indexOf(lista);
	// 		this.listas.splice(index, 1);
	// 		// console.log('Lista borrada');
	// 	});

	// 	// this.listasService.borrarLista(lista.id).subscribe();
	// }

	// private editarNombreLista(lista: Lista) {
	// 	this.listasService.actualizarLista(lista).subscribe();
	// }

	private editarNombreLista(lista: Lista) {
		this.listasService.updateLista(lista).then((respuesta) => {
			console.log('Nombre lista editado');
		});
	}
}
