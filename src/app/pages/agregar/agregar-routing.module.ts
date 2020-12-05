import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPage } from './agregar.page';
import { AgregarPageModule } from './agregar.module';

// const routes: Routes = [
// 	{
// 		path: '',
// 		component: AgregarPage,
// 	},
// 	{
// 		path: ':id',
// 		component: AgregarPage,
// 		children: [
// 			{
// 				path: 'agregar-item',
// 				children: [
// 					{
// 						path: '',
// 						loadChildren:
// 							'../agregar-item/agregar-item.module#AgregarItemPageModule',
// 					},
// 				],
// 			},
// 		],
// 	},
// {
// 	path: 'agregar-item/:id',
// 	loadChildren: () =>
// 		import('../agregar-item/agregar-item.module').then(
// 			(m) => m.AgregarItemPageModule
// 		),
// },
// ]

// const routes: Routes = [
// 	{
// 		path: '',
// 		component: AgregarPage,
// 		children: [
// 			{
// 				path: 'agregar-item',
// 				children: [
// 					{
// 						path: '',
// 						loadChildren:
// 							'../agregar-item/agregar-item.module#AgregarItemPageModule',
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		path: 'agregar-item/:id',
// 		loadChildren: () =>
// 			import('../agregar-item/agregar-item.module').then(
// 				(m) => m.AgregarItemPageModule
// 			),
// 	},
// ];

// const routes: Routes = [
// 	// {
// 	// 	path: '',
// 	// 	component: AgregarPage,
// 	// },
// 	{
// 		path: '',
// 		component: AgregarPage,
// 		children: [
// 			{
// 				path: 'agregar-item:/id',
// 				children: [
// 					{
// 						path: '',
// 						loadChildren: () =>
// 							import('../agregar-item/agregar-item.module').then(
// 								(m) => m.AgregarItemPageModule
// 							),
// 					},
// 				],
// 			},
// 			// {
// 			// 	path: '',
// 			// 	redirectTo: '/agregar-item',
// 			// 	pathMatch: 'full',
// 			// },
// 		],
// 	},
// ];

const routes: Routes = [
	{
		path: '',
		component: AgregarPage,
	},
	{
		path: 'agregar-item/:idItem',
		loadChildren: () =>
			import('../agregar-item/agregar-item.module').then(
				(m) => m.AgregarItemPageModule
			),
	},
	{
		path: 'agregar-item',
		loadChildren: () =>
			import('../agregar-item/agregar-item.module').then(
				(m) => m.AgregarItemPageModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AgregarPageRoutingModule {}
