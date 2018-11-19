import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { MedicamentoCadastroComponent } from './medicamentos-cadastro/medicamento-cadastro.component';
import { MedicamentosPesquisaComponent } from './medicamentos-pesquisa/medicamentos-pesquisa.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MedicamentosPesquisaComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN']}
  },
  {
    path: 'novo',
    component: MedicamentoCadastroComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MedicamentosRoutingModule {}
