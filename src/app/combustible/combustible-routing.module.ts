import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombustiblePage } from './combustible.page';

const routes: Routes = [
  {
    path: '',
    component: CombustiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombustiblePageRoutingModule {}
