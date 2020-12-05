import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarItemPageRoutingModule } from './agregar-item-routing.module';

import { AgregarItemPage } from './agregar-item.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AgregarItemPageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [AgregarItemPage],
})
export class AgregarItemPageModule {}
