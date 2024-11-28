import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'combustible',
    loadChildren: () =>
      import('./combustible/combustible.module').then((m) => m.CombustiblePageModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'tienda',
    loadChildren: () =>
      import('./tienda/tienda.module').then((m) => m.TiendaPageModule),
  },
  {
    path: 'carrito',
    loadChildren: () =>
      import('./carrito/carrito.module').then((m) => m.CarritoPageModule),
  },
  {
    path: 'crud1',
    loadChildren: () => import('./crud1/crud1.module').then((m) => m.Crud1PageModule),
  },
  
  {
    path: 'notfound',
    loadChildren: () =>
      import('./notfound/notfound.module').then((m) => m.NotfoundPageModule),
  },
  {
    path: '**', // Manejo de rutas inexistentes
    redirectTo: 'notfound',
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
