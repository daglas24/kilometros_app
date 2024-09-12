import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Asegúrate de incluir esto
import { InicioPageRoutingModule } from './inicio-routing.module';
import { MatTableModule } from '@angular/material/table';  // Importa MatTableModule

import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Esto es necesario para reconocer los componentes de Ionic
    InicioPageRoutingModule,
    MatTableModule  // Agrega MatTableModule aquí
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
