import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule para habilitar servicios HTTP

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de usar el import correcto
import { SQLiteService } from './services/sqlite.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // Asegurarse de agregar esto
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLiteService,
    SQLite, // Registra SQLite como proveedor
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
