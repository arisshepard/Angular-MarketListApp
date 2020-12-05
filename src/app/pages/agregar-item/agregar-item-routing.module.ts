import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarItemPage } from './agregar-item.page';

const routes: Routes = [
	{
		path: '',
		component: AgregarItemPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AgregarItemPageRoutingModule {}
