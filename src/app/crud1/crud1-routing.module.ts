import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Crud1Page } from './crud1.page';

const routes: Routes = [
  {
    path: '',
    component: Crud1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Crud1PageRoutingModule {}
