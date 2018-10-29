import { SolicitacaoMedicamentoService } from './../../solicitacao/solicitacao-medicamento.service';
import { Status, Medicamento } from '../../core/model';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { MedicamentoFiltro, MedicamentoService } from '../medicamento.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-medicamentos-pesquisa',
  templateUrl: './medicamentos-pesquisa.component.html',
  styleUrls: ['./medicamentos-pesquisa.component.css']
})
export class MedicamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new MedicamentoFiltro();
  medicamentos = [];
  medicamento: Medicamento;
  display: Boolean = false;
  formulario: FormGroup;
  displayDoar: Boolean = false;

  constructor(private medicamentoService: MedicamentoService, private formBuilder: FormBuilder, private toasty: ToastyService,
    private solicitacaoService: SolicitacaoMedicamentoService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.medicamento = new Medicamento();
    this.formulario = this.formBuilder.group({
      motivo: [ null, Validators.required ],
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.medicamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicamentos = resultado.medicamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(medicamento: any) {
    this.medicamento = medicamento;
    this.display = true;
  }

  atualizarStatusParaExcluido() {
    const status = this.medicamento.status;
    this.medicamento.status.id = 5;
    this.medicamento.status.descricao = 'Excluído';
    this.medicamento.obsExclusao = this.formulario.get('motivo').value;
    this.medicamentoService.atualizarStatus(this.medicamento)
      .then(medicamento => {
        this.medicamento = medicamento;
        this.toasty.success('Medicamento excluído com sucesso!');
        this.display = false;
      }).catch(erro => {this.display = true; this.medicamento.status = status;  this.medicamento.obsExclusao = ''; });
  }

  abrirModalConfirmacao(medicamento: any) {
    this.medicamento = medicamento;
    this.displayDoar = true;
  }

  confirmarSolicitacao() {
    const solicitacao = this.medicamento.solicitacaoAtual;
    solicitacao.medicamento = this.medicamento;
    solicitacao.medicamento.solicitacaoAtual = null;
    this.displayDoar = false;
    this.solicitacaoService.confirmarSolicitacao(solicitacao, this.medicamento.lote)
      .then(medicamentoAdicionado => {
        this.toasty.success('Reserva confirmada com sucesso!');
        this.medicamento.solicitacaoAtual = solicitacao;
        this.pesquisar();
      }).catch(erro =>  {this.medicamento.solicitacaoAtual = solicitacao; this.errorHandler.handle(erro); });
  }

  excluirSolicitacao() {
    const solicitacao = this.medicamento.solicitacaoAtual;
    solicitacao.medicamento = this.medicamento;
    solicitacao.medicamento.solicitacaoAtual = null;
    this.displayDoar = false;
    this.solicitacaoService.excluirSolicitacao(solicitacao, this.medicamento.lote)
      .then(medicamentoAdicionado => {
        this.toasty.success('Reserva excluída com sucesso!');
        this.medicamento.solicitacaoAtual = solicitacao;
        this.pesquisar();
      }).catch(erro => {this.medicamento.solicitacaoAtual = solicitacao; this.errorHandler.handle(erro); });
  }
}
