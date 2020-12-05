import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
	},
	{
		path: 'agregar',
		loadChildren: () =>
			import('./pages/agregar/agregar.module').then((m) => m.AgregarPageModule),
	},
	{
		path: 'agregar-item',
		loadChildren: () =>
			import('./pages/agregar-item/agregar-item.module').then(
				(m) => m.AgregarItemPageModule
			),
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
