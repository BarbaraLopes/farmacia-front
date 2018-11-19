import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'medicamentos', loadChildren: 'src/app/medicamentos/medicamentos.module#MedicamentosModule' },
  { path: 'solicitacao', loadChildren: 'src/app/solicitacao/solicitacao-medicamento.module#SolicitacaoMedicamentoModule' },
  { path: 'login', loadChildren: 'src/app/login/seguranca.module#SegurancaModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
