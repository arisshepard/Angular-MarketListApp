import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListasService } from '../../services/listas.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
	listas: Lista[] = [];
	constructor(
		private listasService: ListasService,
		private alertController: AlertController,
		private router: Router
	) {}

	ngOnInit() {
		this.listasService.getListas().subscribe((listas: Lista[]) => {
			this.listas = listas;
		});

		// this.fetchListas();
	}

	// fetchListas() {
	// 	// this.listasService
	// 	// 	.getListas()
	// 	// 	.valueChanges()
	// 	// 	.subscribe((res: Lista[]) => {
	// 	// 		console.log('El listado de listas: ', res);
	// 	// 	});

	// 	const listasRes = this.listasService.getListas();
	// 	listasRes.snapshotChanges().subscribe((res) => {
	// 		this.listas = [];
	// 		res.forEach((item) => {
	// 			// console.log('Lista: ', item);

	// 			const lista = item.payload.toJSON() as Lista;
	// 			lista.id = item.key;
	// 			// console.log('Lista: ', lista);

	// 			this.listas.push(lista);
	// 		});

	// 		// console.log('Listas: ', this.listas);
	// 	});
	// }

	async agregarLista() {
		const alert = await this.alertController.create({
			// cssClass: 'my-custom-class',
			header: 'Nueva Lista',
			// subHeader: 'Subtitle',
			// message: 'This is an alert message.',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					// cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					},
				},
				{
					text: 'Ok',
					handler: (data) => {
						if (data.nombre.length === 0) {
							return;
						} else {
							this.listasService.createLista(data.nombre).then((res: any) => {
								// console.log('Respuesta ID: ', res.key);
								this.router.navigate(['tabs/tab1/agregar', res.key]);
							});
							// this.listasService.crearLista(data.nombre).then((respuesta) => {
							// 	console.log('Respuesta: ', respuesta);
							// });
							// 		.subscribe((listaRespuesta: Lista) => {
							// 			console.log('Lista respuesta: ', listaRespuesta);
							// 			this.listas.push(listaRespuesta);
							// 			// this.router.navigateByUrl(
							// 			// 	`tabs/tab1/agregar/${listaRespuesta.id}`
							// 			// );
							// 			console.log('Lista respuesta id: ', listaRespuesta.id);
							// 			this.router.navigate([
							// 				'tabs/tab1/agregar',
							// 				listaRespuesta.id,
							// 			]);
							// 		});
							// }
						}
					},
				},
			],
			inputs: [
				{
					name: 'nombre',
					type: 'text',
					placeholder: 'Nombre de la lista',
				},
			],
		});

		await alert.present();
	}
}
