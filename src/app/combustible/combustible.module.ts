import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombustiblePageRoutingModule } from './combustible-routing.module';

import { CombustiblePage } from './combustible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombustiblePageRoutingModule
  ],
  declarations: [CombustiblePage]
})
export class CombustiblePageModule {}
