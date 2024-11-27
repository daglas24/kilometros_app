import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Crud1PageRoutingModule } from './crud1-routing.module';

import { Crud1Page } from './crud1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Crud1PageRoutingModule
  ],
  declarations: [Crud1Page]
})
export class Crud1PageModule {}
