import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitacaoMedicamentoComponent } from './solicitacao-medicamento/solicitacao-medicamento.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoMedicamentoComponent,
    data: { }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SolicitacaoMedicamentoRoutingModule {}
